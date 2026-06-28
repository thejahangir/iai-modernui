import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pencil, Trash2, Save, RotateCcw, Calendar as CalendarIcon, ChevronDown, User, Code2, Clock, CalendarDays, Plus, X, CheckCircle, XCircle, AlertTriangle, LayoutGrid, List } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

// Helper to determine if an interviewer is verified based on mock data logic
const isVerified = (name: string) => {
  const unverified = ["Rahul Joshi", "Ken Thompson"];
  return !unverified.includes(name);
};

// Mock data for dropdowns
const SKILLS = ["React", "Python", "Node.js", "Java", "DevOps"];

const INTERVIEWERS_BY_SKILL: Record<string, string[]> = {
  "React": ["Aarohi Patel", "Rahul Joshi"],
  "Python": ["Chandan Das", "Dave Wilson"],
  "Node.js": ["Eve Brown", "Frank Miller"],
  "Java": ["Grace Hopper", "James Gosling"],
  "DevOps": ["Linus Torvalds", "Ken Thompson"],
};

const TIME_SLOTS = [
  "09:00 AM - 09:30 AM",
  "09:30 AM - 10:00 AM",
  "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM",
  "11:00 AM - 11:30 AM",
  "11:30 AM - 12:00 PM",
  "12:00 PM - 12:30 PM",
  "12:30 PM - 01:00 PM",
  "02:00 PM - 02:30 PM",
  "02:30 PM - 03:00 PM",
  "03:00 PM - 03:30 PM",
  "03:30 PM - 04:00 PM",
];

const initialData = [
  { id: "SCH-1001", interviewer: "Aarohi Patel", primarySkill: "React", date: "2025-11-15", timeSlot: "10:00 AM - 10:30 AM" },
  { id: "SCH-1002", interviewer: "Chandan Das", primarySkill: "Python", date: "2025-11-16", timeSlot: "02:30 PM - 03:00 PM" },
  { id: "SCH-1003", interviewer: "Rahul Joshi", primarySkill: "React", date: "2025-11-16", timeSlot: "11:00 AM - 11:30 AM" },
  { id: "SCH-1004", interviewer: "Dave Wilson", primarySkill: "Python", date: "2025-11-17", timeSlot: "09:30 AM - 10:00 AM" },
  { id: "SCH-1005", interviewer: "Eve Brown", primarySkill: "Node.js", date: "2025-11-18", timeSlot: "03:00 PM - 03:30 PM" },
  { id: "SCH-1006", interviewer: "Grace Hopper", primarySkill: "Java", date: "2025-11-19", timeSlot: "12:00 PM - 12:30 PM" },
  { id: "SCH-1007", interviewer: "Linus Torvalds", primarySkill: "DevOps", date: "2025-11-20", timeSlot: "10:30 AM - 11:00 AM" },
  { id: "SCH-1008", interviewer: "Frank Miller", primarySkill: "Node.js", date: "2025-11-21", timeSlot: "02:00 PM - 02:30 PM" },
  { id: "SCH-1009", interviewer: "Ken Thompson", primarySkill: "DevOps", date: "2025-11-22", timeSlot: "09:00 AM - 09:30 AM" },
  { id: "SCH-1010", interviewer: "James Gosling", primarySkill: "Java", date: "2025-11-23", timeSlot: "03:30 PM - 04:00 PM" },
  { id: "SCH-1011", interviewer: "Aarohi Patel", primarySkill: "React", date: "2025-11-24", timeSlot: "11:30 AM - 12:00 PM" },
  { id: "SCH-1012", interviewer: "Chandan Das", primarySkill: "Python", date: "2025-11-25", timeSlot: "12:30 PM - 01:00 PM" },
  { id: "SCH-1013", interviewer: "Eve Brown", primarySkill: "Node.js", date: "2025-11-26", timeSlot: "10:00 AM - 10:30 AM" },
  { id: "SCH-1014", interviewer: "Grace Hopper", primarySkill: "Java", date: "2025-11-27", timeSlot: "02:30 PM - 03:00 PM" },
];

// Helper to get consistent colors for avatars and badges based on strings
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

export default function SuperAdminInterviewerSchedules() {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    primarySkill: "",
    interviewer: "",
    date: "",
    timeSlot: ""
  });
  const [formErrors, setFormErrors] = useState({ primarySkill: "", interviewer: "", date: "", timeSlot: "" });

  // Dynamic interviewers based on selected skill
  const [availableInterviewers, setAvailableInterviewers] = useState<string[]>([]);

  useEffect(() => {
    if (form.primarySkill && INTERVIEWERS_BY_SKILL[form.primarySkill]) {
      setAvailableInterviewers(INTERVIEWERS_BY_SKILL[form.primarySkill]);
      // If the current interviewer doesn't belong to the new skill, reset it
      if (!INTERVIEWERS_BY_SKILL[form.primarySkill].includes(form.interviewer)) {
        setForm(prev => ({ ...prev, interviewer: "" }));
      }
    } else {
      setAvailableInterviewers([]);
      setForm(prev => ({ ...prev, interviewer: "" }));
    }
  }, [form.primarySkill]);

  const handleSave = () => {
    let isValid = true;
    const errors = { primarySkill: "", interviewer: "", date: "", timeSlot: "" };

    if (!form.primarySkill) { errors.primarySkill = "Required"; isValid = false; }
    if (!form.interviewer) { errors.interviewer = "Required"; isValid = false; }
    if (!form.date) { errors.date = "Required"; isValid = false; }
    if (!form.timeSlot) { errors.timeSlot = "Required"; isValid = false; }

    setFormErrors(errors);
    if (!isValid) return;

    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...item, ...form } : item));
    } else {
      const newId = `SCH-${1000 + data.length + 1}`;
      setData([...data, { id: newId, ...form }]);
    }
    
    setIsModalOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setEditingId(null);
    setForm({
      primarySkill: "",
      interviewer: "",
      date: "",
      timeSlot: ""
    });
    setFormErrors({ primarySkill: "", interviewer: "", date: "", timeSlot: "" });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      primarySkill: item.primarySkill,
      interviewer: item.interviewer,
      date: item.date,
      timeSlot: item.timeSlot
    });
    setFormErrors({ primarySkill: "", interviewer: "", date: "", timeSlot: "" });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    if (editingId === id) {
      handleReset();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Interviewer Schedules</h2>
          <p className="text-muted-foreground mt-1">Manage time slots and availability for your interviewers.</p>
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
            Add New Schedule
          </button>
        </div>
      </div>

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
                      {editingId ? <Pencil className="w-5 h-5" /> : <CalendarIcon className="w-5 h-5" />}
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-foreground">
                      {editingId ? "Update Schedule" : "Add New Schedule"}
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
                        <User className="w-4 h-4" /> Interviewer
                      </label>
                      <AnimatePresence>
                        {formErrors.interviewer && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.interviewer}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={`rounded-2xl transition-all ${
                      formErrors.interviewer 
                        ? 'border border-destructive/50 ring-2 ring-destructive/20' 
                        : ''
                    }`}>
                      <SearchableSelect 
                        options={availableInterviewers.map(name => ({ label: name, value: name }))}
                        value={form.interviewer}
                        onChange={(val) => {
                          setForm({ ...form, interviewer: val });
                          if (formErrors.interviewer) setFormErrors({ ...formErrors, interviewer: "" });
                        }}
                        placeholder={form.primarySkill ? "Select Interviewer" : "Select Skill First"}
                        className={`w-full h-12 shadow-inner ${!form.primarySkill ? 'opacity-50' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex justify-between items-center ml-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <CalendarDays className="w-4 h-4" /> Date
                      </label>
                      <AnimatePresence>
                        {formErrors.date && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.date}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <input 
                      type="date" 
                      value={form.date}
                      onChange={(e) => {
                        setForm({ ...form, date: e.target.value });
                        if (formErrors.date) setFormErrors({ ...formErrors, date: "" });
                      }}
                      className={`w-full h-12 px-4 bg-secondary/50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 transition-all shadow-inner ${
                        formErrors.date 
                          ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                          : 'border-border/50 focus:ring-primary/20 focus:border-primary group-hover:border-primary/30'
                      }`}
                    />
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex justify-between items-center ml-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <Clock className="w-4 h-4" /> Time Slot
                      </label>
                      <AnimatePresence>
                        {formErrors.timeSlot && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.timeSlot}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative">
                      <select 
                        value={form.timeSlot}
                        onChange={(e) => {
                          setForm({ ...form, timeSlot: e.target.value });
                          if (formErrors.timeSlot) setFormErrors({ ...formErrors, timeSlot: "" });
                        }}
                        className={`w-full h-12 pl-4 pr-10 bg-secondary/50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer shadow-inner ${
                          formErrors.timeSlot 
                            ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                            : 'border-border/50 focus:ring-primary/20 focus:border-primary group-hover:border-primary/30'
                        }`}
                      >
                        <option value="" disabled>Select Time</option>
                        {TIME_SLOTS.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border/50">
                  <button 
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 h-12 px-5 bg-white border border-border text-foreground text-sm font-bold rounded-2xl hover:bg-secondary transition-all active:scale-95 shadow-sm hover:shadow"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 h-12 px-8 bg-primary text-white text-sm font-bold rounded-2xl shadow-md shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 hover:shadow-lg hover:shadow-primary/40"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? "Update Schedule" : "Save Schedule"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Enhanced Card Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {data.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-border">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-inner">
              <CalendarIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No Schedules Found</h3>
            <p className="text-muted-foreground max-w-sm text-lg">
              It looks a bit empty here. Start by adding a new interviewer schedule above.
            </p>
          </div>
        ) : viewMode === "table" ? (
          <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4 font-bold tracking-widest">ID</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Interviewer</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Primary Skill</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Date</th>
                    <th className="px-6 py-4 font-bold tracking-widest">Time Slot</th>
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
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-inner border ${getBadgeColor(item.interviewer)}`}>
                              {item.interviewer.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-foreground">{item.interviewer}</span>
                              {isVerified(item.interviewer) ? (
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
                            <CalendarDays className="w-4 h-4 text-muted-foreground" />
                            {item.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground font-medium">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            {item.timeSlot}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                              title="Edit Schedule"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
                              title="Delete Schedule"
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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner border ${getBadgeColor(item.interviewer)}`}>
                        {item.interviewer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-foreground text-sm leading-tight">{item.interviewer}</h4>
                          {isVerified(item.interviewer) ? (
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
                        title="Edit Schedule"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Delete Schedule"
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
                        <CalendarDays className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                        <span className="font-medium">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-secondary-foreground">
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{item.timeSlot}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}

