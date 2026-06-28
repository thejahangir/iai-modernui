import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  Users, 
  Briefcase,
  TrendingUp,
  Clock,
  Activity,
  Hourglass,
  CalendarCheck,
  Ban,
  FolderOpen,
  CheckCircle2,
  PauseCircle,
  BriefcaseBusiness
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  Label
} from 'recharts';

const interviewData = [
  { name: 'Used', value: 21, color: '#f59e0b' },
  { name: 'Remaining', value: 979, color: '#e2e8f0' },
];

const jobPostingData = [
  { name: 'Open', value: 8, color: '#3b82f6' },
  { name: 'Closed', value: 1, color: '#ef4444' },
  { name: 'On-Hold', value: 0, color: '#facc15' },
];

const profilesBySkillData = [
  { skill: 'React', profiles: 15 },
  { skill: 'Node.js', profiles: 2 },
  { skill: 'Java', profiles: 5 },
  { skill: 'Python', profiles: 6 },
  { skill: 'AWS', profiles: 1 },
  { skill: 'Angular', profiles: 1 },
  { skill: 'C#', profiles: 3 },
];

const hiringTrendsData = [
  { month: 'Jan', hires: 4 },
  { month: 'Feb', hires: 7 },
  { month: 'Mar', hires: 5 },
  { month: 'Apr', hires: 12 },
  { month: 'May', hires: 9 },
  { month: 'Jun', hires: 15 },
];

export default function AnternClientDashboard() {
  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Overview of your interviews, job postings, and hiring metrics.
          </p>
        </div>
      </div>

      {/* Top Stat Cards (Bonus for better UX) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Total Interviews</p>
            <h3 className="text-2xl font-black text-foreground mt-1">1,000</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Total Requirements</p>
            <h3 className="text-2xl font-black text-foreground mt-1">9</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Total Profiles</p>
            <h3 className="text-2xl font-black text-foreground mt-1">33</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Active Schedules</p>
            <h3 className="text-2xl font-black text-foreground mt-1">21</h3>
          </div>
        </div>
      </div>

      {/* Main Charts Row - Creative Redesign */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Interviews Card - Creative Redesign (White Theme) */}
        <div className="relative overflow-hidden bg-white p-8 rounded-3xl shadow-sm border border-border/50 flex flex-col group">
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-10">
            <h3 className="text-2xl font-bold font-heading text-slate-800 flex items-center gap-3">
              <div className="p-3 bg-blue-100/50 text-blue-600 rounded-2xl shadow-sm border border-blue-100">
                <Video className="w-6 h-6" />
              </div>
              Interviews Overview
            </h3>
            <div className="sm:text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 self-start">
              <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mb-0.5">Total Limit</p>
              <h4 className="text-xl font-bold text-slate-800">1,000</h4>
            </div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-5/12 flex flex-col items-center justify-center">
              {/* Custom SVG Donut */}
              <div className="relative w-52 h-52">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="6" fill="none" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#3b82f6" 
                    strokeWidth="6" 
                    fill="none" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * 2.1) / 100} 
                    strokeLinecap="round" 
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-800">2%</span>
                  <span className="text-xs font-semibold text-slate-500 tracking-widest mt-1">USED</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl hover:border-blue-200 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Used</span>
                </div>
                <h4 className="text-xl font-bold text-slate-800">21</h4>
              </div>
              
              <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl hover:border-blue-200 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
                    <Hourglass className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Remaining</span>
                </div>
                <h4 className="text-xl font-bold text-slate-800">979</h4>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl hover:border-blue-200 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Active</span>
                </div>
                <h4 className="text-xl font-bold text-slate-800">21</h4>
              </div>

              <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl hover:border-blue-200 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-rose-50 text-rose-500 rounded-lg">
                    <Ban className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Inactive</span>
                </div>
                <h4 className="text-xl font-bold text-slate-800">0</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Job Postings Card - Creative Pipeline */}
        <div className="relative overflow-hidden bg-white p-8 rounded-3xl shadow-sm border border-border/50 flex flex-col group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
          
          <div className="flex justify-between items-start mb-10">
            <h3 className="text-2xl font-bold font-heading text-slate-800 flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-600 shadow-sm border border-amber-200/50">
                <FileText className="w-6 h-6" />
              </div>
              Job Requirements
            </h3>
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2 flex flex-col gap-7 z-10">
              {/* Creative progress bars */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-700 flex items-center gap-2"><FolderOpen className="w-5 h-5 text-emerald-500" /> Open</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">8 (89%)</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full relative" style={{ width: '89%' }}>
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Closed</span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">1 (11%)</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{ width: '11%' }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-700 flex items-center gap-2"><PauseCircle className="w-5 h-5 text-amber-500" /> On-Hold</span>
                  <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">0 (0%)</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center z-10">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center shadow-sm w-full max-w-xs transition-colors hover:border-amber-200">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl mb-4">
                  <BriefcaseBusiness className="w-8 h-8" />
                </div>
                <span className="text-4xl font-bold text-slate-800">9</span>
                <span className="text-xs font-semibold text-slate-500 uppercase mt-2">Total Requirements Added</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart & Line Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profiles By Skill Bar Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 lg:col-span-2 flex flex-col">
          <h3 className="text-xl font-bold font-heading mb-8 text-foreground">
            Profiles By Skill
          </h3>
          <div className="w-full min-h-[320px]">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={profilesBySkillData} margin={{ top: 10, right: 10, left: 30, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="skill" 
                  axisLine={{ stroke: '#e2e8f0' }} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  dy={10} 
                  height={60}
                >
                  <Label value="Primary Skill" offset={0} position="insideBottom" fill="#64748b" fontSize={14} fontWeight="medium" />
                </XAxis>
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  width={80}
                >
                  <Label value="No Of Profiles" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#64748b" fontSize={14} fontWeight="medium" offset={-20} />
                </YAxis>
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="profiles" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hiring Trends Line Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 flex flex-col">
          <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-2 text-foreground">
            Hiring Trends
          </h3>
          <div className="w-full min-h-[320px]">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={hiringTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={4} dot={{ r: 5, fill: '#10b981', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

