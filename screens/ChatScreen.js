import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';  // ✅ Import this

const socket = io('http://192.168.152.202:3001'); // Replace with your IP later

export default function ChatScreen() {
  const { username } = useLocalSearchParams();  // ✅ Use this to get route params

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    socket.emit('join', username);

    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('chat message');
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMsg = {
        user: username,
        text: message,
        time: dayjs().format('HH:mm:ss'),
      };
      socket.emit('chat message', newMsg);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.msgBox}>
            <Text style={styles.username}>{item.user}</Text>
            <Text>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  msgBox: {
    backgroundColor: '#f1f1f1', padding: 10,
    borderRadius: 5, marginBottom: 5,
  },
  username: { fontWeight: 'bold' },
  time: { fontSize: 10, color: 'gray', alignSelf: 'flex-end' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderTopWidth: 1, borderColor: '#ccc', paddingTop: 5,
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ccc',
    padding: 10, borderRadius: 5, marginRight: 5,
  },
});
