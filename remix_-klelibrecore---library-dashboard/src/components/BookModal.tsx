import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Plus } from 'lucide-react';
import { Book } from '../types';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Omit<Book, 'id'>) => void;
  onUpdate: (id: string, book: Partial<Book>) => void;
  editingBook: Book | null;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, onSave, onUpdate, editingBook }) => {
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    category: 'Fiction',
    description: '',
    isbn: '',
    status: 'Available',
    coverImage: ''
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        category: editingBook.category,
        description: editingBook.description,
        isbn: editingBook.isbn,
        status: editingBook.status,
        coverImage: editingBook.coverImage
      });
    } else {
      setFormData({
        title: '',
        author: '',
        category: 'Fiction',
        description: '',
        isbn: '',
        status: 'Available',
        coverImage: `https://picsum.photos/seed/${Math.random()}/400/600`
      });
    }
  }, [editingBook, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      onUpdate(editingBook.id, formData);
    } else {
      onSave(formData);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#020617] w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-white/5"
          >
            <div className="bg-brand-primary text-white p-6 flex justify-between items-center">
              <h2 className="font-brand font-black text-sm uppercase tracking-[0.3em] italic">{editingBook ? 'Inventory.Update' : 'Inventory.Add'}</h2>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="hover:text-brand-accent transition-colors p-1"
              >
                <X size={20} />
              </motion.button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-600 mb-2 uppercase tracking-widest">Scientific Title</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none font-bold text-white text-sm transition-all placeholder:text-slate-700"
                  placeholder="e.g. Quantum Mechanics Vol. 1"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-600 mb-2 uppercase tracking-widest">Lead Author</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none font-bold text-white text-sm transition-all placeholder:text-slate-700"
                    placeholder="Author Name"
                    value={formData.author}
                    onChange={e => setFormData({...formData, author: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-600 mb-2 uppercase tracking-widest">Field / Category</label>
                  <div className="relative">
                    <select 
                      className="w-full px-4 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none font-bold text-white text-sm transition-all appearance-none cursor-pointer"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Computer Science</option>
                      <option>Software Engineering</option>
                      <option>Web Development</option>
                      <option>Artificial Intelligence</option>
                      <option>Data Science</option>
                      <option>Cybersecurity</option>
                      <option>Mathematics</option>
                      <option>General Technology</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-600 mb-2 uppercase tracking-widest">Reference ISBN</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none font-mono text-xs font-bold text-slate-400 transition-all placeholder:text-slate-700"
                    placeholder="978-0000000000"
                    value={formData.isbn}
                    onChange={e => setFormData({...formData, isbn: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-600 mb-2 uppercase tracking-widest">Archive Status</label>
                  <select 
                    className="w-full px-4 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none font-bold text-white text-sm transition-all appearance-none cursor-pointer"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                  >
                    <option>Available</option>
                    <option>Reserved</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-600 mb-2 uppercase tracking-widest">Abstract / Summary</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none resize-none font-bold text-white text-sm transition-all placeholder:text-slate-700"
                  placeholder="Provide a brief summary of the book content..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="pt-6 flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button" 
                  onClick={onClose}
                  className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest border border-white/5 bg-white/[0.02] text-slate-500 hover:text-white hover:bg-white/5 transition-all rounded-2xl"
                >
                  Discard
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-white text-slate-950 hover:bg-slate-200 shadow-xl transition-all rounded-2xl flex items-center justify-center gap-2"
                >
                  {editingBook ? <Save size={14} /> : <Plus size={14} />} 
                  {editingBook ? 'Commit Update' : 'Finalize Entry'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookModal;
