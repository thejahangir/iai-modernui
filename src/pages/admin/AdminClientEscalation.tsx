import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, RotateCcw, Pencil, History, Building2, Calendar, 
  Briefcase, FileText, X, AlertCircle, CheckCircle2, 
  Clock, Flame, MoreVertical, MessageSquare, Plus, Filter
} from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const initialData = [
  { id: "ESC-001", jobCode: "JC-1001", company: "Wipro", followUpDate: "2026-06-25", status: "Open", comments: "Client requested an urgent update on candidate pipeline.", escalatedBy: "Kavya Nair", escalatedDate: "2026-06-18" },
  { id: "ESC-002", jobCode: "JC-1002", company: "TCS", followUpDate: "2026-06-21", status: "In Progress", comments: "Discussing technical requirements mismatch.", escalatedBy: "Sameer Verma", escalatedDate: "2026-06-15" },
  { id: "ESC-003", jobCode: "JC-1005", company: "Infosys", followUpDate: "2026-06-20", status: "Resolved", comments: "Interview scheduled for top 3 candidates.", escalatedBy: "Kavya Nair", escalatedDate: "2026-06-10" },
  { id: "ESC-004", jobCode: "JC-1009", company: "Tech Mahindra", followUpDate: "2026-06-22", status: "Open", comments: "Client is unhappy with the candidate quality.", escalatedBy: "Divya Prasad", escalatedDate: "2026-06-21" },
];

const mockCompanies = [
  { id: "C-01", name: "Wipro" },
  { id: "C-02", name: "TCS" },
  { id: "C-03", name: "Infosys" },
  { id: "C-04", name: "Tech Mahindra" },
];

const mockJobCodes = [
  { id: "JC-1001", name: "JC-1001" },
  { id: "JC-1002", name: "JC-1002" },
  { id: "JC-1005", name: "JC-1005" },
  { id: "JC-1009", name: "JC-1009" },
];

const mockHistoryData = [
  { id: "H-001", date: "2026-06-20 14:30", status: "Open", user: "Kavya Nair", comment: "Client escalated the issue regarding slow pipeline." },
  { id: "H-002", date: "2026-06-21 09:15", status: "In Progress", user: "System", comment: "Ticket assigned to recruitment team." },
  { id: "H-003", date: "2026-06-22 16:45", status: "In Progress", user: "Sameer Verma", comment: "Spoke with client, promised new profiles by tomorrow." },
  { id: "H-004", date: "2026-06-24 11:00", status: "Resolved", user: "Kavya Nair", comment: "Profiles shared and approved. Interviews scheduled." },
];

export default function AdminClientEscalation() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    company: "",
    jobCode: "",
    status: ""
  });
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Modals state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedEscalation, setSelectedEscalation] = useState<any>(null);

  const [updateForm, setUpdateForm] = useState({ status: "", nextFollowUpDate: "", comments: "" });

  const [appliedFilters, setAppliedFilters] = useState({
    company: "",
    jobCode: "",
    status: ""
  });

  const stats = useMemo(() => {
    return {
      open: data.filter(d => d.status === "Open").length,
      inProgress: data.filter(d => d.status === "In Progress").length,
      resolved: data.filter(d => d.status === "Resolved").length,
    };
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const companyMatch = appliedFilters.company 
        ? item.company === mockCompanies.find(c => c.id === appliedFilters.company)?.name 
        : true;
      const jobCodeMatch = appliedFilters.jobCode 
        ? item.jobCode === mockJobCodes.find(jc => jc.id === appliedFilters.jobCode)?.name 
        : true;
      const statusMatch = appliedFilters.status
        ? item.status === appliedFilters.status
        : true;
      
      return companyMatch && jobCodeMatch && statusMatch;
    });
  }, [data, appliedFilters.company, appliedFilters.jobCode, appliedFilters.status]);

  const handleSearch = () => {
    setAppliedFilters({
      company: filters.company,
      jobCode: filters.jobCode,
      status: filters.status
    });
  };

  const handleReset = () => {
    setFilters({ startDate: "", endDate: "", company: "", jobCode: "", status: "" });
    setAppliedFilters({ company: "", jobCode: "", status: "" });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData(prev => prev.map(item => {
      if (item.id === selectedEscalation.id) {
        return {
          ...item,
          status: updateForm.status || item.status,
          followUpDate: updateForm.nextFollowUpDate || item.followUpDate,
        };
      }
      return item;
    }));
    setShowUpdateModal(false);
    setSelectedEscalation(null);
    setUpdateForm({ status: "", nextFollowUpDate: "", comments: "" });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Open": return "bg-red-100 text-red-700 border-red-200";
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Resolved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Open": return <AlertCircle className="w-4 h-4" />;
      case "In Progress": return <Clock className="w-4 h-4" />;
      case "Resolved": return <CheckCircle2 className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 relative pb-10">
      <div className="flex justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground tracking-tight">Client Escalations</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Track, update, and resolve urgent client issues.</p>
        </div>
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center gap-2 px-3 py-2 bg-secondary text-foreground text-sm font-bold rounded-xl active:scale-95"
        >
          <Filter className="w-4 h-4" />
          {showMobileFilters ? "Hide" : "Filter"}
        </button>
      </div>

      {/* KPI Summary Cards - Bento Box Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {/* Primary Card (Full width on mobile, 1 column on desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="col-span-2 md:col-span-1 bg-gradient-to-br from-red-50 to-white rounded-3xl p-5 md:p-6 border border-red-100 shadow-sm relative overflow-hidden group flex flex-col justify-center"
        >
          <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Flame className="w-20 h-20 md:w-24 md:h-24 text-red-500" />
          </div>
          <div className="relative z-10 flex items-center justify-between md:flex-col md:items-start md:justify-start">
            <p className="text-xs md:text-sm font-bold text-red-600 uppercase tracking-widest mb-0 md:mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Open
            </p>
            <h3 className="text-4xl md:text-5xl font-black text-red-700">{stats.open}</h3>
          </div>
        </motion.div>

        {/* Secondary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="col-span-1 bg-white rounded-3xl p-4 md:p-6 border border-border/50 shadow-sm relative overflow-hidden group flex flex-col justify-center"
        >
          <div className="absolute top-0 right-0 p-3 md:p-6 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Clock className="w-16 h-16 md:w-24 md:h-24 text-blue-500" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1 md:mb-2 flex items-center gap-1.5 md:gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500" /> In Progress
            </p>
            <h3 className="text-2xl md:text-4xl font-black text-foreground">{stats.inProgress}</h3>
          </div>
        </motion.div>

        {/* Tertiary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="col-span-1 bg-white rounded-3xl p-4 md:p-6 border border-border/50 shadow-sm relative overflow-hidden group flex flex-col justify-center"
        >
          <div className="absolute top-0 right-0 p-3 md:p-6 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-16 h-16 md:w-24 md:h-24 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1 md:mb-2 flex items-center gap-1.5 md:gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500" /> Resolved
            </p>
            <h3 className="text-2xl md:text-4xl font-black text-foreground">{stats.resolved}</h3>
          </div>
        </motion.div>
      </div>

      {/* Toolbar / Search Panel */}
      <AnimatePresence initial={false}>
        {(!isMobile || showMobileFilters) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:!opacity-100 md:!h-auto overflow-hidden"
          >
            <div className="pt-4 md:pt-0">
              <div className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-3 w-full">
                  <div className="xl:col-span-2 relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within/input:text-primary transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full h-12 pl-9 pr-2 bg-secondary/30 rounded-2xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-foreground"
              />
            </div>

            <div className="xl:col-span-2 relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within/input:text-primary transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full h-12 pl-9 pr-2 bg-secondary/30 rounded-2xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-foreground"
              />
            </div>

            <div className="xl:col-span-3">
              <SearchableSelect
                options={mockCompanies.map(c => ({ label: c.name, value: c.id }))}
                value={filters.company}
                onChange={(val) => setFilters({ ...filters, company: val })}
                placeholder="Company"
                icon={<Building2 className="w-4 h-4 text-muted-foreground" />}
                className="w-full h-12 rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
              />
            </div>

            <div className="xl:col-span-3">
              <SearchableSelect
                options={mockJobCodes.map(jc => ({ label: jc.name, value: jc.id }))}
                value={filters.jobCode}
                onChange={(val) => setFilters({ ...filters, jobCode: val })}
                placeholder="Job Code"
                icon={<Briefcase className="w-4 h-4 text-muted-foreground" />}
                className="w-full h-12 rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
              />
            </div>
            
            <div className="xl:col-span-2">
              <SearchableSelect
                options={[
                  { label: "Open", value: "Open" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Resolved", value: "Resolved" }
                ]}
                value={filters.status}
                onChange={(val) => setFilters({ ...filters, status: val })}
                placeholder="Status"
                icon={<AlertCircle className="w-4 h-4 text-muted-foreground" />}
                className="w-full h-12 rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-5">
          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-[48px] px-6 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex-1 sm:flex-none"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center justify-center gap-2 h-[48px] px-5 bg-secondary text-muted-foreground hover:text-foreground text-sm font-bold rounded-2xl hover:bg-black/5 transition-all shrink-0 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticket List View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <AnimatePresence>
          {filteredData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-16 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-border/50"
            >
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No escalations found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search filters.</p>
            </motion.div>
          ) : (
            filteredData.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-4 md:p-6 border border-border/50 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                {/* Status color bar on the left */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.status === 'Open' ? 'bg-red-500' : item.status === 'In Progress' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
              
              <div className="flex flex-col xl:flex-row gap-6">
                
                {/* Left: Main Ticket Info */}
                <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-lg font-bold text-foreground">{item.company}</h4>
                      <span className="text-xs font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                        {item.id}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Latest Comment:</strong> {item.comments}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground pt-2">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" /> Job: <span className="text-foreground">{item.jobCode}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> Escalated: <span className="text-foreground">{item.escalatedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-primary" /> Follow Up: <span className="text-primary font-bold">{item.followUpDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions & Assigned To */}
                <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-4 border-t xl:border-t-0 xl:border-l border-border/50 pt-4 xl:pt-0 xl:pl-6 shrink-0">
                  <div className="text-left xl:text-right">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Escalated By</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {item.escalatedBy.charAt(0)}
                      </div>
                      <p className="text-sm font-bold text-foreground">{item.escalatedBy}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setSelectedEscalation(item);
                        setShowHistoryModal(true);
                      }}
                      className="p-2.5 rounded-xl bg-secondary text-foreground hover:bg-black/5 transition-colors border border-transparent hover:border-border/50"
                      title="View Timeline History"
                    >
                      <History className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEscalation(item);
                        setUpdateForm({ status: item.status, nextFollowUpDate: item.followUpDate, comments: "" });
                        setShowUpdateModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-bold text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Reply / Update
                    </button>
                  </div>
                </div>

              </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Quick Reply / Update Modal */}
      <AnimatePresence>
        {showUpdateModal && selectedEscalation && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowUpdateModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[101] border border-border/50 overflow-hidden"
            >
              <div className="bg-secondary/30 px-6 py-5 border-b border-border/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-foreground">Add Update</h3>
                    <p className="text-xs font-bold text-muted-foreground">{selectedEscalation.id} • {selectedEscalation.company}</p>
                  </div>
                </div>
                <button onClick={() => setShowUpdateModal(false)} className="p-2 rounded-xl hover:bg-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleUpdateSubmit}>
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Status Change</label>
                    <SearchableSelect
                      options={[
                        { label: "Open", value: "Open" },
                        { label: "In Progress", value: "In Progress" },
                        { label: "Resolved", value: "Resolved" }
                      ]}
                      value={updateForm.status}
                      onChange={val => setUpdateForm({...updateForm, status: val})}
                      placeholder="Select Status"
                      className="w-full h-12 rounded-2xl bg-secondary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Next Follow Up</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        type="date" 
                        required
                        value={updateForm.nextFollowUpDate}
                        onChange={e => setUpdateForm({...updateForm, nextFollowUpDate: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-secondary/30 border border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Your Reply / Comment</label>
                    <textarea 
                      required
                      rows={4}
                      value={updateForm.comments}
                      onChange={e => setUpdateForm({...updateForm, comments: e.target.value})}
                      className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-foreground placeholder:text-muted-foreground"
                      placeholder="Describe what action was taken..."
                    />
                  </div>
                </div>
                
                <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50">
                  <button 
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-md shadow-primary/20 transition-all active:scale-95"
                  >
                    Post Update
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Vertical Timeline History Modal */}
      <AnimatePresence>
        {showHistoryModal && selectedEscalation && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowHistoryModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: 20 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[101] border-l border-border/50 flex flex-col"
            >
              <div className="px-6 py-6 border-b border-border/50 shrink-0 bg-secondary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Timeline History</h3>
                    <p className="text-sm font-medium text-muted-foreground mt-1">{selectedEscalation.id} • {selectedEscalation.company}</p>
                  </div>
                  <button 
                    onClick={() => setShowHistoryModal(false)}
                    className="p-2 rounded-xl hover:bg-white text-muted-foreground transition-colors shadow-sm border border-transparent hover:border-border/50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/80 before:to-transparent">
                  {mockHistoryData.map((history, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                      key={history.id} 
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-secondary text-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                        {getStatusIcon(history.status) || <MoreVertical className="w-4 h-4" />}
                      </div>
                      
                      {/* Timeline Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusColor(history.status)}`}>
                            {history.status}
                          </span>
                          <time className="text-[10px] font-bold text-muted-foreground">{history.date}</time>
                        </div>
                        <p className="text-sm text-foreground mb-3">{history.comment}</p>
                        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {history.user.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-muted-foreground">{history.user}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
