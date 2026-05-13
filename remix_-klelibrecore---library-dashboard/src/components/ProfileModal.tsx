import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, BookOpen, Mail, ShieldCheck, GraduationCap, Briefcase } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profile }) => {
  if (!profile) return null;

  const roleIcons = {
    Admin: { icon: ShieldCheck, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    Student: { icon: GraduationCap, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    User: { icon: Briefcase, color: 'text-indigo-400', bg: 'bg-indigo-400/10' }
  };

  const { icon: RoleIcon, color: roleColor, bg: roleBg } = roleIcons[profile.role];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 ${roleBg} rounded-2xl border border-white/5`}>
                  <RoleIcon className={roleColor} size={32} />
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black italic font-brand tracking-tighter text-white mb-1 uppercase">
                    {profile.name}
                  </h2>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 ${roleBg} rounded-lg mb-4`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${roleColor.replace('text', 'bg')} animate-pulse`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${roleColor}`}>
                      {profile.role === 'User' ? 'Employee' : profile.role} Portal Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <ProfileInfoItem 
                    icon={Mail} 
                    label="Email Address" 
                    value={profile.email} 
                  />
                  <ProfileInfoItem 
                    icon={Phone} 
                    label="Phone Verification" 
                    value={profile.phone} 
                  />
                  {profile.sem && (
                    <ProfileInfoItem 
                      icon={BookOpen} 
                      label="Academic Term" 
                      value={`Semester ${profile.sem}`} 
                    />
                  )}
                  <ProfileInfoItem 
                    icon={ShieldCheck} 
                    label="Security Access" 
                    value="Standard Authenticated" 
                  />
                </div>
              </div>

              <div className="mt-10">
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all"
                >
                  Close Profile
                </button>
              </div>
            </div>
            
            {/* Decorative bottom element */}
            <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-accent to-indigo-500" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface ProfileInfoItemProps {
  icon: any;
  label: string;
  value: string;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all">
    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-200">{value}</p>
    </div>
  </div>
);

export default ProfileModal;
