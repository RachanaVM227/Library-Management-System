import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, User, Hash, Calendar, Tag, Info, Bookmark, Share2, MessageSquare, MapPin, Clock } from 'lucide-react';
import { Book } from '../types';

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ isOpen, onClose, book }) => {
  if (!book) return null;

  const isAvailable = book.status === 'Available';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#020617] w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-white/5 flex flex-col md:flex-row h-auto max-h-[90vh]"
          >
            {/* Left Side - Image & Status */}
            <div className="w-full md:w-2/5 relative bg-[#0f172a] flex items-center justify-center p-8 border-r border-white/5">
               <div className="absolute top-6 left-6 z-10">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md border border-white/10 ${
                    isAvailable ? 'bg-emerald-500/80 text-white' : 'bg-orange-500/80 text-white'
                  }`}>
                    {book.status}
                  </span>
               </div>

               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="relative group w-full aspect-[4/6]"
               >
                 <img 
                   src={book.coverImage} 
                   alt={book.title}
                   className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
               </motion.div>

               <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all shadow-lg"
                  >
                    <Bookmark size={14} />
                    Save to List
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all shadow-lg"
                  >
                    <Share2 size={14} />
                  </motion.button>
               </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-[#020617]">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-brand-primary font-black text-[10px] uppercase tracking-[0.3em]">
                    <Tag size={12} />
                    <span>{book.genre || book.category}</span>
                  </div>
                  <h2 className="text-4xl font-brand font-black text-white leading-tight tracking-tighter">
                    {book.title}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-400 font-bold">
                    <User size={16} />
                    <span className="text-lg">{book.author}</span>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-3 bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5 hover:border-white/10"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#020617] rounded-xl flex items-center justify-center text-slate-600 shadow-sm border border-white/5">
                    <Hash size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">ISBN Reference</p>
                    <p className="font-mono text-xs font-bold text-slate-300">{book.isbn}</p>
                  </div>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#020617] rounded-xl flex items-center justify-center text-slate-600 shadow-sm border border-white/5">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Release Year</p>
                    <p className="text-xs font-bold text-slate-300">{book.year || '2023'}</p>
                  </div>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#020617] rounded-xl flex items-center justify-center text-slate-600 shadow-sm border border-white/5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Floor Section</p>
                    <p className="text-xs font-bold text-slate-300">Wing A • Level 2</p>
                  </div>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#020617] rounded-xl flex items-center justify-center text-slate-600 shadow-sm border border-white/5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Est. Hold Time</p>
                    <p className="text-xs font-bold text-slate-300">14 Days</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                    <Info size={14} className="text-brand-primary" />
                    Abstract Summary
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {book.description || "In modern software development, clean code is more than a preference—it's a requirement. This volume explores the foundational principles that allow teams to maintain velocity without sacrificing system integrity."}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Global Authors & Contributors</h4>
                      <div className="flex -space-x-3">
                        {[
                          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=100&h=100&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop'
                        ].map((img, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ y: -4, zIndex: 10 }}
                            className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden shadow-xl"
                          >
                            <img src={img} alt="Contributor" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </motion.div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-[#020617] bg-brand-primary text-white flex items-center justify-center text-[10px] font-black tracking-tighter shadow-xl">
                          +INTL
                        </div>
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest bg-white/5 px-6 py-3 rounded-xl border border-white/5 self-end sm:self-center"
                    >
                      <MessageSquare size={14} className="text-brand-primary" />
                      REVIEWS
                    </motion.button>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-200 transition-all shadow-2xl shadow-white/5 group"
                  >
                    {isAvailable ? 'Request Borrow' : 'Join Waitlist'}
                    <BookOpen size={20} className="group-hover:rotate-12 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookDetailsModal;
