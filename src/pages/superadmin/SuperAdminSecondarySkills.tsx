import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pencil, Plus, RotateCcw, X, Code2, Trash2, Map, LayoutList, AlertTriangle, Search } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const mockPrimarySkills = [
  { id: "PS-001", name: "React" },
  { id: "PS-002", name: "Node.js" },
  { id: "PS-003", name: "Python" },
  { id: "PS-004", name: "Java" },
  { id: "PS-008", name: "Angular" },
];

const initialData = [
  { 
    id: "SS-001", primarySkillId: "PS-001", primarySkillName: "React", name: "React Hooks", 
    description: "Advanced hook usage and custom hooks", topics: [{ id: "T-001", name: "useEffect", description: "Side effects in function components" }, { id: "T-002", name: "useState", description: "State management in function components" }]
  },
  { id: "SS-002", primarySkillId: "PS-002", primarySkillName: "Node.js", name: "Express.js", description: "Fast, unopinionated, minimalist web framework", topics: [] },
  { id: "SS-003", primarySkillId: "PS-001", primarySkillName: "React", name: "Redux Toolkit", description: "Standard way to write Redux logic", topics: [] },
  { id: "SS-004", primarySkillId: "PS-001", primarySkillName: "React", name: "Next.js", description: "The React Framework for the Web", topics: [] },
  { id: "SS-005", primarySkillId: "PS-001", primarySkillName: "React", name: "Framer Motion", description: "Production-ready motion library for React", topics: [] },
  { id: "SS-006", primarySkillId: "PS-002", primarySkillName: "Node.js", name: "NestJS", description: "A progressive Node.js framework for building efficient, reliable and scalable server-side applications", topics: [] },
  { id: "SS-007", primarySkillId: "PS-002", primarySkillName: "Node.js", name: "Socket.IO", description: "Bidirectional and low-latency communication for every platform", topics: [] },
  { id: "SS-008", primarySkillId: "PS-003", primarySkillName: "Python", name: "Django", description: "High-level Python web framework that encourages rapid development", topics: [] },
  { id: "SS-009", primarySkillId: "PS-003", primarySkillName: "Python", name: "FastAPI", description: "Modern, fast web framework for building APIs with Python", topics: [] },
  { id: "SS-010", primarySkillId: "PS-003", primarySkillName: "Python", name: "Pandas", description: "Fast, powerful, flexible and easy to use open source data analysis and manipulation tool", topics: [] },
  { id: "SS-011", primarySkillId: "PS-003", primarySkillName: "Python", name: "Flask", description: "A lightweight WSGI web application framework", topics: [] },
  { id: "SS-012", primarySkillId: "PS-004", primarySkillName: "Java", name: "Spring Boot", description: "Create stand-alone, production-grade Spring based Applications", topics: [] },
  { id: "SS-013", primarySkillId: "PS-004", primarySkillName: "Java", name: "Hibernate", description: "Object-relational mapping tool for the Java programming language", topics: [] },
  { id: "SS-014", primarySkillId: "PS-008", primarySkillName: "Angular", name: "RxJS", description: "Reactive Extensions Library for JavaScript", topics: [] },
  { id: "SS-015", primarySkillId: "PS-008", primarySkillName: "Angular", name: "NgRx", description: "Reactive State for Angular", topics: [] },
  { id: "SS-016", primarySkillId: "PS-001", primarySkillName: "React", name: "React Router", description: "Declarative routing for React", topics: [] },
];

export default function SuperAdminSecondarySkills() {
  const [data, setData] = useState(initialData);
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMapTopicModal, setShowMapTopicModal] = useState(false);
  
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  
  // Main form
  const [form, setForm] = useState({ primarySkillId: "", name: "", description: "" });
  const [formErrors, setFormErrors] = useState({ primarySkillId: "", name: "", description: "" });

  // Topic form
  const [topicForm, setTopicForm] = useState({ name: "", description: "" });
  const [topicFormErrors, setTopicFormErrors] = useState({ name: "", description: "" });
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.primarySkillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReload = () => {
    console.log("Reloading data...");
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { primarySkillId: "", name: "", description: "" };

    if (!form.primarySkillId) {
      errors.primarySkillId = "Required";
      isValid = false;
    }
    if (!form.name.trim()) {
      errors.name = "Required";
      isValid = false;
    }
    if (!form.description.trim()) {
      errors.description = "Required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateTopicForm = () => {
    let isValid = true;
    const errors = { name: "", description: "" };

    if (!topicForm.name.trim()) {
      errors.name = "Required";
      isValid = false;
    }
    if (!topicForm.description.trim()) {
      errors.description = "Required";
      isValid = false;
    }

    setTopicFormErrors(errors);
    return isValid;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const primarySkill = mockPrimarySkills.find(ps => ps.id === form.primarySkillId);
    const newSkill = {
      id: `SS-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      primarySkillId: form.primarySkillId,
      primarySkillName: primarySkill ? primarySkill.name : "Unknown",
      name: form.name,
      description: form.description,
      topics: []
    };
    
    setData([...data, newSkill]);
    setShowAddModal(false);
    setForm({ primarySkillId: "", name: "", description: "" });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const primarySkill = mockPrimarySkills.find(ps => ps.id === form.primarySkillId);
    
    setData(data.map(item => item.id === selectedSkill.id ? { 
      ...item, 
      primarySkillId: form.primarySkillId,
      primarySkillName: primarySkill ? primarySkill.name : item.primarySkillName,
      name: form.name, 
      description: form.description 
    } : item));
    
    setShowEditModal(false);
    setSelectedSkill(null);
    setForm({ primarySkillId: "", name: "", description: "" });
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== selectedSkill.id));
    setShowDeleteModal(false);
    setSelectedSkill(null);
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTopicForm()) return;

    const newTopic = {
      id: `T-${Math.floor(Math.random() * 10000).toString()}`,
      name: topicForm.name,
      description: topicForm.description
    };

    const updatedData = data.map(item => {
      if (item.id === selectedSkill.id) {
        const updatedItem = { ...item, topics: [...item.topics, newTopic] };
        setSelectedSkill(updatedItem); // update modal state
        return updatedItem;
      }
      return item;
    });

    setData(updatedData);
    setTopicForm({ name: "", description: "" });
  };

  const handleDeleteTopic = (topicId: string) => {
    const updatedData = data.map(item => {
      if (item.id === selectedSkill.id) {
        const updatedItem = { ...item, topics: item.topics.filter(t => t.id !== topicId) };
        setSelectedSkill(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <div className="space-y-6 md:space-y-8 relative pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground tracking-tight">Secondary Skills</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage secondary technical skills mapped to primary categories.</p>
        </div>
      </div>

      {/* KPI & Toolbar Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4"
      >
        {/* KPI Card */}
        <div className="md:col-span-4 lg:col-span-3 bg-gradient-to-br from-primary/5 to-white p-5 rounded-3xl border border-primary/10 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Code2 className="w-20 h-20 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Total Secondary Skills
            </p>
            <h3 className="text-4xl font-black text-foreground">{data.length}</h3>
          </div>
        </div>

        {/* Toolbar */}
        <div className="md:col-span-8 lg:col-span-9 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within/input:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search skills or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-secondary/30 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-foreground"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={handleReload}
              className="flex items-center justify-center gap-2 h-12 px-5 bg-secondary text-secondary-foreground text-sm font-bold rounded-2xl hover:bg-black/5 transition-all active:scale-95 shrink-0"
              title="Reload Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setForm({ primarySkillId: "", name: "", description: "" });
                setFormErrors({ primarySkillId: "", name: "", description: "" });
                setShowAddModal(true);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-12 px-6 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5 shrink-0" />
              Add Skill
            </button>
          </div>
        </div>
      </motion.div>

      {/* Grid View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence>
          {filteredData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-16 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-border/50"
            >
              <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mb-6">
                <Code2 className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No Skills Found</h3>
              <p className="text-muted-foreground max-w-sm">We couldn't find any secondary skills matching your search criteria. Try adjusting your filters or add a new skill.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredData.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-all group flex gap-3 items-start"
                >
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Code2 className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-base font-bold text-foreground line-clamp-1" title={item.name}>{item.name}</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{item.primarySkillName} &bull; {item.id}</p>
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 -mt-1 -mr-1">
                        <button 
                          onClick={() => {
                            setSelectedSkill(item);
                            setShowMapTopicModal(true);
                            setTopicForm({ name: "", description: "" });
                            setTopicFormErrors({ name: "", description: "" });
                          }}
                          className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
                          title="Map Topics"
                        >
                          <Map className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedSkill(item);
                            setForm({ primarySkillId: item.primarySkillId, name: item.name, description: item.description });
                            setFormErrors({ primarySkillId: "", name: "", description: "" });
                            setShowEditModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                          title="Edit Skill"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedSkill(item);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
                          title="Delete Skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed" title={item.description}>
                      {item.description || "No description provided."}
                    </p>
                    {item.topics && item.topics.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">
                          {item.topics.length} Topics
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Add Secondary Skill</h3>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddSubmit} noValidate>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">Primary Skill</label>
                      <AnimatePresence>
                        {formErrors.primarySkillId && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.primarySkillId}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      options={mockPrimarySkills.map(s => ({ label: s.name, value: s.id }))}
                      value={form.primarySkillId}
                      onChange={val => {
                        setForm({...form, primarySkillId: val});
                        if (formErrors.primarySkillId) setFormErrors({...formErrors, primarySkillId: ""});
                      }}
                      placeholder="Select a primary skill..."
                      className="w-full h-[42px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">Secondary Skill Name</label>
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
                      onChange={e => {
                        setForm({...form, name: e.target.value});
                        if (formErrors.name) setFormErrors({...formErrors, name: ""});
                      }}
                      className={`w-full px-4 py-3 bg-secondary/30 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all h-[42px] ${
                        formErrors.name 
                          ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                          : 'border-border/50 focus:ring-primary/20 focus:border-primary'
                      }`}
                      placeholder="e.g. React Hooks"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">Description</label>
                      <AnimatePresence>
                        {formErrors.description && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.description}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <textarea 
                      rows={4}
                      value={form.description}
                      onChange={e => {
                        setForm({...form, description: e.target.value});
                        if (formErrors.description) setFormErrors({...formErrors, description: ""});
                      }}
                      className={`w-full px-4 py-3 bg-secondary/30 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                        formErrors.description 
                          ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                          : 'border-border/50 focus:ring-primary/20 focus:border-primary'
                      }`}
                      placeholder="Skill description..."
                    />
                  </div>
                </div>
                
                <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 rounded-b-2xl">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors"
                  >
                    Save Skill
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedSkill && (
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Pencil className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Edit Skill</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedSkill.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleEditSubmit} noValidate>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">Primary Skill</label>
                      <AnimatePresence>
                        {formErrors.primarySkillId && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.primarySkillId}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      options={mockPrimarySkills.map(s => ({ label: s.name, value: s.id }))}
                      value={form.primarySkillId}
                      onChange={val => {
                        setForm({...form, primarySkillId: val});
                        if (formErrors.primarySkillId) setFormErrors({...formErrors, primarySkillId: ""});
                      }}
                      placeholder="Select a primary skill..."
                      className="w-full h-[42px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">Secondary Skill Name</label>
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
                      onChange={e => {
                        setForm({...form, name: e.target.value});
                        if (formErrors.name) setFormErrors({...formErrors, name: ""});
                      }}
                      className={`w-full px-4 py-3 bg-secondary/30 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all h-[42px] ${
                        formErrors.name 
                          ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                          : 'border-border/50 focus:ring-primary/20 focus:border-primary'
                      }`}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">Description</label>
                      <AnimatePresence>
                        {formErrors.description && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.description}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <textarea 
                      rows={4}
                      value={form.description}
                      onChange={e => {
                        setForm({...form, description: e.target.value});
                        if (formErrors.description) setFormErrors({...formErrors, description: ""});
                      }}
                      className={`w-full px-4 py-3 bg-secondary/30 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                        formErrors.description 
                          ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                          : 'border-border/50 focus:ring-primary/20 focus:border-primary'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 rounded-b-2xl">
                  <button 
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedSkill && (
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
                  <h3 className="text-xl font-bold font-heading text-foreground">Delete Skill</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you sure you want to delete <span className="font-bold text-foreground">"{selectedSkill.name}"</span>? This action cannot be undone.
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
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Map Topic Modal */}
      <AnimatePresence>
        {showMapTopicModal && selectedSkill && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowMapTopicModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Map className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">Map Topics</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedSkill.primarySkillName} &gt; {selectedSkill.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMapTopicModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-secondary/10 flex flex-col gap-6">
                
                {/* Add Topic Form Panel */}
                <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
                  <h4 className="text-sm font-bold text-foreground mb-4">Add New Topic</h4>
                  <form onSubmit={handleAddTopic} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start" noValidate>
                    <div className="md:col-span-4 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-muted-foreground">Topic Name</label>
                        <AnimatePresence>
                          {topicFormErrors.name && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[10px] text-destructive font-medium"
                            >
                              {topicFormErrors.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <input 
                        type="text" 
                        value={topicForm.name}
                        onChange={e => {
                          setTopicForm({...topicForm, name: e.target.value});
                          if (topicFormErrors.name) setTopicFormErrors({...topicFormErrors, name: ""});
                        }}
                        className={`w-full px-3 py-2 bg-secondary/30 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                          topicFormErrors.name 
                            ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                            : 'border-border/50 focus:ring-primary/20 focus:border-primary'
                        }`}
                        placeholder="e.g. useState"
                      />
                    </div>
                    <div className="md:col-span-6 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-muted-foreground">Description</label>
                        <AnimatePresence>
                          {topicFormErrors.description && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[10px] text-destructive font-medium"
                            >
                              {topicFormErrors.description}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <input 
                        type="text" 
                        value={topicForm.description}
                        onChange={e => {
                          setTopicForm({...topicForm, description: e.target.value});
                          if (topicFormErrors.description) setTopicFormErrors({...topicFormErrors, description: ""});
                        }}
                        className={`w-full px-3 py-2 bg-secondary/30 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                          topicFormErrors.description 
                            ? 'border-destructive/50 focus:ring-destructive/20 focus:border-destructive' 
                            : 'border-border/50 focus:ring-primary/20 focus:border-primary'
                        }`}
                        placeholder="Short description..."
                      />
                    </div>
                    <div className="md:col-span-2 pt-[22px]">
                      <button 
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 h-[38px] bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4 shrink-0" />
                        Add
                      </button>
                    </div>
                  </form>
                </div>

                {/* Topics Grid */}
                <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden flex-1">
                  {(!selectedSkill.topics || selectedSkill.topics.length === 0) ? (
                    <div className="p-12 flex flex-col items-center justify-center text-center bg-secondary/10 rounded-2xl border border-border/50 mt-4">
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                        <Map className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">No Topics Mapped</h3>
                      <p className="text-muted-foreground max-w-sm">There are no topics mapped to this secondary skill yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto mt-4">
                      <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                        <tr>
                          <th className="px-6 py-4 font-bold tracking-widest w-1/4">Topic Name</th>
                          <th className="px-6 py-4 font-bold tracking-widest">Description</th>
                          <th className="px-6 py-4 font-bold tracking-widest text-right w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {selectedSkill.topics && selectedSkill.topics.map((topic: any) => (
                          <tr key={topic.id} className="hover:bg-primary/5 transition-colors group">
                            <td className="px-6 py-3 font-bold text-foreground">
                              {topic.name}
                            </td>
                            <td className="px-6 py-3 text-muted-foreground">
                              {topic.description}
                            </td>
                            <td className="px-6 py-3">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleDeleteTopic(topic.id)}
                                  className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
                                  title="Delete Topic"
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
                </div>

              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 rounded-b-2xl">
                <button 
                  onClick={() => setShowMapTopicModal(false)}
                  className="px-6 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

