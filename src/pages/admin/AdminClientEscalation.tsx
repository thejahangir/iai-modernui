import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Pencil, History, Building2, Calendar, Briefcase, FileText, X, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";
import { getStatusBadgeClasses } from "../../../lib/utils";

const initialData = [
  { id: "ESC-001", jobCode: "JC-1001", company: "TechNova Inc.", followUpDate: "2026-06-25", status: "Open", comments: "Client requested an urgent update on candidate pipeline.", escalatedBy: "Kavya Nair", escalatedDate: "2026-06-18" },
  { id: "ESC-002", jobCode: "JC-1002", company: "Aether Solutions", followUpDate: "2026-06-21", status: "In Progress", comments: "Discussing technical requirements mismatch.", escalatedBy: "Sameer Verma", escalatedDate: "2026-06-15" },
  { id: "ESC-003", jobCode: "JC-1005", company: "Quantum Analytics", followUpDate: "2026-06-20", status: "Resolved", comments: "Interview scheduled for top 3 candidates.", escalatedBy: "Kavya Nair", escalatedDate: "2026-06-10" },
];

const mockCompanies = [
  { id: "C-01", name: "TechNova Inc." },
  { id: "C-02", name: "Aether Solutions" },
  { id: "C-03", name: "Quantum Analytics" },
];

const mockJobCodes = [
  { id: "JC-1001", name: "JC-1001" },
  { id: "JC-1002", name: "JC-1002" },
  { id: "JC-1005", name: "JC-1005" },
];

const mockHistoryData = [
  { id: "H-001", jobCode: "JC-1001", company: "TechNova Inc.", followUpDate: "2026-06-25", comments: "Client requested an urgent update on candidate pipeline.", escalatedBy: "Kavya Nair", escalatedDate: "2026-06-18", status: "Open" },
  { id: "H-002", jobCode: "JC-1001", company: "TechNova Inc.", followUpDate: "2026-06-20", comments: "Initial escalation received regarding slow pipeline.", escalatedBy: "Kavya Nair", escalatedDate: "2026-06-15", status: "Resolved" },
];

export default function AdminClientEscalation() {
  const [data] = useState(initialData);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    company: "",
    jobCode: ""
  });
  
  // Modals state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedEscalation, setSelectedEscalation] = useState<any>(null);

  const [updateForm, setUpdateForm] = useState({ status: "", nextFollowUpDate: "", comments: "" });

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleReset = () => {
    setFilters({ startDate: "", endDate: "", company: "", jobCode: "" });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating escalation:", selectedEscalation?.id, updateForm);
    setShowUpdateModal(false);
    setSelectedEscalation(null);
    setUpdateForm({ status: "", nextFollowUpDate: "", comments: "" });
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Client Escalations</h2>
          <p className="text-muted-foreground mt-1">Track and manage client escalations and follow-ups.</p>
        </div>
      </div>

      {/* Toolbar / Search Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
        
        <div className="p-4 flex flex-col xl:flex-row items-center gap-4">
          <div className="flex items-center gap-2 shrink-0 w-full xl:w-auto">
            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-foreground">Filters</h3>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Start Date */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within/input:text-primary transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full h-10 pl-9 pr-4 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 hover:border-primary/40 text-foreground"
              />
            </div>

            {/* End Date */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within/input:text-primary transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full h-10 pl-9 pr-4 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 hover:border-primary/40 text-foreground"
              />
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <SearchableSelect
                options={mockCompanies.map(c => ({ label: c.name, value: c.id }))}
                value={filters.company}
                onChange={(val) => setFilters({ ...filters, company: val })}
                placeholder="Company"
                icon={<Building2 className="w-4 h-4 text-muted-foreground" />}
                className="w-full h-10"
              />
            </div>

            {/* Job Code Dropdown */}
            <div className="relative">
              <SearchableSelect
                options={mockJobCodes.map(jc => ({ label: jc.name, value: jc.id }))}
                value={filters.jobCode}
                onChange={(val) => setFilters({ ...filters, jobCode: val })}
                placeholder="Job Code"
                icon={<Briefcase className="w-4 h-4 text-muted-foreground" />}
                className="w-full h-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full xl:w-auto justify-end">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 h-10 px-4 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#00A94B]/90 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button 
              onClick={handleSearch}
              className="flex items-center gap-2 h-10 px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all hover:shadow-md hover:shadow-primary/30 active:scale-95"
            >
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
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-lg hover:border-[#0085F7]/30 transition-all duration-300"
      >
        {data.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No client escalations found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest">Job Code</th>
                <th className="px-6 py-4 font-bold tracking-widest">Company</th>
                <th className="px-6 py-4 font-bold tracking-widest">Follow up Date</th>
                <th className="px-6 py-4 font-bold tracking-widest">Status</th>
                <th className="px-6 py-4 font-bold tracking-widest">Comments</th>
                <th className="px-6 py-4 font-bold tracking-widest">Escalated by</th>
                <th className="px-6 py-4 font-bold tracking-widest">Escalated Date</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.jobCode}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.company}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.followUpDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate" title={item.comments}>
                    {item.comments}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.escalatedBy}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.escalatedDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedEscalation(item);
                          setShowUpdateModal(true);
                          setUpdateForm({ status: item.status, nextFollowUpDate: item.followUpDate, comments: "" });
                        }}
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        title="Update Escalation"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedEscalation(item);
                          setShowHistoryModal(true);
                        }}
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

      {/* Update Escalation Modal */}
      <AnimatePresence>
        {showUpdateModal && selectedEscalation && (
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
                    <h3 className="text-xl font-bold font-heading text-foreground">Update Escalation</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedEscalation.jobCode} - {selectedEscalation.company}</p>
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
                          { label: "Open", value: "Open" },
                          { label: "In Progress", value: "In Progress" },
                          { label: "Resolved", value: "Resolved" }
                        ]}
                        value={updateForm.status}
                        onChange={val => setUpdateForm({...updateForm, status: val})}
                        placeholder="Select Status"
                        className="w-full h-[42px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Next Follow Up</label>
                      <input 
                        type="date" 
                        required
                        value={updateForm.nextFollowUpDate}
                        onChange={e => setUpdateForm({...updateForm, nextFollowUpDate: e.target.value})}
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
        {showHistoryModal && selectedEscalation && (
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
                    <h3 className="text-xl font-bold font-heading text-foreground">Escalation History</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedEscalation.jobCode} - {selectedEscalation.company}</p>
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
                          <th className="px-4 py-4 font-bold tracking-widest whitespace-nowrap w-24">Follow up Dt</th>
                          <th className="px-4 py-4 font-bold tracking-widest whitespace-nowrap w-24">Status</th>
                          <th className="px-6 py-4 font-bold tracking-widest">Comments</th>
                          <th className="px-6 py-4 font-bold tracking-widest whitespace-nowrap">Escalated by</th>
                          <th className="px-4 py-4 font-bold tracking-widest whitespace-nowrap w-24">Escalated Dt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {mockHistoryData.map((item) => (
                          <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                            <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">{item.followUpDate}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClasses(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground whitespace-normal">
                              {item.comments}
                            </td>
                            <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{item.escalatedBy}</td>
                            <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">{item.escalatedDate}</td>
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
