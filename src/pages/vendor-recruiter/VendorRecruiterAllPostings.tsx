import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchableSelect } from "../../components/SearchableSelect";
import { 
  Search, 
  Filter, 
  Briefcase, 
  Calendar, 
  User, 
  BookOpen, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Plus,
  Users,
  Target,
  FileCheck,
  ChevronDown,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data for postings
const initialPostings = Array.from({ length: 24 }).map((_, i) => ({
  id: `REQ-00${i + 1}`,
  title: [
    "Senior Full Stack Engineer",
    "Product Designer (UI/UX)",
    "Lead Senior Enterprise DevOps Solutions Cloud Migration Architect (Remote)",
    "Backend Developer",
    "Frontend Developer",
    "Data Scientist",
    "Cloud Solutions Architect",
    "QA Automation Engineer"
  ][i % 8],
  postedBy: ["Sarah Jenkins", "David Chen", "Michael Ross", "Emily Wang"][i % 4],
  postedOn: `${Math.floor(Math.random() * 28) + 1} Oct 2026`,
  experience: ["2-4 Years", "3-5 Years", "5-8 Years", "8+ Years"][i % 4],
  designation: ["SDE II", "SDE III", "Lead Designer", "Principal Engineer"][i % 4],
  skills: [
    ["React", "Node.js", "AWS", "TypeScript", "GraphQL", "MongoDB", "Redux", "Express", "Docker", "Jest", "Tailwind", "Next.js"],
    ["Figma", "Prototyping", "User Research"],
    ["Kubernetes", "Terraform", "CI/CD", "GCP", "Jenkins", "Ansible", "Linux", "Prometheus", "Grafana", "Bash"],
    ["Python", "Django", "PostgreSQL", "FastAPI"],
    ["Vue.js", "Nuxt.js", "Tailwind CSS", "JavaScript"],
    ["Python", "TensorFlow", "PyTorch", "SQL"],
    ["AWS", "Azure", "Docker", "Microservices"],
    ["Selenium", "Cypress", "Jest", "Playwright"]
  ][i % 8],
  status: ["Open", "On-Hold", "Closed"][i % 3],
  metrics: { 
    related: Math.floor(Math.random() * 100) + 10, 
    applied: Math.floor(Math.random() * 50) + 5, 
    shortlisted: Math.floor(Math.random() * 10) 
  }
}));


const STATUS_COLORS = {
  "Open": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "On-Hold": "bg-amber-50 text-amber-600 border-amber-200",
  "Closed": "bg-slate-100 text-slate-600 border-slate-200",
};

export default function VendorRecruiterAllPostings() {
  const [postings, setPostings] = useState(initialPostings);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [filterJobCode, setFilterJobCode] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  // Status Update Modal state
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatusPosting, setSelectedStatusPosting] = useState<any>(null);
  const [updateStatusVal, setUpdateStatusVal] = useState("");
  const [assignee, setAssignee] = useState("");
  const [statusComments, setStatusComments] = useState("");
  const [statusErrors, setStatusErrors] = useState({ status: "", assignee: "" });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterSkill, filterJobCode, filterStatus]);
  

  const filteredPostings = postings.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSkill = filterSkill ? p.skills.includes(filterSkill) : true;
    const matchJobCode = filterJobCode ? p.id === filterJobCode : true;
    const matchStatus = filterStatus ? p.status === filterStatus : true;
    return matchSearch && matchSkill && matchJobCode && matchStatus;
  });

  // Extract unique skills and job codes for dropdowns
  const uniqueSkills = Array.from(new Set(postings.flatMap(p => p.skills))).sort();
  const uniqueJobCodes = Array.from(new Set(postings.map(p => p.id))).sort();

  // Pagination logic
  const totalPages = Math.ceil(filteredPostings.length / itemsPerPage);
  const paginatedPostings = filteredPostings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">All Postings</h1>
          <p className="text-slate-500 mt-1">Manage and track your organization's job requirements</p>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Title or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2.5 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        
        <div className="relative w-full sm:w-48 shrink-0">
          <SearchableSelect
            value={filterSkill}
            onChange={setFilterSkill}
            placeholder="All Primary Skills"
            options={[
              { value: "", label: "All Primary Skills" },
              ...uniqueSkills.map(skill => ({ value: skill, label: skill }))
            ]}
            className="h-[42px]"
          />
        </div>

        <div className="relative w-full sm:w-32 shrink-0">
          <SearchableSelect
            value={filterJobCode}
            onChange={setFilterJobCode}
            placeholder="Job Code"
            options={[
              { value: "", label: "All Job Codes" },
              ...uniqueJobCodes.map(code => ({ value: code, label: code }))
            ]}
            className="h-[42px]"
          />
        </div>

        <div className="relative w-full sm:w-36 shrink-0">
          <SearchableSelect
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Status"
            options={[
              { value: "", label: "All Statuses" },
              { value: "Open", label: "Open" },
              { value: "On-Hold", label: "On-Hold" },
              { value: "Closed", label: "Closed" }
            ]}
            className="h-[42px]"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto shrink-0 ml-auto">
          <button 
            onClick={() => {
              setSearchTerm("");
              setFilterSkill("");
              setFilterJobCode("");
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

      {/* Postings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {paginatedPostings.map((posting, idx) => (
            <motion.div
              key={posting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-5 pb-3 border-b border-slate-50 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -z-10"></div>
                <div className="flex justify-between items-start gap-3 mb-1.5">
                  <h3 
                    className="text-base font-bold text-slate-800 leading-tight truncate"
                    title={posting.title}
                  >
                    {posting.title}
                  </h3>
                  
                  {/* Status Button */}
                  <div className="relative group shrink-0">
                    <button
                      onClick={() => {
                        setSelectedStatusPosting(posting);
                        setUpdateStatusVal(posting.status);
                        setAssignee("");
                        setStatusComments("");
                        setIsStatusModalOpen(true);
                      }}
                      className={cn(
                        "flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-lg text-[11px] font-bold border cursor-pointer hover:opacity-80 transition-opacity",
                        STATUS_COLORS[posting.status as keyof typeof STATUS_COLORS]
                      )}
                    >
                      {posting.status}
                      <ChevronDown className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-[11px] font-medium text-slate-400">
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded-md text-slate-600">{posting.id}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <User className="w-3 h-3" /> Posted By
                    </span>
                    <p className="text-sm font-medium text-slate-700">{posting.postedBy}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <Calendar className="w-3 h-3" /> Posted On
                    </span>
                    <p className="text-sm font-medium text-slate-700">{posting.postedOn}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <Briefcase className="w-3 h-3" /> Designation
                    </span>
                    <p className="text-sm font-medium text-slate-700">{posting.designation}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <Clock className="w-3 h-3" /> Experience
                    </span>
                    <p className="text-sm font-medium text-slate-700">{posting.experience}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <BookOpen className="w-3 h-3" /> Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {posting.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer (Metrics & Actions) */}
              <div className="bg-slate-50/80 border-t border-slate-100 flex flex-col mt-auto">
                <div className="px-4 py-3">
                  <button 
                    onClick={() => {}}
                    className="w-full flex items-center justify-center gap-1.5 py-2 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-lg text-xs font-bold transition-colors mb-3"
                  >
                    <Plus className="w-4 h-4" />
                    Add Profile
                  </button>
                </div>
                <div className="px-4 pb-3 grid grid-cols-3 gap-2 divide-x divide-slate-200">
                  <div className="text-center flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Users className="w-3 h-3 text-slate-400" />
                      <p className="text-lg font-bold text-slate-700 leading-none">{posting.metrics.related}</p>
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">Related Profiles</p>
                  </div>
                  <div className="text-center flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <FileCheck className="w-3 h-3 text-blue-400" />
                      <p className="text-lg font-bold text-blue-600 leading-none">{posting.metrics.applied}</p>
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">Applied Candidates</p>
                  </div>
                  <div className="text-center flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Target className="w-3 h-3 text-emerald-400" />
                      <p className="text-lg font-bold text-emerald-600 leading-none">{posting.metrics.shortlisted}</p>
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">Shortlisted Profiles</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && filteredPostings.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-slate-200 shadow-sm mt-4"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredPostings.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredPostings.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
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
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-slate-200 focus:z-20 focus:outline-offset-0 transition-colors ${
                          isCurrent 
                            ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary' 
                            : 'text-slate-700 hover:bg-slate-50'
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
                      <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-500 ring-1 ring-inset ring-slate-200 focus:outline-offset-0">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
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
              className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-500">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}



      {/* Status Update Modal */}
      <AnimatePresence>
        {isStatusModalOpen && selectedStatusPosting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStatusModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Update Status</h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{selectedStatusPosting.id} - {selectedStatusPosting.title}</p>
                </div>
                <button 
                  onClick={() => setIsStatusModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    let hasError = false;
                    const newErrors = { status: "", assignee: "" };
                    if (!updateStatusVal) {
                      newErrors.status = "Please select a new status";
                      hasError = true;
                    }
                    if (!assignee) {
                      newErrors.assignee = "Please select an assignee";
                      hasError = true;
                    }
                    if (hasError) {
                      setStatusErrors(newErrors);
                      return;
                    }
                    const newPostings = postings.map(p => 
                      p.id === selectedStatusPosting.id ? { ...p, status: updateStatusVal } : p
                    );
                    setPostings(newPostings);
                    setIsStatusModalOpen(false);
                  }} 
                  className="space-y-5"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">New Status</label>
                      <AnimatePresence>
                        {statusErrors.status && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-rose-500 font-medium"
                          >
                            {statusErrors.status}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      value={updateStatusVal}
                      onChange={(val) => {
                        setUpdateStatusVal(val);
                        setStatusErrors(prev => ({ ...prev, status: "" }));
                      }}
                      options={[
                        { value: "Open", label: "Open" },
                        { value: "On-Hold", label: "On-Hold" },
                        { value: "Closed", label: "Closed" }
                      ]}
                      className="h-[42px]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Assign To</label>
                      <AnimatePresence>
                        {statusErrors.assignee && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-rose-500 font-medium"
                          >
                            {statusErrors.assignee}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      value={assignee}
                      onChange={(val) => {
                        setAssignee(val);
                        setStatusErrors(prev => ({ ...prev, assignee: "" }));
                      }}
                      placeholder="Select Assignee..."
                      options={[
                        { value: "Sarah Jenkins", label: "Sarah Jenkins" },
                        { value: "David Chen", label: "David Chen" },
                        { value: "Michael Ross", label: "Michael Ross" },
                        { value: "Emily Wang", label: "Emily Wang" }
                      ]}
                      className="h-[42px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Comments</label>
                    <textarea 
                      value={statusComments}
                      onChange={(e) => setStatusComments(e.target.value)}
                      placeholder="Add reasoning or context for this assignment..."
                      rows={3}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsStatusModalOpen(false)}
                      className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                    >
                      Update Status
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
