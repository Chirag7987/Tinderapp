import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, X, Info, MapPin, Star, RotateCcw, Zap } from 'lucide-react-native';
import { mockUsers } from '@/data/mockUsers';
import { useTheme } from '@/contexts/ThemeContext';
import { FontAwesome5 } from '@expo/vector-icons';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const cardWidth = screenWidth - 20;
const cardHeight = screenHeight * 0.75;

export default function DiscoverScreen() {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStack, setCardStack] = useState(mockUsers.slice(0, 3));
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const isGestureActive = useSharedValue(false);

  const currentUser = cardStack[0];

  const onSwipeComplete = (direction: 'left' | 'right') => {
    // Remove the current card and add a new one
    const newStack = [...cardStack.slice(1)];
    const nextUserIndex = (currentIndex + cardStack.length) % mockUsers.length;
    newStack.push(mockUsers[nextUserIndex]);
    
    setCardStack(newStack);
    setCurrentIndex(currentIndex + 1);
    
    // Reset transforms
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
    rotation.value = 0;
    isGestureActive.value = false;
  };

  const panGesture = Gesture.Pan()
    .minDistance(10)
    .failOffsetY([-50, 50])
    .activeOffsetX([-10, 10])
    .maxPointers(1)
    .onBegin(() => {
      isGestureActive.value = true;
    })
    .onUpdate((event) => {
      const isHorizontalDominant = Math.abs(event.translationX) > Math.abs(event.translationY) * 1.2;
      
      if (isHorizontalDominant && isGestureActive.value) {
        translateX.value = event.translationX;
        translateY.value = event.translationY * 0.1;
        rotation.value = interpolate(
          event.translationX,
          [-screenWidth / 2, screenWidth / 2],
          [-30, 30]
        );
        scale.value = interpolate(
          Math.abs(event.translationX),
          [0, screenWidth * 0.3],
          [1, 0.95]
        );
      }
    })
    .onEnd((event) => {
      const threshold = screenWidth * 0.25;
      const isHorizontalDominant = Math.abs(event.translationX) > Math.abs(event.translationY) * 1.2;
      
      if (isHorizontalDominant && 
          isGestureActive.value && 
          Math.abs(event.translationX) > threshold) {
        
        const direction = event.translationX > 0 ? 'right' : 'left';
        
        // Animate off screen
        translateX.value = withTiming(
          direction === 'right' ? screenWidth * 1.5 : -screenWidth * 1.5,
          { duration: 300 }
        );
        translateY.value = withTiming(event.translationY * 0.1, { duration: 300 });
        scale.value = withTiming(0.8, { duration: 300 });
        rotation.value = withTiming(
          direction === 'right' ? 45 : -45,
          { duration: 300 }
        );
        
        setTimeout(() => {
          runOnJS(onSwipeComplete)(direction);
        }, 300);
      } else {
        // Spring back to center
        translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
        rotation.value = withSpring(0, { damping: 20, stiffness: 300 });
        scale.value = withSpring(1, { damping: 20, stiffness: 300 });
        isGestureActive.value = false;
      }
    })
    .onFinalize(() => {
      isGestureActive.value = false;
    });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const likeOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, screenWidth * 0.3], [0, 1]),
    };
  });

  const nopeOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [-screenWidth * 0.3, 0], [1, 0]),
    };
  });

  const handleLike = () => {
    isGestureActive.value = true;
    translateX.value = withTiming(screenWidth * 1.5, { duration: 300 });
    scale.value = withTiming(0.8, { duration: 300 });
    rotation.value = withTiming(45, { duration: 300 });
    setTimeout(() => {
      onSwipeComplete('right');
    }, 300);
  };

  const handleNope = () => {
    isGestureActive.value = true;
    translateX.value = withTiming(-screenWidth * 1.5, { duration: 300 });
    scale.value = withTiming(0.8, { duration: 300 });
    rotation.value = withTiming(-45, { duration: 300 });
    setTimeout(() => {
      onSwipeComplete('left');
    }, 300);
  };

  const handleSuperLike = () => {
    isGestureActive.value = true;
    translateY.value = withSequence(
      withTiming(-screenHeight * 0.1, { duration: 150 }),
      withTiming(-screenHeight * 1.5, { duration: 300 })
    );
    scale.value = withTiming(0.8, { duration: 450 });
    setTimeout(() => {
      onSwipeComplete('right');
    }, 450);
  };

  if (!currentUser) return null;

  const styles = createStyles(colors);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <FontAwesome5 name="fire" size={32} color="#FD5068" />
          <Text style={styles.logo}>tinder</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Zap size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Card Stack */}
      <View style={styles.cardContainer}>
        {/* Background cards */}
        {cardStack.slice(1).map((user, index) => (
          <View 
            key={user.id} 
            style={[
              styles.card, 
              styles.backgroundCard,
              { 
                transform: [
                  { scale: 0.95 - (index * 0.02) },
                  { translateY: (index + 1) * 8 }
                ],
                zIndex: -index - 1,
                opacity: 0.8 - (index * 0.2)
              }
            ]}
          >
            <Image source={{ uri: user.photos[0] }} style={styles.cardImage} />
          </View>
        ))}

        {/* Main card */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.card, cardStyle]}>
            <Image source={{ uri: currentUser.photos[0] }} style={styles.cardImage} />
            
            {/* LIKE Overlay */}
            <Animated.View style={[styles.overlay, styles.likeOverlay, likeOverlayStyle]}>
              <View style={styles.likeStamp}>
                <Text style={styles.stampText}>LIKE</Text>
              </View>
            </Animated.View>

            {/* NOPE Overlay */}
            <Animated.View style={[styles.overlay, styles.nopeOverlay, nopeOverlayStyle]}>
              <View style={styles.nopeStamp}>
                <Text style={styles.stampText}>NOPE</Text>
              </View>
            </Animated.View>

            {/* Card Info */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            >
              <View style={styles.cardInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>
                    {currentUser.name}
                  </Text>
                  <Text style={styles.age}>{currentUser.age}</Text>
                  <TouchableOpacity style={styles.infoButton}>
                    <Info size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.locationRow}>
                  <MapPin size={16} color="#FFFFFF" />
                  <Text style={styles.location}>{currentUser.location}</Text>
                </View>
                
                {currentUser.distance && (
                  <Text style={styles.distance}>{currentUser.distance} miles away</Text>
                )}
              </View>
            </LinearGradient>
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.rewindButton]}>
          <RotateCcw size={24} color="#FFC629" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.nopeButton]} 
          onPress={handleNope}
        >
          <X size={28} color="#CDD4DA" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.superLikeButton]} 
          onPress={handleSuperLike}
        >
          <Star size={24} color="#42CDF7" fill="#42CDF7" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]} 
          onPress={handleLike}
        >
          <Heart size={28} color="#42DCA3" fill="#42DCA3" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.boostButton]}>
          <Zap size={24} color="#A358F7" fill="#A358F7" />
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    zIndex: 10,
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
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
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
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 40,
    width: cardWidth,
    height: cardHeight,
    backgroundColor: colors.surface,
    borderRadius: 12,
    position: 'absolute',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  backgroundCard: {
    zIndex: -1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  likeOverlay: {
    backgroundColor: 'rgba(66, 220, 163, 0.1)',
  },
  nopeOverlay: {
    backgroundColor: 'rgba(205, 212, 218, 0.1)',
  },
  likeStamp: {
    borderWidth: 4,
    borderColor: '#42DCA3',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    transform: [{ rotate: '-30deg' }],
  },
  nopeStamp: {
    borderWidth: 4,
    borderColor: '#CDD4DA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    transform: [{ rotate: '30deg' }],
  },
  stampText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'flex-end',
  },
  cardInfo: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  name: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  age: {
    fontSize: 28,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 16,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  rewindButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  nopeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  superLikeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  likeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  boostButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});