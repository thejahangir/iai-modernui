import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  Trash2, 
  Star,
  Search,
  Filter,
  Users,
  FileCheck,
  Target,
  AlertCircle,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_RATINGS = [
  { label: "5 Stars", value: "5" },
  { label: "4+ Stars", value: "4" },
  { label: "3+ Stars", value: "3" },
  { label: "2+ Stars", value: "2" },
  { label: "1+ Stars", value: "1" }
];

const MOCK_SKILLS = [
  { label: "React", value: "react" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "AWS", value: "aws" }
];

const MOCK_DATA = Array.from({ length: 15 }).map((_, i) => ({
  id: `CAN-00${i + 1}`,
  name: ["Aarohi Patel", "Vikram Singh", "Neha Gupta", "Rahul Sharma"][i % 4],
  experience: ["2 Years", "5 Years", "8 Years", "3.5 Years"][i % 4],
  noticePeriod: ["Immediate", "15 Days", "30 Days", "60 Days"][i % 4],
  interviewDate: `2026-06-${10 + (i % 20)}`,
  rating: (Math.random() * 2 + 3).toFixed(1),
  requestSent: ["Yes", "No", "Pending"][i % 3],
  skills: [["React", "Node.js"], ["Python", "Django"], ["Java", "Spring"], ["Figma", "AWS"]][i % 4],
}));

export default function CandidateGrid() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterSkill, setFilterSkill] = useState("");

  const pageTitle = type 
    ? type.charAt(0).toUpperCase() + type.slice(1) + " Profiles"
    : "Profiles";

  const handleDelete = (candidateId: string) => {
    if(confirm("Are you sure you want to delete this candidate?")) {
      setData(prev => prev.filter(c => c.id !== candidateId));
    }
  };

  const filteredData = data.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Rating logic: if filterRating is "4", it means 4+ stars, so c.rating >= 4
    const matchesRating = filterRating ? parseFloat(c.rating) >= parseFloat(filterRating) : true;
    
    // Skill logic: check if the mock skills array includes the selected skill (case insensitive)
    const matchesSkill = filterSkill 
      ? c.skills.some(s => s.toLowerCase() === filterSkill.toLowerCase()) 
      : true;

    return matchesSearch && matchesRating && matchesSkill;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-heading text-foreground flex items-center gap-2"
          >
            {pageTitle} {id && <span className="text-slate-400 font-normal text-lg">({id})</span>}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-1 font-medium"
          >
            View and manage all {type?.toLowerCase() || 'candidate'} profiles.
          </motion.p>
        </div>
      </div>

      {/* Candidate Pipeline Flow */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border/50 shadow-sm"
      >
        <div className="flex items-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0" style={{ scrollbarWidth: 'none' }}>
          {[
            { label: "Add Profile", icon: UserPlus, value: "All", color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-200", path: id ? `/dashboard/recruiter/postings/${id}/profiles` : "/dashboard/admin/company/add", isBack: true },
            { label: "Related Profiles", icon: Users, value: "124", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-200", path: "related" },
            { label: "Applied Profiles", icon: FileCheck, value: "68", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-200", path: "applied" },
            { label: "Shortlisted Profiles", icon: Target, value: "24", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-200", path: "shortlisted" },
          ]
          .filter(item => item.path !== type)
          .map((item, idx) => {
            return (
              <div key={item.label} className="flex items-center shrink-0">
                <button 
                  onClick={() => {
                    if (item.isBack) navigate(item.path);
                    else navigate(location.pathname.replace(type as string, item.path));
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 group px-2 sm:px-4 cursor-pointer"
                >
                  <div className={cn(`w-12 h-12 rounded-full border border-transparent flex items-center justify-center ${item.bg} ${item.color} group-hover:${item.border} group-hover:scale-110 transition-all duration-300 shadow-sm`)}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold font-heading leading-none text-foreground group-hover:text-primary transition-colors">{item.value}</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 text-muted-foreground group-hover:text-slate-700 transition-colors">{item.label}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="h-12 w-px bg-slate-200 hidden md:block mx-2"></div>

        <button 
          className="flex items-center justify-center gap-2.5 w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 hover:border-rose-300 hover:shadow-md hover:shadow-rose-100 transition-all group shrink-0 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/10 to-rose-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <AlertCircle className="w-5 h-5 text-rose-500 group-hover:animate-bounce" />
          <span className="font-bold text-sm tracking-wide text-rose-700">Escalations</span>
        </button>
      </motion.div>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-3 px-4 rounded-2xl shadow-sm border border-border/50 flex flex-col xl:flex-row items-center gap-3 relative z-10"
      >
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 w-full xl:w-auto">
          <div className="relative w-full lg:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 h-[42px] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <SearchableSelect
            options={MOCK_RATINGS}
            value={filterRating}
            onChange={setFilterRating}
            placeholder="Rating"
            className="w-full lg:w-[150px] h-[42px]"
          />
          <SearchableSelect
            options={MOCK_SKILLS}
            value={filterSkill}
            onChange={setFilterSkill}
            placeholder="Primary Skill"
            className="w-full lg:w-[150px] h-[42px]"
          />
        </div>
        <button 
          onClick={() => {
            setFilterRating("");
            setFilterSkill("");
            setSearchTerm("");
          }}
          className="flex items-center gap-2 px-4 h-[42px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors shrink-0 ml-auto text-sm"
        >
          <Filter className="w-4 h-4" /> Reset Filters
        </button>
      </motion.div>

      {/* Data Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold">Candidate Name</th>
                <th className="px-6 py-4 font-bold">Experience</th>
                <th className="px-6 py-4 font-bold">Notice Period</th>
                <th className="px-6 py-4 font-bold">Interview Date</th>
                <th className="px-6 py-4 font-bold text-center">Rating</th>
                <th className="px-6 py-4 font-bold text-center">Request Sent</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{item.name}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{item.experience}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 text-xs font-bold rounded-md border",
                        item.noticePeriod === "Immediate" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                        item.noticePeriod === "15 Days" ? "bg-blue-50 text-blue-600 border-blue-200" :
                        "bg-slate-100 text-slate-600 border-slate-200"
                      )}>
                        {item.noticePeriod}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{item.interviewDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center text-orange-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold ml-1">{item.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={cn(
                          "px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg",
                          item.requestSent === "Yes" ? "bg-green-100 text-green-700" :
                          item.requestSent === "No" ? "bg-rose-100 text-rose-700" :
                          "bg-amber-100 text-amber-700"
                        )}>
                          {item.requestSent}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-auto flex items-center justify-center"
                        title="Delete Candidate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
