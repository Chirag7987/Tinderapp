import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bell, 
  MapPin, 
  Shield, 
  Heart, 
  CreditCard, 
  CircleHelp as HelpCircle, 
  LogOut, 
  ChevronRight, 
  Users, 
  Eye, 
  Volume2, 
  Moon, 
  Globe,
  Flame,
  Crown,
  Star,
  Zap
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  destructive?: boolean;
  premium?: boolean;
}

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [readReceipts, setReadReceipts] = useState(false);

  const settingSections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Premium Features',
      items: [
        {
          id: 'tinder-gold',
          title: 'Tinder Gold',
          subtitle: 'See who likes you & more',
          icon: Crown,
          type: 'navigation',
          premium: true,
        },
        {
          id: 'tinder-plus',
          title: 'Tinder Plus',
          subtitle: 'Unlimited likes & more',
          icon: Star,
          type: 'navigation',
          premium: true,
        },
        {
          id: 'boost',
          title: 'Boost',
          subtitle: 'Be a top profile for 30 minutes',
          icon: Zap,
          type: 'navigation',
          premium: true,
        },
      ],
    },
    {
      title: 'Discovery Settings',
      items: [
        {
          id: 'location',
          title: 'Location',
          subtitle: 'Add your location to find people nearby',
          icon: MapPin,
          type: 'toggle',
          value: location,
          onPress: () => setLocation(!location),
        },
        {
          id: 'discovery',
          title: 'Discovery Settings',
          subtitle: 'Change your preferences',
          icon: Users,
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Privacy & Safety',
      items: [
        {
          id: 'privacy',
          title: 'Privacy',
          subtitle: 'Control your privacy settings',
          icon: Eye,
          type: 'navigation',
        },
        {
          id: 'read-receipts',
          title: 'Read Receipts',
          subtitle: 'See when matches read your messages',
          icon: Volume2,
          type: 'toggle',
          value: readReceipts,
          onPress: () => setReadReceipts(!readReceipts),
        },
        {
          id: 'verification',
          title: 'Photo Verification',
          subtitle: 'Verify your photos',
          icon: Shield,
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Get notified about new matches and messages',
          icon: Bell,
          type: 'toggle',
          value: notifications,
          onPress: () => setNotifications(!notifications),
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        {
          id: 'dark-mode',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: Moon,
          type: 'toggle',
          value: isDark,
          onPress: toggleTheme,
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          icon: Globe,
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and contact us',
          icon: HelpCircle,
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'logout',
          title: 'Logout',
          icon: LogOut,
          type: 'action',
          destructive: true,
          onPress: () => {
            console.log('Logging out...');
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.settingItem,
          item.destructive && styles.destructiveItem
        ]}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.settingLeft}>
          <View style={[
            styles.iconContainer,
            item.destructive && styles.destructiveIconContainer,
            item.premium && styles.premiumIconContainer
          ]}>
            <IconComponent 
              size={20} 
              color={
                item.destructive ? '#EF4444' : 
                item.premium ? '#FD5068' : 
                colors.textSecondary
              } 
            />
          </View>
          
          <View style={styles.settingText}>
            <Text style={[
              styles.settingTitle,
              item.destructive && styles.destructiveText,
              item.premium && styles.premiumText
            ]}>
              {item.title}
            </Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>
                {item.subtitle}
              </Text>
            )}
          </View>
        </View>
        
        <View style={styles.settingRight}>
          {item.type === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onPress}
              trackColor={{ false: colors.border, true: '#FD5068' }}
              thumbColor={item.value ? colors.white : colors.white}
              ios_backgroundColor={colors.border}
            />
          ) : item.type === 'navigation' ? (
            <ChevronRight size={20} color={colors.textTertiary} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Flame size={32} color="#FD5068" fill="#FD5068" />
          <Text style={styles.logo}>tinder</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <View style={styles.sectionContent}>
              {section.items.map((item) => renderSettingItem(item))}
            </View>
          </View>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerText}>
            Made with ❤️ by Tinder
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FD5068',
    letterSpacing: -1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIconContainer: {
    backgroundColor: '#FEE2E2',
  },
  premiumIconContainer: {
    backgroundColor: '#FEF2F2',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 2,
  },
  destructiveText: {
    color: '#EF4444',
  },
  premiumText: {
    color: '#FD5068',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  settingRight: {
    marginLeft: 12,
  },
  destructiveItem: {
    borderBottomColor: '#FEE2E2',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textTertiary,
    textAlign: 'center',
  },
});