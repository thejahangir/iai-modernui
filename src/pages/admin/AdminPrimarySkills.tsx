import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pencil, Plus, RotateCcw, X, Code2, Trash2, AlertTriangle, Search, FileText } from "lucide-react";

const initialData = [
  { id: "PS-001", name: "React", description: "Frontend JavaScript library for building user interfaces" },
  { id: "PS-002", name: "Node.js", description: "JavaScript runtime built on Chrome's V8 JavaScript engine" },
  { id: "PS-003", name: "Python", description: "High-level, general-purpose programming language" },
  { id: "PS-004", name: "Java", description: "Class-based, object-oriented programming language" },
  { id: "PS-005", name: "C++", description: "General-purpose programming language with object-oriented features" },
  { id: "PS-006", name: "Go", description: "Statically typed, compiled programming language designed at Google" },
  { id: "PS-007", name: "Ruby on Rails", description: "Server-side web application framework written in Ruby" },
  { id: "PS-008", name: "Angular", description: "TypeScript-based free and open-source web application framework" },
  { id: "PS-009", name: "Vue.js", description: "Progressive JavaScript framework for building user interfaces" },
  { id: "PS-010", name: "Docker", description: "Set of platform as a service products that use OS-level virtualization" },
  { id: "PS-011", name: "Kubernetes", description: "Open-source container orchestration system for automating software deployment" },
  { id: "PS-012", name: "AWS", description: "Comprehensive and broadly adopted cloud computing platform" },
  { id: "PS-013", name: "Azure", description: "Cloud computing service created by Microsoft for building, testing, deploying, and managing applications" },
  { id: "PS-014", name: "TypeScript", description: "Strict syntactical superset of JavaScript and adds optional static typing to the language" },
  { id: "PS-015", name: "SQL", description: "Domain-specific language used in programming and designed for managing data held in a relational database" },
  { id: "PS-016", name: "MongoDB", description: "Source-available cross-platform document-oriented database program" },
  { id: "PS-017", name: "Redis", description: "In-memory data structure store, used as a distributed, in-memory key–value database" },
  { id: "PS-018", name: "GraphQL", description: "Data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data" },
  { id: "PS-019", name: "Swift", description: "Powerful and intuitive programming language for macOS, iOS, watchOS, tvOS and beyond" },
  { id: "PS-020", name: "Kotlin", description: "Cross-platform, statically typed, general-purpose programming language with type inference" }
];

export default function AdminPrimarySkills() {
  const [data, setData] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [form, setForm] = useState({ name: "", description: "" });
  const [formErrors, setFormErrors] = useState({ name: "", description: "" });

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReload = () => {
    // In a real app, this would fetch data from the server
    console.log("Reloading data...");
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", description: "" };

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

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const newSkill = {
      id: `PS-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...form
    };
    
    setData([...data, newSkill]);
    setShowAddModal(false);
    setForm({ name: "", description: "" });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setData(data.map(item => item.id === selectedSkill.id ? { ...item, ...form } : item));
    setShowEditModal(false);
    setSelectedSkill(null);
    setForm({ name: "", description: "" });
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== selectedSkill.id));
    setShowDeleteModal(false);
    setSelectedSkill(null);
  };

  return (
    <div className="space-y-6 md:space-y-8 relative pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground tracking-tight">Primary Skills</h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage core technical skills and their descriptions.</p>
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
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Total Skills
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
                setForm({ name: "", description: "" });
                setFormErrors({ name: "", description: "" });
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
              <p className="text-muted-foreground max-w-sm">We couldn't find any primary skills matching your search criteria. Try adjusting your filters or add a new skill.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
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
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{item.id}</p>
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 -mt-1 -mr-1">
                        <button 
                          onClick={() => {
                            setSelectedSkill(item);
                            setForm({ name: item.name, description: item.description });
                            setFormErrors({ name: "", description: "" });
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
                  <h3 className="text-xl font-bold font-heading text-foreground">Add Primary Skill</h3>
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
                      <label className="text-sm font-semibold text-foreground">Primary Skill Name</label>
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
                      placeholder="e.g. React"
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
                      <label className="text-sm font-semibold text-foreground">Primary Skill Name</label>
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
    </div>
  );
}
