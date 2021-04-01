import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useCurrentRoomId, useSendMessage } from '../store';

export default function MessageInput({ roomId }) {
  const [message, setMessage] = useState('');
  const currentRoomId = useCurrentRoomId();
  const sendMessage = useSendMessage(roomId, message);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      setMessage('');
      inputRef.current.focus();
    }
  }, [inputRef, currentRoomId]);

  const handleSend = () => {
    if (message.length === 0) {
      return;
    }

    setMessage('');
    sendMessage();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={handleSend}
        placeholder="Send message..."
        style={styles.input}
      />

      <Icon
        name="send"
        size={24}
        color={message.length === 0 ? 'gray' : '#0078D7'}
        onPress={handleSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  input: {
    flex: 1,
    borderRadius: 15,
    marginRight: 10,
  },
});
