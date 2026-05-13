import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, Users, BookOpen, Clock, 
  ArrowUpRight, ArrowDownRight, Package, 
  Activity, Calendar, ChevronRight, Sparkles, Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { Book } from '../types';

interface DashboardProps {
  books: Book[];
}

const monthlyData = [
  { month: 'Jan', services: 120, revenue: 4500 },
  { month: 'Feb', services: 180, revenue: 5200 },
  { month: 'Mar', services: 250, revenue: 6100 },
  { month: 'Apr', services: 210, revenue: 5800 },
  { month: 'May', services: 300, revenue: 7200 },
  { month: 'Jun', services: 350, revenue: 8500 },
];

const serviceMix = [
  { name: 'Digitization', value: 35 },
  { name: 'Consultation', value: 25 },
  { name: 'Archiving', value: 20 },
  { name: 'Workshops', value: 20 },
];

const COLORS = ['#6366f1', '#3b82f6', '#8b5cf6', '#f59e0b'];

const Dashboard: React.FC<DashboardProps> = ({ books }) => {
  const activeBooks = books.filter(b => b.status === 'Available').length;
  const totalBooks = books.length;
  const reservedBooks = books.filter(b => b.status === 'Reserved').length;
  const efficiency = ((activeBooks / totalBooks) * 100).toFixed(1);

  return (
    <div className="space-y-10 pb-16 text-slate-100">
      {/* Dashboard Header - High Contrast */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[2px] bg-brand-primary" />
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Analytics Engine v4.0</span>
          </div>
          <h1 className="text-5xl font-brand font-black text-white tracking-tighter leading-none italic">
            CORE <span className="text-brand-primary">DASHBOARD</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">
            Monitoring <span className="text-slate-300">{totalBooks}</span> resources across the global network.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            {['General', 'Services', 'Systems'].map((tab) => (
              <button 
                key={tab}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === 'General' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-2"
          >
            <Sparkles size={14} />
            Generate Insights
          </motion.button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Active Books', value: activeBooks, change: '+12.5%', icon: BookOpen, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
          { label: 'Total Resources', value: totalBooks, change: '+5.4%', icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Network Efficiency', value: `${efficiency}%`, change: '+2.1%', icon: Activity, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
          { label: 'Monthly Services', value: monthlyData[monthlyData.length - 1].services, change: '+15.8%', icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-400/10' },
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass relative overflow-hidden group p-8 rounded-[2.5rem] border border-white/5 flex flex-col hover:border-brand-primary/20 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-[1.25rem] flex items-center justify-center group-hover:rotate-6 transition-transform shadow-inner`}>
                <card.icon size={28} />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black italic bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
                <ArrowUpRight size={12} />
                {card.change}
              </div>
            </div>
            
            <div className="mt-auto">
              <h3 className="text-4xl font-brand font-black text-white tracking-tighter mb-1">{card.value}</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Monthly Services Line Chart */}
        <div className="xl:col-span-2 glass-dark p-10 rounded-[3rem] border border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="text-2xl font-brand font-black text-white italic tracking-tighter uppercase">Monthly Service Volume</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Cross-departmental performance index</p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              <button className="px-4 py-1.5 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Services</button>
              <button className="px-4 py-1.5 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-slate-300">Revenue</button>
            </div>
          </div>
          
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="serviceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#1E293B" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#475569' }} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#475569' }} 
                />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }}
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    backgroundColor: '#0F172A',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                    padding: '16px',
                    backdropFilter: 'blur(16px)'
                  }} 
                  itemStyle={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#fff' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="services" 
                  stroke="#6366f1" 
                  strokeWidth={6} 
                  fillOpacity={1} 
                  fill="url(#serviceGradient)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Professional Service Mix */}
        <div className="glass-dark p-10 rounded-[3rem] border border-white/5 flex flex-col">
          <h3 className="text-2xl font-brand font-black text-white italic tracking-tighter uppercase px-2 mb-2">Service Mix</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-10">Resource allocation 2026</p>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceMix}
                    innerRadius={85}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={500}
                    animationDuration={1500}
                  >
                    {serviceMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={12} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend - Muzli style list */}
            <div className="w-full space-y-4 mt-8 px-4">
              {serviceMix.map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-help">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full ring-4 ring-white/5" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-[11px] font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-black text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Operational Logs - Compact & Polished */}
      <div className="glass rounded-[3rem] border border-white/5 overflow-hidden">
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-brand font-black text-white italic tracking-tighter uppercase">Operational Status</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time resource synchronization</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Systems Online</span>
            </div>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full">
            <thead className="bg-[#020617]/40">
              <tr>
                <th className="px-10 py-5 text-left text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Node / Resource</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Authority</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Method</th>
                <th className="px-10 py-5 text-left text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Timeframe</th>
                <th className="px-10 py-5 text-right text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {books.slice(0, 6).map((book, i) => (
                <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-14 bg-slate-900 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                        <img src={book.coverImage} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-1">{book.title}</span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{book.isbn}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-400">
                        {book.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-400">{book.author}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md">Sync.Read</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{i + 1}m ago</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      book.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-emerald-500/5' : 
                      book.status === 'Reserved' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-amber-500/5' : 
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
