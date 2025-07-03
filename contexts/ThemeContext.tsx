import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export interface Colors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryLight: string;
  border: string;
  borderLight: string;
  shadow: string;
  overlay: string;
  success: string;
  warning: string;
  error: string;
  white: string;
  black: string;
}

const lightColors: Colors = {
  background: '#FAFAFA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#212121',
  textSecondary: '#424242',
  textTertiary: '#9E9E9E',
  primary: '#FD5068',
  primaryLight: '#FEF2F2',
  border: '#E0E0E0',
  borderLight: '#F5F5F5',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  success: '#42DCA3',
  warning: '#FFC629',
  error: '#FF4458',
  white: '#FFFFFF',
  black: '#000000',
};

const darkColors: Colors = {
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2D2D2D',
  text: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textTertiary: '#9E9E9E',
  primary: '#FD5068',
  primaryLight: '#3D1A1A',
  border: '#424242',
  borderLight: '#2D2D2D',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.7)',
  success: '#42DCA3',
  warning: '#FFC629',
  error: '#FF4458',
  white: '#FFFFFF',
  black: '#000000',
};

interface ThemeContextType {
  isDark: boolean;
  colors: Colors;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (dark: boolean) => {
    setIsDark(dark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}