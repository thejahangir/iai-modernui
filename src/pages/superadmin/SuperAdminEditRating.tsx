import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, X, Lock, Unlock, FileEdit, ChevronDown, ChevronUp, Eye, CheckCircle2, Star, Code2, ChevronLeft, ChevronRight, Copy } from "lucide-react";

const initialData = [
  { 
    id: "INT-1001", 
    date: "11-11-2025 - 21:30", 
    name: "Jahnavi Pudi", 
    email: "jahnavi.p@example.com",
    mobile: "9876543210",
    interviewer: "Aarohi Patel",
    primarySkill: "Python", 
    rating: "Pending",
    editMode: false,
    technicalSkills: [
      { id: "ts1", name: "Python", rating: "2", comment: "Not good in python programming could not solve the given problem" },
      { id: "ts2", name: "Cloud (AWS, Azure, GCP)", rating: "2", comment: "Not good with cloud concepts not suitable for the role." },
      { id: "ts3", name: "NO SQL / Object (Key /Value) RDBMS", rating: "2", comment: "Not good with RDMBS concepts not suitable for the role." },
      { id: "ts4", name: "Data Engineer on complex data sets", rating: "2", comment: "Not good with data engineering concepts not suitable for the role." },
      { id: "ts5", name: "ETL", rating: "2", comment: "" },
    ],
    overallComment: "Over all not suitable for this role, she could not solve the given python problem even she wrote a clean code but code was not working. Every question asked her she is taking lot of time to think and than answering correctly.",
    isGenuine: false,
    recommendNextRound: false,
    softSkills: [
      { id: "ss1", name: "Communication", rating: "3", comment: "Clear and articulate, but sometimes speaks too fast." },
      { id: "ss2", name: "Problem Solving", rating: "2", comment: "Struggles with ambiguous problems without clear instructions." },
      { id: "ss3", name: "Teamwork", rating: "4", comment: "Great team player, very collaborative and helpful." }
    ]
  },
  { 
    id: "INT-1002", 
    date: "12-11-2025 - 10:00", 
    name: "Rohan Gupta", 
    email: "rohan.gupta@example.com",
    mobile: "+1 555-0202",
    interviewer: "Amit Kumar",
    primarySkill: "Node.js", 
    rating: "4.5/5",
    editMode: true,
    technicalSkills: [],
    overallComment: "",
    isGenuine: true,
    recommendNextRound: true
  },
  { 
    id: "INT-1003", 
    date: "13-11-2025 - 14:00", 
    name: "Sneha Reddy", 
    email: "sneha.reddy@example.com",
    mobile: "+1 555-0303",
    interviewer: "Aarohi Patel",
    primarySkill: "React", 
    rating: "Pending",
    editMode: false,
    technicalSkills: [
      { id: "ts1", name: "React Components", rating: "4", comment: "Good understanding of functional components and hooks." },
      { id: "ts2", name: "State Management", rating: "3", comment: "Understands Redux but struggled with Context API details." }
    ],
    overallComment: "Solid candidate, good potential.",
    isGenuine: true,
    recommendNextRound: false,
    softSkills: []
  },
  { 
    id: "INT-1004", 
    date: "14-11-2025 - 11:30", 
    name: "Vikram Singh", 
    email: "vikram.s@example.com",
    mobile: "+1 555-0404",
    interviewer: "Amit Kumar",
    primarySkill: "Java", 
    rating: "3.5/5",
    editMode: true,
    technicalSkills: [],
    overallComment: "",
    isGenuine: true,
    recommendNextRound: true
  },
  { 
    id: "INT-1005", 
    date: "15-11-2025 - 09:15", 
    name: "Priya Sharma", 
    email: "priya.s@example.com",
    mobile: "+1 555-0505",
    interviewer: "Neha Mehta",
    primarySkill: "Angular", 
    rating: "5.0/5",
    editMode: false,
    technicalSkills: [],
    overallComment: "Exceptional technical skills. Answered every question perfectly.",
    isGenuine: true,
    recommendNextRound: true,
    softSkills: [
      { id: "ss1", name: "Communication", rating: "5", comment: "Very articulate and clear." }
    ]
  },
  { 
    id: "INT-1006", 
    date: "16-11-2025 - 16:45", 
    name: "Karan Desai", 
    email: "karan.d@example.com",
    mobile: "+1 555-0606",
    interviewer: "Aarohi Patel",
    primarySkill: "Python", 
    rating: "Pending",
    editMode: false,
    technicalSkills: [],
    overallComment: "",
    isGenuine: false,
    recommendNextRound: false,
    softSkills: []
  },
  { 
    id: "INT-1007", 
    date: "17-11-2025 - 10:30", 
    name: "Arjun Verma", 
    email: "arjun.v@example.com",
    mobile: "+1 555-0707",
    interviewer: "Neha Mehta",
    primarySkill: "C++", 
    rating: "4.0/5",
    editMode: false,
    technicalSkills: [],
    overallComment: "Very strong algos, average system design.",
    isGenuine: true,
    recommendNextRound: true,
    softSkills: []
  },
  { 
    id: "INT-1008", 
    date: "18-11-2025 - 12:00", 
    name: "Divya Prasad", 
    email: "divya.p@example.com",
    mobile: "+1 555-0808",
    interviewer: "Amit Kumar",
    primarySkill: "React", 
    rating: "Pending",
    editMode: true,
    technicalSkills: [],
    overallComment: "",
    isGenuine: false,
    recommendNextRound: false,
    softSkills: []
  },
  { 
    id: "INT-1009", 
    date: "19-11-2025 - 14:15", 
    name: "Siddharth Rao", 
    email: "siddharth.r@example.com",
    mobile: "+1 555-0909",
    interviewer: "Aarohi Patel",
    primarySkill: "Node.js", 
    rating: "4.5/5",
    editMode: false,
    technicalSkills: [],
    overallComment: "Excellent candidate. Recommended for hire.",
    isGenuine: true,
    recommendNextRound: true,
    softSkills: []
  },
  { 
    id: "INT-1010", 
    date: "20-11-2025 - 16:30", 
    name: "Anjali Menon", 
    email: "anjali.m@example.com",
    mobile: "+1 555-1010",
    interviewer: "Amit Kumar",
    primarySkill: "Java", 
    rating: "Pending",
    editMode: false,
    technicalSkills: [],
    overallComment: "",
    isGenuine: false,
    recommendNextRound: false,
    softSkills: []
  }
];

export default function SuperAdminEditRating() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ candidateName: "", interviewId: "" });
  const [appliedFilters, setAppliedFilters] = useState({ candidateName: "", interviewId: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [showModal, setShowModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [techExpanded, setTechExpanded] = useState(true);
  const [softExpanded, setSoftExpanded] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (appliedFilters.candidateName && !item.name.toLowerCase().includes(appliedFilters.candidateName.toLowerCase())) return false;
      if (appliedFilters.interviewId && !item.id.toLowerCase().includes(appliedFilters.interviewId.toLowerCase())) return false;
      return true;
    });
  }, [data, appliedFilters]);

  const handleSearch = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ candidateName: "", interviewId: "" });
    setAppliedFilters({ candidateName: "", interviewId: "" });
    setCurrentPage(1);
  };

  const toggleEditMode = (id: string) => {
    setData(data.map(item => item.id === id ? { ...item, editMode: !item.editMode } : item));
  };

  const openRatingModal = (item: any) => {
    setSelectedInterview(item);
    setShowModal(true);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Edit Rating</h2>
          <p className="text-muted-foreground mt-1">Manage and update candidate interview ratings.</p>
        </div>
      </div>

      {/* Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="p-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Candidate Name"
              value={filters.candidateName}
              onChange={(e) => setFilters({ ...filters, candidateName: e.target.value })}
              className="w-full h-9 px-3 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/40 text-foreground"
            />
            <input
              type="text"
              placeholder="Interview ID"
              value={filters.interviewId}
              onChange={(e) => setFilters({ ...filters, interviewId: e.target.value })}
              className="w-full h-9 px-3 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/40 text-foreground"
            />
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
              className="flex items-center justify-center gap-2 h-9 px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
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
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        {filteredData.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-muted-foreground" />
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
                <th className="px-6 py-4 font-bold tracking-widest">Email Id</th>
                <th className="px-6 py-4 font-bold tracking-widest">Mobile No</th>
                <th className="px-6 py-4 font-bold tracking-widest">Interviewer</th>
                <th className="px-6 py-4 font-bold tracking-widest">Primary Skill</th>
                <th className="px-6 py-4 font-bold tracking-widest">Rating</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">{item.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.email}</td>
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
                  <td className="px-6 py-4 text-muted-foreground">{item.interviewer}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.primarySkill}</td>
                  <td className="px-6 py-4">
                    {item.rating === "Pending" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-widest bg-destructive/10 text-destructive">
                        {item.rating}
                      </span>
                    ) : (
                      <span className="font-bold text-destructive text-sm">{item.rating}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openRatingModal(item)}
                        className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-colors"
                        title={item.editMode ? "Update Rating" : "View Rating"}
                      >
                        {item.editMode ? <FileEdit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => toggleEditMode(item.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.editMode 
                            ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white' 
                            : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                        }`}
                        title={item.editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
                      >
                        {item.editMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
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

      {/* Add Rating Modal */}
      <AnimatePresence>
        {showModal && selectedInterview && (
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl bg-white rounded-3xl shadow-2xl z-[101] flex flex-col max-h-[90vh] border border-border/50"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground tracking-tight">
                      {selectedInterview.editMode ? "Edit Rating" : "View Rating"}
                    </h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedInterview.id} - {selectedInterview.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-secondary/10">
                
                {/* Info Header - Premium Style */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="p-4 bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Primary Skill</p>
                    <p className="text-[15px] font-black text-foreground relative z-10">{selectedInterview.primarySkill}</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Email</p>
                    <p className="text-sm font-bold text-foreground relative z-10 truncate" title={selectedInterview.email}>{selectedInterview.email}</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Mobile</p>
                    <p className="text-[15px] font-black text-foreground relative z-10">{selectedInterview.mobile}</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                    <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Interview Date & Time</p>
                    <p className="text-sm font-bold text-foreground relative z-10">{selectedInterview.date}</p>
                  </div>
                </div>

                {/* References */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Rating Interpretation
                    </h3>
                    <ul className="text-[12px] text-muted-foreground space-y-2">
                      <li className="flex gap-2.5 items-start"><span className="font-bold text-foreground bg-secondary px-1.5 py-0.5 rounded text-[10px]">1</span> <span className="pt-0.5 leading-tight">Know the subject but no good knowledge, need to learn.</span></li>
                      <li className="flex gap-2.5 items-start"><span className="font-bold text-foreground bg-secondary px-1.5 py-0.5 rounded text-[10px]">2</span> <span className="pt-0.5 leading-tight">Know the subject, have knowledge but no good working exp.</span></li>
                      <li className="flex gap-2.5 items-start"><span className="font-bold text-foreground bg-secondary px-1.5 py-0.5 rounded text-[10px]">3</span> <span className="pt-0.5 leading-tight">Have the knowledge and can work independently.</span></li>
                      <li className="flex gap-2.5 items-start"><span className="font-bold text-foreground bg-secondary px-1.5 py-0.5 rounded text-[10px]">4</span> <span className="pt-0.5 leading-tight">Can work and Guide the team also to work.</span></li>
                      <li className="flex gap-2.5 items-start"><span className="font-bold text-foreground bg-secondary px-1.5 py-0.5 rounded text-[10px]">5</span> <span className="pt-0.5 leading-tight">Exceptionally talented in this and is an asset to the team.</span></li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm flex flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Key Responsibilities
                    </h3>
                    <div className="flex-1 bg-secondary/30 rounded-xl p-4 border border-border/50 flex items-center justify-center text-muted-foreground text-[13px] italic">
                      No responsibilities documented for this role.
                    </div>
                  </div>
                </div>

                {/* Technical Rating Accordion */}
                <div className="bg-white rounded-xl border border-border/50 shadow-sm">
                  <button 
                    onClick={() => {
                      setTechExpanded(!techExpanded);
                      if (!techExpanded) setSoftExpanded(false);
                    }}
                    className={techExpanded ? "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-t-xl" : "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-xl"}
                  >
                    <span className="font-bold text-foreground">Technical Rating</span>
                    {techExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <AnimatePresence>
                    {techExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-border/50"
                      >
                        <div className="p-6 space-y-6">
                          {selectedInterview.technicalSkills?.map((skill: any, idx: number) => (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start bg-white p-4 rounded-xl border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                              <div className="lg:col-span-3 text-[14px] font-bold text-foreground lg:pt-2">{skill.name}</div>
                              <div className="lg:col-span-2">
                                <div className="relative mt-2">
                                  <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Rating (1-5)</div>
                                  <select 
                                    defaultValue={skill.rating}
                                    className="w-full h-11 px-3 bg-white border border-border/50 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                  <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-muted-foreground pointer-events-none" />
                                </div>
                              </div>
                              <div className="lg:col-span-7">
                                <div className="relative mt-2">
                                  <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Comments</div>
                                  <textarea 
                                    defaultValue={skill.comment}
                                    rows={1} 
                                    placeholder="Add comments on this skill..."
                                    className="w-full p-3 bg-white border border-border/50 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Soft Skill Rating Accordion */}
                <div className="bg-white rounded-xl border border-border/50 shadow-sm">
                  <button 
                    onClick={() => {
                      setSoftExpanded(!softExpanded);
                      if (!softExpanded) setTechExpanded(false);
                    }}
                    className={softExpanded ? "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-t-xl" : "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-xl"}
                  >
                    <span className="font-bold text-foreground">Soft Skill Rating</span>
                    {softExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <AnimatePresence>
                    {softExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-border/50"
                      >
                        <div className="p-6 space-y-6">
                          {selectedInterview.softSkills?.map((skill: any, idx: number) => (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start bg-white p-4 rounded-xl border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                              <div className="lg:col-span-3 text-[14px] font-bold text-foreground lg:pt-2">{skill.name}</div>
                              <div className="lg:col-span-2">
                                <div className="relative mt-2">
                                  <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Rating (1-5)</div>
                                  <select 
                                    defaultValue={skill.rating}
                                    className="w-full h-11 px-3 bg-white border border-border/50 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                  <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-muted-foreground pointer-events-none" />
                                </div>
                              </div>
                              <div className="lg:col-span-7">
                                <div className="relative mt-2">
                                  <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Comments</div>
                                  <textarea 
                                    defaultValue={skill.comment}
                                    rows={1} 
                                    placeholder="Add comments on this skill..."
                                    className="w-full p-3 bg-white border border-border/50 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          {(!selectedInterview.softSkills || selectedInterview.softSkills.length === 0) && (
                            <div className="p-4 text-center text-muted-foreground text-[13px] bg-secondary/30 rounded-xl border border-border/50">
                              No soft skills evaluated for this role.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Global Comments */}
                <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
                  <label className="text-[11px] font-bold text-foreground uppercase tracking-widest mb-2 block flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Overall Summary & Feedback
                  </label>
                  <textarea 
                    defaultValue={selectedInterview.overallComment}
                    rows={3}
                    placeholder="Provide a final summary or overall feedback..."
                    className="w-full p-4 bg-secondary/20 border border-border/50 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50 leading-relaxed"
                  />
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center justify-between p-3 border border-border/50 rounded-xl bg-white cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all group">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Genuine Interview</span>
                    <div className="relative flex items-center justify-center shrink-0">
                      <input 
                        type="checkbox" 
                        checked={selectedInterview.isGenuine}
                        onChange={(e) => setSelectedInterview({...selectedInterview, isGenuine: e.target.checked})}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-border rounded text-primary flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50">
                        {selectedInterview.isGenuine && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-border/50 rounded-xl bg-white cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all group">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Recommend Candidate</span>
                    <div className="relative flex items-center justify-center shrink-0">
                      <input 
                        type="checkbox" 
                        checked={selectedInterview.recommendNextRound}
                        onChange={(e) => setSelectedInterview({...selectedInterview, recommendNextRound: e.target.checked})}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-border rounded text-primary flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50">
                        {selectedInterview.recommendNextRound && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Footer Buttons */}
              <div className="px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 bg-secondary/10 rounded-b-3xl">
                {selectedInterview.editMode ? (
                  <>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2 text-sm font-bold text-secondary-foreground bg-white border border-border/50 hover:bg-secondary rounded-xl shadow-sm transition-all active:scale-95"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setShowSuccessDialog(true)}
                      className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm shadow-primary/20 transition-all active:scale-95"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 text-sm font-bold text-secondary-foreground bg-white border border-border/50 hover:bg-secondary rounded-xl shadow-sm transition-all active:scale-95"
                  >
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccessDialog && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-border/50 p-8 z-[111] text-center"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-heading tracking-tight">Rating Saved!</h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                The candidate's rating has been successfully updated and saved to the system. Would you like to close this window and proceed?
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setShowSuccessDialog(false)}
                  className="px-5 py-2 text-sm font-bold text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-xl transition-all active:scale-95"
                >
                  Keep Editing
                </button>
                <button 
                  onClick={() => {
                    setShowSuccessDialog(false);
                    setShowModal(false);
                  }}
                  className="px-5 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm shadow-primary/20 transition-all active:scale-95"
                >
                  Close & Proceed
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

