import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Pencil, History, Trash2, CalendarCheck, CalendarIcon, X } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";
import { getStatusBadgeClasses } from "../../../lib/utils";

// Mock data
const mockData = [
  {
    id: "FU-1001",
    candidateName: "Rohan Gupta",
    email: "rohan@example.com",
    mobile: "+1 234 567 8900",
    status: "Pending",
    followUpDate: "2026-06-20",
    company: "Tech Mahindra",
    jobCode: "DEV-123",
    updatedOn: "2026-06-19",
  },
  {
    id: "FU-1002",
    candidateName: "Priya Desai",
    email: "priya@example.com",
    mobile: "+1 987 654 3210",
    status: "In Progress",
    followUpDate: "2026-06-20",
    company: "Wipro",
    jobCode: "UX-456",
    updatedOn: "2026-06-18",
  }
];

const mockHistory = [
  { id: 1, candidateName: "Rohan Gupta", status: "Called", followUpDate: "2026-06-18", comments: "Candidate requested call back tomorrow.", createdDate: "2026-06-18" },
  { id: 2, candidateName: "Rohan Gupta", status: "Emailed", followUpDate: "2026-06-15", comments: "Sent initial follow up email.", createdDate: "2026-06-15" }
];

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed", "Called", "Emailed", "No Answer"];

export default function SuperAdminTodaysFollowups() {
  const [data, setData] = useState(mockData);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: ""
  });

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const [editForm, setEditForm] = useState({
    status: "",
    nextFollowUpDate: "",
    comments: ""
  });

  const handleSearch = () => {
    console.log("Searching with:", filters);
    // In a real app, this would filter the data based on dates
  };

  const handleReset = () => {
    setFilters({ fromDate: "", toDate: "" });
  };

  const handleEditSave = () => {
    if (!editForm.status) {
      alert("Please select a status");
      return;
    }
    
    setData(data.map(item => 
      item.id === selectedItem.id 
        ? { ...item, status: editForm.status, followUpDate: editForm.nextFollowUpDate || item.followUpDate } 
        : item
    ));
    
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== selectedItem.id));
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Today's Follow-ups</h2>
          <p className="text-muted-foreground mt-1">Manage and track candidate follow-up statuses.</p>
        </div>
      </div>

      {/* Date Range Selection Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
        
        <div className="p-4 flex flex-col sm:flex-row items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="space-y-2 w-full sm:w-48">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">From Date</label>
              <input 
                type="date" 
                value={filters.fromDate}
                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                className="w-full h-10 px-4 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
              />
            </div>
            <div className="space-y-2 w-full sm:w-48">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">To Date</label>
              <input 
                type="date" 
                value={filters.toDate}
                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                className="w-full h-10 px-4 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={handleReset}
              className="flex items-center justify-center gap-2 h-10 px-4 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl shadow-sm hover:bg-secondary/80 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button 
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 h-10 px-8 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto"
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
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        {data.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <CalendarCheck className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No follow-ups found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-widest">Candidate Name</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Email ID</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Mobile No</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Status</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Follow Up</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Company</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Jobcode</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Updated on</th>
                  <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4 font-bold text-foreground">{item.candidateName}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.email}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.mobile}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadgeClasses(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">{item.followUpDate}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.company}</td>
                    <td className="px-6 py-4 text-muted-foreground font-mono bg-secondary/30 rounded px-2">{item.jobCode}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.updatedOn}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedItem(item);
                            setEditForm({
                              status: item.status,
                              nextFollowUpDate: item.followUpDate,
                              comments: ""
                            });
                            setShowEditModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                          title="Edit Status"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedItem(item);
                            setShowHistoryModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
                          title="View History"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
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

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedItem && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowEditModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 bg-secondary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Pencil className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Update status</h3>
                    <p className="text-sm font-semibold text-muted-foreground mt-0.5">{selectedItem.candidateName} - {selectedItem.jobCode}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Status</label>
                  <SearchableSelect
                    options={STATUS_OPTIONS.map(opt => ({ label: opt, value: opt }))}
                    value={editForm.status}
                    onChange={(val) => setEditForm({ ...editForm, status: val })}
                    placeholder="Select Status"
                    className="w-full h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Next Follow up date</label>
                  <input 
                    type="date"
                    value={editForm.nextFollowUpDate}
                    onChange={(e) => setEditForm({ ...editForm, nextFollowUpDate: e.target.value })}
                    className="w-full h-11 px-4 bg-secondary/30 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Comments</label>
                  <textarea 
                    value={editForm.comments}
                    onChange={(e) => setEditForm({ ...editForm, comments: e.target.value })}
                    rows={3}
                    className="w-full p-4 bg-secondary/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Add your comments here..."
                  />
                </div>
              </div>

              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditSave}
                  className="px-8 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm hover:shadow-md hover:shadow-primary/20 transition-all active:scale-95"
                >
                  Update
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {showHistoryModal && selectedItem && (
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-border/50 flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 bg-secondary/20 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <History className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Follow-up History</h3>
                    <p className="text-sm font-semibold text-muted-foreground mt-0.5">{selectedItem.candidateName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {mockHistory.length === 0 ? (
                  <div className="p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                      <History className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">No History Yet</h3>
                    <p className="text-muted-foreground max-w-sm">No follow-up history is available for this candidate.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-border/50">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                      <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                        <tr>
                          <th className="px-6 py-4 font-bold tracking-widest">Candidate Name</th>
                          <th className="px-6 py-4 font-bold tracking-widest">Status</th>
                          <th className="px-6 py-4 font-bold tracking-widest">Follow Up Date</th>
                          <th className="px-6 py-4 font-bold tracking-widest">Comments</th>
                          <th className="px-6 py-4 font-bold tracking-widest">Created Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {mockHistory.map((hist) => (
                          <tr key={hist.id} className="hover:bg-primary/5 transition-colors group">
                            <td className="px-6 py-4 font-bold text-foreground">{hist.candidateName}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadgeClasses(hist.status)}`}>
                                {hist.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">{hist.followUpDate}</td>
                            <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate" title={hist.comments}>{hist.comments}</td>
                            <td className="px-6 py-4 text-muted-foreground">{hist.createdDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedItem && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-border/50"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <Trash2 className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Delete Follow-up</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you sure you want to delete the follow-up for <span className="font-bold text-foreground">"{selectedItem.candidateName}"</span>? This action cannot be undone.
                </p>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-bold text-white bg-destructive hover:bg-destructive/90 rounded-xl shadow-sm transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

