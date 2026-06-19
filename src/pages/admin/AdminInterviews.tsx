import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Download, Eye, CalendarClock, Pencil, History, X, Video, AlertCircle, Clock, CheckCircle2, FileText, User, Copy } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const initialData = [
  { 
    id: "INT-1001", 
    date: "2026-06-25", 
    name: "John Doe", 
    email: "john.doe@example.com",
    mobile: "+1 555-0101",
    interviewer: "Alice Smith",
    primarySkill: "React", 
    rating: "4.5/5",
    company: "TechNova Inc.",
    recruiter: "Bob Johnson",
    designation: "Frontend Engineer",
    status: "Scheduled", 
    isScheduled: true,
    adminName: "Sarah Connor",
    meetingLink: "https://zoom.us/j/123456789"
  },
  { 
    id: "INT-1002", 
    date: "2026-06-26", 
    name: "Jane Roe", 
    email: "jane.roe@example.com",
    mobile: "+1 555-0202",
    interviewer: "Mike Davis",
    primarySkill: "Node.js", 
    rating: "Pending",
    company: "Aether Solutions",
    recruiter: "Alice Smith",
    designation: "Backend Engineer",
    status: "Pending", 
    isScheduled: false,
    adminName: "Sarah Connor",
    meetingLink: ""
  },
];

const mockSkills = [
  { id: "S1", name: "React" },
  { id: "S2", name: "Node.js" },
];

const mockInterviewers = [
  { id: "I1", name: "Alice Smith" },
  { id: "I2", name: "Mike Davis" },
];

const mockLocations = [
  { id: "L1", name: "New York" },
  { id: "L2", name: "San Francisco" },
  { id: "L3", name: "Remote" }
];

const mockHistoryData = [
  { id: "H-1", candidateName: "John Doe", statusName: "Scheduled", followUpDt: "2026-06-20", comments: "Confirmed availability.", createdDate: "2026-06-18" },
  { id: "H-2", candidateName: "John Doe", statusName: "Pending", followUpDt: "2026-06-18", comments: "Sent invite.", createdDate: "2026-06-15" },
];

export default function AdminInterviews() {
  const [data] = useState(initialData);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    primarySkill: "",
    interviewer: "",
    location: "",
    registeredOnly: false,
    ratedOnly: false
  });
  
  // Modals state
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  const [selectedInterview, setSelectedInterview] = useState<any>(null);

  // Forms
  const [rescheduleForm, setRescheduleForm] = useState({ date: "", timeSlot: "" });
  const [updateForm, setUpdateForm] = useState({ status: "", followUpDate: "", comments: "" });

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleReset = () => {
    setFilters({ startDate: "", endDate: "", primarySkill: "", interviewer: "", location: "", registeredOnly: false, ratedOnly: false });
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rescheduling:", rescheduleForm);
    setShowRescheduleModal(false);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating:", updateForm);
    setShowUpdateModal(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Interviews</h2>
          <p className="text-muted-foreground mt-1">Manage, reschedule, and update candidate interviews.</p>
        </div>
      </div>

      {/* Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
        
        <div className="p-3 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="w-full h-9 px-3 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 hover:border-primary/40 text-foreground"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="w-full h-9 px-3 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 hover:border-primary/40 text-foreground"
            />
            <SearchableSelect
              options={mockSkills.map(s => ({ label: s.name, value: s.id }))}
              value={filters.primarySkill}
              onChange={(val) => setFilters({ ...filters, primarySkill: val })}
              placeholder="Primary Skill"
              className="w-full h-9"
            />
            <SearchableSelect
              options={mockInterviewers.map(i => ({ label: i.name, value: i.id }))}
              value={filters.interviewer}
              onChange={(val) => setFilters({ ...filters, interviewer: val })}
              placeholder="Interviewer"
              className="w-full h-9"
            />
            <SearchableSelect
              options={mockLocations.map(l => ({ label: l.name, value: l.id }))}
              value={filters.location}
              onChange={(val) => setFilters({ ...filters, location: val })}
              placeholder="Location"
              className="w-full h-9"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={filters.registeredOnly}
                    onChange={(e) => setFilters({...filters, registeredOnly: e.target.checked})}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-border rounded text-primary flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary">
                    {filters.registeredOnly && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Registered Candidates</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={filters.ratedOnly}
                    onChange={(e) => setFilters({...filters, ratedOnly: e.target.checked})}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-border rounded text-primary flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary">
                    {filters.ratedOnly && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Rated Candidates</span>
              </label>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={handleReset}
                className="flex items-center justify-center gap-2 h-9 px-4 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#00A94B]/90 transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button 
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 h-9 px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all hover:shadow-md hover:shadow-primary/30 active:scale-95"
              >
                Search
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center justify-center gap-2 h-9 px-4 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl hover:bg-black/5 transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Data Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        {data.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No interviews found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest">Interview ID</th>
                <th className="px-6 py-4 font-bold tracking-widest">Date</th>
                <th className="px-6 py-4 font-bold tracking-widest">Name</th>
                <th className="px-6 py-4 font-bold tracking-widest">Mobile No</th>
                <th className="px-6 py-4 font-bold tracking-widest">Primary Skill</th>
                <th className="px-6 py-4 font-bold tracking-widest">Status</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div 
                      className="flex items-center gap-2 group/copy cursor-pointer" 
                      onClick={() => navigator.clipboard.writeText(item.mobile)}
                      title="Copy to clipboard"
                    >
                      <span className="group-hover/copy:text-foreground transition-colors">{item.mobile}</span>
                      <Copy className="w-3.5 h-3.5 opacity-0 group-hover/copy:opacity-100 transition-opacity text-muted-foreground hover:text-primary" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.primarySkill}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      item.status === 'Scheduled' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedInterview(item); setShowViewModal(true); }}
                        className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedInterview(item); setShowRescheduleModal(true); }}
                        className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors"
                        title="Reschedule"
                      >
                        <CalendarClock className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedInterview(item); setShowUpdateModal(true); }}
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        title="Update Status"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedInterview(item); setShowHistoryModal(true); }}
                        className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-foreground hover:text-white transition-colors border border-border/50"
                        title="View History"
                      >
                        <History className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </motion.div>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedInterview && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowViewModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Eye className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Interview Details</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedInterview.id} - {selectedInterview.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Interview ID</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Interview Date</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Name</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Email Id</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Mobile No</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.mobile}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Interviewer</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.interviewer}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Primary Skill</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.primarySkill}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Rating</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.rating}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Company</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.company}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Recruiter</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.recruiter}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Designation</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.designation}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.status}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Is Scheduled</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.isScheduled ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Admin Name</p>
                    <p className="text-sm font-medium text-foreground">{selectedInterview.adminName}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 md:col-span-3 pt-4 border-t border-border/50">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Meeting Link</p>
                    {selectedInterview.meetingLink ? (
                      <a href={selectedInterview.meetingLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#0085F7] hover:underline flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        {selectedInterview.meetingLink}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-muted-foreground">Not provided</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 rounded-b-2xl">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reschedule Modal */}
      <AnimatePresence>
        {showRescheduleModal && selectedInterview && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowRescheduleModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[101] border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <CalendarClock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Reschedule</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedInterview.id} - {selectedInterview.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowRescheduleModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleRescheduleSubmit}>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">New Date</label>
                    <input 
                      type="date" 
                      required
                      value={rescheduleForm.date}
                      onChange={e => setRescheduleForm({...rescheduleForm, date: e.target.value})}
                      className="w-full px-4 py-2 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Time Slot</label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {["9:00 - 9:30", "9:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30", "13:30 - 14:00"].map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setRescheduleForm({...rescheduleForm, timeSlot: slot})}
                          className={`py-2 px-1 text-[12px] font-medium rounded-xl border transition-all ${
                            rescheduleForm.timeSlot === slot
                              ? 'bg-secondary border-border/80 text-foreground shadow-sm font-bold'
                              : 'bg-transparent text-muted-foreground border-border/40 hover:bg-secondary/50 hover:text-foreground'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 rounded-b-2xl">
                  <button 
                    type="button"
                    onClick={() => setShowRescheduleModal(false)}
                    className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors"
                  >
                    Reschedule
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Update Modal */}
      <AnimatePresence>
        {showUpdateModal && selectedInterview && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowUpdateModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[101] border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Pencil className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Update Interview</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedInterview.id} - {selectedInterview.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowUpdateModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleUpdateSubmit}>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Status</label>
                      <SearchableSelect
                        options={[
                          { label: "Pending", value: "Pending" },
                          { label: "Scheduled", value: "Scheduled" },
                          { label: "Completed", value: "Completed" },
                          { label: "Cancelled", value: "Cancelled" }
                        ]}
                        value={updateForm.status}
                        onChange={val => setUpdateForm({...updateForm, status: val})}
                        placeholder="Select Status"
                        className="w-full h-[42px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Follow Up Date</label>
                      <input 
                        type="date" 
                        required
                        value={updateForm.followUpDate}
                        onChange={e => setUpdateForm({...updateForm, followUpDate: e.target.value})}
                        className="w-full px-4 py-2 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Comments</label>
                    <textarea 
                      required
                      rows={4}
                      value={updateForm.comments}
                      onChange={e => setUpdateForm({...updateForm, comments: e.target.value})}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Add an update comment..."
                    />
                  </div>
                </div>
                
                <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 rounded-b-2xl">
                  <button 
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors"
                  >
                    Save Update
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {showHistoryModal && selectedInterview && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowHistoryModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <FileText className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Interview History</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedInterview.id} - {selectedInterview.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-secondary/10">
                <div className="bg-white rounded-xl border border-border/50 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                        <tr>
                          <th className="px-6 py-4 font-bold tracking-widest whitespace-nowrap">Candidate Name</th>
                          <th className="px-4 py-4 font-bold tracking-widest whitespace-nowrap w-24">Status</th>
                          <th className="px-4 py-4 font-bold tracking-widest whitespace-nowrap w-24">Follow up Dt</th>
                          <th className="px-6 py-4 font-bold tracking-widest">Comments</th>
                          <th className="px-4 py-4 font-bold tracking-widest whitespace-nowrap w-24">Created Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {mockHistoryData.map((item) => (
                          <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{item.candidateName}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                item.statusName === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                item.statusName === 'Scheduled' ? 'bg-indigo-100 text-indigo-700' :
                                'bg-emerald-100 text-emerald-700'
                              }`}>
                                {item.statusName}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">{item.followUpDt}</td>
                            <td className="px-6 py-4 text-muted-foreground whitespace-normal">
                              {item.comments}
                            </td>
                            <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">{item.createdDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
