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
import Toast from 'react-native-toast-message';
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
  getCurrentRoom: (id: string) => Promise<() => void>;
}

export const ListenerContext = createContext<Context>({} as Context);

const ListenerProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [rooms, setRooms] = useState<Threads[]>([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('CHAT')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads: any = querySnapshot.docs.map((documentSnapshot) => {
          return {
            id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
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
    }),
    [messages, loading, rooms, getCurrentRoom],
  );

  return (
    <ListenerContext.Provider value={values}>
      {children}
    </ListenerContext.Provider>
  );
};

export default ListenerProvider;
