import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [links] = useState([
    { id: 1, title: 'LinkedIn', url: 'https://www.linkedin.com/in/emanuel-sleyman-660552293/' },
    { id: 2, title: 'GitHub', url: 'https://github.com/EmSley77' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
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
              {/* <MaterialIcons name="qr-code" size={26} color="#4d918f" /> */}
              <MaterialIcons name="qr-code" size={26} color="#8ec3b0" />
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <MaterialIcons name="add" size={40} color="#f7ca90" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#edf2f4',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 32,
    textAlign: 'center',
  },
  list: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#4d918f',
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  footerButton: {
    backgroundColor: '#f5907b',
    padding: 10,
    borderRadius: 30,
  },

});
