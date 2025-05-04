import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ProfilePage() {
    const { data } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>User ID: {data}</Text>
            {/* Fetch and show user data with the ID */}
        </View>
    );
}
