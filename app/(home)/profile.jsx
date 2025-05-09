import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useState } from 'react';

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('remember');
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {/* TODO replace with real image from database */}
            {user.image && (
              <Image source={{ uri: user.image }} style={styles.avatar} />
            )}
          </View>
          <Text style={styles.name}>{user.name || 'Guest User'}</Text>
          <Text style={styles.uuid}>gick med: {user.created_at || 'Not available'}</Text>
        </View>

        {/* Profile Content */}
        <View style={styles.content}>
          <View style={styles.infoCard}>
            <MaterialIcons name="email" size={24} color="#f7ca90" />
            <Text style={styles.infoText}>{user?.email || 'No email'}</Text>
          </View>

          <View style={styles.infoCard}>
            <MaterialIcons name="security" size={24} color="#f7ca90" />
            <Text style={styles.infoText}>••••••••</Text>
            <TouchableOpacity 
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: '#333',
                borderWidth: 1,
                borderColor: '#f7ca90'
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialIcons 
                name={showPassword ? "visibility-off" : "visibility"} 
                size={24} 
                color="#f7ca90" 
              />
            </TouchableOpacity>
            <Modal 
              visible={showPassword} 
              transparent={true} 
              animationType="fade"
            >
              <View style={styles.modalContainer}>
                <View style={{
                  backgroundColor: '#333',
                  padding: 20,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#f7ca90',
                  alignItems: 'center'
                }}>
                  <Text style={styles.modalText}>Password: {user.password}</Text>
                  <TouchableOpacity 
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#444',
                      padding: 12,
                      borderRadius: 8,
                      marginTop: 16,
                      borderWidth: 1,
                      borderColor: '#f7ca90'
                    }}
                    onPress={() => setShowPassword(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#f7ca90" />
                    <Text style={{
                      color: '#fff',
                      marginLeft: 8,
                      fontSize: 16
                    }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/settings')}
          >
            <MaterialIcons name="settings" size={24} color="#f7ca90" />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color="#f7ca90" />
            <Text style={styles.navText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 24,
    color: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#f7ca90',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f7ca90',
    marginBottom: 6,
  },
  uuid: {
    fontSize: 14,
    color: '#aaa',
  },
  content: {
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f7ca90',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#f7ca90',
  },
  navButton: {
    alignItems: 'center',
    padding: 8,
  },
  navText: {
    color: '#f7ca90',
    marginTop: 4,
    fontSize: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
}); 