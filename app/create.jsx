import { useRouter } from 'expo-router';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Create() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const router = useRouter();

    const handleAdd = () => {
        if (!title || !url) {
            Alert.alert('Fyll i båda fälten');
            return;
        }
        console.log('Länk tillagd:', { title, url });
        // Reset fields
        setTitle('');
        setUrl('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: 20}}>

                <Text style={styles.header}>Lägg till ny länk</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Titel (t.ex. GitHub)"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="URL (t.ex. https://github.com)"
                    value={url}
                    onChangeText={setUrl}
                    autoCapitalize="none"
                    keyboardType="url"
                />

                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text style={styles.buttonText}>Lägg till</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color="#f7ca89" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',        
        backgroundColor: '#333',
    },  
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 30,
        color: '#f7ca89',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 8,
        borderColor: '#8ec3b3',
        borderWidth: 1,
        marginBottom: 18,
        fontSize: 16,
    },
    button: {
        borderWidth: 2,
        borderColor: '#f7ca90',
        backgroundColor: '#111',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#f7ca90',
        backgroundColor: '#111',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});
