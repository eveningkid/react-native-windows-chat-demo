import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLastRoomMessage, useSetCurrentRoomId } from '../store';

export default function RoomDetails({ roomId, name, picture, selected }) {
  const setCurrentRoom = useSetCurrentRoomId();
  const lastMessage = useLastRoomMessage(roomId);

  return (
    <Pressable
      onPress={() => setCurrentRoom(roomId)}
      style={({ pressed }) => [
        styles.container,
        (selected || pressed) && styles.containerSelected,
      ]}
    >
      <Image source={{ uri: picture }} style={styles.picture} />

      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text numberOfLines={1} style={styles.lastMessage}>
          {lastMessage}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    marginVertical: 5,
  },
  containerSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  lastMessage: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
});
