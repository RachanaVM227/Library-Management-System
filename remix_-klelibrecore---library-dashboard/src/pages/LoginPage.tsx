import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { UserRole, UserProfile } from '../types';
import { 
  ShieldCheck, 
  GraduationCap, 
  User, 
  Key, 
  Mail, 
  LogIn, 
  Github, 
  Chrome,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (profile: UserProfile) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sem, setSem] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('User');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      onLogin({
        name,
        phone,
        sem,
        role: selectedRole,
        email
      });
      navigate(selectedRole === 'Admin' ? '/admin' : selectedRole === 'Student' ? '/student' : '/user');
    }, 1500);
  };

  const roles: { role: UserRole; icon: any; color: string; desc: string }[] = [
    { role: 'User', icon: User, color: 'bg-indigo-500', desc: 'Browse Catalog' },
    { role: 'Student', icon: GraduationCap, color: 'bg-emerald-500', desc: 'Academics & Loans' },
    { role: 'Admin', icon: ShieldCheck, color: 'bg-rose-500', desc: 'System Management' },
  ];

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-primary/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-brand-accent/10 blur-[120px] rounded-full"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid md:grid-cols-2 gap-8 relative z-10"
      >
        {/* Left Side: Branding */}
        <div className="flex flex-col justify-center space-y-8 p-8 hidden md:flex">
          <div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
            >
              <Sparkles size={14} className="text-brand-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Library Core v4.2</span>
            </motion.div>
            <h1 className="text-6xl font-black italic font-brand tracking-tighter text-white leading-tight">
              KLELIBRE<span className="text-brand-primary">CORE</span>
            </h1>
            <p className="text-xl text-slate-400 mt-4 font-medium max-w-sm">
              The next generation of library management. Secure, elegant, and intelligent.
            </p>
          </div>

          <div className="space-y-6">
             <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
                    <Sparkles size={18} />
                 </div>
                 <div>
                   <h3 className="text-sm font-bold text-white tracking-tight">Smart Cataloging</h3>
                   <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">AI-Powered Search</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center text-brand-accent">
                    <ShieldCheck size={18} />
                 </div>
                 <div>
                   <h3 className="text-sm font-bold text-white tracking-tight">Secure Access</h3>
                   <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Role-Based Security</p>
                 </div>
               </div>

               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <GraduationCap size={18} />
                 </div>
                 <div>
                   <h3 className="text-sm font-bold text-white tracking-tight">Student Success</h3>
                   <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Academic Resources</p>
                 </div>
               </div>
             </div>
             
             <p className="text-xs text-slate-500 font-medium flex items-center gap-2 px-4 italic">
                <ArrowRight size={12} className="text-brand-primary" />
                Select your portal and enter details to begin your session.
             </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl relative">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 font-medium">Access your personalized library dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 text-xs">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-primary transition-colors" size={16} />
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-brand-primary/50 transition-all font-medium"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 text-xs">Phone Number</label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-primary transition-colors" size={16} />
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 9876543210"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-brand-primary/50 transition-all font-medium"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 text-xs">Semester</label>
                <div className="relative group">
                  <select 
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-brand-primary/50 transition-all font-medium appearance-none"
                    value={sem}
                    onChange={(e) => setSem(e.target.value)}
                    required
                  >
                    <option value="" className="bg-[#020617]">Select Sem</option>
                    {[1,2,3,4,5,6,7,8].map(s => (
                      <option key={s} value={s} className="bg-[#020617]">Semester {s}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <ArrowRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 text-xs">Portal Selection</label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSelectedRole(r.role)}
                      className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border transition-all ${
                        selectedRole === r.role 
                          ? 'bg-brand-primary/20 border-brand-primary text-white shadow-lg' 
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <r.icon size={14} />
                      <span className="text-[9px] font-black uppercase tracking-tight">{r.role === 'User' ? 'Emp' : r.role}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 text-xs">Email Hash</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-primary transition-colors" size={16} />
                <input 
                  type="email" 
                  required
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-brand-primary/50 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end mb-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 text-xs">Secure Key</label>
              </div>
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-primary transition-colors" size={16} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-brand-primary/50 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50 mt-4"
            >
              {isLoading ? 'Decrypting...' : (
                <>
                  Initialize Session <LogIn size={18} />
                </>
              )}
            </motion.button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Connect with</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ y: -2 }}
              className="flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold"
            >
              <Chrome size={16} className="text-white" /> Google
            </motion.button>
            <motion.button 
              whileHover={{ y: -2 }}
              className="flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold"
            >
              <Github size={16} className="text-white" /> GitHub
            </motion.button>
          </div>

          <p className="mt-10 text-center text-xs text-slate-500 font-medium">
            Don't have an access key? <button className="text-brand-primary hover:underline">Request Enrollment</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
