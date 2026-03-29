
export type FormType = {
  title: string;
  subtitle: string;
  description: string;
  days: string;
  rewardPoints: string;
  category: string;
  level: string;
  goals: string[];
  images: (File | null)[];
};

export type challenge = {
  id: string
  title: string;
  active: boolean
  createdAt: string
  subtitle: string;
  description: string;
  days: string;
  rewardPoints: string;
  category: string;
  level: string;
  goals: string[];
  images: (File | null)[];
}