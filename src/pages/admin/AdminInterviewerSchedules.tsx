import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Pencil, Trash2, Save, RotateCcw, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

// Mock data for dropdowns
const SKILLS = ["React", "Python", "Node.js", "Java", "DevOps"];

const INTERVIEWERS_BY_SKILL: Record<string, string[]> = {
  "React": ["Alice Smith", "Bob Johnson"],
  "Python": ["Charlie Davis", "Dave Wilson"],
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
  {
    id: "SCH-1001",
    interviewer: "Alice Smith",
    primarySkill: "React",
    date: "2025-11-15",
    timeSlot: "10:00 AM - 10:30 AM",
  },
  {
    id: "SCH-1002",
    interviewer: "Charlie Davis",
    primarySkill: "Python",
    date: "2025-11-16",
    timeSlot: "02:30 PM - 03:00 PM",
  },
];

export default function AdminInterviewerSchedules() {
  const [data, setData] = useState(initialData);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    primarySkill: "",
    interviewer: "",
    date: "",
    timeSlot: ""
  });

  // Dynamic interviewers based on selected skill
  const [availableInterviewers, setAvailableInterviewers] = useState<string[]>([]);

  useEffect(() => {
    if (form.primarySkill && INTERVIEWERS_BY_SKILL[form.primarySkill]) {
      setAvailableInterviewers(INTERVIEWERS_BY_SKILL[form.primarySkill]);
      // If the current interviewer doesn't belong to the new skill, reset it (unless we are just loading an edit)
      if (!INTERVIEWERS_BY_SKILL[form.primarySkill].includes(form.interviewer)) {
        setForm(prev => ({ ...prev, interviewer: "" }));
      }
    } else {
      setAvailableInterviewers([]);
      setForm(prev => ({ ...prev, interviewer: "" }));
    }
  }, [form.primarySkill]);

  const handleSave = () => {
    if (!form.primarySkill || !form.interviewer || !form.date || !form.timeSlot) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId) {
      // Update existing
      setData(data.map(item => item.id === editingId ? { ...item, ...form } : item));
    } else {
      // Create new
      const newId = `SCH-${1000 + data.length + 1}`;
      setData([...data, { id: newId, ...form }]);
    }
    
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
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      primarySkill: item.primarySkill,
      interviewer: item.interviewer,
      date: item.date,
      timeSlot: item.timeSlot
    });
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    if (editingId === id) {
      handleReset();
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Interviewer Schedules</h2>
          <p className="text-muted-foreground mt-1">Manage time slots and availability for your interviewers.</p>
        </div>
      </div>

      {/* Add/Edit Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden"
      >
        <div className="p-4 bg-secondary/20 border-b border-border/50 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h3 className="font-bold font-heading text-foreground">
            {editingId ? "Edit Schedule" : "Add New Schedule"}
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Primary Skill */}
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Primary Skill</label>
              <SearchableSelect 
                options={SKILLS.map(skill => ({ label: skill, value: skill }))}
                value={form.primarySkill}
                onChange={(val) => setForm({ ...form, primarySkill: val })}
                placeholder="Select Skill"
                className="w-full h-11"
              />
            </div>

            {/* Interviewer */}
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Interviewer</label>
              <div className={!form.primarySkill ? "opacity-50 pointer-events-none" : ""}>
                <SearchableSelect 
                  options={availableInterviewers.map(name => ({ label: name, value: name }))}
                  value={form.interviewer}
                  onChange={(val) => setForm({ ...form, interviewer: val })}
                  placeholder="Select Interviewer"
                  className="w-full h-11"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Date</label>
              <input 
                type="date" 
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full h-11 px-4 bg-secondary/30 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Time Slot */}
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Time Slot</label>
              <div className="relative">
                <select 
                  value={form.timeSlot}
                  onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                  className="w-full h-11 px-4 bg-secondary/30 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select 30-min slot</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border/50">
            <button 
              onClick={handleReset}
              className="flex items-center justify-center gap-2 h-10 px-6 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl hover:bg-secondary/80 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center justify-center gap-2 h-10 px-8 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              {editingId ? "Update Schedule" : "Save Schedule"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Data Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        {data.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <CalendarIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No schedules found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest">Interviewer</th>
                <th className="px-6 py-4 font-bold tracking-widest">Primary Skills</th>
                <th className="px-6 py-4 font-bold tracking-widest">Date</th>
                <th className="px-6 py-4 font-bold tracking-widest">Time Slot</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        {item.interviewer.split(' ').map(n => n[0]).join('')}
                      </div>
                      {item.interviewer}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{item.primarySkill}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-bold border border-border/50">
                      {item.timeSlot}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className={`p-1.5 rounded-lg transition-colors ${editingId === item.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}
                        title="Edit Schedule"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete Schedule"
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
        )}
      </motion.div>
    </div>
  );
}
