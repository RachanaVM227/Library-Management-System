import React from 'react';
import { Book, UserRole } from '../types';
import BookCard from '../components/BookCard';
import { Search, SlidersHorizontal, LayoutGrid, List, Sparkles, Filter, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UserPortalProps {
  books: Book[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  onView: (book: Book) => void;
  role: UserRole;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const UserPortal: React.FC<UserPortalProps> = ({ 
  books, 
  searchTerm, 
  setSearchTerm, 
  isLoading, 
  onView,
  role,
  onEdit,
  onDelete
}) => {
  const [visibleCount, setVisibleCount] = React.useState(5);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const displayedBooks = filteredBooks.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBooks.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-3xl font-brand font-black text-white tracking-tighter">Library Catalog</h2>
          <p className="text-slate-500 font-medium mt-1">Explore our latest collection of {books.length} volumes</p>
        </div>
        <div className="flex items-center gap-2 bg-[#0f172a] p-1 rounded-2xl shadow-sm border border-white/5">
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             className="p-2 bg-brand-primary text-white rounded-xl shadow-lg shadow-brand-primary/20"
           >
             <LayoutGrid size={18} />
           </motion.button>
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             className="p-2 text-slate-500 hover:text-brand-primary transition-colors"
           >
             <List size={18} />
           </motion.button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Advanced Filters Sidebar */}
        <aside className="w-full lg:w-64 space-y-6 flex-none">
          <div className="bg-[#0f172a] rounded-[2rem] p-6 shadow-sm border border-white/5">
            <div className="flex items-center gap-2 mb-6">
               <Filter size={18} className="text-brand-primary" />
               <h3 className="font-bold text-white">Filters</h3>
            </div>

            <div className="space-y-8">
              <section>
                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Research Links</h4>
                <div className="space-y-3">
                  {books.filter(b => b.blogUrl).map((book, idx) => (
                    <a 
                      key={idx}
                      href={book.blogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 group p-2 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span className="text-xs font-bold text-slate-400 group-hover:text-white truncate max-w-[140px]">{book.title} Insight</span>
                      <Globe size={10} className="text-slate-600 group-hover:text-brand-primary ml-auto" />
                    </a>
                  ))}
                  {books.filter(b => b.blogUrl).length === 0 && (
                    <p className="text-[10px] text-slate-600 font-bold italic">No research links available.</p>
                  )}
                </div>
              </section>

              <section>
                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Availability</h4>
                <div className="space-y-3">
                   {['In Stock', 'Online only', 'Coming Soon'].map(status => (
                     <label key={status} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 border-2 border-white/10 rounded-lg group-hover:border-brand-primary transition-colors flex items-center justify-center bg-[#020617]">
                           <div className="w-2 h-2 bg-brand-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors">{status}</span>
                     </label>
                   ))}
                </div>
              </section>

              <section>
                <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Categories</h4>
                <div className="space-y-2">
                   {['Computer Science', 'Modern History', 'Science Fiction', 'Poetry'].map(cat => (
                     <div key={cat} className="flex items-center justify-between group cursor-pointer p-1">
                        <span className="text-sm font-bold text-slate-400 group-hover:text-brand-primary transition-colors">{cat}</span>
                        <span className="bg-[#020617] px-2 py-1 rounded-lg text-[10px] font-black text-slate-600 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all">
                          {Math.floor(Math.random() * 12)}
                        </span>
                     </div>
                   ))}
                </div>
              </section>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-8 py-3 bg-white/[0.03] hover:bg-white/[0.05] text-slate-500 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/5"
            >
               Reset All Filters
            </motion.button>
          </div>
 
          <div className="bg-gradient-to-br from-brand-accent to-orange-600 p-6 rounded-[2rem] text-white shadow-xl shadow-brand-accent/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Sparkles size={80} />
             </div>
             <h4 className="font-brand font-black mb-2 relative z-10 italic">Premium Member?</h4>
             <p className="text-xs font-bold text-white/80 leading-relaxed mb-6 relative z-10">Get early access to new arrivals and unlimited online reserves.</p>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="w-full py-2.5 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all relative z-10"
             >
                Upgrade Now
             </motion.button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          {isLoading ? (
            <div className="bg-[#0f172a] p-24 text-center rounded-[2rem] border border-white/5 shadow-sm">
              <div className="animate-spin w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full mx-auto" />
              <p className="mt-6 text-slate-500 font-bold text-sm tracking-wide">Syncing with global clusters...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="bg-[#0f172a] p-16 text-center rounded-[2rem] border border-white/5 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 bg-[#020617] rounded-full flex items-center justify-center mb-6 border border-white/5">
                <Search size={40} className="text-slate-700" />
              </div>
              <h3 className="font-brand font-black text-white text-xl mb-2 tracking-tight">No volumes found</h3>
              <p className="text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">We couldn't find any books matching your search. Try adjusting your filters or search terms.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchTerm('')} 
                className="mt-8 px-8 py-3 bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-brand-secondary transition-all shadow-xl"
              >
                Clear Search
              </motion.button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {displayedBooks.map(book => (
                    <motion.div
                      key={book.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookCard 
                        book={book} 
                        role={role} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                        onView={onView}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-12 mb-8">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadMore}
                    className="px-10 py-4 bg-white/[0.03] hover:bg-white/[0.1] border border-white/10 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 group"
                  >
                    View More Volumes
                    <Sparkles size={14} className="text-brand-accent group-hover:rotate-12 transition-transform" />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
