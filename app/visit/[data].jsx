import { useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import CardLink from '../../components/CardLink';

export default function ProfilePage() {
    const { data } = useLocalSearchParams();
    const [user, setUser] = useState({});
    
    //temporary data
    const users = [
        {
            uuid: "42bbe28a-49ce-4953-b660-4470da21eb23", name: 'John Doe', email: 'john@example.com', links: [
                {
                    id: 1,
                    title: "GitHub",
                    url: "https://github.com/johndoe",
                },
                {
                    id: 2,
                    title: "LinkedIn",
                    url: "https://linkedin.com/in/johndoe",
                },
                {
                    id: 3,
                    title: "Twitter",
                    url: "https://twitter.com/johndoe",
                },
            ]
        },
        {
            uuid: "42bbe28a-49ce-4953-b660-4470da21eb24", name: 'Jane Smith', email: 'jane@example.com', links: [
                {
                    id: 1,
                    title: "GitHub",
                    url: "https://github.com/johndoe",
                },
                {
                    id: 2,
                    title: "LinkedIn",
                    url: "https://linkedin.com/in/johndoe",
                },
                {
                    id: 3,
                    title: "Twitter",
                    url: "https://twitter.com/johndoe",
                },
            ]
        },
        {
            uuid: "42bbe28a-49ce-4953-b660-4470da21eb25", name: 'Jim Beam', email: 'jim@example.com', links: [
                {
                    id: 1,
                    title: "GitHub",
                    url: "https://github.com/johndoe",
                },
                {
                    id: 2,
                    title: "LinkedIn",
                    url: "https://linkedin.com/in/johndoe",
                },
                {
                    id: 3,
                    title: "Twitter",
                    url: "https://twitter.com/johndoe",
                },
            ]
        }
    ];

    //TODO: fetch user data from database
    const setUserData = () => {
        const user = users.find(user => user.uuid === data);
        setUser(user);
    }


    //Set user data here
    useEffect(() => {
        setUserData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <View style={styles.modalTextContainer}>
                    <Text style={styles.modalText}>{user.name}</Text>
                    <Text style={[styles.modalText, {fontSize: 16}]}>{user.email}</Text>
                </View>

                <FlatList
                    data={user.links}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <CardLink link={item} />
                    )}
                />

                <TouchableOpacity style={styles.closeButton} onPress={() => router.push('/scan')}>
                    <MaterialIcons name="arrow-back" size={35} color="#f7ca90" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333",
        paddingHorizontal: 20,
    },
    list: {
        paddingTop: 20,
    },
    modalText: {
        fontSize: 30,
        letterSpacing: 1,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalTextContainer: {
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#111',
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 20,
    },
    closeButton: {
        borderWidth: 2,
        borderColor: '#f7ca90',
        backgroundColor: '#111',
        opacity: 0.8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        alignSelf: 'center',
        marginTop: 20,
    }
});
