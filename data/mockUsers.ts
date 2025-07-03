export interface User {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  photos: string[];
  interests: string[];
  occupation?: string;
  education?: string;
  distance?: number;
  isVerified?: boolean;
  lastActive?: string;
  compatibilityScore?: number;
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Emma',
    age: 24,
    location: 'Brooklyn, NY',
    bio: 'Passionate about sustainable living and weekend adventures. Looking for someone who loves exploring farmers markets and hiking trails as much as I do.',
    photos: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    interests: ['Hiking', 'Photography', 'Cooking', 'Yoga', 'Travel'],
    occupation: 'Environmental Consultant',
    education: 'NYU',
    distance: 2,
    isVerified: true,
    lastActive: '1 hour ago',
    compatibilityScore: 87,
  },
  {
    id: 2,
    name: 'Sofia',
    age: 27,
    location: 'Manhattan, NY',
    bio: 'Art enthusiast and coffee connoisseur. I spend my weekends in galleries and cozy cafes. Let\'s discover the city\'s hidden gems together!',
    photos: [
      'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    interests: ['Art', 'Coffee', 'Museums', 'Books', 'Jazz'],
    occupation: 'Graphic Designer',
    education: 'Parsons',
    distance: 5,
    isVerified: true,
    lastActive: '30 minutes ago',
    compatibilityScore: 92,
  },
  {
    id: 3,
    name: 'Maya',
    age: 25,
    location: 'Queens, NY',
    bio: 'Fitness enthusiast by day, foodie by night. I believe in living life to the fullest and trying new cuisines. Swipe right if you can keep up!',
    photos: [
      'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    interests: ['Fitness', 'Food', 'Dancing', 'Traveling', 'Running'],
    occupation: 'Personal Trainer',
    education: 'Hunter College',
    distance: 8,
    isVerified: false,
    lastActive: '3 hours ago',
    compatibilityScore: 78,
  },
  {
    id: 4,
    name: 'Aria',
    age: 26,
    location: 'Williamsburg, NY',
    bio: 'Music lover and aspiring novelist. I write stories by day and hunt for vinyl records by night. Looking for my co-author in this adventure called life.',
    photos: [
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1722195/pexels-photo-1722195.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    interests: ['Music', 'Writing', 'Vinyl', 'Books', 'Indie Films'],
    occupation: 'Writer',
    education: 'Brooklyn College',
    distance: 4,
    isVerified: true,
    lastActive: '2 hours ago',
    compatibilityScore: 85,
  },
  {
    id: 5,
    name: 'Zoe',
    age: 23,
    location: 'Lower East Side, NY',
    bio: 'Tech professional with a passion for innovation. When I\'m not coding, you\'ll find me rock climbing or planning my next travel adventure.',
    photos: [
      'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    interests: ['Tech', 'Rock Climbing', 'Travel', 'Gaming', 'Startups'],
    occupation: 'Software Engineer',
    education: 'Columbia University',
    distance: 6,
    isVerified: true,
    lastActive: '1 day ago',
    compatibilityScore: 89,
  },
  {
    id: 6,
    name: 'Luna',
    age: 28,
    location: 'Park Slope, NY',
    bio: 'Yoga instructor and meditation enthusiast. I believe in mindful living and authentic connections. Let\'s find balance together.',
    photos: [
      'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    interests: ['Yoga', 'Meditation', 'Wellness', 'Nature', 'Spirituality'],
    occupation: 'Yoga Instructor',
    education: 'The New School',
    distance: 7,
    isVerified: true,
    lastActive: '4 hours ago',
    compatibilityScore: 81,
  },
  {
    id: 7,
    name: 'Ivy',
    age: 29,
    location: 'Chelsea, NY',
    bio: 'Marketing professional with a love for live music and good wine. I\'m always up for discovering new bands and exploring wine bars.',
    photos: [
      'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1484801/pexels-photo-1484801.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    interests: ['Music', 'Wine', 'Marketing', 'Concerts', 'Networking'],
    occupation: 'Marketing Manager',
    education: 'NYU Stern',
    distance: 3,
    isVerified: false,
    lastActive: '6 hours ago',
    compatibilityScore: 76,
  },
  {
    id: 8,
    name: 'Sage',
    age: 25,
    location: 'Soho, NY',
    bio: 'Fashion designer with a passion for sustainable style. I love vintage shopping and creating unique pieces. Let\'s design our story together.',
    photos: [
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    interests: ['Fashion', 'Design', 'Vintage', 'Sustainability', 'Art'],
    occupation: 'Fashion Designer',
    education: 'FIT',
    distance: 4,
    isVerified: true,
    lastActive: '2 days ago',
    compatibilityScore: 90,
  },
];