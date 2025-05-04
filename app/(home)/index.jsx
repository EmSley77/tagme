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

export default function HomeScreen() {

  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('1234567890');
  const [links] = useState([
    { id: 1, title: 'LinkedIn', url: 'https://www.linkedin.com/in/emanuel-sleyman-660552293/' },
    { id: 2, title: 'GitHub', url: 'https://github.com/EmSley77' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal to show phone number */}
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{phoneNumber}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
            <Text style={styles.closeButtonText}>Stäng</Text>
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
              <MaterialIcons name="qr-code" size={26} color="#8ec3b0" />
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setShowModal(true)}>
          <MaterialIcons name="phone" size={40} color="#f7ca90" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.push('/create')}>
          <MaterialIcons name="add" size={40} color="#f7ca90" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 32,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#478778',
    borderRadius: 50,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 20,
    fontWeight: '600',
    // color: '#0a507c',
    color: '#fff',
  },
  footer: {
    backgroundColor: '#1689b9',
    borderRadius: 50,
    paddingHorizontal: 10,
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 10,
    marginBottom: 15,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1689b9',
  },
  footerButton: {
    backgroundColor: '#0a507c',
    padding: 10,
    borderRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d918f',
    padding: 20,
  },
  modalText: {
    fontSize: 30,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#6dcf81',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#8ec3b3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

