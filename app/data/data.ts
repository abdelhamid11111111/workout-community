export const categories = [
  'Cardio',
  'Strength',
  'Flexibility',
  'HIIT',
  'Yoga',
  'Endurance'
]

export const challenges = [
  {
    id: 1,
    title: '30-Day Full Body Transformation',
    description: 'Complete daily workouts targeting all major muscle groups for a comprehensive fitness transformation.',
    fullDescription: 'This intensive 30-day challenge combines strength training, cardio, and flexibility exercises to transform your entire body. Each day features carefully designed workouts that progressively increase in difficulty, ensuring continuous improvement and adaptation.',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '30 days',
    participants: 1247,
    status: 'active',
    featured: true,
    rewardPoints: 750,
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80'
    ],
    goals: [
      'Build lean muscle mass',
      'Increase overall strength by 25%',
      'Improve cardiovascular endurance',
      'Develop consistent workout habits'
    ]
  },
  {
    id: 2,
    title: 'Morning Yoga Flow Challenge',
    description: 'Start each day with energizing yoga sequences designed to improve flexibility and mental clarity.',
    fullDescription: 'Wake up your body and mind with this 21-day morning yoga challenge. Each session includes sun salutations, balance poses, and breathing exercises to set a positive tone for your day.',
    category: 'Yoga',
    difficulty: 'Beginner',
    duration: '21 days',
    participants: 892,
    status: 'active',
    featured: true,
    rewardPoints: 500,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80'
    ],
    goals: [
      'Establish morning routine',
      'Increase flexibility by 30%',
      'Reduce stress and anxiety',
      'Master 10 fundamental yoga poses'
    ]
  },
  {
    id: 3,
    title: 'HIIT Cardio Blast',
    description: 'High-intensity interval training sessions to maximize calorie burn and boost metabolism.',
    fullDescription: 'Push your limits with this intense 14-day HIIT challenge. Short bursts of maximum effort followed by recovery periods will skyrocket your fitness level and burn fat efficiently.',
    category: 'HIIT',
    difficulty: 'Advanced',
    duration: '14 days',
    participants: 1543,
    status: 'active',
    featured: true,
    rewardPoints: 600,
    images: [
      'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80'
    ],
    goals: [
      'Burn 500+ calories per session',
      'Improve VO2 max',
      'Increase explosive power',
      'Complete 14 consecutive workouts'
    ]
  },
  {
    id: 4,
    title: 'Core Strength Builder',
    description: 'Focused core workouts to develop a strong, stable midsection and improve overall athletic performance.',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '28 days',
    participants: 967,
    status: 'active',
    featured: false,
    rewardPoints: 550,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80'
    ]
  },
  {
    id: 5,
    title: '5K Running Program',
    description: 'Progressive running plan to help you complete your first 5K or improve your time.',
    category: 'Cardio',
    difficulty: 'Beginner',
    duration: '42 days',
    participants: 2134,
    status: 'active',
    featured: false,
    rewardPoints: 800,
    images: [
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
      'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&q=80',
      'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80'
    ]
  },
  {
    id: 6,
    title: 'Flexibility & Mobility',
    description: 'Daily stretching routines to enhance range of motion and prevent injuries.',
    category: 'Flexibility',
    difficulty: 'Beginner',
    duration: '30 days',
    participants: 745,
    status: 'upcoming',
    featured: false,
    rewardPoints: 450,
    images: [
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80'
    ]
  },
  {
    id: 7,
    title: 'Upper Body Strength',
    description: 'Build powerful arms, shoulders, and back with targeted resistance training.',
    category: 'Strength',
    difficulty: 'Advanced',
    duration: '21 days',
    participants: 1089,
    status: 'active',
    featured: false,
    rewardPoints: 650,
    images: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    ]
  },
  {
    id: 8,
    title: 'Endurance Marathon Prep',
    description: 'Comprehensive training program for marathon runners of all levels.',
    category: 'Endurance',
    difficulty: 'Advanced',
    duration: '90 days',
    participants: 456,
    status: 'upcoming',
    featured: false,
    rewardPoints: 1200,
    images: [
      'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80',
      'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&q=80',
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80'
    ]
  },
  {
    id: 9,
    title: 'Bodyweight Mastery',
    description: 'Master advanced bodyweight exercises without any equipment needed.',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '35 days',
    participants: 1876,
    status: 'completed',
    featured: false,
    rewardPoints: 700,
    images: [
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    ]
  },
  {
    id: 10,
    title: 'Mindful Movement',
    description: 'Combine meditation with gentle movement for holistic wellness.',
    category: 'Yoga',
    difficulty: 'Beginner',
    duration: '14 days',
    participants: 623,
    status: 'completed',
    featured: false,
    rewardPoints: 400,
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'
    ]
  }
]

export const users = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    points: 8750,
    workoutsCompleted: 156,
    level: 'Elite Athlete',
    streak: 45,
    joinedDate: '2023-06-15'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=12',
    points: 8420,
    workoutsCompleted: 142,
    level: 'Advanced',
    streak: 38,
    joinedDate: '2023-07-22'
  },
  {
    id: 3,
    name: 'Emma Williams',
    avatar: 'https://i.pravatar.cc/150?img=5',
    points: 7890,
    workoutsCompleted: 134,
    level: 'Advanced',
    streak: 32,
    joinedDate: '2023-08-10'
  },
  {
    id: 4,
    name: 'James Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=13',
    points: 7340,
    workoutsCompleted: 128,
    level: 'Advanced',
    streak: 29,
    joinedDate: '2023-08-25'
  },
  {
    id: 5,
    name: 'Olivia Martinez',
    avatar: 'https://i.pravatar.cc/150?img=9',
    points: 6980,
    workoutsCompleted: 119,
    level: 'Intermediate',
    streak: 26,
    joinedDate: '2023-09-05'
  },
  {
    id: 6,
    name: 'David Kim',
    avatar: 'https://i.pravatar.cc/150?img=14',
    points: 6520,
    workoutsCompleted: 112,
    level: 'Intermediate',
    streak: 23,
    joinedDate: '2023-09-18'
  },
  {
    id: 7,
    name: 'Sophia Anderson',
    avatar: 'https://i.pravatar.cc/150?img=10',
    points: 6180,
    workoutsCompleted: 105,
    level: 'Intermediate',
    streak: 21,
    joinedDate: '2023-10-02'
  },
  {
    id: 8,
    name: 'Daniel Brown',
    avatar: 'https://i.pravatar.cc/150?img=15',
    points: 5840,
    workoutsCompleted: 98,
    level: 'Intermediate',
    streak: 18,
    joinedDate: '2023-10-15'
  },
  {
    id: 9,
    name: 'Isabella Garcia',
    avatar: 'https://i.pravatar.cc/150?img=16',
    points: 5490,
    workoutsCompleted: 92,
    level: 'Beginner',
    streak: 16,
    joinedDate: '2023-10-28'
  },
  {
    id: 10,
    name: 'Matthew Wilson',
    avatar: 'https://i.pravatar.cc/150?img=17',
    points: 5120,
    workoutsCompleted: 86,
    level: 'Beginner',
    streak: 14,
    joinedDate: '2023-11-10'
  },
  {
    id: 11,
    name: 'Ava Thompson',
    avatar: 'https://i.pravatar.cc/150?img=20',
    points: 4780,
    workoutsCompleted: 79,
    level: 'Beginner',
    streak: 12,
    joinedDate: '2023-11-22'
  },
  {
    id: 12,
    name: 'Christopher Lee',
    avatar: 'https://i.pravatar.cc/150?img=18',
    points: 4450,
    workoutsCompleted: 73,
    level: 'Beginner',
    streak: 10,
    joinedDate: '2023-12-05'
  },
  {
    id: 13,
    name: 'Mia Taylor',
    avatar: 'https://i.pravatar.cc/150?img=23',
    points: 4120,
    workoutsCompleted: 67,
    level: 'Beginner',
    streak: 9,
    joinedDate: '2023-12-18'
  },
  {
    id: 14,
    name: 'Joshua Harris',
    avatar: 'https://i.pravatar.cc/150?img=19',
    points: 3890,
    workoutsCompleted: 62,
    level: 'Beginner',
    streak: 8,
    joinedDate: '2024-01-02'
  },
  {
    id: 15,
    name: 'Charlotte Clark',
    avatar: 'https://i.pravatar.cc/150?img=24',
    points: 3560,
    workoutsCompleted: 56,
    level: 'Beginner',
    streak: 7,
    joinedDate: '2024-01-15'
  },
  {
    id: 16,
    name: 'Andrew Lewis',
    avatar: 'https://i.pravatar.cc/150?img=33',
    points: 3240,
    workoutsCompleted: 51,
    level: 'Beginner',
    streak: 6,
    joinedDate: '2024-01-28'
  },
  {
    id: 17,
    name: 'Amelia Walker',
    avatar: 'https://i.pravatar.cc/150?img=25',
    points: 2980,
    workoutsCompleted: 46,
    level: 'Beginner',
    streak: 5,
    joinedDate: '2024-02-10'
  },
  {
    id: 18,
    name: 'Ryan Hall',
    avatar: 'https://i.pravatar.cc/150?img=32',
    points: 2720,
    workoutsCompleted: 42,
    level: 'Beginner',
    streak: 5,
    joinedDate: '2024-02-22'
  },
  {
    id: 19,
    name: 'Harper Allen',
    avatar: 'https://i.pravatar.cc/150?img=26',
    points: 2450,
    workoutsCompleted: 38,
    level: 'Beginner',
    streak: 4,
    joinedDate: '2024-03-05'
  },
  {
    id: 20,
    name: 'Nathan Young',
    avatar: 'https://i.pravatar.cc/150?img=31',
    points: 2180,
    workoutsCompleted: 34,
    level: 'Beginner',
    streak: 4,
    joinedDate: '2024-03-18'
  }
]