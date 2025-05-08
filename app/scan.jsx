import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const lastScanTime = useRef(null);
    const scanAnimation = useRef(new Animated.Value(0)).current;

    // Handle camera mounting/unmounting when screen focus changes
    useFocusEffect(
        useCallback(() => {
            setIsCameraActive(true);
            return () => {
                setIsCameraActive(false);
            };
        }, [])
    );

    // Animation for scanning effect
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanAnimation, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(scanAnimation, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

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
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 20, marginTop: 20}}>
                <Text style={styles.title}>Skanna QR-kod</Text>
            </View>

            {isCameraActive && (
                <CameraView
                    ratio='1:1'
                    facing="back"
                    style={{
                        flex: 1,
                        backgroundColor: "#222",
                        height: "50%",
                        width: "90%",
                        top: "15%",
                        alignSelf: "center",
                        borderRadius: 10,
                        overflow: "hidden",
                        position: "absolute",
                    }}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr'],
                        interval: 5000,
                        checkInverted: false,
                    }}
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                />
            )}
            <View style={styles.overlay}>
                <View style={styles.scanArea}>
                    <Animated.View
                        style={[
                            styles.scanLine,
                            {
                                opacity: scanAnimation,
                                transform: [{
                                    translateY: scanAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 300]
                                    })
                                }]
                            }
                        ]}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
                <MaterialIcons name="arrow-back" size={40} color="#f7ca90" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
    title: {
        fontFamily: "Poppins-Bold",
        letterSpacing: 1,
        textAlign: "center",
        width: "100%",
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f7ca90',
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
        bottom: 40,
        backgroundColor: '#111',
        borderWidth: 2,
        borderColor: '#f7ca90',
        borderRadius: 32,
        padding: 12,
        width: "90%",
        alignItems: 'center',
        alignSelf: 'center',
    },
    overlay: {
        position: 'absolute',
        top: '15%',
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanArea: {
        width: '90%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#f7ca90',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    scanLine: {
        position: 'absolute',
        width: '100%',
        height: 3,
        backgroundColor: '#f7ca90',
        shadowColor: '#f7ca90',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 8,
    },
});
