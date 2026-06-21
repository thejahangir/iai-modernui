import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Trash2, Users, AlertTriangle, Plus, X, Pencil, MapPin, Briefcase, CheckCircle, XCircle, Code2, User, Save, LayoutGrid, List } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

// Mock data to load when searched
const mockData = [
  { id: "INT-1001", name: "Aarohi Patel", primarySkill: "React", experience: "5 Years", verified: "Yes", location: "New York, NY" },
  { id: "INT-1002", name: "Rahul Joshi", primarySkill: "React", experience: "3 Years", verified: "No", location: "Austin, TX" },
  { id: "INT-1003", name: "Chandan Das", primarySkill: "Python", experience: "7 Years", verified: "Yes", location: "San Francisco, CA" },
  { id: "INT-1004", name: "Dave Wilson", primarySkill: "Python", experience: "4 Years", verified: "Yes", location: "Chicago, IL" },
  { id: "INT-1005", name: "Eve Brown", primarySkill: "Node.js", experience: "6 Years", verified: "Yes", location: "Seattle, WA" },
  { id: "INT-1006", name: "Frank Miller", primarySkill: "Node.js", experience: "8 Years", verified: "Yes", location: "Denver, CO" },
  { id: "INT-1007", name: "Grace Hopper", primarySkill: "Java", experience: "10+ Years", verified: "Yes", location: "Boston, MA" },
  { id: "INT-1008", name: "James Gosling", primarySkill: "Java", experience: "15 Years", verified: "Yes", location: "Los Angeles, CA" },
  { id: "INT-1009", name: "Linus Torvalds", primarySkill: "DevOps", experience: "20 Years", verified: "Yes", location: "Helsinki, FI" },
  { id: "INT-1010", name: "Ken Thompson", primarySkill: "DevOps", experience: "12 Years", verified: "No", location: "Murray Hill, NJ" },
  { id: "INT-1011", name: "Alice Smith", primarySkill: "React", experience: "2 Years", verified: "No", location: "Portland, OR" },
  { id: "INT-1012", name: "Bob Martin", primarySkill: "Java", experience: "25 Years", verified: "Yes", location: "Clean Code, FL" },
  { id: "INT-1013", name: "Charlie Root", primarySkill: "Python", experience: "1 Year", verified: "No", location: "Unknown" },
  { id: "INT-1014", name: "Diana Prince", primarySkill: "Node.js", experience: "9 Years", verified: "Yes", location: "Themyscira" },
];

const SKILLS = ["React", "Python", "Node.js", "Java", "DevOps"];

const getBadgeColor = (str: string) => {
  const colors = [
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-emerald-100 text-emerald-700 border-emerald-200",
    "bg-amber-100 text-amber-700 border-amber-200",
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-pink-100 text-pink-700 border-pink-200",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function AdminRegisteredInterviewers() {
  const [data, setData] = useState(mockData);
  const [hasSearched, setHasSearched] = useState(true);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [searchSkill, setSearchSkill] = useState("");
  
  // Modals state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [selectedInterviewer, setSelectedInterviewer] = useState<any>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    primarySkill: "",
    experience: "",
    verified: "No",
    location: ""
  });
  const [formErrors, setFormErrors] = useState({ name: "", primarySkill: "", experience: "", location: "" });

  const handleSearch = () => {
    if (!searchSkill) {
      setValidationError("Please select a Primary Skill before searching to view the registered interviewers.");
      return;
    }
    setHasSearched(true);
    setData(mockData.filter(item => item.primarySkill === searchSkill));
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== selectedInterviewer.id));
    setShowDeleteModal(false);
    setSelectedInterviewer(null);
  };

  const handleSave = () => {
    let isValid = true;
    const errors = { name: "", primarySkill: "", experience: "", location: "" };

    if (!form.name.trim()) { errors.name = "Required"; isValid = false; }
    if (!form.primarySkill) { errors.primarySkill = "Required"; isValid = false; }
    if (!form.experience.trim()) { errors.experience = "Required"; isValid = false; }
    if (!form.location.trim()) { errors.location = "Required"; isValid = false; }

    setFormErrors(errors);
    if (!isValid) return;

    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...item, ...form } : item));
    } else {
      const newId = `INT-${1000 + data.length + 1}`;
      setData([...data, { id: newId, ...form }]);
    }
    
    setIsModalOpen(false);
    handleResetForm();
  };

  const handleResetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      primarySkill: "",
      experience: "",
      verified: "No",
      location: ""
    });
    setFormErrors({ name: "", primarySkill: "", experience: "", location: "" });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      primarySkill: item.primarySkill,
      experience: item.experience,
      verified: item.verified,
      location: item.location
    });
    setFormErrors({ name: "", primarySkill: "", experience: "", location: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleResetForm();
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Registered Interviewers</h2>
          <p className="text-muted-foreground mt-1">View and manage interviewers registered on the platform.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="flex bg-secondary/50 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setViewMode("card")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-sm font-bold transition-all ${
                viewMode === "card" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Cards
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-sm font-bold transition-all ${
                viewMode === "table" 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-4 h-4" />
              Table
            </button>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 h-10 px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all hover:shadow-md hover:shadow-primary/30 active:scale-95 shrink-0 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Interviewer
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
        
        <div className="p-4 flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full max-w-md space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Search by Skill</label>
            <SearchableSelect
              options={SKILLS.map(skill => ({ label: skill, value: skill }))}
              value={searchSkill}
              onChange={(val) => setSearchSkill(val)}
              placeholder="Select Primary Skill"
              className="w-full h-11"
            />
          </div>

          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-11 px-8 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl hover:bg-secondary/80 transition-all active:scale-95 w-full sm:w-auto"
          >
            <Search className="w-4 h-4" />
            Filter
          </button>
          <button 
            onClick={() => { setSearchSkill(""); setData(mockData); setHasSearched(true); }}
            className="flex items-center justify-center gap-2 h-11 px-8 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto"
          >
            Clear
          </button>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {editingId ? <Pencil className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-foreground">
                      {editingId ? "Update Interviewer" : "Add New Interviewer"}
                    </h3>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="p-2 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2 group">
                    <div className="flex justify-between items-center ml-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <User className="w-4 h-4" /> Name
                      </label>
                      <AnimatePresence>
                        {formErrors.name && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <input 
                      type="text" 
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                      }}
                      placeholder="e.g. John Doe"
                      className={`w-full h-12 px-4 bg-secondary/50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 transition-all shadow-inner ${
                        formErrors.name 
                          ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                          : 'border-border/50 focus:ring-primary/20 focus:border-primary group-hover:border-primary/30'
                      }`}
                    />
                  </div>

                  <div className="space-y-2 relative group">
                    <div className="flex justify-between items-center ml-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <Code2 className="w-4 h-4" /> Primary Skill
                      </label>
                      <AnimatePresence>
                        {formErrors.primarySkill && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.primarySkill}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={`rounded-2xl transition-all ${
                      formErrors.primarySkill 
                        ? 'border border-destructive/50 ring-2 ring-destructive/20' 
                        : ''
                    }`}>
                      <SearchableSelect 
                        options={SKILLS.map(skill => ({ label: skill, value: skill }))}
                        value={form.primarySkill}
                        onChange={(val) => {
                          setForm({ ...form, primarySkill: val });
                          if (formErrors.primarySkill) setFormErrors({ ...formErrors, primarySkill: "" });
                        }}
                        placeholder="Select Skill"
                        className="w-full h-12 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex justify-between items-center ml-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <Briefcase className="w-4 h-4" /> Experience
                      </label>
                      <AnimatePresence>
                        {formErrors.experience && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.experience}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <input 
                      type="text" 
                      value={form.experience}
                      onChange={(e) => {
                        setForm({ ...form, experience: e.target.value });
                        if (formErrors.experience) setFormErrors({ ...formErrors, experience: "" });
                      }}
                      placeholder="e.g. 5 Years"
                      className={`w-full h-12 px-4 bg-secondary/50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 transition-all shadow-inner ${
                        formErrors.experience 
                          ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                          : 'border-border/50 focus:ring-primary/20 focus:border-primary group-hover:border-primary/30'
                      }`}
                    />
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex justify-between items-center ml-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <MapPin className="w-4 h-4" /> Location
                      </label>
                      <AnimatePresence>
                        {formErrors.location && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.location}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <input 
                      type="text" 
                      value={form.location}
                      onChange={(e) => {
                        setForm({ ...form, location: e.target.value });
                        if (formErrors.location) setFormErrors({ ...formErrors, location: "" });
                      }}
                      placeholder="e.g. New York, NY"
                      className={`w-full h-12 px-4 bg-secondary/50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 transition-all shadow-inner ${
                        formErrors.location 
                          ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                          : 'border-border/50 focus:ring-primary/20 focus:border-primary group-hover:border-primary/30'
                      }`}
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                      <CheckCircle className="w-4 h-4" /> Verified
                    </label>
                    <div className="relative">
                      <select 
                        value={form.verified}
                        onChange={(e) => setForm({ ...form, verified: e.target.value })}
                        className="w-full h-12 pl-4 pr-10 bg-secondary/50 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer shadow-inner group-hover:border-primary/30"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border/50">
                  <button 
                    onClick={handleResetForm}
                    className="flex items-center justify-center gap-2 h-12 px-5 bg-white border border-border text-foreground text-sm font-bold rounded-2xl hover:bg-secondary transition-all active:scale-95 shadow-sm hover:shadow"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 h-12 px-8 bg-primary text-white text-sm font-bold rounded-2xl shadow-md shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 hover:shadow-lg hover:shadow-primary/40"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {!hasSearched || data.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-border">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No Interviewers Found</h3>
            <p className="text-muted-foreground max-w-sm text-lg">
              There are no interviewers matching your criteria, or none exist yet.
            </p>
          </div>
        ) : viewMode === "table" ? (
          <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 font-bold tracking-widest">ID</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Name</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Primary Skill</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Experience</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Location</th>
                    <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <AnimatePresence>
                    {data.map((item) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-secondary/20 transition-colors group"
                      >
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{item.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-inner border ${getBadgeColor(item.name)}`}>
                              {item.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-foreground">{item.name}</span>
                              {item.verified === "Yes" ? (
                                <CheckCircle className="w-3.5 h-3.5 text-blue-500" title="Verified" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-red-500" title="Not Verified" />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-foreground">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-secondary text-secondary-foreground border border-border/50">
                            <Code2 className="w-3 h-3" />
                            {item.primarySkill}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-foreground font-medium">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                            {item.experience}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {item.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                              title="Edit Interviewer"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedInterviewer(item);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
                              title="Delete Interviewer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
            <AnimatePresence>
              {data.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 flex flex-col gap-3"
                >
                  {/* Top section: Avatar & Actions */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner border ${getBadgeColor(item.name)}`}>
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-foreground text-sm leading-tight truncate max-w-[120px]">{item.name}</h4>
                          {item.verified === "Yes" ? (
                            <CheckCircle className="w-4 h-4 text-blue-500" title="Verified" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" title="Not Verified" />
                          )}
                        </div>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{item.id}</p>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(item)}
                        className={`p-1 rounded-lg transition-colors ${editingId === item.id ? 'bg-primary text-white' : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'}`}
                        title="Edit Interviewer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedInterviewer(item);
                          setShowDeleteModal(true);
                        }}
                        className="p-1 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Delete Interviewer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Body section */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Primary Skill</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeColor(item.primarySkill)}`}>
                        {item.primarySkill}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 bg-secondary/20 p-2 rounded-xl border border-border/40">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Briefcase className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                        <span className="font-medium truncate">{item.experience}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                        <span className="font-medium truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedInterviewer && (
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
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Remove Interviewer</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you sure you want to remove <span className="font-bold text-foreground">"{selectedInterviewer.name}"</span>? This action cannot be undone.
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
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Alert Modal */}
      <AnimatePresence>
        {validationError && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              onClick={() => setValidationError("")}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-[111] overflow-hidden border border-border/50"
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground mb-2">Action Required</h3>
                    <p className="text-muted-foreground text-sm">
                      {validationError}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-center border-t border-border/50">
                <button 
                  onClick={() => setValidationError("")}
                  className="px-8 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors active:scale-95 w-full"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
