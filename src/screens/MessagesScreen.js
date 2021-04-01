import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import { useCurrentRoomId, useRoom, useRoomMessages } from '../store';

export default function MessagesScreen() {
  const roomId = useCurrentRoomId();
  const room = useRoom(roomId);
  const messages = useRoomMessages(roomId);

  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const scrollViewRef = useRef();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: layout.height,
        animated: true,
      });
    }
  }, [scrollViewRef, layout, roomId]);

  const handleLayout = useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{room.user.name}</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messages}
        style={styles.container}
      >
        <View onLayout={handleLayout} style={styles.container}>
          {messages.map(message => (
            <Message
              key={message.id}
              uid={message.uid}
              message={message.content}
            />
          ))}
        </View>
      </ScrollView>

      <MessageInput roomId={roomId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messages: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
