import React from 'react';
import { Book, UserRole } from '../types';
import { motion } from 'motion/react';
import { Edit2, Trash2, Clock, MapPin, ChevronRight, Bookmark } from 'lucide-react';

interface BookCardProps {
  book: Book;
  role: UserRole;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onView: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, role, onEdit, onDelete, onView }) => {
  const isAvailable = book.status === 'Available';
  const canModify = role === 'Student' || role === 'Admin';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={() => onView(book)}
      className="glass rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:border-white/20 group cursor-pointer"
    >
      <div className="relative h-64 bg-[#020617] overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.8] group-hover:brightness-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/10 ${
             isAvailable ? 'bg-emerald-500/80 text-white' : 'bg-orange-500/80 text-white'
           }`}>
             {book.status}
           </span>
        </div>
        <div className="absolute top-4 right-4">
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={(e) => { e.stopPropagation(); }}
             className="p-2 bg-black/40 backdrop-blur-md rounded-xl text-slate-400 hover:text-brand-accent transition-colors shadow-sm border border-white/5"
           >
             <Bookmark size={16} />
           </motion.button>
        </div>
        
        {canModify && (
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onEdit(book); }}
              className="p-3 bg-white text-brand-primary rounded-2xl hover:bg-brand-primary hover:text-white transition-all shadow-xl"
            >
              <Edit2 size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onDelete(book.id); }}
              className="p-3 bg-white text-lib-red rounded-2xl hover:bg-lib-red hover:text-white transition-all shadow-xl"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-col mb-4">
           <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">{book.genre}</span>
           <h3 className="font-bold text-white text-lg leading-tight group-hover:text-brand-primary transition-colors line-clamp-1">
             {book.title}
           </h3>
           <p className="text-sm text-slate-500 font-medium">{book.author}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-[#020617] p-2 rounded-xl border border-white/5">
              <Clock size={12} />
              <span>{book.year || '2023'}</span>
           </div>
           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-[#020617] p-2 rounded-xl border border-white/5">
              <MapPin size={12} />
              <span className="truncate">Section {Math.floor(Math.random() * 20) + 1}A</span>
           </div>
        </div>

        <div className="flex items-center justify-between mb-6">
           <div className="flex -space-x-2">
             {[
               'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=60&h=60&auto=format&fit=crop',
               'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=60&h=60&auto=format&fit=crop',
               'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=60&h=60&auto=format&fit=crop'
             ].map((img, i) => (
               <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0f172a] bg-slate-800 overflow-hidden shadow-lg">
                 <img src={img} alt="Contributor" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               </div>
             ))}
             <div className="w-7 h-7 rounded-full border-2 border-[#0f172a] bg-brand-primary text-white flex items-center justify-center text-[8px] font-black tracking-tighter">
                +G
             </div>
           </div>
           <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-600 uppercase tracking-widest bg-white/[0.03] px-2 py-1 rounded-lg border border-white/5">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              Verified Access
           </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => { e.stopPropagation(); onView(book); }}
          className="w-full py-3 bg-white text-slate-950 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group/btn hover:bg-slate-200 transition-all shadow-lg"
        >
           {role === 'User' ? 'Request Borrow' : 'Manage Stats'}
           <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};


export default BookCard;
