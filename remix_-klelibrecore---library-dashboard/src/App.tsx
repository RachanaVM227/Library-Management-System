import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import BookModal from './components/BookModal';
import BookDetailsModal from './components/BookDetailsModal';
import { Book, UserRole, UserProfile } from './types';
import * as api from './services/api';
import { Plus, Loader2, AlertCircle, Info, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Portal Pages
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import UserPortal from './pages/UserPortal';
import StudentPortal from './pages/StudentPortal';
import AdminPortal from './pages/AdminPortal';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import HeroBanner from './components/HeroBanner';

import Sidebar from './components/Sidebar';

const MainLayout: React.FC<{ 
  role: UserRole; 
  onRoleChange: (r: UserRole) => void;
  onLogout: () => void;
  searchTerm: string;
  onSearchChange: (s: string) => void;
  error: string | null;
  onRetry: () => void;
  userProfile: UserProfile | null;
  children: React.ReactNode;
}> = ({ role, onRoleChange, onLogout, searchTerm, onSearchChange, error, onRetry, userProfile, children }) => {
  return (
    <div className="min-h-screen bg-mesh text-slate-100 font-sans flex relative overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden opacity-[0.15]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-mesh overflow-hidden">
        <motion.div 
          animate={{
            x: [0, 100, -80, 0],
            y: [0, -70, 70, 0],
            scale: [1, 1.4, 0.7, 1],
            rotate: [0, 45, -45, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[15%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/30 bg-blob rounded-full" 
        />
        <motion.div 
          animate={{
            x: [0, -120, 150, 0],
            y: [0, 120, -80, 0],
            scale: [1, 0.8, 1.2, 1],
            rotate: [0, -60, 60, 0]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[15%] w-[45%] h-[45%] bg-brand-accent/25 bg-blob rounded-full" 
        />
        <motion.div 
          animate={{
            x: [0, 70, -130, 0],
            y: [0, -150, 100, 0],
            scale: [1, 1.3, 0.8, 1],
            rotate: [0, 30, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[15%] left-[10%] w-[40%] h-[40%] bg-emerald-400/15 bg-blob rounded-full" 
        />
        <motion.div 
          animate={{
            x: [0, -50, 80, 0],
            y: [0, 100, -120, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[20%] w-[35%] h-[35%] bg-purple-500/20 bg-blob rounded-full" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[10%] left-[40%] w-[20%] h-[20%] bg-blue-400/20 bg-blob rounded-full"
        />
      </div>

      <Sidebar role={role} onRoleChange={onRoleChange} onLogout={onLogout} userProfile={userProfile} />
      
      <div className="flex-1 flex flex-col ml-64 min-h-screen border-l border-white/5 relative z-10">
        <NavBar 
          role={role} 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange} 
          userProfile={userProfile}
        />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-100">
                <AlertCircle size={18} className="text-red-400" />
                <span className="text-sm font-bold uppercase tracking-widest">{error}</span>
                <button 
                  onClick={onRetry}
                  className="ml-auto px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Retry Connection
                </button>
              </div>
            )}
            {children}
          </div>
        </main>

        <footer className="px-8 py-12 border-t border-white/5 bg-[#020617]/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-3">
               <span className="text-xl font-bold italic font-brand tracking-tight text-white">KLELIBRECORE<span className="text-brand-primary">.</span></span>
               <span className="h-4 w-[1px] bg-slate-800 hidden md:block" />
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Open Source Library Core v4.2</p>
             </div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">© 2026 KLELIBRECORE Labs • Distributed under MIT License</p>
          </div>
        </footer>
      </div>
    </div>
  );
};


const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>('User');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Sync role with URL if user deep links
  useEffect(() => {
    if (location.pathname === '/student') setRole('Student');
    else if (location.pathname === '/admin') setRole('Admin');
    else if (location.pathname === '/user') setRole('User');
    else if (location.pathname === '/dashboard') setRole('User'); // Keep User role for dashboard or add as needed
  }, [location.pathname]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'User') navigate('/user');
    else if (newRole === 'Student') navigate('/student');
    else if (newRole === 'Admin') navigate('/admin');
  };

  const handleLogin = (profile: UserProfile) => {
    setIsLoggedIn(true);
    setRole(profile.role);
    setUserProfile(profile);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    navigate('/');
  };

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const data = await api.getBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (bookData: Omit<Book, 'id'>) => {
    try {
      const newBook = await api.addBook(bookData);
      setBooks(prev => [...prev, newBook]);
      setIsModalOpen(false);
    } catch (err) {
      alert('Error adding book');
    }
  };

  const handleUpdateBook = async (id: string, bookData: Partial<Book>) => {
    try {
      const updated = await api.updateBook(id, bookData);
      setBooks(prev => prev.map(b => b.id === id ? updated : b));
      setIsModalOpen(false);
    } catch (err) {
      alert('Error updating book');
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await api.deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const openAddModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const openViewModal = (book: Book) => {
    setSelectedBook(book);
    setIsDetailsOpen(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <MainLayout 
      role={role} 
      onRoleChange={handleRoleChange} 
      onLogout={handleLogout}
      searchTerm={searchTerm} 
      onSearchChange={setSearchTerm}
      error={error}
      onRetry={fetchBooks}
      userProfile={userProfile}
    >
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <HomePage books={books} isLoading={isLoading} onView={openViewModal} />
            </motion.div>
          } />
          <Route path="/dashboard" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <Dashboard books={books} />
            </motion.div>
          } />
          <Route path="/user" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-col">
                <HeroBanner />
                <div className="mt-8">
                  <UserPortal 
                    books={books} 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    isLoading={isLoading} 
                    onView={openViewModal}
                    role={role}
                    onEdit={openEditModal}
                    onDelete={handleDeleteBook}
                  />
                </div>
              </div>
            </motion.div>
          } />
          <Route path="/student" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <StudentPortal 
                books={books} 
                onAdd={openAddModal} 
                onEdit={openEditModal} 
                onDelete={handleDeleteBook} 
                onView={openViewModal}
                isLoading={isLoading} 
              />
            </motion.div>
          } />
          <Route path="/admin" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <AdminPortal />
            </motion.div>
          } />
          <Route path="/blog" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <BlogPage role={role} />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      <BookModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddBook} 
        onUpdate={handleUpdateBook} 
        editingBook={editingBook} 
      />

      <BookDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        book={selectedBook}
      />
    </MainLayout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
