export type FormType = {
  title: string;
  subtitle: string;
  description: string;
  days: string;
  rewardPoints: string;
  category: string;
  level: string;
  goals: string[];
  images: (File | string | null)[];
};

export type userChallenge = {
  id: string;
  joinedAt: string;
  challenge: challenge;
  user: User;
  isCompleted: string
  isActive: string
  workoutCount: number
};



export type challenge = {
  id: string;
  title: string;
  userChallenges: userChallenge[]
  active: boolean;
  createdAt: string;
  subtitle: string;
  description: string;
  days: string;
  rewardPoints: string;
  category: string;
  level: string;
  goals: string[];
  imgs: string[];
  _count?: {
    userChallenges: number;
  };
};

export type ApiRes = {
  data: challenge[];
  pagination: pagination;
};



export type User = {
  id: string;
};




export type pagination = {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  offset: number;
};
