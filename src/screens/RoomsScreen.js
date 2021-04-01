import React, { useState } from 'react';
import {
  PlatformColor,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import RoomDetails from '../components/RoomDetails';
import { useCurrentRoomId, useRooms } from '../store';

export default function RoomsScreen() {
  const rooms = useRooms();
  const currentRoomId = useCurrentRoomId();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search friends..."
        style={styles.search}
      />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        style={styles.scrollViewContainer}
      >
        {rooms
          .filter(
            room =>
              search.length === 0 ||
              room.user.name.toLowerCase().includes(search.toLocaleLowerCase()),
          )
          .sort((a, b) => b.lastMessageTime - a.lastMessageTime)
          .map(room => (
            <RoomDetails
              key={room.id}
              roomId={room.id}
              name={room.user.name}
              picture={room.user.image}
              selected={currentRoomId === room.id}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 400,
    backgroundColor: PlatformColor('SystemControlAcrylicWindowBrush'),
  },
  scrollView: {
    padding: 10,
  },
  scrollViewContainer: {
    flex: 1,
  },
  search: {
    margin: 10,
    borderWidth: 0,
    borderRadius: 15,
  },
});
