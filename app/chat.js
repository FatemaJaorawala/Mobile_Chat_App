import React from 'react';
import ChatScreen from '../screens/ChatScreen';
import { useLocalSearchParams } from 'expo-router';

export default function Chat() {
  const { username } = useLocalSearchParams();

  return <ChatScreen route={{ params: { username } }} />;
}
