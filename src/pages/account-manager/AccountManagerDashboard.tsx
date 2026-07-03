import { 
  Users, 
  CalendarPlus, 
  Star, 
  UserPlus, 
  Building, 
  UserX, 
  AlertOctagon, 
  CalendarClock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Briefcase
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from "motion/react";

const escalationData = [
  { name: 'Mon', escalated: 5, resolved: 4 },
  { name: 'Tue', escalated: 8, resolved: 7 },
  { name: 'Wed', escalated: 3, resolved: 5 },
  { name: 'Thu', escalated: 7, resolved: 6 },
  { name: 'Fri', escalated: 12, resolved: 10 },
  { name: 'Sat', escalated: 2, resolved: 3 },
  { name: 'Sun', escalated: 1, resolved: 2 },
];

const companyData = [
  { name: 'TCS', profiles: 120 },
  { name: 'Wipro', profiles: 98 },
  { name: 'Infosys', profiles: 86 },
  { name: 'HCL', profiles: 65 },
  { name: 'Tech Mahindra', profiles: 45 },
];

export default function AccountManagerDashboard() {
  const metrics = [
    { title: "No of profiles Added", value: "3,142", icon: Users, trend: "+14.2%", positive: true },
    { title: "No of Interviews Scheduled", value: "1,204", icon: CalendarPlus, trend: "+8.5%", positive: true },
    { title: "No of Interviews Rated", value: "986", icon: Star, trend: "+12.1%", positive: true },
    { title: "Self Registered Candidates", value: "854", icon: UserPlus, trend: "+5.4%", positive: true },
    { title: "No of Companies Profiles Added", value: "28", icon: Building, trend: "+2.1%", positive: true },
    { title: "Rejected Candidates", value: "412", icon: UserX, trend: "-3.2%", positive: false },
    { title: "Escalations", value: "18", icon: AlertOctagon, trend: "+4.5%", positive: false },
    { title: "Today's Interviews", value: "86", icon: CalendarClock, trend: "+18.2%", positive: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Account Manager Dashboard</h2>
          <p className="text-muted-foreground mt-1">Monitor your accounts, escalations, and performance metrics.</p>
        </div>
      </div>

      {/* Date Range Section */}
      <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-heading">Data Timeframe</h3>
          <p className="text-sm text-muted-foreground">Adjust the date range for the charts and metrics below.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex items-center bg-slate-50 border border-border/50 rounded-xl px-3 py-2 transition-all hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <Calendar className="w-4 h-4 text-primary mr-3" />
            <input 
              type="date" 
              className="text-sm border-none outline-none bg-transparent text-foreground font-semibold cursor-pointer w-32" 
              defaultValue={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 
            />
            <span className="mx-2 text-muted-foreground font-medium text-sm">to</span>
            <input 
              type="date" 
              className="text-sm border-none outline-none bg-transparent text-foreground font-semibold cursor-pointer w-32" 
              defaultValue={new Date().toISOString().split('T')[0]} 
            />
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all hover:shadow-md active:scale-95">
            Apply Filter
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#0085F7]/30 transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <metric.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                metric.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {metric.trend}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black font-heading text-foreground tracking-tight">{metric.value}</h3>
              <p className="text-sm font-medium text-muted-foreground mt-1">{metric.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Escalations Chart Section */}
        <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 hover:shadow-lg hover:border-[#0085F7]/30 transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold font-heading flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-500" />
              Client Escalations vs Resolutions
            </h3>
            <p className="text-sm text-muted-foreground">Tracking issue resolution efficiency</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={escalationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEscalated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#e5e7eb', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
                <Area type="monotone" dataKey="escalated" name="Escalated" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorEscalated)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Company Profiles Chart */}
        <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 hover:shadow-lg hover:border-[#0085F7]/30 transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold font-heading flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Top Companies by Profiles Added
            </h3>
            <p className="text-sm text-muted-foreground">Most active client accounts</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} width={90} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="profiles" name="Profiles Added" fill="#0085F7" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
