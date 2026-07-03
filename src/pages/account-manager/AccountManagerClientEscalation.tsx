import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchableSelect } from "../../components/SearchableSelect";
import { 
  Search, 
  Eye, 
  Edit2, 
  History, 
  Calendar, 
  MessageSquare, 
  Building, 
  User, 
  X, 
  RefreshCw,
  AlertCircle,
  Briefcase,
  LayoutGrid,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialEscalations = Array.from({ length: 12 }).map((_, i) => ({
  id: `ESC-00${i + 1}`,
  jobCode: `REQ-00${Math.floor(Math.random() * 8) + 1}`,
  company: ["TCS", "Wipro", "Infosys", "HCL"][i % 4],
  followedUpDate: `${Math.floor(Math.random() * 28) + 1} Oct 2026`,
  status: ["High", "Medium", "Resolved"][i % 3],
  comments: "Client is requesting immediate attention regarding the profile quality.",
  escalatedBy: ["Sarah Jenkins", "David Chen", "Michael Ross", "Emily Wang"][i % 4],
  escalatedDate: `${Math.floor(Math.random() * 28) + 1} Sep 2026`,
  history: [
    { id: 1, date: "10 Oct 2026", status: "Medium", comments: "Initial escalation received regarding profile quality." },
    { id: 2, date: "12 Oct 2026", status: "High", comments: "Escalated to High as client needs candidates urgently." },
    { id: 3, date: "15 Oct 2026", status: "Resolved", comments: "Provided 5 verified profiles meeting the criteria." },
  ]
}));

export default function AccountManagerClientEscalation() {
  const [escalations, setEscalations] = useState(initialEscalations);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "card">("card");

  // Modal states
  const [activeModal, setActiveModal] = useState<"view" | "edit" | "history" | null>(null);
  const [selectedEscalation, setSelectedEscalation] = useState<any>(null);

  // Edit form state
  const [editStatus, setEditStatus] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editComments, setEditComments] = useState("");

  const filteredEscalations = useMemo(() => {
    return escalations.filter(esc => {
      const matchSearch = esc.jobCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          esc.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus ? esc.status === filterStatus : true;
      return matchSearch && matchStatus;
    });
  }, [escalations, searchTerm, filterStatus]);

  const openModal = (type: "view" | "edit" | "history", escalation: any) => {
    setSelectedEscalation(escalation);
    setActiveModal(type);
    
    if (type === "edit") {
      setEditStatus(escalation.status);
      setEditDate(new Date().toISOString().split('T')[0]); // Default to today
      setEditComments("");
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedEscalation(null);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStatus) return;

    setEscalations(prev => prev.map(esc => {
      if (esc.id === selectedEscalation.id) {
        return {
          ...esc,
          status: editStatus,
          followedUpDate: editDate ? new Date(editDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : esc.followedUpDate,
        };
      }
      return esc;
    }));
    closeModal();
  };

  const STATUS_COLORS: Record<string, string> = {
    "Resolved": "bg-emerald-50 text-emerald-600 border-emerald-200",
    "Medium": "bg-amber-50 text-amber-600 border-amber-200",
    "High": "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Client Escalations</h1>
          <p className="text-slate-500 mt-1">Manage and track client issues and follow-ups</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setViewMode("card")}
            className={cn(
              "p-2 rounded-lg transition-colors flex items-center justify-center",
              viewMode === "card" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            )}
            title="Card View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-lg transition-colors flex items-center justify-center",
              viewMode === "grid" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            )}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Job Code or Company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2.5 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="relative w-full sm:w-48 shrink-0">
          <SearchableSelect
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Status"
            options={[
              { value: "", label: "All Statuses" },
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Resolved", label: "Resolved" }
            ]}
            className="h-[42px]"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto shrink-0 ml-auto">
          <button 
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("");
            }}
            className="w-[42px] shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 rounded-xl flex justify-center items-center transition-colors" 
            title="Reload Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl flex justify-center items-center text-sm shadow-sm hover:bg-primary/90 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "grid" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Job Code</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Followed Up Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEscalations.length > 0 ? filteredEscalations.map((esc) => (
                <tr key={esc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{esc.jobCode}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      {esc.company}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 text-xs font-bold rounded-lg border",
                      STATUS_COLORS[esc.status]
                    )}>
                      {esc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {esc.followedUpDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openModal("view", esc)}
                        className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openModal("edit", esc)}
                        className="p-1.5 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                        title="Update Status"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openModal("history", esc)}
                        className="p-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        title="View History"
                      >
                        <History className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No escalations found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEscalations.length > 0 ? filteredEscalations.map((esc) => (
            <motion.div 
              key={esc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{esc.jobCode}</h3>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 mt-1">
                      <Building className="w-3.5 h-3.5" />
                      {esc.company}
                    </div>
                  </div>
                  <span className={cn(
                    "px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-wider",
                    STATUS_COLORS[esc.status]
                  )}>
                    {esc.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium">Escalated by <span className="text-slate-800">{esc.escalatedBy}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium">Follow-up on <span className="text-slate-800">{esc.followedUpDate}</span></span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-sm font-medium text-slate-600 line-clamp-2">
                    {esc.comments}
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-50/80 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{esc.id}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openModal("view", esc)}
                    className="p-1.5 text-blue-600 bg-white border border-blue-100 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openModal("edit", esc)}
                    className="p-1.5 text-amber-600 bg-white border border-amber-100 hover:bg-amber-50 rounded-lg transition-colors"
                    title="Update Status"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openModal("history", esc)}
                    className="p-1.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                    title="View History"
                  >
                    <History className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-12 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200">
              No escalations found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {activeModal && selectedEscalation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]",
                activeModal === "history" ? "max-w-lg" : "max-w-2xl"
              )}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    {activeModal === "view" && <Eye className="w-5 h-5 text-blue-500" />}
                    {activeModal === "edit" && <Edit2 className="w-5 h-5 text-amber-500" />}
                    {activeModal === "history" && <History className="w-5 h-5 text-slate-500" />}
                    {activeModal === "view" ? "Escalation Details" : 
                     activeModal === "edit" ? "Update Escalation" : "Escalation History"}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{selectedEscalation.id}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* View Modal Content */}
              {activeModal === "view" && (
                <div className="p-6 overflow-y-auto space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> Job Code</p>
                      <p className="font-semibold text-slate-800">{selectedEscalation.jobCode}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Building className="w-3.5 h-3.5"/> Company</p>
                      <p className="font-semibold text-slate-800">{selectedEscalation.company}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> Escalated By</p>
                      <p className="font-semibold text-slate-800">{selectedEscalation.escalatedBy}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Escalated Date</p>
                      <p className="font-semibold text-slate-800">{selectedEscalation.escalatedDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/> Current Status</p>
                      <span className={cn(
                        "inline-block px-2.5 py-1 text-xs font-bold rounded-lg border mt-1",
                        STATUS_COLORS[selectedEscalation.status]
                      )}>
                        {selectedEscalation.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Last Follow Up</p>
                      <p className="font-semibold text-slate-800">{selectedEscalation.followedUpDate}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2"><MessageSquare className="w-3.5 h-3.5"/> Comments</p>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-medium text-slate-700 leading-relaxed">
                      {selectedEscalation.comments}
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Modal Content */}
              {activeModal === "edit" && (
                <form onSubmit={handleUpdate} className="flex flex-col h-full">
                  <div className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Update Status</label>
                        <SearchableSelect
                          value={editStatus}
                          onChange={setEditStatus}
                          placeholder="Select Status"
                          options={[
                            { value: "High", label: "High Priority" },
                            { value: "Medium", label: "Medium Priority" },
                            { value: "Resolved", label: "Resolved" }
                          ]}
                          className="h-[42px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">New Follow Up Date</label>
                        <input 
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Comments / Notes</label>
                      <textarea 
                        value={editComments}
                        onChange={(e) => setEditComments(e.target.value)}
                        placeholder="Add your findings or resolution details..."
                        rows={4}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex gap-3 justify-end">
                    <button 
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                    >
                      Update Escalation
                    </button>
                  </div>
                </form>
              )}

              {/* History Modal Content */}
              {activeModal === "history" && (
                <div className="p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {selectedEscalation.history.map((item: any) => (
                      <div key={item.id} className="relative pl-6 pb-6 border-l-2 border-slate-100 last:border-transparent last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-100" />
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" /> {item.date}
                            </span>
                            <span className={cn(
                              "px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg",
                              item.status === "Resolved" ? "bg-emerald-100 text-emerald-700" :
                              item.status === "High" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                            )}>
                              {item.status}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <p className="text-sm text-slate-700 font-medium leading-relaxed">
                              {item.comments}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
