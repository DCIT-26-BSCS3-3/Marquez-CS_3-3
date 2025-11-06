import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  useColorScheme,
} from 'react-native';

export default function App() {
  const [songTitle, setSongTitle] = useState('');
  const [songs, setSongs] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';
  const theme = darkTheme;

  const handleAddSong = () => {
    if (songTitle.trim()) {
      setSongs([...songs, songTitle.trim()]);
      setSongTitle('');
    }
  };

  return (
    <SafeAreaView style={[styles.screen, theme.screen]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.statusBar} />

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.popup, theme.popup]}>
            <Text style={[styles.header, theme.header]}>🎶 My Song List</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, theme.input]}
                placeholder="Enter Song Title"
                placeholderTextColor={theme.placeholder}
                value={songTitle}
                onChangeText={setSongTitle}
              />
              <TouchableOpacity style={[styles.addButton, theme.addButton]} onPress={handleAddSong}>
                <Text style={[styles.addButtonText, theme.addButtonText]}>＋</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={songs}
              ListEmptyComponent={<Text style={[styles.emptyText, theme.emptyText]}>No songs yet. Add one!</Text>}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={[styles.listItem, theme.listItem]}>
                  <Text style={[styles.listText, theme.listText]}>🎵 {item}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  listText: {
    fontSize: 16,
  },
  emptyText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});

const darkTheme = {
  screen: { backgroundColor: '#0F172A' },
  statusBar: '#052E16',
  popup: { backgroundColor: '#14532D' },
  header: { color: '#BBF7D0' },
  input: { backgroundColor: '#166534', color: '#ECFDF5' },
  placeholder: '#A7F3D0',
  addButton: { backgroundColor: '#22C55E' },
  addButtonText: { color: '#052E16' },
  listItem: { backgroundColor: '#166534' },
  listText: { color: '#D1FAE5' },
  emptyText: { color: '#86EFAC' },
};
