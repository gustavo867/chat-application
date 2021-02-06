import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Threads } from 'home/Messages';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message extends FirebaseFirestoreTypes.DocumentData {
  id: string;
  text: string;
  createdAt: number;
  uid: string;
  photo: string;
}

interface Context {
  messages: Message[] | undefined;
  rooms: Threads[] | undefined;
  loading: boolean;
  users: User[];
  getCurrentRoom: (id: string) => Promise<() => void>;
  getUsers: () => () => () => void;
}

interface User {
  username: string;
  profilePhoto: string;
  uid: string;
}

export const ListenerContext = createContext<Context>({} as Context);

const ListenerProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [rooms, setRooms] = useState<Threads[]>([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getCurrentRoom = useCallback(async (id: string) => {
    setLoading(true);
    const chat = await AsyncStorage.getItem(`@messages-${id}`);
    if (chat) {
      const chatData = JSON.parse(chat);
      setMessages(chatData);

      setLoading(false);
    }

    const messagesListener = firestore()
      .collection('CHAT')
      .doc(id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async (querySnapshot) => {
        const messages = querySnapshot.docs.map(async (doc) => {
          const firebaseData = doc.data();

          const info = await firestore()
            .collection('INFO')
            .doc(firebaseData.uid)
            .get();

          const data = {
            id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            photo: info.data()
              ? info.data()!.profilePhoto!
              : 'https://i.stack.imgur.com/l60Hf.png',
            ...firebaseData,
          };

          return data;
        });

        const data = await Promise.all(messages).then((res) => res);
        AsyncStorage.setItem(`@messages-${id}`, JSON.stringify(data));
        setMessages(data as Message[]);
        setLoading(false);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  const getUsers = useCallback(() => {
    const users = firestore()
      .collection('INFO')
      .onSnapshot((snap) => {
        const info = snap.docs.map((doc) => {
          return doc.data();
        });

        setUsers(info as any);
      });

    return () => users;
  }, []);

  useEffect(() => {
    getUsers();
    const unsubscribe = firestore()
      .collection('CHAT')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads: any = querySnapshot.docs.map((documentSnapshot) => {
          console.log(documentSnapshot.data());
          return {
            id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
            uid: documentSnapshot.data().uid
              ? documentSnapshot.data().uid
              : documentSnapshot.data().latestMessage.uid,
            private: documentSnapshot.data().private
              ? documentSnapshot.data().private
              : false,
          };
        });
        setRooms(threads);

        setLoading(false);
      });

    return unsubscribe;
  }, []);

  const values = useMemo(
    () => ({
      messages,
      rooms,
      loading,
      getCurrentRoom,
      users,
      getUsers,
    }),
    [messages, loading, rooms, getCurrentRoom, users, getUsers],
  );

  return (
    <ListenerContext.Provider value={values}>
      {children}
    </ListenerContext.Provider>
  );
};

export default ListenerProvider;
