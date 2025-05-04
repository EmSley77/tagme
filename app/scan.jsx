import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanScreen() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }
    const handleBarcodeScanned = (result) => {
        console.log(result);
        if (result.type === 'qr') {
            console.log(result.data);
        }
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Vi behöver ditt tillstånd för att visa kamera</Text>
                <TouchableOpacity style={{
                    backgroundColor: '#111',
                    borderWidth: 2,
                    borderColor: '#f7ca90',
                    borderRadius: 32,
                    padding: 10,
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                    onPress={requestPermission} >
                    <Text style={styles.text}>Ge tillstånd</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={(result) => handleBarcodeScanned(result)}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 20,
        color: '#f7ca90',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',

        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 32,
        borderWidth: 2,
        borderColor: '#f7ca90',
        backgroundColor: '#111',
        padding: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
