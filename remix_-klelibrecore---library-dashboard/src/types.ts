export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  isbn: string;
  status: 'Available' | 'Reserved' | 'Out of Stock';
  coverImage: string;
  blogUrl?: string;
}

export type UserRole = 'User' | 'Student' | 'Admin';

export interface UserProfile {
  name: string;
  phone: string;
  sem: string;
  role: UserRole;
  email: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
}
