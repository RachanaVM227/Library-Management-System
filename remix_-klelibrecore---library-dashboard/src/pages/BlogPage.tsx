import React, { useState, useEffect } from 'react';
import { BlogPost, UserRole, Book } from '../types';
import * as api from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Loader2, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  User,
  X
} from 'lucide-react';

interface BlogPageProps {
  role: UserRole;
}

const BlogPage: React.FC<BlogPageProps> = ({ role }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState<Omit<BlogPost, 'id' | 'date'>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Library Team',
    category: 'Technology',
    imageUrl: 'https://picsum.photos/seed/blog/800/400',
    readTime: '5 min read'
  });

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlogs();
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await api.getBooks();
      setBooks(data);
    } catch (err) {
      console.error('Failed to load books for sidebar:', err);
    }
  };

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await api.getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const added = await api.addBlog(newBlog);
      setBlogs(prev => [added, ...prev]);
      setIsModalOpen(false);
      setNewBlog({
        title: '',
        excerpt: '',
        content: '',
        author: 'Library Team',
        category: 'Technology',
        imageUrl: 'https://picsum.photos/seed/blog/800/400',
        readTime: '5 min read'
      });
    } catch (err) {
      alert('Error adding blog');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await api.deleteBlog(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      alert('Error deleting blog');
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlogs.length;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black italic font-brand tracking-tighter text-white mb-2">
            LIBRARY <span className="text-brand-primary">INSIGHTS</span>
          </h2>
          <p className="text-slate-400 max-w-md">
            Stay updated with the latest technological shifts, research papers, and library optimization strategies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search insights..."
              className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-sm font-bold text-slate-100 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/50 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {role === 'Admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20"
            >
              <Plus size={18} /> New Post
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Knowledge Base...</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {displayedBlogs.map((blog, index) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    key={blog.id}
                    className="glass rounded-[2rem] overflow-hidden group hover:shadow-2xl hover:shadow-brand-primary/10 transition-all border border-white/5 hover:border-brand-primary/30 flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-brand-primary/90 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest rounded-lg shadow-lg">
                          {blog.category}
                        </span>
                      </div>
                      {role === 'Admin' && (
                        <button 
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-xl backdrop-blur-md transition-all shadow-lg opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-tighter mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-primary" /> {blog.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-primary" /> {blog.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                            {blog.author.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-slate-300">{blog.author}</span>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedBlog(blog)}
                          className="text-xs font-black text-brand-primary uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2 group/btn"
                        >
                          Learn More
                          <div className="w-6 h-6 bg-brand-primary/10 rounded-lg flex items-center justify-center group-hover/btn:bg-brand-primary group-hover/btn:text-white transition-all">
                            <Plus size={12} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {hasMore && (
              <div className="flex justify-center mt-16">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 5)}
                  className="px-10 py-4 bg-white/[0.03] hover:bg-white/[0.1] border border-white/10 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 group"
                >
                  Load More Insights
                  <Clock size={16} className="text-brand-primary group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            )}
          </div>

          <aside className="w-full lg:w-72 space-y-8 flex-none">
            <div className="glass p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <BookOpen size={16} className="text-brand-primary" /> Subject Resources
              </h4>
              <div className="space-y-6">
                {books.slice(0, 5).map(book => (
                  <div key={book.id} className="group cursor-pointer">
                    <h5 className="text-xs font-bold text-slate-300 group-hover:text-brand-primary transition-colors mb-1 line-clamp-1">{book.title}</h5>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{book.author}</span>
                      {book.blogUrl && (
                        <a href={book.blogUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-brand-accent uppercase tracking-widest hover:underline">
                          Read Case
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/user')}
                className="w-full mt-8 py-3 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-black text-[10px] uppercase tracking-widest rounded-xl transition-all"
              >
                View Catalog
              </button>
            </div>
          </aside>
        </div>
      )}

      {!isLoading && filteredBlogs.length === 0 && (
        <div className="text-center py-32 bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-white/5">
          <BookOpen size={48} className="mx-auto text-slate-700 mb-6" />
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">No entries match your search parameters.</p>
        </div>
      )}

      {/* Blog Details Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative h-64 w-full">
                <img 
                  src={selectedBlog.imageUrl} 
                  alt={selectedBlog.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-black/70 text-white rounded-2xl backdrop-blur-md transition-all shadow-lg"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-8">
                  <span className="px-4 py-2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl">
                    {selectedBlog.category}
                  </span>
                </div>
              </div>

              <div className="p-8 overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-6 text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-2"><User size={14} className="text-brand-primary" /> {selectedBlog.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-primary" /> {selectedBlog.date}</span>
                  <span className="flex items-center gap-2"><Clock size={14} className="text-brand-primary" /> {selectedBlog.readTime}</span>
                </div>

                <h2 className="text-3xl font-black italic font-brand tracking-tighter text-white mb-6 leading-tight">
                  {selectedBlog.title}
                </h2>

                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6 font-medium italic">
                    {selectedBlog.excerpt}
                  </p>
                  <div className="text-slate-400 leading-relaxed space-y-4 whitespace-pre-wrap">
                    {selectedBlog.content || "Full content restricted to subscribed institutional members. This technical summary provides high-level insights into the publication."}
                    {"\n\n"}
                    The library core system continuously monitors these developments to ensure our metadata schemas remain compatible with emerging standards. For deeper analysis, contact the department lead or visit the physical repository index.
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-white/[0.02] border-t border-white/5 flex justify-end">
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest"
                >
                  Close Insight
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Blog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass rounded-[2.5rem] shadow-2xl p-8 border border-white/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-2xl font-black italic font-brand tracking-tighter text-white">
                  PUBLISH <span className="text-brand-primary">INSIGHT</span>
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddBlog} className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Title</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-brand-primary/50 transition-all placeholder:text-slate-600"
                    placeholder="Enter blog title..."
                    value={newBlog.title}
                    onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Category</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-brand-primary/50 transition-all"
                      value={newBlog.category}
                      onChange={e => setNewBlog({...newBlog, category: e.target.value})}
                    >
                      <option className="bg-slate-900" value="Technology">Technology</option>
                      <option className="bg-slate-900" value="Research">Research</option>
                      <option className="bg-slate-900" value="Innovation">Innovation</option>
                      <option className="bg-slate-900" value="Best Practices">Best Practices</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Read Time</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-brand-primary/50 transition-all"
                      placeholder="e.g. 5 min read"
                      value={newBlog.readTime}
                      onChange={e => setNewBlog({...newBlog, readTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Excerpt</label>
                  <textarea 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-brand-primary/50 transition-all placeholder:text-slate-600 resize-none h-24"
                    placeholder="Brief summary of the post..."
                    value={newBlog.excerpt}
                    onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand-primary/20 mt-4 flex items-center justify-center gap-3"
                >
                  <Plus size={18} /> Publish Insight
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
