import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useCurrentUserId, useUser } from '../store';

export default function Message({ uid, message }) {
  const user = useUser(uid);
  const currentUserId = useCurrentUserId();
  const isCurrentUser = currentUserId === uid;

  return (
    <View
      style={[styles.container, isCurrentUser && styles.containerCurrentUser]}
    >
      <Image
        source={{ uri: user.image }}
        style={[styles.picture, isCurrentUser && styles.pictureCurrentUser]}
      />

      <View
        style={[styles.message, isCurrentUser && styles.messageCurrentUser]}
      >
        <Text style={styles.content}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerCurrentUser: {
    flexDirection: 'row-reverse',
  },
  picture: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
    marginTop: 2,
  },
  pictureCurrentUser: {
    marginRight: 0,
    marginLeft: 10,
  },
  message: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'black',
    maxWidth: '70%',
  },
  messageCurrentUser: {
    backgroundColor: '#0078D7',
  },
  content: {
    color: 'white',
  },
});
