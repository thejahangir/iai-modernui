import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Download, Calendar as CalendarIcon, History, Edit, X, User, Star, Briefcase, Eye, Link as LinkIcon, FileSpreadsheet, Copy } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";
import { getStatusBadgeClasses } from "../../../lib/utils";

const MOCK_COMPANIES = [
  { label: "Tech Mahindra", value: "techmahindra" },
  { label: "HCLTech", value: "hcltech" }
];

const MOCK_PRIMARY_FILTER = [
  { label: "Developer", value: "developer" },
  { label: "QA", value: "qa" },
  { label: "Manager", value: "manager" }
];

const initialData = [
  { id: "P001", name: "Aarohi Patel", designation: "Frontend Developer", recruiter: "Rohan Gupta", interviewDate: "2026-06-25", rating: "3.5", status: "In Progress", email: "kavya@example.com", mobileNo: "+91 98765 43210", jobCode: "DEV-001", createdDate: "2026-06-10", meetingUrl: "https://meet.google.com/abc-defg-hij", recordingUrl: "https://drive.google.com/...", iaiRecruiter: "Neha Mehta" },
  { id: "P002", name: "Rahul Sharma", designation: "QA Engineer", recruiter: "Priya Desai", interviewDate: "2026-06-26", rating: "4.0", status: "Selected", email: "rahul.s@example.com", mobileNo: "+91 87654 32109", jobCode: "QA-002", createdDate: "2026-06-12", meetingUrl: "https://meet.google.com/xyz-uvw-rst", recordingUrl: "https://drive.google.com/...", iaiRecruiter: "Ankit Jain" },
  { id: "P003", name: "Vikram Singh", designation: "Backend Developer", recruiter: "Rohan Gupta", interviewDate: "2026-06-28", rating: "2.5", status: "Rejected", email: "chandan@example.com", mobileNo: "+91 76543 21098", jobCode: "DEV-002", createdDate: "2026-06-15", meetingUrl: "https://meet.google.com/lmn-opqr-stu", recordingUrl: "https://drive.google.com/...", iaiRecruiter: "Neha Mehta" },
];

export default function SuperAdminAllProfiles() {
  const [data, setData] = useState(initialData);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterPrimary, setFilterPrimary] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Modals state
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const handleSearch = () => {
    // Implement search logic
  };

  const handleReset = () => {
    setFilterCompany("");
    setFilterPrimary("");
    setDateFrom("");
    setDateTo("");
  };

  const handleExportToExcel = () => {
    alert("Exporting to Excel...");
  };

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">All Profiles</h2>
        <p className="text-muted-foreground mt-1">View and manage all company candidate profiles.</p>
      </div>

      {/* Unified Action Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-3 px-4 rounded-2xl shadow-sm border border-border/50 flex flex-col xl:flex-row items-center justify-between gap-3 relative z-10"
      >
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 w-full xl:w-auto">
          <SearchableSelect
            options={MOCK_COMPANIES}
            value={filterCompany}
            onChange={(val) => setFilterCompany(val)}
            placeholder="Company"
            className="w-full lg:w-[220px] h-[42px]"
          />
          
          <div className="flex items-center h-[42px] bg-white border border-border/50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
             <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 h-full text-sm outline-none text-foreground bg-transparent w-[120px]" />
             <div className="px-2 text-xs font-bold text-muted-foreground uppercase bg-secondary/30 h-full flex items-center border-x border-border/50">to</div>
             <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 h-full text-sm outline-none text-foreground bg-transparent w-[120px]" />
          </div>

          <SearchableSelect
            options={MOCK_PRIMARY_FILTER}
            value={filterPrimary}
            onChange={(val) => setFilterPrimary(val)}
            placeholder="Primary Skills"
            className="w-full lg:w-[180px] h-[42px]"
          />

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button 
              onClick={handleSearch}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 h-[42px] px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            <button 
              onClick={handleReset}
              className="h-[42px] px-4 bg-secondary/50 text-muted-foreground hover:text-foreground text-sm font-bold rounded-xl hover:bg-secondary transition-all shrink-0"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full xl:w-auto justify-end border-t xl:border-t-0 xl:border-l border-border/50 pt-3 xl:pt-0 xl:pl-3">
          <button 
            onClick={handleExportToExcel}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-[42px] px-5 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#00A94B]/90 transition-all shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            Export to Excel
          </button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Designation</th>
                <th className="px-6 py-4 font-bold">Recruiter</th>
                <th className="px-6 py-4 font-bold">Interview Date</th>
                <th className="px-6 py-4 font-bold">Rating</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div className="font-bold text-foreground">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.designation}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.recruiter}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{item.interviewDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold ml-1 text-sm">{item.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadgeClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => { setSelectedProfile(item); setShowViewModal(true); }}
                        className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedProfile(item); setShowScheduleModal(true); }}
                        className="p-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
                        title="Schedule Interview"
                      >
                        <CalendarIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedProfile(item); setShowUpdateStatusModal(true); }}
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                        title="Update Status"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedProfile(item); setShowHistoryModal(true); }}
                        className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 hover:bg-purple-500 hover:text-white transition-colors"
                        title="View History"
                      >
                        <History className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                    No profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Update Status Modal */}
      <AnimatePresence>
        {showUpdateStatusModal && selectedProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setShowUpdateStatusModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Edit className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Update Status</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedProfile.name} • {selectedProfile.designation}</p>
                  </div>
                </div>
                <button onClick={() => setShowUpdateStatusModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Status</label>
                  <SearchableSelect options={[{label: "In Progress", value: "ip"}, {label: "Selected", value: "sel"}, {label: "Rejected", value: "rej"}]} value="" onChange={() => {}} placeholder="Select Status" className="w-full h-[42px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Next Followup Date</label>
                  <input type="date" className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Comments</label>
                  <textarea rows={3} className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Add comments..." />
                </div>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 rounded-b-2xl">
                <button onClick={() => setShowUpdateStatusModal(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors">Cancel</button>
                <button onClick={() => setShowUpdateStatusModal(false)} className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors">Update</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Schedule Interview Modal */}
      <AnimatePresence>
        {showScheduleModal && selectedProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setShowScheduleModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg"><CalendarIcon className="w-5 h-5 text-green-600" /></div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Schedule Interview</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedProfile.name} • {selectedProfile.designation}</p>
                  </div>
                </div>
                <button onClick={() => setShowScheduleModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <table className="w-full text-sm text-left whitespace-nowrap border border-border/50 rounded-xl overflow-hidden">
                  <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                    <tr>
                      <th className="px-4 py-3 font-bold">Interview Rounds</th>
                      <th className="px-4 py-3 font-bold">Interview Date</th>
                      <th className="px-4 py-3 font-bold">Meeting Link</th>
                      <th className="px-4 py-3 font-bold">Rating</th>
                      <th className="px-4 py-3 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">Technical Round 1</td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-25</td>
                      <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer flex items-center gap-1"><LinkIcon className="w-3 h-3" /> Join Meet</td>
                      <td className="px-4 py-3 font-bold">3.5</td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg mr-2 transition-colors">Schedule</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors">Reschedule</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">HR Round</td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-27</td>
                      <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer flex items-center gap-1"><LinkIcon className="w-3 h-3" /> Join Meet</td>
                      <td className="px-4 py-3 font-bold">-</td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg mr-2 transition-colors">Schedule</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors">Reschedule</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* View History Modal */}
      <AnimatePresence>
        {showHistoryModal && selectedProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setShowHistoryModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg"><History className="w-5 h-5 text-purple-600" /></div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">History</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedProfile.name} • {selectedProfile.designation}</p>
                  </div>
                </div>
                <button onClick={() => setShowHistoryModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <table className="w-full text-sm text-left whitespace-nowrap border border-border/50 rounded-xl overflow-hidden">
                  <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                    <tr>
                      <th className="px-4 py-3 font-bold">Candidate Name</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                      <th className="px-4 py-3 font-bold">Follow Up Dt</th>
                      <th className="px-4 py-3 font-bold">Comments</th>
                      <th className="px-4 py-3 font-bold">Created Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">{selectedProfile.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold border ${getStatusBadgeClasses(selectedProfile.status)}`}>
                          {selectedProfile.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-30</td>
                      <td className="px-4 py-3 text-muted-foreground">Follow up after round 1</td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-25</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-foreground">{selectedProfile.name}</td>
                      <td className="px-4 py-3">
                         <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold border ${getStatusBadgeClasses("New")}`}>
                          New
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-26</td>
                      <td className="px-4 py-3 text-muted-foreground">Profile created</td>
                      <td className="px-4 py-3 text-muted-foreground">2026-06-25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* View Profile Details Modal */}
      <AnimatePresence>
        {showViewModal && selectedProfile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setShowViewModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg"><Eye className="w-5 h-5 text-orange-600" /></div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Profile Details</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedProfile.name}</p>
                  </div>
                </div>
                <button onClick={() => setShowViewModal(false)} className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 overflow-y-auto space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border/50 pb-2">Basic Info</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Name</p>
                        <p className="font-semibold text-foreground">{selectedProfile.name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Email Id</p>
                        <p className="font-semibold text-foreground truncate" title={selectedProfile.email}>{selectedProfile.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Mobile No</p>
                        <div 
                          className="font-semibold text-foreground flex items-center gap-2 group/copy cursor-pointer w-fit"
                          onClick={() => navigator.clipboard.writeText(selectedProfile.mobileNo)}
                          title="Copy to clipboard"
                        >
                          <span className="group-hover/copy:text-primary transition-colors">{selectedProfile.mobileNo}</span>
                          <Copy className="w-3.5 h-3.5 opacity-0 group-hover/copy:opacity-100 transition-opacity text-muted-foreground group-hover/copy:text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Created Date</p>
                        <p className="font-semibold text-foreground">{selectedProfile.createdDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border/50 pb-2">Job Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Designation</p>
                        <p className="font-semibold text-foreground">{selectedProfile.designation}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Jobcode</p>
                        <p className="font-semibold text-foreground">{selectedProfile.jobCode}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Recruiter</p>
                        <p className="font-semibold text-foreground">{selectedProfile.recruiter}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">IAI Recruiter</p>
                        <p className="font-semibold text-foreground">{selectedProfile.iaiRecruiter}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interview Info */}
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border/50 pb-2">Interview Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Interview Date</p>
                        <p className="font-semibold text-foreground">{selectedProfile.interviewDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Rating</p>
                        <div className="flex items-center text-orange-500">
                           <Star className="w-3.5 h-3.5 fill-current" />
                           <span className="font-bold ml-1">{selectedProfile.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Status</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${getStatusBadgeClasses(selectedProfile.status)}`}>
                          {selectedProfile.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Meeting URL</p>
                        <a href="#" className="font-semibold text-blue-600 hover:underline flex items-center gap-1 truncate" title={selectedProfile.meetingUrl}>
                          <LinkIcon className="w-3 h-3" />
                          {selectedProfile.meetingUrl}
                        </a>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-bold mb-1">Recording URL</p>
                        <a href="#" className="font-semibold text-blue-600 hover:underline flex items-center gap-1 truncate" title={selectedProfile.recordingUrl}>
                          <LinkIcon className="w-3 h-3" />
                          {selectedProfile.recordingUrl}
                        </a>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 rounded-b-2xl">
                <button onClick={() => setShowViewModal(false)} className="px-6 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors">Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

