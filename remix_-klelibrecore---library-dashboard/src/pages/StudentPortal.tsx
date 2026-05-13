import React, { useState } from 'react';
import { Book } from '../types';
import BookCard from '../components/BookCard';
import { Plus, Database, FileText, Settings, TrendingUp, Users, Clock, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentPortalProps {
  books: Book[];
  onAdd: () => void;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onView: (book: Book) => void;
  isLoading: boolean;
}

const classifications = [
  'All Volumes',
  'Computer Science',
  'Software Engineering',
  'Web Development',
  'AI & Robotics',
  'Data Science',
  'Cybersecurity'
];

const StudentPortal: React.FC<StudentPortalProps> = ({ books, onAdd, onEdit, onDelete, onView, isLoading }) => {
  const [activeTab, setActiveTab] = useState('All Volumes');

  const filteredBooks = activeTab === 'All Volumes' 
    ? books 
    : books.filter(book => {
        if (activeTab === 'AI & Robotics') return book.category?.includes('Artificial Intelligence');
        return book.category === activeTab;
      });

  return (
    <div className="space-y-8 pb-12 text-slate-100">
      {/* Management Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-brand font-black text-white tracking-tighter uppercase">Student Hub</h2>
          <p className="text-slate-500 font-medium mt-1">Manage physical volumes and digital metadata records</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAdd}
          className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-4 font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-brand-primary/20 flex items-center gap-2 transition-all"
        >
          <Plus size={20} /> Add New Entry
        </motion.button>
      </div>

      {/* Classifications Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex items-center gap-2 bg-[#0f172a] p-2 rounded-[2rem] border border-white/5">
          {classifications.map((tab) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all whitespace-nowrap ${
                activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-brand-primary rounded-full -z-10 shadow-lg shadow-brand-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Volumes', value: books.length, icon: Database, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { label: 'Active Borrows', value: '1,240', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Member Users', value: '8.4k', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Pending Returns', value: '42', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-400/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0f172a] p-6 rounded-[2rem] border border-white/5 shadow-sm flex items-center gap-4 group hover:shadow-lg transition-shadow">
             <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-2xl font-brand font-black text-white">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Actions Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-brand-primary text-white rounded-[2rem] p-8 shadow-xl shadow-brand-primary/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 blur-sm group-hover:opacity-20 transition-opacity">
                <Database size={100} />
             </div>
             <h3 className="font-brand font-black text-lg mb-4 relative z-10 italic">Data Integrity</h3>
             <p className="text-xs font-bold text-white/70 leading-relaxed mb-8 relative z-10">All records are synchronized with the regional branch and backed up every 15 minutes.</p>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="w-full py-3 bg-white text-slate-950 hover:bg-slate-200 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 shadow-lg"
             >
                <Settings size={14} /> Database Tuning
             </motion.button>
          </div>
 
          <div className="bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-sm border border-white/5 p-2">
            <motion.button 
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all rounded-2xl"
            >
              <FileText size={18} className="text-slate-600" /> Export Inventory
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all rounded-2xl"
            >
              <Database size={18} className="text-slate-600" /> Sync Clusters
            </motion.button>
          </div>
        </aside>

        {/* Inventory Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between px-2">
             <h3 className="font-bold text-slate-300">Current Collection</h3>
             <div className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/5 px-3 py-1 rounded-full border border-brand-primary/10">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                Live Sync Enabled
             </div>
          </div>

          {isLoading ? (
            <div className="bg-[#0f172a] p-24 text-center rounded-[2rem] border border-white/5 shadow-sm">
               <div className="animate-spin w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full mx-auto" />
               <p className="mt-6 text-slate-500 font-bold text-sm">Fetching catalog data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredBooks.map(book => (
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
                      role="Student" 
                      onEdit={onEdit} 
                      onDelete={onDelete} 
                      onView={onView}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredBooks.length === 0 && (
                <div className="col-span-full py-24 text-center bg-[#0f172a] rounded-[2rem] border border-dashed border-white/10">
                   <Filter size={48} className="mx-auto text-slate-700 mb-4" />
                   <p className="text-slate-500 font-bold">No records found for this classification.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
