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
  Calendar
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from "motion/react";

const chartData = [
  { name: 'Mon', interviews: 24, scheduled: 35 },
  { name: 'Tue', interviews: 35, scheduled: 42 },
  { name: 'Wed', interviews: 45, scheduled: 50 },
  { name: 'Thu', interviews: 30, scheduled: 38 },
  { name: 'Fri', interviews: 55, scheduled: 65 },
  { name: 'Sat', interviews: 20, scheduled: 25 },
  { name: 'Sun', interviews: 15, scheduled: 18 },
];

const recentActivity = [
  { id: 1, action: "New Company Profile", target: "Wipro", time: "10 mins ago", status: "success" },
  { id: 2, action: "Escalation Raised", target: "Client: TCS", time: "1 hr ago", status: "danger" },
  { id: 3, action: "Interview Completed", target: "Alex Rivera (Frontend)", time: "2 hrs ago", status: "success" },
  { id: 4, action: "Candidate Rejected", target: "Sarah Jenkins", time: "3 hrs ago", status: "warning" },
  { id: 5, action: "Self Registration", target: "Marcus Thorne", time: "4 hrs ago", status: "info" },
];

export default function SuperAdminDashboard() {
  const metrics = [
    { title: "Profiles Added", value: "2,543", icon: Users, trend: "+12.5%", positive: true },
    { title: "Interviews Scheduled", value: "842", icon: CalendarPlus, trend: "+5.2%", positive: true },
    { title: "Interviews Rated", value: "654", icon: Star, trend: "+8.1%", positive: true },
    { title: "Self Registered", value: "1,205", icon: UserPlus, trend: "+15.3%", positive: true },
    { title: "Company Profiles", value: "145", icon: Building, trend: "+2.4%", positive: true },
    { title: "Rejected Candidates", value: "324", icon: UserX, trend: "-4.1%", positive: false },
    { title: "Escalations", value: "12", icon: AlertOctagon, trend: "+2.0%", positive: false },
    { title: "Today's Interviews", value: "45", icon: CalendarClock, trend: "+10.5%", positive: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Overview</h2>
          <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening.</p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-1.5 mt-4 sm:mt-0">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Filter by Date Range</label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center bg-white border border-border/50 rounded-xl shadow-sm px-3 py-1.5 transition-all hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 h-10">
              <Calendar className="w-4 h-4 text-primary mr-3" />
              <input 
                type="date" 
                className="text-sm border-none outline-none bg-transparent text-foreground font-semibold cursor-pointer w-32" 
                defaultValue={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} 
              />
              <span className="mx-2 text-muted-foreground font-medium text-sm">to</span>
              <input 
                type="date" 
                className="text-sm border-none outline-none bg-transparent text-foreground font-semibold cursor-pointer w-32" 
                defaultValue={new Date().toISOString().split('T')[0]} 
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="h-10 px-4 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all hover:shadow-md active:scale-95">
                Search
              </button>
              <button className="h-10 px-4 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#00A94B]/90 transition-all active:scale-95">
                Reset
              </button>
            </div>
          </div>
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

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/50 shadow-sm p-6 hover:shadow-lg hover:border-[#0085F7]/30 transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold font-heading">Interview Volume</h3>
            <p className="text-sm text-muted-foreground">Completed vs Scheduled interviews this week</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0085F7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0085F7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorScheduled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A94B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A94B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#e5e7eb', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area type="monotone" dataKey="scheduled" stroke="#00A94B" strokeWidth={3} fillOpacity={1} fill="url(#colorScheduled)" />
                <Area type="monotone" dataKey="interviews" stroke="#0085F7" strokeWidth={3} fillOpacity={1} fill="url(#colorInterviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 flex flex-col hover:shadow-lg hover:border-[#0085F7]/30 transition-all duration-300">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold font-heading">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">Latest actions across the platform</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'danger' ? 'bg-rose-500' :
                    activity.status === 'warning' ? 'bg-amber-500' :
                    'bg-primary'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{activity.target}</p>
                </div>
                <div className="text-[10px] font-bold text-muted-foreground whitespace-nowrap bg-secondary px-2 py-1 rounded-md">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-2.5 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}

