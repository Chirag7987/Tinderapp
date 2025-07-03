import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Camera, MapPin, Briefcase, GraduationCap, Heart, Star, Shield, Crown, Flame, CreditCard as Edit3, Plus, X, Check, Upload, Trash2, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const currentUser = {
  id: 1,
  name: 'Sarah',
  age: 26,
  location: 'New York, NY',
  bio: 'Adventure seeker and coffee enthusiast. Love exploring new places and trying new cuisines. Looking for someone to share life\'s beautiful moments with.',
  occupation: 'Marketing Manager',
  education: 'Columbia University',
  photos: [
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  interests: ['Travel', 'Photography', 'Yoga', 'Cooking', 'Hiking', 'Art'],
  isPremium: true,
  verificationStatus: 'verified',
  stats: {
    likes: 128,
    matches: 45,
    profile_views: 892,
  }
};

const availableInterests = [
  'Travel', 'Photography', 'Yoga', 'Cooking', 'Hiking', 'Art', 'Music', 
  'Dancing', 'Reading', 'Movies', 'Gaming', 'Sports', 'Fitness', 'Fashion',
  'Technology', 'Science', 'Nature', 'Animals', 'Coffee', 'Wine', 'Food',
  'Adventure', 'Beach', 'Mountains', 'City Life', 'Nightlife', 'Museums'
];

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState(currentUser.photos);
  const [interests, setInterests] = useState(currentUser.interests);
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    age: currentUser.age.toString(),
    bio: currentUser.bio,
    occupation: currentUser.occupation,
    education: currentUser.education,
    location: currentUser.location,
  });

  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const isGestureActive = useSharedValue(false);

  // Photo swipe gesture handler with improved functionality
  const panGesture = Gesture.Pan()
    .minDistance(15)
    .failOffsetY([-40, 40]) // Allow vertical scrolling
    .activeOffsetX([-15, 15])
    .maxPointers(1)
    .onBegin(() => {
      isGestureActive.value = true;
    })
    .onUpdate((event) => {
      const isHorizontalDominant = Math.abs(event.translationX) > Math.abs(event.translationY) * 1.5;
      
      if (isHorizontalDominant && isGestureActive.value) {
        translateX.value = event.translationX;
        scale.value = interpolate(
          Math.abs(event.translationX),
          [0, width * 0.3],
          [1, 0.95]
        );
      }
    })
    .onEnd((event) => {
      const threshold = width * 0.25;
      const isHorizontalDominant = Math.abs(event.translationX) > Math.abs(event.translationY) * 1.5;
      
      if (isHorizontalDominant && 
          isGestureActive.value && 
          Math.abs(event.translationX) > threshold) {
        
        const direction = event.translationX > 0 ? 'right' : 'left';
        
        if (direction === 'left' && selectedPhotoIndex < photos.length - 1) {
          // Animate to next photo
          translateX.value = withTiming(-width, { duration: 200 });
          setTimeout(() => {
            runOnJS(setSelectedPhotoIndex)(selectedPhotoIndex + 1);
            translateX.value = 0;
          }, 200);
        } else if (direction === 'right' && selectedPhotoIndex > 0) {
          // Animate to previous photo
          translateX.value = withTiming(width, { duration: 200 });
          setTimeout(() => {
            runOnJS(setSelectedPhotoIndex)(selectedPhotoIndex - 1);
            translateX.value = 0;
          }, 200);
        } else {
          // Spring back if at boundaries
          translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
          scale.value = withSpring(1, { damping: 20, stiffness: 300 });
        }
      } else {
        // Spring back to center
        translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        scale.value = withSpring(1, { damping: 20, stiffness: 300 });
      }
      
      isGestureActive.value = false;
    })
    .onFinalize(() => {
      isGestureActive.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
      ],
    };
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make actual API call to save profile data
      console.log('Saving profile:', profileData);
      
      setIsEditingProfile(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddInterest = (interest: string) => {
    if (!interests.includes(interest) && interests.length < 10) {
      setInterests([...interests, interest]);
    }
    setIsAddingInterest(false);
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handlePhotoUpload = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Photo Upload', 'Photo upload would open camera/gallery picker on mobile devices.');
    } else {
      // On mobile, this would open camera/gallery picker
      Alert.alert('Photo Upload', 'Camera/Gallery picker would open here.');
    }
  };

  const handleDeletePhoto = (index: number) => {
    if (photos.length > 1) {
      const newPhotos = photos.filter((_, i) => i !== index);
      setPhotos(newPhotos);
      if (selectedPhotoIndex >= newPhotos.length) {
        setSelectedPhotoIndex(newPhotos.length - 1);
      }
    } else {
      Alert.alert('Error', 'You must have at least one photo.');
    }
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    } else if (direction === 'next' && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
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
        
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Profile Card */}
        <View style={styles.profileCard}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
              <Image 
                source={{ uri: photos[selectedPhotoIndex] }} 
                style={styles.profileImage} 
              />
              
              {/* Swipe Indicator Overlay */}
              <View style={styles.swipeIndicator}>
                <View style={styles.swipeHint}>
                  <Text style={styles.swipeHintText}>← Swipe to browse photos →</Text>
                </View>
              </View>
            </Animated.View>
          </GestureDetector>
          
          {/* Photo Navigation Arrows */}
          <View style={styles.photoNavigation}>
            <TouchableOpacity 
              style={[styles.navButton, styles.navButtonLeft, selectedPhotoIndex === 0 && styles.navButtonDisabled]}
              onPress={() => navigatePhoto('prev')}
              disabled={selectedPhotoIndex === 0}
            >
              <ChevronLeft size={24} color={selectedPhotoIndex === 0 ? colors.textTertiary : colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.navButtonRight, selectedPhotoIndex === photos.length - 1 && styles.navButtonDisabled]}
              onPress={() => navigatePhoto('next')}
              disabled={selectedPhotoIndex === photos.length - 1}
            >
              <ChevronRight size={24} color={selectedPhotoIndex === photos.length - 1 ? colors.textTertiary : colors.white} />
            </TouchableOpacity>
          </View>
          
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.profileGradient}
          >
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>
                  {profileData.name}, {profileData.age}
                </Text>
                {currentUser.verificationStatus === 'verified' && (
                  <View style={styles.verifiedBadge}>
                    <Shield size={16} color="#42CDF7" fill="#42CDF7" />
                  </View>
                )}
              </View>
              
              <View style={styles.infoRow}>
                <MapPin size={14} color="#FFFFFF" />
                <Text style={styles.infoText}>{profileData.location}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Briefcase size={14} color="#FFFFFF" />
                <Text style={styles.infoText}>{profileData.occupation}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <GraduationCap size={14} color="#FFFFFF" />
                <Text style={styles.infoText}>{profileData.education}</Text>
              </View>
            </View>
          </LinearGradient>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => setIsEditingProfile(true)}
          >
            <Edit3 size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Photo Dots Indicator */}
        <View style={styles.photoIndicator}>
          {photos.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.photoDot,
                index === selectedPhotoIndex && styles.activeDot
              ]}
              onPress={() => setSelectedPhotoIndex(index)}
            />
          ))}
        </View>

        {/* Photo Management */}
        <View style={styles.photoManagement}>
          <Text style={styles.sectionTitle}>Manage Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
            {photos.map((photo, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.photoThumbnail,
                  index === selectedPhotoIndex && styles.selectedThumbnail
                ]}
                onPress={() => setSelectedPhotoIndex(index)}
              >
                <Image source={{ uri: photo }} style={styles.thumbnailImage} />
                <TouchableOpacity 
                  style={styles.deletePhotoButton}
                  onPress={() => handleDeletePhoto(index)}
                >
                  <Trash2 size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            {photos.length < 6 && (
              <TouchableOpacity style={styles.addPhotoButton} onPress={handlePhotoUpload}>
                <Plus size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{currentUser.stats.likes}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{currentUser.stats.matches}</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{currentUser.stats.profile_views}</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About {profileData.name}</Text>
            <TouchableOpacity onPress={() => setIsEditingProfile(true)}>
              <Edit3 size={16} color="#FD5068" />
            </TouchableOpacity>
          </View>
          <Text style={styles.bioText}>{profileData.bio}</Text>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Interests</Text>
            <TouchableOpacity onPress={() => setIsAddingInterest(true)}>
              <Plus size={16} color="#FD5068" />
            </TouchableOpacity>
          </View>
          <View style={styles.interestsContainer}>
            {interests.map((interest, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.interestTag}
                onLongPress={() => handleRemoveInterest(interest)}
              >
                <Text style={styles.interestText}>{interest}</Text>
                <TouchableOpacity 
                  style={styles.removeInterestButton}
                  onPress={() => handleRemoveInterest(interest)}
                >
                  <X size={12} color={colors.textSecondary} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.addInterestButton}
              onPress={() => setIsAddingInterest(true)}
            >
              <Text style={styles.addInterestText}>+ Add Interest</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Premium Upgrade */}
        {!currentUser.isPremium && (
          <TouchableOpacity style={styles.premiumCard}>
            <LinearGradient
              colors={['#FD5068', '#FF8A00']}
              style={styles.premiumGradient}
            >
              <Crown size={24} color="#FFFFFF" />
              <Text style={styles.premiumTitle}>Get Tinder Gold</Text>
              <Text style={styles.premiumSubtitle}>
                See who likes you & more!
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonSecondaryText}>Share My Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButtonPrimary}
            onPress={() => setIsEditingProfile(true)}
          >
            <Text style={styles.actionButtonPrimaryText}>Edit Info</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditingProfile}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsEditingProfile(false)}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity 
              onPress={handleSaveProfile}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FD5068" />
              ) : (
                <Check size={24} color="#FD5068" />
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                style={styles.formInput}
                value={profileData.name}
                onChangeText={(text) => setProfileData({...profileData, name: text})}
                placeholder="Enter your name"
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Age</Text>
              <TextInput
                style={styles.formInput}
                value={profileData.age}
                onChangeText={(text) => setProfileData({...profileData, age: text})}
                placeholder="Enter your age"
                placeholderTextColor={colors.textTertiary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Bio</Text>
              <TextInput
                style={[styles.formInput, styles.bioInput]}
                value={profileData.bio}
                onChangeText={(text) => setProfileData({...profileData, bio: text})}
                placeholder="Tell us about yourself"
                placeholderTextColor={colors.textTertiary}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Occupation</Text>
              <TextInput
                style={styles.formInput}
                value={profileData.occupation}
                onChangeText={(text) => setProfileData({...profileData, occupation: text})}
                placeholder="Enter your occupation"
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Education</Text>
              <TextInput
                style={styles.formInput}
                value={profileData.education}
                onChangeText={(text) => setProfileData({...profileData, education: text})}
                placeholder="Enter your education"
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Location</Text>
              <TextInput
                style={styles.formInput}
                value={profileData.location}
                onChangeText={(text) => setProfileData({...profileData, location: text})}
                placeholder="Enter your location"
                placeholderTextColor={colors.textTertiary}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Add Interest Modal */}
      <Modal
        visible={isAddingInterest}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsAddingInterest(false)}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Interest</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalSubtitle}>Choose from popular interests:</Text>
            <View style={styles.availableInterests}>
              {availableInterests
                .filter(interest => !interests.includes(interest))
                .map((interest, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.availableInterestTag}
                    onPress={() => handleAddInterest(interest)}
                  >
                    <Text style={styles.availableInterestText}>{interest}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileCard: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 500,
    backgroundColor: colors.surface,
    marginBottom: 16,
    position: 'relative',
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
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  swipeIndicator: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  swipeHint: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  swipeHintText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  photoNavigation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonLeft: {
    alignSelf: 'flex-start',
  },
  navButtonRight: {
    alignSelf: 'flex-end',
  },
  navButtonDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  profileGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  profileInfo: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    backgroundColor: 'rgba(66, 205, 247, 0.2)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  editProfileButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  photoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
  },
  activeDot: {
    backgroundColor: '#FD5068',
  },
  photoManagement: {
    marginBottom: 24,
  },
  photoScroll: {
    marginTop: 12,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#FD5068',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  deletePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
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
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  bioText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.textSecondary,
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  interestText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
  removeInterestButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addInterestButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FD5068',
    borderStyle: 'dashed',
  },
  addInterestText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FD5068',
  },
  premiumCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  premiumGradient: {
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  premiumTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  premiumSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  actionButtonPrimary: {
    backgroundColor: '#FD5068',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionButtonPrimaryText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  actionButtonSecondary: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonSecondaryText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  availableInterests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  availableInterestTag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  availableInterestText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.text,
  },
});