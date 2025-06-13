import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const SESSION_ID_KEY = '@sessionId';

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        let storedId = await AsyncStorage.getItem(SESSION_ID_KEY);

        if (storedId) {
          setSessionId(storedId);
        } else {
          const newId = uuid.v4() as string;
          await AsyncStorage.setItem(SESSION_ID_KEY, newId);
          setSessionId(newId);
        }
      } catch (error) {
        console.error('Failed to load session ID:', error);
        setSessionId(uuid.v4() as string);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);
  return {sessionId, isLoading};
};
