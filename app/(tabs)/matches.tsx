import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Heart, Star, Flame } from 'lucide-react-native';
import { mockMatches } from '@/data/mockMatches';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function MatchesScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'matches' | 'likes'>('matches');

  const renderMatch = (match: any, index: number) => (
    <TouchableOpacity key={match.id} style={styles.matchCard}>
      <Image source={{ uri: match.photos[0] }} style={styles.matchImage} />
      
      {match.isNewMatch && (
        <View style={styles.newMatchBadge}>
          <Star size={12} color="#FFFFFF" fill="#FFFFFF" />
        </View>
      )}
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.matchGradient}
      >
        <View style={styles.matchInfo}>
          <Text style={styles.matchName} numberOfLines={1}>
            {match.name}
          </Text>
        </View>
      </LinearGradient>
      
      {match.hasUnreadMessage && (
        <View style={styles.unreadIndicator}>
          <View style={styles.unreadDot} />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderLike = (like: any, index: number) => (
    <TouchableOpacity key={like.id} style={[styles.likeCard, { backgroundColor: colors.surface }]}>
      <Image source={{ uri: like.photos[0] }} style={styles.likeImage} />
      
      <View style={styles.likeOverlay}>
        <Heart size={20} color="#FD5068" fill="#FD5068" />
      </View>
      
      <View style={styles.likeInfo}>
        <Text style={[styles.likeName, { color: colors.text }]} numberOfLines={1}>
          {like.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

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

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'matches' && styles.activeTab]}
          onPress={() => setActiveTab('matches')}
        >
          <Text style={[styles.tabText, activeTab === 'matches' && styles.activeTabText]}>
            Matches
          </Text>
          {mockMatches.filter(m => m.hasUnreadMessage).length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {mockMatches.filter(m => m.hasUnreadMessage).length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
          onPress={() => setActiveTab('likes')}
        >
          <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>
            Likes You
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'matches' ? (
          <>
            {mockMatches.filter(m => m.isNewMatch).length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>New Matches</Text>
                </View>
                
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalScroll}
                >
                  {mockMatches
                    .filter(match => match.isNewMatch)
                    .map((match, index) => (
                      <View key={match.id} style={styles.newMatchCard}>
                        <Image source={{ uri: match.photos[0] }} style={styles.newMatchImage} />
                        <Text style={styles.newMatchName}>{match.name}</Text>
                      </View>
                    ))}
                </ScrollView>
              </>
            )}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Messages</Text>
            </View>
            
            <View style={styles.messagesList}>
              {mockMatches
                .filter(match => !match.isNewMatch)
                .map((match, index) => (
                  <TouchableOpacity key={match.id} style={styles.messageItem}>
                    <Image source={{ uri: match.photos[0] }} style={styles.messageAvatar} />
                    <View style={styles.messageContent}>
                      <View style={styles.messageHeader}>
                        <Text style={styles.messageName}>{match.name}</Text>
                        {match.lastMessage && (
                          <Text style={styles.messageTime}>
                            {new Date(match.lastMessage.timestamp).toLocaleDateString()}
                          </Text>
                        )}
                      </View>
                      {match.lastMessage && (
                        <Text style={styles.messagePreview} numberOfLines={1}>
                          {match.lastMessage.text}
                        </Text>
                      )}
                    </View>
                    {match.hasUnreadMessage && (
                      <View style={styles.messageUnreadDot} />
                    )}
                  </TouchableOpacity>
                ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>People who liked you</Text>
              <Text style={styles.sectionSubtitle}>
                {mockMatches.length} likes
              </Text>
            </View>
            
            <View style={styles.likesGrid}>
              {mockMatches.map((like, index) => renderLike(like, index))}
            </View>
          </>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FD5068',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: '#FD5068',
  },
  tabBadge: {
    backgroundColor: '#FD5068',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  horizontalScroll: {
    paddingRight: 20,
    gap: 12,
    marginBottom: 32,
  },
  newMatchCard: {
    alignItems: 'center',
    width: 80,
  },
  newMatchImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#FD5068',
  },
  newMatchName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.text,
    textAlign: 'center',
  },
  messagesList: {
    gap: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  messageAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.textTertiary,
  },
  messagePreview: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
  },
  messageUnreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FD5068',
  },
  matchesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  matchCard: {
    width: cardWidth,
    height: cardWidth * 1.3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  matchImage: {
    width: '100%',
    height: '100%',
  },
  newMatchBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FD5068',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  matchGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
  },
  matchInfo: {
    padding: 12,
  },
  matchName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  unreadIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: colors.surface,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FD5068',
  },
  likesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  likeCard: {
    width: cardWidth,
    height: cardWidth * 1.3,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  likeImage: {
    width: '100%',
    height: '75%',
  },
  likeOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  likeInfo: {
    padding: 12,
    height: '25%',
    justifyContent: 'center',
  },
  likeName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});