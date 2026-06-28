import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  RotateCw, 
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  History,
  FileText,
  UserCheck,
  Star,
  CheckCircle,
  X,
  Edit,
  User,
  Clock
} from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";
import * as XLSX from "xlsx";

const MOCK_SKILLS = [
  { label: "React", value: "React" },
  { label: "Node.js", value: "Node.js" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "Product Management", value: "Product Management" },
  { label: "Data Science", value: "Data Science" }
];

const MOCK_STATUSES = [
  { label: "Applied", value: "Applied" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Interview Scheduled", value: "Interview Scheduled" },
  { label: "Selected", value: "Selected" },
  { label: "Rejected", value: "Rejected" }
];

const MOCK_ROUNDS = [
  { label: "Technical Round 1", value: "Technical Round 1" },
  { label: "Technical Round 2", value: "Technical Round 2" },
  { label: "HR Round", value: "HR Round" },
  { label: "Managerial Round", value: "Managerial Round" }
];

const MOCK_HISTORY = [
  { id: 1, candidateName: "Rahul Singh", status: "Applied", followUpDt: "2026-06-01", comments: "Application received", createdDate: "2026-06-01" },
  { id: 2, candidateName: "Rahul Singh", status: "Applied", followUpDt: "2026-06-05", comments: "Initial resume screen passed", createdDate: "2026-06-02" },
  { id: 3, candidateName: "Rahul Singh", status: "Shortlisted", followUpDt: "2026-06-10", comments: "Shortlisted for next steps", createdDate: "2026-06-05" },
  { id: 4, candidateName: "Rahul Singh", status: "Shortlisted", followUpDt: "2026-06-12", comments: "Contacted candidate for availability", createdDate: "2026-06-10" },
  { id: 5, candidateName: "Rahul Singh", status: "Interview Scheduled", followUpDt: "2026-06-15", comments: "Round 1 technical scheduled", createdDate: "2026-06-12" },
  { id: 6, candidateName: "Rahul Singh", status: "Interview Scheduled", followUpDt: "2026-06-18", comments: "Round 1 feedback: Positive", createdDate: "2026-06-15" },
  { id: 7, candidateName: "Rahul Singh", status: "Interview Scheduled", followUpDt: "2026-06-20", comments: "Round 2 technical scheduled", createdDate: "2026-06-18" },
  { id: 8, candidateName: "Rahul Singh", status: "Interview Scheduled", followUpDt: "2026-06-22", comments: "Round 2 feedback: Excellent", createdDate: "2026-06-20" },
  { id: 9, candidateName: "Rahul Singh", status: "Interview Scheduled", followUpDt: "2026-06-25", comments: "HR round scheduled", createdDate: "2026-06-22" },
  { id: 10, candidateName: "Rahul Singh", status: "Interview Scheduled", followUpDt: "2026-06-28", comments: "HR round completed", createdDate: "2026-06-25" },
  { id: 11, candidateName: "Rahul Singh", status: "Selected", followUpDt: "-", comments: "Offer letter generated", createdDate: "2026-06-28" },
  { id: 12, candidateName: "Rahul Singh", status: "Selected", followUpDt: "-", comments: "Offer letter sent to candidate", createdDate: "2026-06-29" },
  { id: 13, candidateName: "Rahul Singh", status: "Selected", followUpDt: "-", comments: "Offer accepted by candidate", createdDate: "2026-06-30" },
  { id: 14, candidateName: "Priya Desai", status: "Applied", followUpDt: "2026-07-02", comments: "Reviewing profile", createdDate: "2026-07-01" },
  { id: 15, candidateName: "Amit Kumar", status: "Applied", followUpDt: "-", comments: "Direct referral", createdDate: "2026-06-20" },
  { id: 16, candidateName: "Amit Kumar", status: "Interview Scheduled", followUpDt: "2026-07-02", comments: "HR round", createdDate: "2026-06-25" }
];

const initialData = [
  { id: "1", name: "Rahul Singh", designation: "Software Engineer", recruiter: "Alice Smith", interviewDate: "2026-06-30", rating: "4.5", status: "Shortlisted", primarySkill: "React", rated: true },
  { id: "2", name: "Priya Desai", designation: "Product Manager", recruiter: "Bob Jones", interviewDate: "-", rating: "-", status: "Applied", primarySkill: "Product Management", rated: false },
  { id: "3", name: "Amit Kumar", designation: "Data Scientist", recruiter: "Alice Smith", interviewDate: "2026-07-02", rating: "5.0", status: "Interview Scheduled", primarySkill: "Data Science", rated: true },
  { id: "4", name: "Neha Sharma", designation: "Backend Developer", recruiter: "Charlie Brown", interviewDate: "-", rating: "3.5", status: "Rejected", primarySkill: "Node.js", rated: true },
  { id: "5", name: "Vikram Gupta", designation: "Frontend Engineer", recruiter: "Bob Jones", interviewDate: "2026-07-05", rating: "-", status: "Selected", primarySkill: "React", rated: false },
];

export default function AnternRecruiterAllProfiles() {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Filter state
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [filterRated, setFilterRated] = useState(false);
  
  // Modal states
  const [activeItem, setActiveItem] = useState<any>(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Schedule modal state
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [scheduleRound, setScheduleRound] = useState("Technical Round 1");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleLink, setScheduleLink] = useState("");
  const [scheduleRating, setScheduleRating] = useState("");
  
  // Update Status modal state
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateFollowUp, setUpdateFollowUp] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  
  // History modal state
  const [historyPage, setHistoryPage] = useState(1);
  const historyItemsPerPage = 10;
  
  const TIME_SLOTS = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editDesignation, setEditDesignation] = useState("");
  const [editRecruiter, setEditRecruiter] = useState("");
  const [editInterviewDate, setEditInterviewDate] = useState("");
  const [editRating, setEditRating] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editSkill, setEditSkill] = useState("");

  const handleReload = () => {
    setData([...initialData]);
    setFilteredData([...initialData]);
    setFilterStartDate("");
    setFilterEndDate("");
    setFilterSkill("");
    setFilterRated(false);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    let filtered = [...data];
    
    if (filterStartDate) {
      filtered = filtered.filter(item => item.interviewDate !== "-" && item.interviewDate >= filterStartDate);
    }
    if (filterEndDate) {
      filtered = filtered.filter(item => item.interviewDate !== "-" && item.interviewDate <= filterEndDate);
    }
    if (filterSkill) {
      const skillLabel = MOCK_SKILLS.find(s => s.value === filterSkill)?.label;
      if (skillLabel) {
        filtered = filtered.filter(item => item.primarySkill === skillLabel);
      }
    }
    if (filterRated) {
      filtered = filtered.filter(item => item.rated === true);
    }
    
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData.map(item => ({
      "Name": item.name,
      "Designation": item.designation,
      "Recruiter": item.recruiter,
      "Interview Date": item.interviewDate,
      "Rating": item.rating,
      "Status": item.status,
      "Primary Skill": item.primarySkill
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Profiles");
    XLSX.writeFile(wb, "All_Profiles.xlsx");
  };

  const openEditModal = (item: any) => {
    setActiveItem(item);
    setEditName(item.name);
    setEditDesignation(item.designation);
    setEditRecruiter(item.recruiter);
    setEditInterviewDate(item.interviewDate === "-" ? "" : item.interviewDate);
    setEditRating(item.rating === "-" ? "" : item.rating);
    setEditStatus(item.status);
    const skillObj = MOCK_SKILLS.find(s => s.label === item.primarySkill);
    setEditSkill(skillObj ? skillObj.value : "");
    setShowEditModal(true);
  };

  const openScheduleModal = (item: any) => {
    setActiveItem(item);
    setScheduleRound("Technical Round 1");
    const dateStr = item.interviewDate !== "-" ? `${item.interviewDate}T10:00` : "2026-06-30T10:00";
    setScheduleDate(dateStr);
    setScheduleLink("https://meet.google.com/abc-xyz-123");
    setScheduleRating(item.rating !== "-" ? item.rating : "");
    setIsRescheduling(false);
    setSelectedTimeSlot("");
    setShowScheduleModal(true);
  };

  const openStatusModal = (item: any) => {
    setActiveItem(item);
    setUpdateStatus(item.status);
    setUpdateFollowUp("");
    setUpdateComment("");
    setShowStatusModal(true);
  };

  const openHistoryModal = (item: any) => {
    setActiveItem(item);
    setHistoryPage(1);
    setShowHistoryModal(true);
  };

  const handleSaveEdit = () => {
    if (!activeItem) return;
    
    const skillLabel = MOCK_SKILLS.find(s => s.value === editSkill)?.label || "N/A";
    const isRated = editRating.trim() !== "" && !isNaN(Number(editRating));

    const newData = data.map(item => {
      if (item.id === activeItem.id) {
        return {
          ...item,
          name: editName,
          designation: editDesignation,
          recruiter: editRecruiter,
          interviewDate: editInterviewDate || "-",
          rating: editRating || "-",
          status: editStatus || "Applied",
          primarySkill: skillLabel,
          rated: isRated
        };
      }
      return item;
    });

    setData(newData);
    
    // Re-apply current filters
    let filtered = [...newData];
    if (filterStartDate) filtered = filtered.filter(item => item.interviewDate !== "-" && item.interviewDate >= filterStartDate);
    if (filterEndDate) filtered = filtered.filter(item => item.interviewDate !== "-" && item.interviewDate <= filterEndDate);
    if (filterSkill) {
      const sLabel = MOCK_SKILLS.find(s => s.value === filterSkill)?.label;
      if (sLabel) filtered = filtered.filter(item => item.primarySkill === sLabel);
    }
    if (filterRated) filtered = filtered.filter(item => item.rated === true);
    
    setFilteredData(filtered);
    setShowEditModal(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Applied': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Shortlisted': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Interview Scheduled': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Selected': return 'bg-green-50 text-green-600 border-green-200';
      case 'Rejected': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">All Profiles</h2>
        <p className="text-muted-foreground mt-1">Manage and track all candidate profiles across the organization.</p>
      </div>

      {/* Search Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-border/50 relative z-10"
      >
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Date Range */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <input 
                type="date" 
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="pl-10 pr-4 h-[42px] w-[150px] bg-secondary/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
              />
            </div>
            <span className="text-muted-foreground text-sm">to</span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <input 
                type="date" 
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="pl-10 pr-4 h-[42px] w-[150px] bg-secondary/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
              />
            </div>
          </div>

          <SearchableSelect 
            options={MOCK_SKILLS} 
            value={filterSkill} 
            onChange={setFilterSkill} 
            placeholder="Primary Skill" 
            className="w-[200px] h-[42px]" 
          />

          <label className="flex items-center gap-2 cursor-pointer ml-2">
            <input 
              type="checkbox" 
              checked={filterRated}
              onChange={(e) => setFilterRated(e.target.checked)}
              className="w-4 h-4 rounded border-border/50 text-primary focus:ring-primary/20 transition-colors"
            />
            <span className="text-sm font-medium text-foreground">Rated</span>
          </label>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full xl:w-auto justify-end border-t xl:border-t-0 xl:border-l border-border/50 pt-4 xl:pt-0 xl:pl-4">
          <button 
            onClick={handleReload}
            title="Reload Data"
            className="flex items-center justify-center h-[42px] w-[42px] bg-secondary text-secondary-foreground rounded-xl hover:bg-black/5 transition-all shrink-0"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 h-[42px] px-4 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl hover:bg-black/5 transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            Export
          </button>

          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-[42px] px-6 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all active:scale-95 shrink-0"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          
          <div className="flex items-center bg-secondary/50 rounded-xl p-1 border border-border/50 shrink-0 ml-2">
            <button 
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'cards' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              title="Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      {viewMode === 'cards' ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {paginatedData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group overflow-hidden flex flex-col relative pb-[60px]">
              <div className="p-5 border-b border-border/50 flex items-start justify-between bg-secondary/10 relative">
                <button 
                  onClick={() => openEditModal(item)}
                  className="absolute top-3 right-3 p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 bg-white shadow-sm"
                  title="Edit Profile"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0 border border-primary/20">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.designation}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 space-y-4 flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><User className="w-4 h-4"/> Recruiter</span>
                  <span className="font-medium text-foreground">{item.recruiter}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4"/> Interview</span>
                  <span className="font-medium text-foreground">{item.interviewDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Star className="w-4 h-4"/> Rating</span>
                  <span className="font-medium text-foreground">{item.rating}</span>
                </div>
                <div className="pt-2 border-t border-border/50">
                   <span className={`inline-block px-2.5 py-0.5 rounded-full border text-xs font-bold ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons docked at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-secondary/30 border-t border-border/50 flex items-center justify-center gap-2">
                <button 
                  onClick={() => openScheduleModal(item)}
                  className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                  title="Schedule Interview"
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => openStatusModal(item)}
                  className="p-2 rounded-xl text-amber-500 hover:bg-amber-50 transition-colors"
                  title="Update Status"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => openHistoryModal(item)}
                  className="p-2 rounded-xl text-purple-500 hover:bg-purple-50 transition-colors"
                  title="View History"
                >
                  <History className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {paginatedData.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-muted-foreground bg-white rounded-2xl border border-border/50">
              <div className="p-4 bg-secondary rounded-full mb-4">
                <UserCheck className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-bold text-foreground text-lg">No profiles found</p>
              <p className="text-sm mt-1 max-w-[300px] text-center">Adjust your search filters.</p>
            </div>
          )}
        </motion.div>
      ) : (
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
                <th className="px-6 py-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      {item.name}
                      <button 
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg text-primary opacity-0 group-hover:opacity-100 hover:bg-primary/10 transition-colors"
                        title="Edit Profile"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.designation}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.recruiter}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{item.interviewDate}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{item.rating}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-xs font-bold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => openScheduleModal(item)}
                        className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                        title="Schedule Interview"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openStatusModal(item)}
                        className="p-2 rounded-xl text-amber-500 hover:bg-amber-50 transition-colors"
                        title="Update Status"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openHistoryModal(item)}
                        className="p-2 rounded-xl text-purple-500 hover:bg-purple-50 transition-colors"
                        title="View History"
                      >
                        <History className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 bg-secondary rounded-full mb-3">
                        <UserCheck className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="font-bold text-foreground">No profiles found</p>
                      <p className="text-sm mt-1">Adjust your search filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && filteredData.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-border/50 shadow-sm mt-4"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-foreground">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
                <span className="font-bold text-foreground">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border/50 hover:bg-secondary/50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
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
                            : 'text-foreground hover:bg-secondary/50'
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
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border/50 hover:bg-secondary/50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
          
          <div className="flex flex-1 justify-between sm:hidden items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-xl border border-border/50 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl border border-border/50 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Edit className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Edit Profile</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">Update all details for {activeItem?.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Name</div>
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" />
                  </div>
                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Designation</div>
                    <input type="text" value={editDesignation} onChange={(e) => setEditDesignation(e.target.value)} className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" />
                  </div>
                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Recruiter</div>
                    <input type="text" value={editRecruiter} onChange={(e) => setEditRecruiter(e.target.value)} className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" />
                  </div>
                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Primary Skill</div>
                    <select value={editSkill} onChange={(e) => setEditSkill(e.target.value)} className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white">
                      <option value="">Select Skill</option>
                      {MOCK_SKILLS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Interview Date</div>
                    <input type="date" value={editInterviewDate} onChange={(e) => setEditInterviewDate(e.target.value)} className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" />
                  </div>
                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Rating</div>
                    <input type="text" placeholder="e.g. 4.5" value={editRating} onChange={(e) => setEditRating(e.target.value)} className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" />
                  </div>
                  <div className="relative mt-2 col-span-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Status</div>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white">
                      {MOCK_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-white shrink-0 rounded-b-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}

        {/* Schedule Interview Modal */}
        {showScheduleModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowScheduleModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">{isRescheduling ? "Reschedule Interview" : "Schedule Interview Rounds"}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => { setShowScheduleModal(false); setIsRescheduling(false); }}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                {!isRescheduling ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">Interview details for <span className="font-bold text-foreground">{activeItem?.name}</span>.</p>
                    <div className="space-y-4">
                      <div className="relative pt-6">
                        <div className="absolute top-0 left-1 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Interview Rounds</div>
                        <SearchableSelect 
                          options={MOCK_ROUNDS} 
                          value={scheduleRound} 
                          onChange={setScheduleRound} 
                          placeholder="Select Round" 
                          className="w-full h-11" 
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Interview Date & Time</div>
                        <input 
                          type="datetime-local" 
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" 
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Meeting Link</div>
                        <input 
                          type="url" 
                          placeholder="e.g. https://meet.google.com/..." 
                          value={scheduleLink}
                          onChange={(e) => setScheduleLink(e.target.value)}
                          className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" 
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Rating</div>
                        <input 
                          type="text" 
                          placeholder="e.g. 4.5" 
                          value={scheduleRating}
                          onChange={(e) => setScheduleRating(e.target.value)}
                          className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" 
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">Select a new date and time for <span className="font-bold text-foreground">{activeItem?.name}</span>.</p>
                    <div className="space-y-6">
                      <div className="relative">
                        <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Select Date</div>
                        <input type="date" className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-white" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground mb-2 px-1">Available Time Slots (30 mins)</div>
                        <div className="flex flex-wrap gap-2">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                                selectedTimeSlot === slot 
                                  ? 'bg-slate-200 text-slate-800 border-slate-300 shadow-sm' 
                                  : 'bg-white text-muted-foreground border-border/50 hover:bg-slate-50'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-white rounded-b-2xl">
                {!isRescheduling ? (
                  <>
                    <button 
                      onClick={() => setIsRescheduling(true)}
                      className="px-6 py-2.5 rounded-xl text-sm font-bold bg-secondary text-foreground hover:bg-black/5 transition-colors active:scale-95 shadow-sm"
                    >
                      Reschedule
                    </button>
                    <button 
                      onClick={() => { alert("Interview Scheduled!"); setShowScheduleModal(false); }}
                      className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 active:scale-95"
                    >
                      Schedule
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsRescheduling(false)}
                      className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => { alert("Interview Rescheduled!"); setShowScheduleModal(false); setIsRescheduling(false); }}
                      className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 active:scale-95"
                      disabled={!selectedTimeSlot}
                    >
                      Confirm Reschedule
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}

        {/* Update Status Modal */}
        {showStatusModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowStatusModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Update Status</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">Update the pipeline status for <span className="font-bold text-foreground">{activeItem?.name}</span>.</p>
                <div className="space-y-6">
                  <div className="relative pt-6">
                    <div className="absolute top-0 left-1 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">New Status</div>
                    <SearchableSelect 
                      options={MOCK_STATUSES} 
                      value={updateStatus} 
                      onChange={setUpdateStatus} 
                      placeholder="Select Status" 
                      className="w-full h-11" 
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Next Follow-Up Date</div>
                    <input 
                      type="date" 
                      value={updateFollowUp}
                      onChange={(e) => setUpdateFollowUp(e.target.value)}
                      className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm font-medium bg-white" 
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Comments</div>
                    <textarea 
                      value={updateComment}
                      onChange={(e) => setUpdateComment(e.target.value)}
                      placeholder="Add any notes about this status change..."
                      rows={3}
                      className="w-full p-4 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm font-medium bg-white resize-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-white rounded-b-2xl">
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { alert("Status Updated!"); setShowStatusModal(false); }}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/20 active:scale-95"
                  disabled={!updateStatus}
                >
                  Update Status
                </button>
              </div>
            </motion.div>
          </>
        )}

        {/* View History Modal */}
        {showHistoryModal && (
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <History className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Candidate History</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">Audit log for {activeItem?.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-0 overflow-y-auto flex-1 bg-secondary/10">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-[11px] text-muted-foreground uppercase bg-white border-b border-border/50">
                      <tr>
                        <th className="px-4 py-2 font-bold">Candidate Name</th>
                        <th className="px-4 py-2 font-bold">Status</th>
                        <th className="px-4 py-2 font-bold">Follow Up Dt</th>
                        <th className="px-4 py-2 font-bold">Comments</th>
                        <th className="px-4 py-2 font-bold">Created Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 bg-white text-xs">
                      {MOCK_HISTORY
                        .filter(h => h.candidateName === activeItem?.name) // filter mock by candidate name
                        .slice((historyPage - 1) * historyItemsPerPage, historyPage * historyItemsPerPage)
                        .map((hist) => (
                        <tr key={hist.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-2 font-bold text-foreground">{hist.candidateName}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-block px-2 py-0.5 rounded-full border text-[9px] font-bold ${getStatusColor(hist.status)}`}>
                              {hist.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-muted-foreground">{hist.followUpDt}</td>
                          <td className="px-4 py-2 text-muted-foreground max-w-[200px] truncate" title={hist.comments}>{hist.comments}</td>
                          <td className="px-4 py-2 text-muted-foreground">{hist.createdDate}</td>
                        </tr>
                      ))}
                      {MOCK_HISTORY.filter(h => h.candidateName === activeItem?.name).length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                            No history found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* History Pagination */}
              {Math.ceil(MOCK_HISTORY.filter(h => h.candidateName === activeItem?.name).length / historyItemsPerPage) > 1 && (
                <div className="px-6 py-3 border-t border-border/50 flex items-center justify-between bg-white shrink-0">
                  <span className="text-xs text-muted-foreground">
                    Page {historyPage} of {Math.ceil(MOCK_HISTORY.filter(h => h.candidateName === activeItem?.name).length / historyItemsPerPage)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setHistoryPage(p => Math.max(1, p - 1))}
                      disabled={historyPage === 1}
                      className="p-1 rounded bg-secondary text-secondary-foreground hover:bg-black/5 disabled:opacity-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setHistoryPage(p => p + 1)}
                      disabled={historyPage >= Math.ceil(MOCK_HISTORY.filter(h => h.candidateName === activeItem?.name).length / historyItemsPerPage)}
                      className="p-1 rounded bg-secondary text-secondary-foreground hover:bg-black/5 disabled:opacity-50 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="p-6 border-t border-border/50 bg-white rounded-b-2xl flex justify-end">
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-secondary text-secondary-foreground hover:bg-black/5 transition-colors active:scale-95"
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

