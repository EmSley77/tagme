import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

//TODO disable camera when leaving this page
export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const lastScanTime = useRef(null);

    useEffect(() => {
        if (scanned) {
            const timer = setTimeout(() => {
                setScanned(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [scanned]);

    const handleBarcodeScanned = (result) => {
        const currentTime = new Date().getTime();

        // Allow scan only if 5 seconds have passed since the last scan
        if (lastScanTime.current && currentTime - lastScanTime.current < 5000) {
            return;
        }

        if (result.type === 'qr') {
            if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result.data)) {
                lastScanTime.current = currentTime;
                setScanned(true);
                Alert.alert('Varning', 'Vänligen scanna en giltlig QR-kod');
                return;
            }
            // Only push the result if it's a valid QR code
            console.log(result.data);
            router.push(`/visit/${result.data}`);
            lastScanTime.current = currentTime;
            setScanned(true);
        }
    };

    if (!permission) {
        return <View style={styles.container}><Text style={styles.message}>Loading permissions...</Text></View>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>Vi behöver ditt tillstånd för att visa kamera</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Ge tillstånd</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
            <View style={styles.overlay}>
                <View style={styles.scanArea} />
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
                <MaterialIcons name="arrow-back" size={40} color="#f7ca90" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    centered: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    message: {
        fontSize: 18,
        color: '#f7ca90',
        textAlign: 'center',
        marginBottom: 20,
    },
    permissionButton: {
        backgroundColor: '#111',
        borderWidth: 2,
        borderColor: '#f7ca90',
        borderRadius: 32,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buttonText: {
        color: '#f7ca90',
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#111',
        borderWidth: 2,
        borderColor: '#f7ca90',
        borderRadius: 32,
        padding: 12,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanArea: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#f7ca90',
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
});
