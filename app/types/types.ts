
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
  imgs: (File | null)[];
}

export type ApiRes = {
  data: challenge[],
  pagination: pagination
}

export type pagination = {
  totalPages: number,
  currentPage: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  totalItems: number,
  offset: number
}