import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Plus, RotateCw, Edit, ListChecks, Users, AlertCircle, Briefcase, User, Eye, X, ChevronDown, ChevronUp, Minus, Calendar, CheckCircle2, MoreVertical, Trash2, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchableSelect } from "../../components/SearchableSelect";
import { getStatusBadgeClasses } from "../../../lib/utils";

const MOCK_COMPANIES = [
  { label: "Wipro", value: "wipro" },
  { label: "TCS", value: "tcs" },
  { label: "Infosys", value: "infosys" },
];

const MOCK_RECRUITERS = [
  { label: "Rohan Gupta", value: "rohan" },
  { label: "Priya Desai", value: "priya" },
  { label: "Sameer Verma", value: "sameer" },
];

const MOCK_LOCATIONS = [
  { label: "Bengaluru", value: "bengaluru" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi NCR", value: "delhi" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Chennai", value: "chennai" },
  { label: "Pune", value: "pune" },
];

const MOCK_DESIGNATIONS = [
  { label: "Software Engineer", value: "se" },
  { label: "Senior Software Engineer", value: "sse" },
  { label: "Tech Lead", value: "tl" },
  { label: "Engineering Manager", value: "em" },
  { label: "Product Manager", value: "pm" },
];

const MOCK_VENDORS = [
  { id: "v1", name: "Ramesh Services", email: "ramesh.services@example.in", phone: "+91 9876543210" },
  { id: "v2", name: "Priya Consulting", email: "priya.consulting@example.in", phone: "+91 9876543211" },
  { id: "v3", name: "Suresh Tech Staffing", email: "suresh.staffing@example.in", phone: "+91 9876543212" },
  { id: "v4", name: "Ananya Recruitments", email: "ananya.rec@example.in", phone: "+91 9876543213" },
];

const MOCK_ESCALATIONS = [
  { id: "e1", jobCode: "REQ-2023-001", company: "Wipro", followUpDt: "2026-Jun-25", status: "Open", comments: "Candidate not responding to emails", escalatedBy: "Rohan Gupta", escalatedDt: "2026-Jun-18" },
  { id: "e2", jobCode: "REQ-2023-001", company: "Wipro", followUpDt: "2026-Jun-22", status: "Closed", comments: "Issue resolved, candidate finally replied and rescheduled the interview.", escalatedBy: "Priya Desai", escalatedDt: "2026-Jun-15" },
];

const initialData = [
  { 
    id: "JOB-001",
    jobCode: "JC-1001",
    jobTitle: "Senior Frontend Engineer",
    jobType: "Full Time",
    minExp: "5",
    maxExp: "8",
    highestPay: "₹25L",
    postingStDate: "2026-06-01",
    postingEndDate: "2026-06-30",
    primarySkill: "React",
    status: "Active"
  },
  { 
    id: "JOB-002",
    jobCode: "JC-1002",
    jobTitle: "Backend Developer",
    jobType: "Contract",
    minExp: "3",
    maxExp: "5",
    highestPay: "₹18L",
    postingStDate: "2026-06-10",
    postingEndDate: "2026-07-10",
    primarySkill: "Node.js",
    status: "Pending"
  },
  { 
    id: "JOB-003",
    jobCode: "JC-1003",
    jobTitle: "QA Automation",
    jobType: "Full Time",
    minExp: "4",
    maxExp: "7",
    highestPay: "₹20L",
    postingStDate: "2026-06-15",
    postingEndDate: "2026-07-15",
    primarySkill: "Selenium",
    status: "Inactive"
  }
];

function JobActionMenu({ item, onView, onEdit, onAddVendor, onEscalation, onInterviewProcess }: { item: any, onView: (item: any) => void, onEdit: (item: any) => void, onAddVendor: (item: any) => void, onEscalation: (item: any) => void, onInterviewProcess: (item: any) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + window.scrollY + 4,
        right: window.innerWidth - rect.right - window.scrollX,
      });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdownMenu = document.getElementById(`action-menu-${item.id}`);
      if (dropdownMenu && dropdownMenu.contains(e.target as Node)) return;
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    const handleScroll = (e: Event) => {
      const dropdownMenu = document.getElementById(`action-menu-${item.id}`);
      if (dropdownMenu && dropdownMenu.contains(e.target as Node)) return;
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen, item.id]);

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      
      {isOpen && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            id={`action-menu-${item.id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{ ...dropdownStyle, position: 'absolute', zIndex: 1000, transformOrigin: 'top right' }}
            className="w-56 bg-white border border-border/50 rounded-xl shadow-2xl py-1 flex flex-col"
          >
            <button onClick={() => { setIsOpen(false); onView(item); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
              <Eye className="w-4 h-4 text-primary" /> View Job
            </button>
            <button onClick={() => { setIsOpen(false); onEdit(item); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
              <Edit className="w-4 h-4 text-primary" /> Edit Job
            </button>
            <button onClick={() => { setIsOpen(false); onInterviewProcess(item); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
              <ListChecks className="w-4 h-4 text-primary" /> Interview Process
            </button>
            <button onClick={() => { setIsOpen(false); onAddVendor(item); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
              <Users className="w-4 h-4 text-primary" /> Add Vendors
            </button>
            <div className="h-px bg-border/50 my-1 mx-2" />
            <button onClick={() => { setIsOpen(false); onEscalation(item); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <AlertCircle className="w-4 h-4" /> Escalations
            </button>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default function AnternRecruiterPostJob() {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterRecruiter, setFilterRecruiter] = useState("");
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Add/Edit Job Modal states
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [openSections, setOpenSections] = useState<string[]>(['Job Info']);
  const [secondarySkills, setSecondarySkills] = useState([{ id: 1, skill: "", needComments: false }]);

  // Add Vendors Modal states
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [vendorJob, setVendorJob] = useState<any>(null);
  const [addedVendors, setAddedVendors] = useState<any[]>([]);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  // Escalations Modal states
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [escalationJob, setEscalationJob] = useState<any>(null);
  const [showAddEscalationForm, setShowAddEscalationForm] = useState(false);
  const [escalations, setEscalations] = useState<any[]>(MOCK_ESCALATIONS);
  const [newEscalationStatus, setNewEscalationStatus] = useState("Open");
  const [newEscalationComments, setNewEscalationComments] = useState("");

  const handleCopyPhone = (vendorId: string, phone: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedPhoneId(vendorId);
      setTimeout(() => setCopiedPhoneId(null), 2000);
    }
  };
  
  // Checkbox states for Job Info
  const [jobInfoChecks, setJobInfoChecks] = useState({
    zoom: true,
    processSteps: false,
    calibration: false,
    clientApproved: false,
    panels: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev[0] === section ? [] : [section]
    );
  };

  const handleSearch = () => {
    console.log("Searching with:", { filterCompany, filterRecruiter });
  };

  const handleReset = () => {
    setFilterCompany("");
    setFilterRecruiter("");
  };

  const handleReload = () => {
    console.log("Reloading data...");
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setShowJobModal(true);
  };

  const handleEditJob = (job: any) => {
    setEditingJob(job);
    setShowJobModal(true);
  };

  const handleAddVendor = (job: any) => {
    setVendorJob(job);
    setAddedVendors([]);
    setShowVendorModal(true);
  };

  const handleEscalation = (job: any) => {
    setEscalationJob(job);
    setShowAddEscalationForm(false);
    setShowEscalationModal(true);
  };

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Post Job</h2>
        <p className="text-muted-foreground mt-1">Manage and post new job requirements for your companies.</p>
      </div>

      {/* Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
        
        <div className="p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 flex-1 w-full">
            <SearchableSelect
              options={MOCK_COMPANIES}
              value={filterCompany}
              onChange={setFilterCompany}
              placeholder="Select Company"
              icon={<Briefcase className="w-4 h-4 text-muted-foreground" />}
              className="w-full sm:w-[220px] h-[42px]"
            />
            <SearchableSelect
              options={MOCK_RECRUITERS}
              value={filterRecruiter}
              onChange={setFilterRecruiter}
              placeholder="Select Recruiter"
              icon={<User className="w-4 h-4 text-muted-foreground" />}
              className="w-full sm:w-[220px] h-[42px]"
            />

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 h-[42px] px-6 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all active:scale-95 flex-1 sm:flex-none"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <button 
                onClick={handleReset}
                className="flex items-center justify-center gap-2 h-[42px] px-4 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl shadow-sm hover:bg-secondary/80 transition-all active:scale-95 shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-4">
            <button 
              onClick={handleReload}
              title="Reload Data"
              className="flex items-center justify-center h-[42px] w-[42px] bg-secondary text-secondary-foreground rounded-xl hover:bg-black/5 transition-all"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleAddJob}
              className="flex items-center justify-center gap-2 h-[42px] px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Job
            </button>
          </div>
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
                <th className="px-6 py-4 font-bold">Job Code</th>
                <th className="px-6 py-4 font-bold">Job Title</th>
                <th className="px-6 py-4 font-bold">Job Type</th>
                <th className="px-6 py-4 font-bold">Primary Skill</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">{item.jobCode}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{item.jobTitle}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.jobType}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{item.primarySkill}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadgeClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <JobActionMenu 
                        item={item} 
                        onView={(job) => { setSelectedJob(job); setShowViewModal(true); }} 
                        onEdit={(job) => handleEditJob(job)}
                        onAddVendor={(job) => handleAddVendor(job)}
                        onEscalation={(job) => handleEscalation(job)}
                        onInterviewProcess={() => { navigate("/dashboard/antern-recruiter/interview-process"); }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-muted-foreground">
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* View Details Modal */}
      <AnimatePresence>
        {showViewModal && selectedJob && (
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Job Details</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedJob.jobCode} - {selectedJob.jobTitle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-secondary/10">
                <div className="bg-white rounded-xl border border-border/50 shadow-sm overflow-hidden p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Job Code</p>
                      <p className="font-bold text-foreground">{selectedJob.jobCode}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Job Title</p>
                      <p className="font-semibold text-foreground">{selectedJob.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Job Type</p>
                      <p className="font-semibold text-foreground">{selectedJob.jobType}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Primary Skill</p>
                      <p className="font-semibold text-foreground">{selectedJob.primarySkill}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Experience Required</p>
                      <p className="font-semibold text-foreground">{selectedJob.minExp} - {selectedJob.maxExp} Years</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Highest Pay</p>
                      <p className="font-semibold text-foreground">{selectedJob.highestPay}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Posting Start Date</p>
                      <p className="font-semibold text-foreground">{selectedJob.postingStDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Posting End Date</p>
                      <p className="font-semibold text-foreground">{selectedJob.postingEndDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-bold mb-1 uppercase tracking-wider">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadgeClasses(selectedJob.status)}`}>
                        {selectedJob.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add/Edit Job Modal */}
      <AnimatePresence>
        {showJobModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowJobModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">{editingJob ? "Edit Job" : "Add New Job"}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {editingJob ? (
                        <span className="font-bold text-foreground">{editingJob.jobCode}</span>
                      ) : (
                        "Fill in the details to create a new job posting."
                      )}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowJobModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-secondary/10 space-y-4">
                 
                 {/* Accordion 1: Job Info */}
                 <div className="bg-white rounded-xl border border-border/50 shadow-sm">
                   <button 
                     onClick={() => toggleSection('Job Info')}
                     className={openSections.includes('Job Info') ? "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-t-xl" : "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-xl"}
                   >
                     <span className="font-bold text-foreground">Job Info</span>
                     {openSections.includes('Job Info') ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                   </button>
                   <AnimatePresence>
                     {openSections.includes('Job Info') && (
                       <motion.div 
                         initial={{ height: 0, overflow: "hidden" }}
                         animate={{ height: "auto", transitionEnd: { overflow: "visible" } }}
                         exit={{ height: 0, overflow: "hidden" }}
                       >
                         <div className="p-6 border-t border-border/50 space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Job Type *</div>
                               <SearchableSelect options={[{label: "Full Time", value: "Full Time"}]} value={editingJob?.jobType || ""} onChange={() => {}} placeholder="Job Type *" className="w-full h-11" />
                             </div>
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Job Code *</div>
                               <input type="text" defaultValue={editingJob?.jobCode} placeholder="Job Code *" className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" />
                             </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Job Description *</div>
                               <textarea defaultValue={editingJob?.jobTitle} placeholder="Job Description *" rows={4} className="w-full px-4 py-3 border border-border/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white"></textarea>
                             </div>
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Client Inputs *</div>
                               <textarea placeholder="Client Inputs *" rows={4} className="w-full px-4 py-3 border border-border/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white"></textarea>
                             </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm font-bold text-muted-foreground mb-3">Assessment Type *</p>
                                <div className="flex p-1 bg-secondary/50 rounded-xl w-max">
                                  <label className="cursor-pointer relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                                    <input type="radio" name="assessmentType" value="Interview" className="peer sr-only" defaultChecked />
                                    <span className="relative z-10 text-muted-foreground peer-checked:text-foreground">Interview</span>
                                    <div className="absolute inset-0 bg-white shadow-sm rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                  </label>
                                  <label className="cursor-pointer relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                                    <input type="radio" name="assessmentType" value="Interview + CodeTest" className="peer sr-only" />
                                    <span className="relative z-10 text-muted-foreground peer-checked:text-foreground">Interview + CodeTest</span>
                                    <div className="absolute inset-0 bg-white shadow-sm rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                  </label>
                                </div>
                                <div className="relative mt-6">
                                  <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Assessment Name</div>
                                  <input type="text" placeholder="Assessment Name" className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" />
                                </div>
                              </div>
                              <div className="pt-2">
                                <p className="text-sm font-bold text-muted-foreground mb-3">Job Requirements</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {[
                                    { id: 'zoom', label: 'Schedule Zoom Interview', checked: jobInfoChecks.zoom },
                                    { id: 'processSteps', label: 'Add Process Steps', checked: jobInfoChecks.processSteps },
                                    { id: 'calibration', label: 'Calibration Call', checked: jobInfoChecks.calibration },
                                    { id: 'clientApproved', label: 'Client Approved', checked: jobInfoChecks.clientApproved },
                                    { id: 'panels', label: 'Panels Available', checked: jobInfoChecks.panels },
                                  ].map((item) => (
                                    <label key={item.id} className="flex items-center justify-between p-3 border border-border/50 rounded-xl bg-white cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all group">
                                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                                      <div className="relative flex items-center justify-center shrink-0">
                                        <input 
                                          type="checkbox" 
                                          checked={item.checked}
                                          onChange={(e) => setJobInfoChecks({...jobInfoChecks, [item.id]: e.target.checked})}
                                          className="peer sr-only" 
                                        />
                                        <div className="w-5 h-5 border-2 border-border rounded text-primary flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50">
                                          {item.checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              </div>
                           </div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 {/* Accordion 2: Technology */}
                 {!editingJob && (
                   <div className="bg-white rounded-xl border border-border/50 shadow-sm">
                     <button 
                       onClick={() => toggleSection('Technology')}
                       className={openSections.includes('Technology') ? "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-t-xl" : "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-xl"}
                     >
                       <span className="font-bold text-foreground">Technology</span>
                       {openSections.includes('Technology') ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                     </button>
                     <AnimatePresence>
                       {openSections.includes('Technology') && (
                         <motion.div 
                           initial={{ height: 0, overflow: "hidden" }}
                           animate={{ height: "auto", transitionEnd: { overflow: "visible" } }}
                           exit={{ height: 0, overflow: "hidden" }}
                         >
                         <div className="p-6 border-t border-border/50 space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Domain *</div>
                               <SearchableSelect options={[{label: "Engineering", value: "eng"}]} value="" onChange={() => {}} placeholder="Domain *" className="w-full h-11" />
                             </div>
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Primary Skill *</div>
                               <SearchableSelect options={[{label: "React", value: "react"}]} value="" onChange={() => {}} placeholder="Primary Skill *" className="w-full h-11" />
                             </div>
                           </div>
                           
                           <div className="space-y-4 pt-4">
                             <div className="flex items-center justify-between pb-3 border-b border-border/50">
                               <h4 className="text-sm font-bold text-foreground">Secondary Skills</h4>
                               <button 
                                 onClick={() => setSecondarySkills(prev => [...prev, { id: Date.now(), skill: "", needComments: false }])}
                                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                               >
                                 <Plus className="w-3.5 h-3.5" /> ADD NEW SKILL
                               </button>
                             </div>

                             <div className="space-y-3">
                               {secondarySkills.map((skill, index) => (
                                 <div key={skill.id} className="flex items-center gap-3 p-2.5 bg-white border border-border/50 rounded-xl shadow-sm relative group hover:border-primary/30 transition-colors">
                                   <div className="relative flex-1 max-w-xl">
                                     <div className="absolute -top-2 left-2.5 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">{`Secondary Skill ${index + 1} *`}</div>
                                     <SearchableSelect 
                                       options={[{label: "Redux", value: "redux"}]} 
                                       value="" 
                                       onChange={() => {}} 
                                       placeholder={`Select Skill...`} 
                                       className="w-full h-10 bg-white" 
                                     />
                                   </div>
                                   <div className="flex items-center gap-2 shrink-0">
                                     <label className="flex items-center gap-2 cursor-pointer group/cb w-fit">
                                       <div className="relative flex items-center justify-center">
                                         <input 
                                           type="checkbox" 
                                           checked={skill.needComments}
                                           onChange={e => setSecondarySkills(prev => prev.map(s => s.id === skill.id ? { ...s, needComments: e.target.checked } : s))}
                                           className="peer sr-only" 
                                         />
                                         <div className="w-4 h-4 border-2 border-border rounded text-primary flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover/cb:border-primary/50">
                                           {skill.needComments && <CheckCircle2 className="w-3 h-3 text-white" />}
                                         </div>
                                       </div>
                                       <span className="text-xs font-medium text-muted-foreground group-hover/cb:text-foreground transition-colors mr-2">Need Comments</span>
                                     </label>
                                   </div>
                                   <div className="shrink-0 flex items-center justify-center border-l border-border/50 pl-3 py-0.5">
                                     <button 
                                       onClick={() => setSecondarySkills(prev => prev.filter(s => s.id !== skill.id))}
                                       className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
                                       title="Remove Skill"
                                     >
                                       <Trash2 className="w-4 h-4" />
                                     </button>
                                   </div>
                                 </div>
                               ))}
                               {secondarySkills.length === 0 && (
                                 <div className="text-center p-8 border border-dashed border-border/80 rounded-xl bg-white text-muted-foreground text-sm">
                                   No secondary skills added yet. Click "Add New Skill" to add requirements.
                                 </div>
                               )}
                             </div>
                           </div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
                 )}

                 {/* Accordion 3: General Info */}
                 <div className="bg-white rounded-xl border border-border/50 shadow-sm">
                   <button 
                     onClick={() => toggleSection('General Info')}
                     className={openSections.includes('General Info') ? "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-t-xl" : "w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-xl"}
                   >
                     <span className="font-bold text-foreground">General Info</span>
                     {openSections.includes('General Info') ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                   </button>
                   <AnimatePresence>
                     {openSections.includes('General Info') && (
                       <motion.div 
                         initial={{ height: 0, overflow: "hidden" }}
                         animate={{ height: "auto", transitionEnd: { overflow: "visible" } }}
                         exit={{ height: 0, overflow: "hidden" }}
                       >
                         <div className="p-6 border-t border-border/50 space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Min Experience *</div>
                               <input type="text" defaultValue={editingJob?.minExp} placeholder="Min Experience *" className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" />
                             </div>
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Max Experience *</div>
                               <input type="text" defaultValue={editingJob?.maxExp} placeholder="Max Experience *" className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" />
                             </div>
                             
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Posting Start Date *</div>
                               <div className="flex items-center h-11 border border-border/50 rounded-xl px-4 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 bg-white">
                                 <input type="text" defaultValue={editingJob?.postStartDate || "2026-Jun-20"} className="w-full bg-transparent outline-none text-sm font-medium text-foreground" />
                                 <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                               </div>
                             </div>

                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Posting End Date *</div>
                               <div className="flex items-center h-11 border border-border/50 rounded-xl px-4 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 bg-white">
                                 <input type="text" defaultValue={editingJob?.postEndDate || "2026-Jun-20"} className="w-full bg-transparent outline-none text-sm font-medium text-foreground" />
                                 <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                               </div>
                             </div>

                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Current Location *</div>
                               <SearchableSelect options={MOCK_LOCATIONS} value={editingJob ? "bengaluru" : ""} onChange={() => {}} placeholder="Current Location *" className="w-full h-11" />
                             </div>
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Designation *</div>
                               <SearchableSelect options={MOCK_DESIGNATIONS} value={editingJob ? "se" : ""} onChange={() => {}} placeholder="Designation *" className="w-full h-11" />
                             </div>
                             <div className="relative mt-2">
                               <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Highest Pay *</div>
                               <input type="text" defaultValue={editingJob?.highestPay} placeholder="Highest Pay *" className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" />
                             </div>
                           </div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
                 
              </div>
              
              <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-white shrink-0 rounded-b-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <button 
                  onClick={() => setShowJobModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowJobModal(false)}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 active:scale-95"
                >
                  {editingJob ? "Save Changes" : "Save Job"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Vendors Modal */}
      <AnimatePresence>
        {showVendorModal && vendorJob && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowVendorModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Add Vendors</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      <span className="font-bold text-foreground">{vendorJob.jobCode}</span> - {vendorJob.jobTitle}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowVendorModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="relative mt-2">
                  <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Select Vendor</div>
                  <SearchableSelect 
                    options={MOCK_VENDORS.filter(v => !addedVendors.find(a => a.id === v.id)).map(v => ({ label: v.name, value: v.id }))} 
                    value="" 
                    onChange={(val) => {
                      const vendor = MOCK_VENDORS.find(v => v.id === val);
                      if (vendor) setAddedVendors(prev => [...prev, vendor]);
                    }} 
                    placeholder="Select Vendor..." 
                    className="w-full h-11" 
                  />
                </div>

                <div className="border border-border/50 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                      <tr>
                        <th className="px-6 py-4 font-bold">Vendor Name</th>
                        <th className="px-6 py-4 font-bold">Email ID</th>
                        <th className="px-6 py-4 font-bold">Mobile No</th>
                        <th className="px-6 py-4 font-bold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {addedVendors.map((vendor) => (
                        <tr key={vendor.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">{vendor.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{vendor.email}</td>
                          <td className="px-6 py-4 text-muted-foreground group/phone whitespace-nowrap cursor-pointer" onClick={() => handleCopyPhone(vendor.id, vendor.phone)}>
                            <div className="flex items-center gap-2">
                              <span className="group-hover/phone:text-primary transition-colors">{vendor.phone}</span>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleCopyPhone(vendor.id, vendor.phone); }}
                                className="p-1.5 rounded-lg text-muted-foreground opacity-0 group-hover/phone:opacity-100 hover:bg-secondary hover:text-foreground transition-all focus:opacity-100"
                                title="Copy Mobile Number"
                              >
                                {copiedPhoneId === vendor.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => setAddedVendors(prev => prev.filter(v => v.id !== vendor.id))}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors mx-auto block"
                              title="Delete Vendor"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {addedVendors.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <div className="p-3 bg-secondary rounded-full mb-3">
                                <Users className="w-6 h-6 text-muted-foreground" />
                              </div>
                              <p className="font-bold text-foreground">No vendors added</p>
                              <p className="text-sm mt-1 max-w-[250px] mx-auto">Select a vendor from the dropdown above to assign them to this job.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-white shrink-0 rounded-b-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <button 
                  onClick={() => setShowVendorModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowVendorModal(false)}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 active:scale-95"
                >
                  Save Vendors
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Escalations Modal */}
      <AnimatePresence>
        {showEscalationModal && escalationJob && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowEscalationModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Escalations</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-secondary text-muted-foreground uppercase tracking-wider border border-border/50">
                        {escalationJob.jobCode}
                      </span>
                      <span className="text-sm font-bold text-foreground">{escalationJob.jobTitle}</span>
                      <span className="text-xs font-bold text-muted-foreground bg-primary/5 px-2 py-0.5 rounded border border-primary/10 text-primary">Wipro</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <RotateCw className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowAddEscalationForm(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary bg-white border border-primary/20 hover:bg-primary/5 rounded-xl transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Add Escalation
                  </button>
                  <div className="h-8 w-px bg-border/50 mx-1"></div>
                  <button 
                    onClick={() => setShowEscalationModal(false)}
                    className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-secondary/10">
                {showAddEscalationForm && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white border border-border/50 rounded-xl p-6 shadow-sm overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative mt-2">
                        <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Status *</div>
                        <SearchableSelect options={[{label: "Open", value: "Open"}, {label: "Closed", value: "Closed"}]} value={newEscalationStatus} onChange={(val) => setNewEscalationStatus(val)} placeholder="Status *" className="w-full h-11" />
                      </div>
                      
                      <div className="relative mt-2">
                        <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Next Follow-up Date</div>
                        <div className="flex items-center h-11 border border-border/50 rounded-xl px-4 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 bg-white">
                          <input type="text" defaultValue="2026-Jun-25" className="w-full bg-transparent outline-none text-sm font-medium text-foreground" />
                          <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-6">
                      <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Comments</div>
                      <textarea value={newEscalationComments} onChange={(e) => setNewEscalationComments(e.target.value)} placeholder="Comments" rows={3} className="w-full px-4 py-3 border border-border/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white"></textarea>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button 
                        onClick={() => setShowAddEscalationForm(false)}
                        className="px-6 py-2 rounded-xl text-sm font-bold bg-white text-muted-foreground border border-border/50 hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        CLOSE
                      </button>
                      <button 
                        onClick={() => {
                          if (!newEscalationComments.trim()) return;
                          const newEsc = {
                            id: "e" + Date.now(),
                            jobCode: escalationJob.jobCode,
                            company: "Wipro",
                            followUpDt: "2026-Jun-25",
                            status: newEscalationStatus,
                            comments: newEscalationComments,
                            escalatedBy: "Current User",
                            escalatedDt: "2026-Jun-20"
                          };
                          setEscalations(prev => [newEsc, ...prev]);
                          setShowAddEscalationForm(false);
                          setNewEscalationComments("");
                          setNewEscalationStatus("Open");
                        }}
                        className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 disabled:opacity-50"
                        disabled={!newEscalationComments.trim()}
                      >
                        SAVE
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="bg-white border border-border/50 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                      <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                        <tr>
                          <th className="px-6 py-4 font-bold">Follow Up Dt</th>
                          <th className="px-6 py-4 font-bold">Status</th>
                          <th className="px-6 py-4 font-bold w-1/3">Comments</th>
                          <th className="px-6 py-4 font-bold">Escalated By</th>
                          <th className="px-6 py-4 font-bold">Escalated Dt</th>
                          <th className="px-6 py-4 font-bold text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {escalations.map((esc) => (
                          <tr key={esc.id} className="hover:bg-primary/5 transition-colors group/row">
                            <td className="px-6 py-4 text-muted-foreground">{esc.followUpDt}</td>
                            <td className="px-6 py-4">
                              <span className={esc.status === 'Open' ? "inline-flex items-center px-2 py-1 rounded-md text-xs font-bold border bg-red-50 text-red-600 border-red-200" : "inline-flex items-center px-2 py-1 rounded-md text-xs font-bold border bg-emerald-50 text-emerald-600 border-emerald-200"}>
                                {esc.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground max-w-xs whitespace-normal break-words" title={esc.comments}>
                              <div className="line-clamp-2">{esc.comments}</div>
                            </td>
                            <td className="px-6 py-4 font-bold text-foreground">{esc.escalatedBy}</td>
                            <td className="px-6 py-4 text-muted-foreground">{esc.escalatedDt}</td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {escalations.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                                <AlertCircle className="w-6 h-6 text-muted-foreground/50" />
                              </div>
                              <h4 className="text-base font-bold text-foreground">No Escalations Found</h4>
                              <p className="text-sm text-muted-foreground mt-1">There are currently no escalations recorded.</p>
                            </td>
                          </tr>
                        )}
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

