import { useState } from "react";
import { 
  Briefcase, 
  CalendarClock, 
  UserCheck, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
  X
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from "motion/react";
import { SearchableSelect } from "../../components/SearchableSelect";

const chartData = [
  { name: 'SDE II', submissions: 12, interviews: 4 },
  { name: 'UI/UX Designer', submissions: 8, interviews: 2 },
  { name: 'DevOps Lead', submissions: 15, interviews: 6 },
  { name: 'Data Sci', submissions: 5, interviews: 1 },
  { name: 'QA Engineer', submissions: 22, interviews: 8 },
];

const upcomingTasks = [
  { id: 1, type: "Interview", target: "John Doe (SDE II)", time: "10:30 AM Today", status: "blue" },
  { id: 2, type: "Feedback Needed", target: "Jane Smith (UI/UX)", time: "02:00 PM Today", status: "amber" },
  { id: 3, type: "Follow up", target: "Mike Johnson (DevOps)", time: "04:30 PM Today", status: "purple" },
];

export default function VendorRecruiterDashboard() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskType, setTaskType] = useState("");
  const [priorityColor, setPriorityColor] = useState("");
  const [showTaskConfirm, setShowTaskConfirm] = useState(false);
  const metrics = [
    { title: "My Active Postings", value: "8", icon: Briefcase, trend: "Stable", positive: true },
    { title: "Interviews Today", value: "3", icon: CalendarClock, trend: "+1", positive: true },
    { title: "Profiles in Review", value: "14", icon: UserCheck, trend: "-2", positive: false },
    { title: "Feedback Pending", value: "5", icon: MessageSquare, trend: "+3", positive: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-slate-800 tracking-tight">Recruiter Workspace</h2>
          <p className="text-slate-500 mt-1">Manage your active postings and coordinate candidate interviews.</p>
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
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                <metric.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                metric.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {metric.trend}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-800">{metric.value}</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">{metric.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">My Postings Performance</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Submissions vs Interviews scheduled</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="submissions" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Profiles Submitted" barSize={20} />
                <Bar dataKey="interviews" fill="#10b981" radius={[4, 4, 0, 0]} name="Interviews Scheduled" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Today's Agenda</h3>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className={`p-2 rounded-xl shrink-0 ${
                  task.status === 'blue' ? 'bg-blue-100 text-blue-600' :
                  task.status === 'amber' ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {task.type === "Interview" ? <Calendar className="w-5 h-5" /> : 
                   task.type === "Feedback Needed" ? <MessageSquare className="w-5 h-5" /> :
                   <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{task.type}</h4>
                  <p className="text-xs font-medium text-slate-500 line-clamp-1">{task.target}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setIsTaskModalOpen(true)}
            className="w-full mt-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-xl transition-colors border border-slate-200"
          >
            Create New Task
          </button>
        </motion.div>
      </div>

      {/* Create New Task Modal */}
      <AnimatePresence>
        {isTaskModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTaskModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Create New Task
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    Schedule an interview, follow-up, or reminder.
                  </p>
                </div>
                <button 
                  onClick={() => setIsTaskModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Task Type <span className="text-rose-500">*</span></label>
                  <SearchableSelect
                    options={[
                      { value: "Interview", label: "Interview" },
                      { value: "Feedback Needed", label: "Feedback Needed" },
                      { value: "Follow up", label: "Follow up" }
                    ]}
                    value={taskType}
                    onChange={setTaskType}
                    placeholder="Select task type..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Target / Candidate <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe (SDE II)"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Date & Time <span className="text-rose-500">*</span></label>
                    <input 
                      type="datetime-local" 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Priority Color</label>
                    <SearchableSelect
                      options={[
                        { value: "blue", label: "Blue (Normal)" },
                        { value: "amber", label: "Amber (High)" },
                        { value: "purple", label: "Purple (Medium)" }
                      ]}
                      value={priorityColor}
                      onChange={setPriorityColor}
                      placeholder="Select color..."
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setIsTaskModalOpen(false)}
                    className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors border border-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsTaskModalOpen(false);
                      setShowTaskConfirm(true);
                    }}
                    className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Task Confirmation Prompt */}
      <AnimatePresence>
        {showTaskConfirm && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTaskConfirm(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarClock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Confirm Task Creation</h3>
              <p className="text-sm text-slate-500 mb-8">
                Are you sure you want to create this new task? It will be added to your agenda immediately.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTaskConfirm(false)}
                  className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowTaskConfirm(false)}
                  className="flex-1 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-sm transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
