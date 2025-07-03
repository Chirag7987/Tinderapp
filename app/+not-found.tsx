import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Heart size={64} color={colors.primary} />
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.text}>This screen doesn't exist in our love story.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go back to find love!</Text>
        </Link>
      </View>
    </>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  link: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
  },
});