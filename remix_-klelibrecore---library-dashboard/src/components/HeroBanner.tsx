import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, BookMarked } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden glass rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/regenerated_image_1778584127590.jpg" 
          alt="Library Background"
          className="w-full h-full object-cover opacity-[0.12] filter grayscale brightness-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/60 to-transparent" />
      </div>

      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full mb-6 border border-white/10">
            <Sparkles size={14} className="text-brand-accent shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Library OS v2.4</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-brand font-black tracking-tighter mb-6 leading-[0.9]">
            Architect your <br/>
            <span className="text-brand-primary italic">next legacy.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium max-w-md">
            The world's most sophisticated institutional archive manager. Precision tracking for 2.4M volumes.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2 shadow-xl"
            >
              Access Vault <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/blog')}
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all font-bold"
            >
              Read Blog
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="glass p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                   <BookMarked size={28} className="text-white" />
                </div>
                <div>
                   <h3 className="font-brand font-black text-xl text-white italic">Live Feed</h3>
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Active Reserves</p>
                </div>
             </div>
             
             <div className="space-y-4">
                {[
                  { title: 'The Modern Library', author: 'Dr. Sarah Jenkins', img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=100&h=100&auto=format&fit=crop' },
                  { title: 'Algorithms in Nature', author: 'Prof. Leo V.', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=100&h=100&auto=format&fit=crop' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-[1.5rem] border border-white/5 hover:bg-white/[0.05] transition-all cursor-pointer group/item">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-12 h-12 rounded-xl flex-none object-cover grayscale brightness-75 group-hover/item:grayscale-0 group-hover/item:brightness-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                       <span className="text-xs font-bold truncate text-slate-200 group-hover/item:text-white transition-colors">{item.title}</span>
                       <span className="text-[10px] text-slate-600 font-mono italic">{item.author}</span>
                    </div>
                  </div>
                ))}
             </div>

             <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Network Stable</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:text-white transition-colors"
                >
                  Details
                </motion.button>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default HeroBanner;
