import React from 'react';
import { Search, Bell, Settings, User, Layers } from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';

interface NavBarProps {
  role: UserRole;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  userProfile: UserProfile | null;
}

const NavBar: React.FC<NavBarProps> = ({ role, searchTerm, onSearchChange, userProfile }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 glass px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-8 w-full max-w-4xl">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 hover:bg-white/[0.03] rounded-xl transition-all group"
        >
          <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all border border-brand-primary/20">
             <Search size={16} className="rotate-90" />
          </div>
          <span className="text-sm font-bold text-slate-100">Library Home</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 px-4 py-2 hover:bg-white/[0.03] rounded-xl transition-all group"
        >
          <div className="w-8 h-8 bg-brand-accent/10 rounded-lg flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all border border-brand-accent/20">
             <Layers size={16} />
          </div>
          <span className="text-sm font-bold text-slate-100">Blog</span>
        </motion.button>

        <div className="relative w-full group max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-primary transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-12 py-3 bg-[#0f172a] border border-white/5 rounded-2xl text-sm font-bold text-slate-100 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/50 transition-all placeholder:text-slate-600"
            placeholder="Search books, authors, or ISBN..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 pl-8">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 text-slate-500 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all relative"
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-accent rounded-full border-2 border-[#020617] shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 text-slate-500 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all"
        >
          <Settings size={20} />
        </motion.button>
        
        <div className="h-8 w-[1px] bg-white/5 mx-2 hidden sm:block" />
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsProfileOpen(true)}
          className="flex items-center gap-3 pl-2 cursor-pointer group"
        >
          <div className="flex flex-col items-end hidden lg:flex">
             <span className="text-sm font-bold text-slate-100 leading-none group-hover:text-brand-primary transition-colors">
                {userProfile?.name || 'Alex Student'}
             </span>
             <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest leading-none mt-1">
                {userProfile?.role === 'User' ? 'Employee' : (userProfile?.role || role)} Portal
             </span>
          </div>
          <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white border border-white/5 group-hover:border-brand-primary/30 shadow-xl transition-all">
             <User size={20} />
          </div>
        </motion.div>
      </div>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        profile={userProfile} 
      />
    </header>
  );
};

export default NavBar;
