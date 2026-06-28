import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  CalendarClock, 
  Star, 
  AlertTriangle, 
  Clock, 
  Briefcase,
  RefreshCw,
  Search,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowRight
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const FUNNEL_DATA = [
  { name: 'Profiles Added', value: 1250 },
  { name: 'Scheduled', value: 850 },
  { name: 'Interviewed', value: 650 },
  { name: 'Selected', value: 180 },
];

const TIMELINE_DATA = [
  { name: 'Mon', interviews: 24, profiles: 45 },
  { name: 'Tue', interviews: 35, profiles: 52 },
  { name: 'Wed', interviews: 42, profiles: 38 },
  { name: 'Thu', interviews: 28, profiles: 65 },
  { name: 'Fri', interviews: 45, profiles: 48 },
  { name: 'Sat', interviews: 12, profiles: 15 },
  { name: 'Sun', interviews: 8, profiles: 10 },
];

const COLORS = ['#94a3b8', '#60a5fa', '#3b82f6', '#10b981'];

export default function AnternRecruiterDashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Calculate mock multipliers based on date presence to simulate data changing
  const multiplier = useMemo(() => {
    if (startDate && endDate) return 1.4;
    if (startDate || endDate) return 0.8;
    return 1;
  }, [startDate, endDate]);

  const kpis = [
    {
      title: "No of Profiles Added",
      value: Math.floor(1250 * multiplier).toLocaleString(),
      trend: "+12.5%",
      isPositive: true,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Interviews Scheduled",
      value: Math.floor(850 * multiplier).toLocaleString(),
      trend: "+5.2%",
      isPositive: true,
      icon: CalendarClock,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "Interviews Rated",
      value: Math.floor(650 * multiplier).toLocaleString(),
      trend: "-2.1%",
      isPositive: false,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Escalations",
      value: Math.floor(12 * (2 - multiplier)).toString(),
      trend: "-15.0%",
      isPositive: true, // Lower escalations is positive
      icon: AlertTriangle,
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      title: "Today's Interviews",
      value: Math.floor(45 * multiplier).toString(),
      trend: "+8.4%",
      isPositive: true,
      icon: Clock,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "No Of Postings",
      value: Math.floor(28 * multiplier).toString(),
      trend: "Stable",
      isPositive: true,
      icon: Briefcase,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  const handleReload = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-heading text-foreground"
          >
            Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 font-medium"
          >
            Overview of your recruiting pipeline and interviews.
          </motion.p>
        </div>

        {/* Sleek Inline Date Range Filter */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm h-[42px] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
            <div className="flex items-center px-3 text-slate-500">
              <Calendar className="w-4 h-4 mr-2" />
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none text-sm font-medium focus:outline-none text-slate-700 w-auto min-w-[110px]"
              />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 mx-1 shrink-0" />
            <div className="flex items-center px-3 text-slate-500">
              <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-none text-sm font-medium focus:outline-none text-slate-700 w-auto min-w-[110px]"
              />
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            <button 
              onClick={handleReload}
              className="flex items-center justify-center w-[42px] h-[42px] bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-rose-500 transition-colors shadow-sm shrink-0"
              title="Clear Dates"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              className="flex items-center justify-center w-[42px] h-[42px] bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 shrink-0"
              title="Filter"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${kpi.bg} rounded-bl-full -z-10 transition-transform group-hover:scale-110 opacity-50`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center shrink-0`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${kpi.isPositive ? 'text-emerald-600' : 'text-rose-500'}`}>
                {kpi.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpi.trend}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                {kpi.value}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {kpi.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recruitment Funnel</h3>
            <p className="text-sm font-medium text-slate-500">Conversion across hiring stages</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} width={100} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {FUNNEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Timeline Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Interviews & Profiles Trend</h3>
            <p className="text-sm font-medium text-slate-500">Weekly activity overview</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIMELINE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfiles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="profiles" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorProfiles)" />
                <Area type="monotone" dataKey="interviews" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorInterviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

