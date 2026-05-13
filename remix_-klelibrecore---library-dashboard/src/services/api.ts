import { Book, BlogPost } from '../types';

export const getBooks = async (): Promise<Book[]> => {
  const response = await fetch('/api/books');
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};

export const addBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Failed to add book');
  return response.json();
};

export const updateBook = async (id: string, book: Partial<Book>): Promise<Book> => {
  const response = await fetch(`/api/books/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Failed to update book');
  return response.json();
};

export const deleteBook = async (id: string): Promise<void> => {
  const response = await fetch(`/api/books/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete book');
};

export const getBlogs = async (): Promise<BlogPost[]> => {
  const response = await fetch('/api/blogs');
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

export const addBlog = async (blog: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> => {
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });
  if (!response.ok) throw new Error('Failed to add blog');
  return response.json();
};

export const deleteBlog = async (id: string): Promise<void> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete blog');
};
