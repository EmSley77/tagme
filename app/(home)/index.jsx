import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

  const [links, setLinks] = useState({
    id: 1,
    title: "LinkedIn",
    icon: "person",
    url: "https://www.linkedin.com/in/your-profile",
  },
    {
      id: 2,
      title: "GitHub",
      icon: "code",
      url: "https://github.com/your-username",
    },
    {
      id: 3,
      title: "Portfolio",
      icon: "web",
      url: "https://your-portfolio.com",
    },);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a5075' }}>

      {links && links.length > 0 && <FlatList data={links} keyExtractor={item => item.id} renderItem={({ item }) => (
        <View style={styles.box}>
          <Text style={styles.title}>{item.title}</Text>
          <MaterialIcons name={item.icon} size={24} color="black" />
          <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <MaterialIcons name="open-in-new" size={24} color="black" />
          </TouchableOpacity>


        </View>
      )} />}


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 10,
    backgroundColor: "#edf8ff",
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
}); 