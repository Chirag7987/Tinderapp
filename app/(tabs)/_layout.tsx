import { Tabs } from 'expo-router';
import { Flame, MessageCircle, User, Star } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 0,
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: '#FD5068',
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarLabelStyle: {
            fontFamily: 'Inter-SemiBold',
            fontSize: 11,
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Discover',
            tabBarIcon: ({ size, color }) => (
              <Flame size={size} color={color} fill={color === '#FD5068' ? color : 'none'} />
            ),
          }}
        />
        <Tabs.Screen
          name="matches"
          options={{
            title: 'Matches',
            tabBarIcon: ({ size, color }) => (
              <MessageCircle size={size} color={color} fill={color === '#FD5068' ? color : 'none'} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} fill={color === '#FD5068' ? color : 'none'} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => (
              <Star size={size} color={color} fill={color === '#FD5068' ? color : 'none'} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}