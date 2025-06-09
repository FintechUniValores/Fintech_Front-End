import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import {useColorScheme} from 'react-native';
import {Theme, lightTheme, darkTheme} from '../config/themes';

interface ThemeContextData {
  theme: 'light' | 'dark';
  colors: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const deviceScheme = useColorScheme();
  const [theme, setTheme] = useState(deviceScheme || 'light');

  useEffect(() => {
    setTheme(deviceScheme || 'light');
  }, [deviceScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = useMemo(
    () => (theme === 'light' ? lightTheme : darkTheme),
    [theme],
  );

  return (
    <ThemeContext.Provider value={{theme, colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
