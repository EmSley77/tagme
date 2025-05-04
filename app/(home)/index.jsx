import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function HomeScreen() {

  const [showModal, setShowModal] = useState(false);
  const [links] = useState([
    {
      id: 1,
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/emanuel-sleyman-660552293/',
      is_private: false
    },
    {
      id: 2,
      title: 'GitHub',
      url: 'https://github.com/EmSley77',
      is_private: false
    },
  ]);

  const user = {
    id: 1,
    name: 'Emanuel Sleyman',
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>

        {/* Modal to show phone number */}
        <Modal
          animationType="fade"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>Profil</Text>
              <QRCode value={"https://www.linkedin.com/in/emanuel-sleyman-660552293/"} size={200} color="#f7ca90" />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <MaterialIcons name="close" size={35} color="#f7ca90" />
            </TouchableOpacity>
          </View>
        </Modal>

        <FlatList
          data={links}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => router.push(`/share/${item.id}`)}
            >
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <MaterialIcons name="qr-code" size={26} color="#f7ca90" />
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => {
            setShowModal(true)
          }}>
            <MaterialIcons name="account-circle" size={40} color="#f7ca90" />
          </TouchableOpacity>

          {/* Open camera to scan profile ID */}
          <TouchableOpacity style={styles.footerButton} onPress={() => router.push("/scan")}>
            <MaterialIcons name="qr-code" size={40} color="#f7ca90" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.footerButton} onPress={() => router.push('/create')}>
            <MaterialIcons name="add" size={40} color="#f7ca90" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333", // White background for a clean, modern feel
    paddingHorizontal: 20,
  },
  list: {
    paddingTop: 20,
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#333", // Light background for modals
    padding: 20,
  },
  modalText: {
    fontSize: 30,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#fff', // Dark text color to keep the focus
  },
  modalTextContainer: {
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#111', // Lighter gray background for modal content
    borderWidth: 2,
    borderColor: '#FFF', // Slightly darker border for distinction
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  closeButton: {
    borderWidth: 2,
    borderColor: '#f7ca90',
    backgroundColor: '#111', // Darker button background
    opacity: 0.8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // White text on the button for contrast
  },
});
