import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//used for when scanning others and sharing your own profile
const CardLink = ({ link }) => {
    return <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => Linking.openURL(`${link.url}`)}
    >
        <View style={styles.cardContent}>
            <Text style={styles.title}>{link.title}</Text>
            <MaterialIcons name="qr-code" size={26} color="#f7ca90" />
        </View>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 2,
        borderColor: '#f7ca90', // Charcoal gray for a soft border contrast
        backgroundColor: '#222', // Light gray background to keep it subtle
        borderRadius: 50, // Slightly less rounded for a more modern feel
        paddingVertical: 24,
        paddingHorizontal: 28,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 4,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        letterSpacing: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#FFF', // Darker text color to ensure readability
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    footer: {
        backgroundColor: '#1A1A1A', // Dark gray footer for contrast
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#E0E0E0', // Light gray border to complement footer
        padding: 10,
        marginBottom: 15,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF', // White text for a clean footer
    },
    footerButton: {
        backgroundColor: '#333333', // Dark button to contrast with the footer
        padding: 10,
        borderRadius: 30,
    },
});
export default CardLink;