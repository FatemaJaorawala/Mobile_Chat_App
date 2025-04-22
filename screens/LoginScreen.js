import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';  // ✅ Expo Router hook

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const router = useRouter();  // ✅ initialize router

  const handleLogin = () => {
    if (username.trim()) {
      router.push({ pathname: '/chat', params: { username } });  // ✅ push to /chat
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Your Name</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Your Name"
      />
      <Button title="Join Chat" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  heading: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 10, borderRadius: 5,
  },
});
