import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_ID_KEY = '@sessionId';

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        let storedId = await AsyncStorage.getItem(SESSION_ID_KEY);
        setSessionId(storedId);
      } catch (error) {
        console.error('Failed to load session ID:', error);
        setSessionId(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const createSession = async (newId: string) => {
    await AsyncStorage.setItem(SESSION_ID_KEY, newId);
    setSessionId(newId);
  };

  return {sessionId, isLoading, createSession};
};
