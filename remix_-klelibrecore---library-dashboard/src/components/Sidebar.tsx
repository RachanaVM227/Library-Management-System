import React from 'react';
import { 
  Home,
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Briefcase,
  Layers,
  Activity
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  userProfile: UserProfile | null;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onRoleChange, onLogout, userProfile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'Home', label: 'Home', icon: Home, roles: ['User', 'Student', 'Admin'], path: '/' },
    { id: 'User', label: 'User Portal', icon: BookOpen, roles: ['User', 'Student', 'Admin'], path: '/user' },
    { id: 'Student', label: 'Student Hub', icon: Briefcase, roles: ['Student', 'Admin'], path: '/student' },
    { id: 'Admin', label: 'System Admin', icon: ShieldCheck, roles: ['Admin'], path: '/admin' },
    { id: 'Blog', label: 'Library Blog', icon: Layers, roles: ['User', 'Student', 'Admin'], path: '/blog' },
  ];

  return (
    <div className="w-64 glass h-screen fixed left-0 top-0 text-white flex flex-col z-50">
      <div className="p-8 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/40">
          <BookOpen size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold italic font-brand tracking-tight text-white">KLELIBRE<span className="text-brand-primary italic">CORE</span></h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Management</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] px-4 mb-4">Navigation</p>
        
        {menuItems.map((item) => {
          const isVisible = item.roles.includes('Admin') || (item.roles.includes(role));
          if (!isVisible && role !== 'Admin') return null;
          
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              onClick={() => {
                if (item.id === 'Home') {
                  navigate('/');
                } else if (item.id === 'Blog') {
                  navigate('/blog');
                } else {
                  onRoleChange(item.id as UserRole);
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                isActive 
                  ? 'bg-brand-primary/20 text-brand-primary shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-brand-primary' : 'text-slate-600 group-hover:text-brand-accent transition-colors'} />
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="ml-auto w-1 h-4 bg-brand-primary rounded-full shadow-[0_0_12px_rgba(79,70,229,0.8)]"
                />
              )}
            </motion.button>
          );
        })}

        <div className="pt-8">
          <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] px-4 mb-4">Stats & Tools</p>
          
          <motion.button 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
              location.pathname === '/dashboard' 
                ? 'bg-brand-primary/20 text-brand-primary shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <LayoutDashboard size={20} className={location.pathname === '/dashboard' ? 'text-brand-primary' : 'text-slate-600 group-hover:text-brand-accent transition-colors'} />
            <span className="text-sm font-bold tracking-tight">Dashboard</span>
            {location.pathname === '/dashboard' && (
              <motion.div 
                layoutId="activeTab"
                className="ml-auto w-1 h-4 bg-brand-primary rounded-full shadow-[0_0_12px_rgba(79,70,229,0.8)]"
              />
            )}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all"
          >
            <Activity size={20} className="text-slate-600" />
            <span className="text-sm font-bold tracking-tight">Active Services</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all"
          >
            <Layers size={20} className="text-slate-600" />
            <span className="text-sm font-bold tracking-tight">Collections</span>
          </motion.button>
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-white/5">
        <div className="bg-white/[0.03] p-4 rounded-2xl mb-4 border border-white/5 text-slate-100">
           <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-xs border border-brand-primary/20">
                {(userProfile?.name || role)[0]}
              </div>
              <div className="flex flex-col overflow-hidden">
                 <span className="text-sm font-bold truncate">{userProfile?.name || `${role} User`}</span>
                 <span className="text-[10px] text-slate-600 truncate uppercase tracking-widest">{userProfile?.role === 'User' ? 'Employee' : (userProfile?.role || role)}</span>
              </div>
           </div>
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={onLogout}
             className="w-full py-2.5 bg-white text-slate-950 hover:bg-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
           >
              <LogOut size={12} /> Sign Out
           </motion.button>
        </div>
        <p className="text-[10px] text-center text-slate-700 font-bold uppercase tracking-widest">KLELIBRECORE v2.4.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
