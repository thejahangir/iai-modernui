import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, X, Eye, Download, Trash2, CheckCircle, XCircle, User, ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
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
  {
    id: "CAN-2003", name: "Vikram Malhotra", email: "vikram@example.com", mobile: "+1 555-0303", primarySkill: "Java", experience: "8 Years", registeredDate: "16-10-2025", verified: true, interviewDate: "13-11-2025 - 11:00", rating: "5.0/5",
  },
  {
    id: "CAN-2004", name: "Ananya Desai", email: "ananya@example.com", mobile: "+1 555-0404", primarySkill: "DevOps", experience: "5 Years", registeredDate: "17-10-2025", verified: true, interviewDate: "14-11-2025 - 14:00", rating: "4.0/5",
  },
  {
    id: "CAN-2005", name: "Chandan Das", email: "chandan@example.com", mobile: "+1 555-0505", primarySkill: "React", experience: "3 Years", registeredDate: "18-10-2025", verified: false, interviewDate: "15-11-2025 - 09:30", rating: "3.0/5",
  },
  {
    id: "CAN-2006", name: "Aditya Singh", email: "aditya@example.com", mobile: "+1 555-0606", primarySkill: "Python", experience: "2 Years", registeredDate: "19-10-2025", verified: true, interviewDate: "16-11-2025 - 16:15", rating: "Pending",
  },
  {
    id: "CAN-2007", name: "Meera Reddy", email: "meera@example.com", mobile: "+1 555-0707", primarySkill: "Node.js", experience: "7 Years", registeredDate: "20-10-2025", verified: true, interviewDate: "17-11-2025 - 10:45", rating: "4.5/5",
  },
  {
    id: "CAN-2008", name: "Rohan Kapoor", email: "rohan.k@example.com", mobile: "+1 555-0808", primarySkill: "Java", experience: "4 Years", registeredDate: "21-10-2025", verified: false, interviewDate: "18-11-2025 - 12:00", rating: "Pending",
  },
];

export default function SuperAdminRegisteredCandidates() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", primarySkill: "" });
  const [appliedFilters, setAppliedFilters] = useState({ startDate: "", endDate: "", primarySkill: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [view, setView] = useState<'card' | 'grid'>('card');
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (appliedFilters.primarySkill && item.primarySkill !== appliedFilters.primarySkill) return false;
      
      const [d, m, y] = item.registeredDate.split("-");
      const isoDate = `${y}-${m}-${d}`;
      
      if (appliedFilters.startDate && isoDate < appliedFilters.startDate) return false;
      if (appliedFilters.endDate && isoDate > appliedFilters.endDate) return false;

      return true;
    });
  }, [data, appliedFilters]);

  const handleSearch = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ startDate: "", endDate: "", primarySkill: "" });
    setAppliedFilters({ startDate: "", endDate: "", primarySkill: "" });
    setCurrentPage(1);
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

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Registered Candidates</h2>
          <p className="text-muted-foreground mt-1">Manage and view all registered candidates under Candidate profile.</p>
        </div>
        <div className="flex bg-secondary/50 p-1 rounded-xl border border-border/50 self-end sm:self-auto shrink-0">
          <button
            onClick={() => setView('card')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === 'card' 
                ? 'bg-white text-primary shadow-sm ring-1 ring-border/50' 
                : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            onClick={() => setView('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === 'grid' 
                ? 'bg-white text-primary shadow-sm ring-1 ring-border/50' 
                : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
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

      {/* Data Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-16 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No registered candidates found matching your criteria.</p>
          </div>
        ) : view === 'grid' ? (
          <div className="overflow-x-auto bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
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
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">{item.id}</td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.primarySkill}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.experience}</td>
                  <td className="px-6 py-4">
                    {item.verified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedData.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 hover:shadow-lg transition-all group flex flex-col relative overflow-hidden">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-secondary/80 flex items-center justify-center text-foreground font-bold text-lg uppercase shadow-sm border border-slate-200">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground truncate max-w-[150px] leading-tight mb-0.5 flex items-center gap-1.5">
                        {item.name}
                        {item.verified ? (
                          <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" title="Verified Candidate" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" title="Unverified Candidate" />
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground tracking-wide font-medium">{item.id}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 flex-1 mb-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/30 border border-slate-200">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Skill & Exp</span>
                    <span className="text-xs font-black text-foreground">{item.primarySkill} • {item.experience}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col p-2.5 rounded-xl bg-secondary/30 border border-slate-200">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-1.5">Rating</span>
                      <span className={`text-xs font-black w-fit ${item.rating === "Pending" ? "text-destructive" : "text-primary"}`}>
                        {item.rating}
                      </span>
                    </div>
                    <div className="flex flex-col p-2.5 rounded-xl bg-secondary/30 border border-slate-200">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-1.5">Registered</span>
                      <span className="text-xs font-black text-foreground">{item.registeredDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between bg-white relative z-10">
                  <button 
                    onClick={() => handleDownload(item.name)}
                    className="flex-1 flex items-center justify-center py-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
                    title="Download Resume"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-border/50 mx-1" />
                  <button 
                    onClick={() => handleView(item)}
                    className="flex-1 flex items-center justify-center py-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-border/50 mx-1" />
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center py-2 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && filteredData.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-border/50 shadow-sm mt-4"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
                <span className="font-medium text-foreground">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border/50 hover:bg-secondary focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNumber = idx + 1;
                  const isCurrent = pageNumber === currentPage;
                  
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-border/50 focus:z-20 focus:outline-offset-0 transition-colors ${
                          isCurrent 
                            ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary' 
                            : 'text-foreground hover:bg-secondary'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 || 
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-muted-foreground ring-1 ring-inset ring-border/50 focus:outline-offset-0">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border/50 hover:bg-secondary focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
          
          {/* Mobile Pagination */}
          <div className="flex flex-1 justify-between sm:hidden items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-xl border border-border/50 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl border border-border/50 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

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

