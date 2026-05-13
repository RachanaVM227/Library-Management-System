import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Search, Shield, Zap, ArrowRight, Library, GraduationCap, Globe, Clock, Sparkles } from 'lucide-react';
import { Book } from '../types';
import BookCard from '../components/BookCard';

interface HomePageProps {
  books: Book[];
  isLoading: boolean;
  onView: (book: Book) => void;
}

const HomePage: React.FC<HomePageProps> = ({ books, isLoading, onView }) => {
  const navigate = useNavigate();
  const [visibleRecent, setVisibleRecent] = React.useState(5);

  const recentBooks = [...books].reverse().slice(0, visibleRecent);
  const hasMoreRecent = visibleRecent < books.length;

  return (
    <div className="min-h-screen overflow-hidden text-slate-100 relative">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider mb-8">
                <Zap size={14} />
                <span>Next-Gen Library Management</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-brand font-black text-white leading-[1.1] tracking-tighter mb-8">
                The core of your <br />
                <span className="text-brand-primary italic">knowledge</span> system.
              </h1>
              
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-lg">
                KLELIBRECORE provides a seamless foundation for modern educational environments. 
                Powerful searching, intuitive management, and secure access for everyone.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/user')}
                  className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-200 transition-all shadow-xl shadow-white/5 group"
                >
                  Explore Collection
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/student')}
                  className="px-8 py-4 border-2 border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-all"
                >
                  Student Hub
                </motion.button>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                <div>
                  <p className="text-3xl font-brand font-black text-white tracking-tighter">12k+</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Resources</p>
                </div>
                <div>
                  <p className="text-3xl font-brand font-black text-white tracking-tighter">5.4k</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Active Students</p>
                </div>
                <div>
                  <p className="text-3xl font-brand font-black text-white tracking-tighter">99.9%</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Uptime</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 lg:mt-0 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black border-4 border-white/5">
                <img 
                   src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop" 
                   alt="Modern Library"
                   className="w-full h-auto object-cover aspect-[4/5] lg:aspect-square brightness-[0.7]"
                   referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Feature Cards */}
              <div className="absolute -left-12 top-1/4 bg-[#0f172a] p-6 rounded-3xl shadow-2xl border border-white/5 max-w-[240px] hidden md:block">
                 <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-4 border border-brand-accent/20">
                    <Search size={24} />
                 </div>
                 <h3 className="font-bold text-white mb-2 underline decoration-brand-accent/30 decoration-2 underline-offset-4">Smart Searching</h3>
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">Find any resource instantly with our advanced search core.</p>
              </div>

              <div className="absolute -right-12 bottom-1/4 bg-brand-primary p-6 rounded-3xl shadow-2xl max-w-[240px] hidden md:block">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-4 backdrop-blur-sm">
                    <Shield size={24} />
                 </div>
                 <h3 className="font-brand font-black text-white mb-2">Secure Core</h3>
                 <p className="text-sm text-slate-100/80 leading-relaxed font-medium">Role-based access control and system integrity monitoring.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white/5 py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-brand font-black text-white tracking-tight mb-4">Everything you need to <span className="text-brand-primary italic">manage</span>.</h2>
            <p className="text-lg text-slate-400">A complete suite of tools designed for the modern library experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Library, 
                title: 'Global Catalog', 
                desc: 'A unified view of all resources, books, and digital assets in the system.',
                color: 'text-blue-400',
                bg: 'bg-blue-400/10',
                path: '/user'
              },
              { 
                icon: GraduationCap, 
                title: 'Student Hub', 
                desc: 'Empower students with self-service tools for reservations and renewals.',
                color: 'text-brand-primary',
                bg: 'bg-brand-primary/10',
                path: '/student'
              },
              { 
                icon: Globe, 
                title: 'Multi-Portal Access', 
                desc: 'Dedicated interfaces for Users, Students, and Administrators.',
                color: 'text-brand-accent',
                bg: 'bg-brand-accent/10',
                path: '/dashboard'
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                onClick={() => navigate(feature.path)}
                className="bg-[#0f172a] p-10 rounded-[2rem] border border-white/5 transition-all shadow-sm hover:shadow-xl hover:border-white/10 group cursor-pointer"
              >
                <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-lg`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-brand font-black text-white mb-4 underline decoration-white/5 decoration-2 underline-offset-4 group-hover:decoration-brand-primary transition-all">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-widest mb-6">
                <Clock size={12} />
                <span>Just Arrived</span>
              </div>
              <h2 className="text-5xl font-brand font-black text-white tracking-tighter leading-none italic">
                RECENTLY <br />
                <span className="text-brand-primary">ADDED</span> VOLUMES.
              </h2>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/user')}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all group"
            >
              View Full Collection
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {!isLoading && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {recentBooks.map((book, idx) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <BookCard 
                      book={book} 
                      role="User" 
                      onEdit={() => {}} 
                      onDelete={() => {}} 
                      onView={onView} 
                    />
                  </motion.div>
                ))}
              </div>

              {hasMoreRecent && (
                <div className="flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVisibleRecent(prev => prev + 5)}
                    className="px-10 py-4 bg-white/[0.03] hover:bg-white/[0.1] border border-white/10 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 group"
                  >
                    View 5 More Books
                    <Sparkles size={14} className="text-brand-accent group-hover:rotate-12 transition-transform" />
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section (Old) */}
      <section className="py-24 overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-brand font-black text-white tracking-tighter mb-8 italic">
            Ready to dive in?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
            Experience the most powerful library management core ever built. Start exploring the collection today.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/user')}
            className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-brand-primary/40 hover:bg-brand-secondary transition-all"
          >
            Launch Portal
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
