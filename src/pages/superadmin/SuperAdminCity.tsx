import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, RotateCcw, Pencil, Trash2, X, AlertTriangle, MapPin } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_COUNTRIES = [
  { id: "us", name: "United States", flag: "https://flagcdn.com/w20/us.png" },
  { id: "in", name: "India", flag: "https://flagcdn.com/w20/in.png" },
  { id: "uk", name: "United Kingdom", flag: "https://flagcdn.com/w20/gb.png" },
  { id: "ca", name: "Canada", flag: "https://flagcdn.com/w20/ca.png" },
  { id: "au", name: "Australia", flag: "https://flagcdn.com/w20/au.png" },
  { id: "de", name: "Germany", flag: "https://flagcdn.com/w20/de.png" },
  { id: "fr", name: "France", flag: "https://flagcdn.com/w20/fr.png" },
  { id: "jp", name: "Japan", flag: "https://flagcdn.com/w20/jp.png" },
  { id: "br", name: "Brazil", flag: "https://flagcdn.com/w20/br.png" },
  { id: "za", name: "South Africa", flag: "https://flagcdn.com/w20/za.png" },
  { id: "mx", name: "Mexico", flag: "https://flagcdn.com/w20/mx.png" },
  { id: "it", name: "Italy", flag: "https://flagcdn.com/w20/it.png" },
  { id: "es", name: "Spain", flag: "https://flagcdn.com/w20/es.png" },
  { id: "kr", name: "South Korea", flag: "https://flagcdn.com/w20/kr.png" },
  { id: "nl", name: "Netherlands", flag: "https://flagcdn.com/w20/nl.png" },
  { id: "sg", name: "Singapore", flag: "https://flagcdn.com/w20/sg.png" },
  { id: "se", name: "Sweden", flag: "https://flagcdn.com/w20/se.png" },
  { id: "ch", name: "Switzerland", flag: "https://flagcdn.com/w20/ch.png" },
  { id: "ae", name: "United Arab Emirates", flag: "https://flagcdn.com/w20/ae.png" },
  { id: "nz", name: "New Zealand", flag: "https://flagcdn.com/w20/nz.png" },
];

const initialData = [
  {
    id: "CT-001",
    name: "New York",
    description: "Major financial and cultural hub.",
    countryId: "us",
  },
  {
    id: "CT-002",
    name: "London",
    description: "Capital city of England.",
    countryId: "uk",
  },
  {
    id: "CT-003",
    name: "Mumbai",
    description: "Financial capital of India.",
    countryId: "in",
  },
];

export default function SuperAdminCity() {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [filterCountry, setFilterCountry] = useState("");
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  // Form state
  const [form, setForm] = useState({ countryId: "", name: "", description: "" });
  const [formErrors, setFormErrors] = useState({ countryId: "", name: "", description: "" });

  const handleSearch = () => {
    if (!filterCountry) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.countryId === filterCountry));
    }
  };

  const handleReload = () => {
    setFilterCountry("");
    setFilteredData(data);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { countryId: "", name: "", description: "" };

    if (!form.countryId) {
      errors.countryId = "Required";
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

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const newCity = {
      id: `CT-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      countryId: form.countryId,
      name: form.name,
      description: form.description,
    };
    
    const newData = [...data, newCity];
    setData(newData);
    setFilteredData(newData);
    setShowAddModal(false);
    setForm({ countryId: "", name: "", description: "" });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newData = data.map(item => item.id === selectedCity.id ? { 
      ...item, 
      countryId: form.countryId,
      name: form.name, 
      description: form.description 
    } : item);
    
    setData(newData);
    
    // Update filtered view if applicable
    if (filterCountry) {
      setFilteredData(newData.filter(item => item.countryId === filterCountry));
    } else {
      setFilteredData(newData);
    }
    
    setShowEditModal(false);
    setSelectedCity(null);
    setForm({ countryId: "", name: "", description: "" });
  };

  const handleDelete = () => {
    const newData = data.filter(item => item.id !== selectedCity.id);
    setData(newData);
    if (filterCountry) {
      setFilteredData(newData.filter(item => item.countryId === filterCountry));
    } else {
      setFilteredData(newData);
    }
    setShowDeleteModal(false);
    setSelectedCity(null);
  };

  const getCountryName = (id: string) => {
    return MOCK_COUNTRIES.find(c => c.id === id)?.name || id;
  };

  const getCountryFlag = (id: string) => {
    return MOCK_COUNTRIES.find(c => c.id === id)?.flag || "";
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Cities</h2>
          <p className="text-muted-foreground mt-1">Manage global cities and their respective countries.</p>
        </div>
      </div>

      {/* Toolbar / Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-2xl shadow-sm border border-border/50 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full md:w-auto">
          <div className="w-full sm:w-64 space-y-1">
            <SearchableSelect
              options={MOCK_COUNTRIES.map(c => ({ label: c.name, value: c.id, iconUrl: c.flag }))}
              value={filterCountry}
              onChange={(val) => setFilterCountry(val)}
              placeholder="Select Country"
              className="w-full h-11"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-11 px-6 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handleReload}
            className="flex items-center justify-center gap-2 h-11 px-4 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl hover:bg-black/5 transition-all w-full sm:w-auto"
            title="Reload Data"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reload Data</span>
          </button>
          <button 
            onClick={() => {
              setForm({ countryId: "", name: "", description: "" });
              setFormErrors({ countryId: "", name: "", description: "" });
              setShowAddModal(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-11 px-6 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm shadow-[#00A94B]/20 hover:bg-[#00A94B]/90 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 shrink-0" />
            Add City
          </button>
        </div>
      </motion.div>

      {/* Data Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        {filteredData.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No cities found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest">City</th>
                <th className="px-6 py-4 font-bold tracking-widest w-1/2">Description</th>
                <th className="px-6 py-4 font-bold tracking-widest">Country</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground truncate max-w-sm" title={item.description}>
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    <span className="flex items-center gap-2">
                      <img src={getCountryFlag(item.countryId)} alt="" className="w-5 h-auto rounded-[2px] shadow-sm shrink-0" />
                      {getCountryName(item.countryId)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedCity(item);
                          setForm({ countryId: item.countryId, name: item.name, description: item.description });
                          setFormErrors({ countryId: "", name: "", description: "" });
                          setShowEditModal(true);
                        }}
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        title="Edit City"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCity(item);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete City"
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
                  <div className="p-2 bg-[#00A94B]/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#00A94B]" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Add City</h3>
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
                      <label className="text-sm font-semibold text-foreground">Country</label>
                      <AnimatePresence>
                        {formErrors.countryId && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.countryId}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      options={MOCK_COUNTRIES.map(c => ({ label: c.name, value: c.id, iconUrl: c.flag }))}
                      value={form.countryId}
                      onChange={val => {
                        setForm({...form, countryId: val});
                        if (formErrors.countryId) setFormErrors({...formErrors, countryId: ""});
                      }}
                      placeholder="Select Country"
                      className="w-full h-[42px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">City Name</label>
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
                      placeholder="e.g. New York"
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
                      placeholder="City description..."
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
                    Save City
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && selectedCity && (
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
                    <h3 className="text-xl font-bold font-heading text-foreground">Edit City</h3>
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
                      <label className="text-sm font-semibold text-foreground">Country</label>
                      <AnimatePresence>
                        {formErrors.countryId && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.countryId}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      options={MOCK_COUNTRIES.map(c => ({ label: c.name, value: c.id, iconUrl: c.flag }))}
                      value={form.countryId}
                      onChange={val => {
                        setForm({...form, countryId: val});
                        if (formErrors.countryId) setFormErrors({...formErrors, countryId: ""});
                      }}
                      placeholder="Select Country"
                      className="w-full h-[42px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-foreground">City Name</label>
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
                      placeholder="e.g. New York"
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
                      placeholder="City description..."
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
        {showDeleteModal && selectedCity && (
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
                  <h3 className="text-xl font-bold font-heading text-foreground">Delete City</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you sure you want to delete <span className="font-bold text-foreground">"{selectedCity.name}"</span>? This action cannot be undone.
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

