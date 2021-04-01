import { atom, atomFamily, useSetRecoilState, useRecoilValue } from 'recoil';
import faker from 'faker';

const generateStore = (users = 50, messages = 20) => {
  const store = {
    rooms: [],
    users: {},
    messages: {},
    currentUserId: '0',
  };

  for (let i = 0; i < users; i++) {
    const key = i.toString();

    const gender = Math.random() > 0.5 ? 'men' : 'women';

    const user = {
      name: faker.name.firstName(gender === 'men' ? 0 : 1),
      image:
        'https://randomuser.me/api/portraits/' + gender + '/' + key + '.jpg',
    };

    store.users[key] = user;

    const time = Date.now();

    if (i > 0) {
      store.rooms.push({ id: key, uid: key, lastMessageTime: time });
    }

    store.messages[key] = [];
    for (let j = 0; j < messages; j++) {
      const sentencesCount = Math.max(Math.floor(Math.random() * 3), 1);
      const isCurrentUser = Math.random() > 0.5;

      store.messages[key].push({
        id: key + '-' + j,
        uid: isCurrentUser ? store.currentUserId : key,
        time,
        content: faker.lorem.sentences(sentencesCount),
      });
    }
  }

  store.currentRoomId = store.rooms[0].id;

  return store;
};

const store = generateStore();

const roomsState = atom({
  key: 'rooms',
  default: store.rooms,
});

const currentRoomIdState = atom({
  key: 'currentRoomId',
  default: store.currentRoomId,
});

const usersState = atom({
  key: 'users',
  default: store.users,
});

const currentUserIdState = atom({
  key: 'currentUserId',
  default: store.currentUserId,
});

const messagesState = atomFamily({
  key: 'messages',
  default: roomId => store.messages[roomId],
});

export function useCurrentUserId() {
  return useRecoilValue(currentUserIdState);
}

export function useRooms() {
  const rooms = useRecoilValue(roomsState);
  const users = useRecoilValue(usersState);

  return rooms.map(room => {
    return { ...room, user: users[room.uid] };
  });
}

export function useRoom(roomId) {
  const rooms = useRooms();
  return rooms.find(room => room.id === roomId);
}

export function useUsers() {
  return useRecoilValue(usersState);
}

export function useUser(userId) {
  const users = useUsers();
  return users[userId];
}

export function useRoomMessages(roomId) {
  return useRecoilValue(messagesState(roomId));
}

export function useLastRoomMessage(roomId) {
  const roomMessages = useRoomMessages(roomId);
  const lastMessage = roomMessages.slice(-1);
  return lastMessage.length > 0 ? lastMessage[0].content : 'No last message';
}

export function useCurrentRoomId() {
  return useRecoilValue(currentRoomIdState);
}

export function useSetCurrentRoomId() {
  return useSetRecoilState(currentRoomIdState);
}

export function useSendMessage(roomId, message) {
  const setRooms = useSetRecoilState(roomsState);
  const setMessages = useSetRecoilState(messagesState(roomId));
  const currentUserId = useCurrentUserId();
  const time = Date.now();

  return () => {
    setMessages(messages => [
      ...messages,
      { id: time.toString(), uid: currentUserId, time, content: message },
    ]);

    setRooms(rooms =>
      rooms.map(room => {
        if (room.id !== roomId) {
          return room;
        }

        return {
          ...room,
          lastMessageTime: time,
        };
      }),
    );
  };
}
