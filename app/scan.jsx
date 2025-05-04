import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanScreen() {

    //TODO: fix open page to profile after correct scan if nothing available reject and redo scan with message
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    const lastScanTime = useRef(null); // Keep track of the last scan time

    useEffect(() => {
        if (scanned) {
            setScanned(true);
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
            return; // Prevent scan if it's less than 5 seconds
        }

        if (result.type === 'qr') {
            // Only push the result if it's a valid QR code
            router.push(`/visit/${result.data}`);
            lastScanTime.current = currentTime; // Update the last scan time to set the current time as the last scan time
            setScanned(true);
        }
    };

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>Vi behöver ditt tillstånd för att visa kamera</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.text}>Ge tillstånd</Text>
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
                onBarcodeScanned={handleBarcodeScanned}
            />
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'flex-end',
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
    },
    permissionButton: {
        marginTop: 20,
        backgroundColor: '#111',
        borderColor: '#f7ca90',
        borderWidth: 2,
        borderRadius: 32,
        padding: 12,
    },
    backButton: {
        alignSelf: 'center',
        margin: 24,
        backgroundColor: '#111',
        borderColor: '#f7ca90',
        borderWidth: 2,
        borderRadius: 32,
        padding: 8,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
});
