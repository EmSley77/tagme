import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShareScreen() {
  const { id } = useLocalSearchParams();

  const [link, setLink] = useState(null);
  const [links] = useState([
    {
      id: 1,
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/emanuel-sleyman-660552293/",
    },
    {
      id: 2,
      title: "GitHub",
      url: "https://github.com/EmSley77",
    }
  ]);

  useEffect(() => {
    const numericId = parseInt(id);
    const foundLink = links.find(link => link.id === numericId);
    if (foundLink) setLink(foundLink);
    else console.error('Link not found for ID:', id);
  }, [id, links]);

  return (
    <SafeAreaView style={styles.container}>
      {link && (
        <>
          <Text style={styles.title}>{link.title}</Text>

          <View style={styles.qrWrapper}>
            <QRCode value={link.url} size={220} />
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← Tillbaka</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f4f1', // mjukare bakgrund
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    color: '#17494d', // mörkare blågrön
  },
  qrWrapper: {
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  backButton: {
    marginTop: 40,
    backgroundColor: '#0f766e', // djup turkosgrön
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 32,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
});
