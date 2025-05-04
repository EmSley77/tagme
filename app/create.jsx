import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

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
            <ScrollView style={styles.scrollView}>

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
                    <Text style={styles.backButtonText}>← Tillbaka</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#e5f7f2',
        justifyContent: 'center',
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 30,
        color: '#004d40',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 8,
        borderColor: '#b0bec5',
        borderWidth: 1,
        marginBottom: 18,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00796b',
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
        backgroundColor: '#004d40',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});
