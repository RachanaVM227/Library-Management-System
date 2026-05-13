import React, { useState } from 'react';
import { Shield, Users, BarChart3, Lock, Server, BellRing, Activity, Globe, Cpu, X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const graphData = [
  { time: '00:00', cpu: 45, ram: 60, disk: 30 },
  { time: '04:00', cpu: 30, ram: 55, disk: 30 },
  { time: '08:00', cpu: 65, ram: 80, disk: 35 },
  { time: '12:00', cpu: 85, ram: 90, disk: 40 },
  { time: '16:00', cpu: 70, ram: 85, disk: 42 },
  { time: '20:00', cpu: 55, ram: 75, disk: 40 },
  { time: '23:59', cpu: 40, ram: 65, disk: 38 },
];

const AdminPortal: React.FC = () => {
  const [showGraphs, setShowGraphs] = useState(false);

  return (
    <div className="space-y-8 pb-12 text-slate-100">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-brand font-black text-white tracking-tighter">System Control</h2>
          <p className="text-slate-500 font-medium mt-1">Global infrastructure and access management</p>
        </div>
        
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-2xl">
           <Shield size={16} className="text-red-400" />
           <span className="text-[10px] font-black text-red-100 uppercase tracking-widest">Root Session Active</span>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'System Uptime', value: '99.98%', icon: Activity, color: 'text-emerald-400', trend: '+0.02%', bg: 'bg-emerald-400/10' },
          { label: 'API Latency', value: '24ms', icon: Cpu, color: 'text-brand-primary', trend: '-2ms', bg: 'bg-brand-primary/10' },
          { label: 'Regional Traffic', value: '42k', icon: Globe, color: 'text-blue-400', trend: '+8%', bg: 'bg-blue-400/10' },
        ].map((item, i) => (
          <div key={i} className="bg-[#0f172a] p-8 rounded-[2rem] border border-white/5 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                 <item.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">{item.trend}</span>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-3xl font-brand font-black text-white leading-none">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security Events */}
        <div className="bg-[#0f172a] p-8 rounded-[2rem] border border-white/5 shadow-sm">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-brand font-black text-lg flex items-center gap-3 text-white">
               <Lock size={20} className="text-brand-accent shadow-[0_0_8px_rgba(251,146,60,0.4)]" /> Security Logs
             </h3>
             <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:text-brand-accent transition-colors"
             >
               View All
             </motion.button>
           </div>
           
           <div className="space-y-1">
             {[
               { time: '10:42:15', user: 'system_root', action: 'DB Snapshot Init', status: 'Success' },
               { time: '09:12:04', user: 'std_jennifer', action: 'Access Grant', status: 'Success' },
               { time: '07:30:59', user: 'system_audit', action: 'Global Security Scan', status: 'Complete' },
               { time: '04:00:01', user: 'cron_job_A1', action: 'Token Cleanup', status: 'Success' },
             ].map((log, i) => (
               <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors group">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                 <span className="font-mono text-[10px] text-slate-600 w-16 italic">{log.time}</span>
                 <div className="flex flex-col flex-1">
                    <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{log.user}</span>
                    <span className="text-[10px] font-medium text-slate-500 tracking-wider font-mono">{log.action}</span>
                 </div>
                 <motion.button 
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   className="text-[10px] font-black text-slate-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   Details
                 </motion.button>
               </div>
             ))}
           </div>
           
           <motion.button 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             className="w-full mt-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-brand-primary/20 transition-all"
           >
             Generate Security Report
           </motion.button>
        </div>

        {/* System Health */}
        <div className="bg-[#0f172a] p-8 rounded-[2rem] border border-white/5 shadow-sm">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-brand font-black text-lg flex items-center gap-3 text-white">
               <Server size={20} className="text-brand-primary" /> Infrastructure
             </h3>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Normal</span>
             </div>
           </div>
           
           <div className="space-y-8">
              {[
                { label: 'Database Cluster', val: 98, color: 'bg-brand-primary' },
                { label: 'Edge Network', val: 92, color: 'bg-blue-500' },
                { label: 'Search Engine', val: 78, color: 'bg-brand-accent' },
              ].map((serv, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-400">{serv.label}</span>
                    <span className="text-xs font-black text-white">{serv.val}%</span>
                  </div>
                  <div className="h-3 bg-[#020617] rounded-full p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${serv.val}%` }}
                      className={`h-full ${serv.color} rounded-full shadow-sm shadow-current/20`} 
                    />
                  </div>
                </div>
              ))}
           </div>
           
           <div className="grid grid-cols-2 gap-4 mt-12">
              <button className="py-4 bg-[#020617] hover:bg-[#1E293B] text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all border border-white/5">
                 Purge Caches
              </button>
              <button 
                onClick={() => setShowGraphs(!showGraphs)}
                className={`py-4 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all border border-white/5 ${showGraphs ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-[#020617] hover:bg-[#1E293B] text-slate-400'}`}
              >
                 Scale Resources
              </button>
           </div>

           <AnimatePresence>
            {showGraphs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden"
              >
                <div className="h-[200px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={graphData}>
                      <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" opacity={0.5} />
                      <XAxis 
                        dataKey="time" 
                        hide
                      />
                      <YAxis 
                        hide
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', boxShadow: '0 20px 25px -5px rgb(0 0 0/0.4)' }}
                      />
                      <Area type="monotone" dataKey="cpu" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" name="Load" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time CPU telemetry</span>
                   </div>
                   <button 
                    onClick={() => setShowGraphs(false)}
                    className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:text-white transition-colors"
                   >
                     Close Panel
                   </button>
                </div>
              </motion.div>
            )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
