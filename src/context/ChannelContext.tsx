import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { createContext, useState } from 'react';

interface Message extends FirebaseFirestoreTypes.DocumentData {
  id: string;
  text: string;
  createdAt: number;
  uid: string;
  photo: string;
}

interface Context {
  messages: Message[] | undefined;
}

const ListenerContext = createContext<Context>({} as Context);

const ListenerProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);

  return (
    <ListenerContext.Provider value={{ messages }}>
      {children}
    </ListenerContext.Provider>
  );
};
