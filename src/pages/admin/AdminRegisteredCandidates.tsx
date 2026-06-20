import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, X, Eye, Download, Trash2, CheckCircle2, XCircle, User } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const initialData = [
  {
    id: "CAN-2001",
    name: "Jahnavi Pudi",
    email: "jahnavi.p@example.com",
    mobile: "9876543210",
    primarySkill: "Python",
    experience: "4 Years",
    registeredDate: "01-10-2025",
    verified: true,
    interviewDate: "11-11-2025 - 21:30",
    rating: "3.5/5",
  },
  {
    id: "CAN-2002",
    name: "Rohan Gupta",
    email: "rohan.gupta@example.com",
    mobile: "+1 555-0202",
    primarySkill: "Node.js",
    experience: "6 Years",
    registeredDate: "15-10-2025",
    verified: false,
    interviewDate: "12-11-2025 - 10:00",
    rating: "4.5/5",
  },
];

export default function AdminRegisteredCandidates() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", primarySkill: "" });
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const handleSearch = () => {
    console.log("Searching with:", filters);
  };

  const handleReset = () => {
    setFilters({ startDate: "", endDate: "", primarySkill: "" });
  };

  const handleView = (item: any) => {
    setSelectedCandidate(item);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleDownload = (name: string) => {
    console.log("Downloading resume for", name);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Registered Candidates</h2>
          <p className="text-muted-foreground mt-1">Manage and view all registered candidates under Candidate profile.</p>
        </div>
      </div>

      {/* Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="p-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto flex-1 max-w-3xl">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 ml-1">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full h-9 px-3 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/40 text-foreground"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 ml-1">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full h-9 px-3 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/40 text-foreground"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 ml-1">Primary Skill</label>
              <SearchableSelect
                options={[
                  { label: "React", value: "React" },
                  { label: "Python", value: "Python" },
                  { label: "Node.js", value: "Node.js" },
                  { label: "Java", value: "Java" },
                  { label: "DevOps", value: "DevOps" }
                ]}
                value={filters.primarySkill}
                onChange={(val) => setFilters({ ...filters, primarySkill: val })}
                placeholder="Select Skill"
                className="w-full h-9"
              />
            </div>
          </div>

          <div className="flex items-end gap-2 w-full sm:w-auto mt-5 sm:mt-0">
            <button 
              onClick={handleReset}
              className="flex items-center justify-center gap-2 h-9 px-4 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#00A94B]/90 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button 
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 h-9 px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
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
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No registered candidates found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest">Unique ID</th>
                <th className="px-6 py-4 font-bold tracking-widest">Name</th>
                <th className="px-6 py-4 font-bold tracking-widest">Primary Skill</th>
                <th className="px-6 py-4 font-bold tracking-widest">Experience</th>
                <th className="px-6 py-4 font-bold tracking-widest">Verified</th>
                <th className="px-6 py-4 font-bold tracking-widest">Rating</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">{item.id}</td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.primarySkill}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.experience}</td>
                  <td className="px-6 py-4">
                    {item.verified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 text-xs font-bold">
                        <XCircle className="w-3.5 h-3.5" />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">{item.rating}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleDownload(item.name)}
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                        title="Download Resume"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleView(item)}
                        className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
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
        {showModal && selectedCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-3xl shadow-2xl z-[101] flex flex-col max-h-[90vh] border border-border/50"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground tracking-tight">Candidate Details</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedCandidate.id} - {selectedCandidate.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-secondary/30 rounded-2xl border border-border/50">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Email ID</p>
                      <p className="text-[14px] font-semibold text-foreground">{selectedCandidate.email}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Mobile No</p>
                      <p className="text-[14px] font-semibold text-foreground">{selectedCandidate.mobile}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Primary Skill</p>
                      <p className="text-[14px] font-semibold text-foreground">{selectedCandidate.primarySkill}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Experience</p>
                      <p className="text-[14px] font-semibold text-foreground">{selectedCandidate.experience}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Registered Date</p>
                      <p className="text-[14px] font-semibold text-foreground">{selectedCandidate.registeredDate}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Verified</p>
                      <p className="text-[14px] font-semibold text-foreground">
                        {selectedCandidate.verified ? "Yes (Verified)" : "No (Pending)"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Interview Date</p>
                      <p className="text-[14px] font-semibold text-foreground">{selectedCandidate.interviewDate}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Rating</p>
                      <p className="text-[14px] font-semibold text-foreground">{selectedCandidate.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer Buttons */}
              <div className="px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 bg-secondary/10 rounded-b-3xl">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-sm font-bold text-secondary-foreground bg-white border border-border/50 hover:bg-secondary rounded-xl shadow-sm transition-all active:scale-95"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
