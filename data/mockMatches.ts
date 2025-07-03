export interface Match {
  id: number;
  name: string;
  age: number;
  location: string;
  photos: string[];
  isNewMatch: boolean;
  hasUnreadMessage: boolean;
  matchedAt: string;
  lastMessage?: {
    text: string;
    timestamp: string;
    isFromMe: boolean;
  };
  compatibility: number;
}

export const mockMatches: Match[] = [
  {
    id: 1,
    name: 'Emma',
    age: 24,
    location: 'Brooklyn, NY',
    photos: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    isNewMatch: true,
    hasUnreadMessage: false,
    matchedAt: '2024-01-15T10:30:00Z',
    compatibility: 87,
  },
  {
    id: 2,
    name: 'Sofia',
    age: 27,
    location: 'Manhattan, NY',
    photos: [
      'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    isNewMatch: true,
    hasUnreadMessage: true,
    matchedAt: '2024-01-15T09:15:00Z',
    lastMessage: {
      text: 'Hey! I love your photos from the art gallery! 🎨',
      timestamp: '2024-01-15T11:45:00Z',
      isFromMe: false,
    },
    compatibility: 92,
  },
  {
    id: 3,
    name: 'Maya',
    age: 25,
    location: 'Queens, NY',
    photos: [
      'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    isNewMatch: false,
    hasUnreadMessage: true,
    matchedAt: '2024-01-14T16:20:00Z',
    lastMessage: {
      text: 'Want to grab coffee this weekend?',
      timestamp: '2024-01-15T08:30:00Z',
      isFromMe: false,
    },
    compatibility: 78,
  },
  {
    id: 4,
    name: 'Aria',
    age: 26,
    location: 'Williamsburg, NY',
    photos: [
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    isNewMatch: false,
    hasUnreadMessage: false,
    matchedAt: '2024-01-13T14:45:00Z',
    lastMessage: {
      text: 'That sounds amazing! I can\'t wait 😊',
      timestamp: '2024-01-14T19:20:00Z',
      isFromMe: true,
    },
    compatibility: 85,
  },
  {
    id: 5,
    name: 'Zoe',
    age: 23,
    location: 'Lower East Side, NY',
    photos: [
      'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    isNewMatch: false,
    hasUnreadMessage: true,
    matchedAt: '2024-01-12T11:30:00Z',
    lastMessage: {
      text: 'I found this amazing climbing spot! Check it out 🧗‍♀️',
      timestamp: '2024-01-14T15:10:00Z',
      isFromMe: false,
    },
    compatibility: 89,
  },
  {
    id: 6,
    name: 'Luna',
    age: 28,
    location: 'Park Slope, NY',
    photos: [
      'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    isNewMatch: false,
    hasUnreadMessage: false,
    matchedAt: '2024-01-11T09:15:00Z',
    lastMessage: {
      text: 'Namaste! 🧘‍♀️ How was your morning practice?',
      timestamp: '2024-01-13T07:45:00Z',
      isFromMe: true,
    },
    compatibility: 81,
  },
  {
    id: 7,
    name: 'Ivy',
    age: 29,
    location: 'Chelsea, NY',
    photos: [
      'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    isNewMatch: false,
    hasUnreadMessage: false,
    matchedAt: '2024-01-10T18:30:00Z',
    lastMessage: {
      text: 'The concert was incredible! Thanks for the recommendation 🎵',
      timestamp: '2024-01-12T22:15:00Z',
      isFromMe: false,
    },
    compatibility: 76,
  },
  {
    id: 8,
    name: 'Sage',
    age: 25,
    location: 'Soho, NY',
    photos: [
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    isNewMatch: true,
    hasUnreadMessage: false,
    matchedAt: '2024-01-15T12:45:00Z',
    compatibility: 90,
  },
];