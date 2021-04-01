import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import MessagesScreen from './screens/MessagesScreen';
import RoomsScreen from './screens/RoomsScreen';

function App() {
  return (
    <View style={styles.container}>
      <RoomsScreen />
      <MessagesScreen />
    </View>
  );
}

function Wrapper() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Wrapper;
