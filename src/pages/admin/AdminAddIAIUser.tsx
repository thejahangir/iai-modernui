import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Pencil, Trash2, Building2, Plus, RefreshCw, X, Shield } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const initialData = [
  { id: "USR-001", name: "Alice Johnson", email: "alice@example.com", mobile: "+1 234 567 8900", role: "Admin" },
  { id: "USR-002", name: "Bob Smith", email: "bob@example.com", mobile: "+1 345 678 9012", role: "Interviewer" },
  { id: "USR-003", name: "Charlie Davis", email: "charlie@example.com", mobile: "+1 456 789 0123", role: "Candidate" },
];

const mockCompanies = [
  { id: "C-01", name: "TechNova Inc." },
  { id: "C-02", name: "Aether Solutions" },
  { id: "C-03", name: "Quantum Analytics" },
];

export default function AdminAddIAIUser() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ role: "" });
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showConfirmMapModal, setShowConfirmMapModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [newUser, setNewUser] = useState({ name: "", email: "", mobile: "", role: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleReset = () => {
    setFilters({ role: "" });
  };

  const handleReload = () => {
    console.log("Reloading data...");
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom Validation
    const errors: Record<string, string> = {};
    if (!newUser.name.trim()) errors.name = "Name is required.";
    if (!newUser.email.trim()) {
      errors.email = "Email ID is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!newUser.mobile.trim()) errors.mobile = "Mobile No is required.";
    if (!newUser.role) errors.role = "Role is required.";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    console.log("Adding user:", newUser);
    setShowAddModal(false);
    setNewUser({ name: "", email: "", mobile: "", role: "" });
  };

  const handleMapCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) {
      alert("Please select a company to map.");
      return;
    }
    setShowConfirmMapModal(true);
  };

  const confirmMapping = () => {
    console.log("Mapping user", selectedUser?.name, "to company", selectedCompany);
    setShowConfirmMapModal(false);
    setShowMapModal(false);
    setSelectedUser(null);
    setSelectedCompany("");
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">IAI Users Management</h2>
          <p className="text-muted-foreground mt-1">Manage system users, roles, and company mappings.</p>
        </div>
      </div>

      {/* Toolbar / Search Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
        
        <div className="p-4 flex flex-col xl:flex-row items-center gap-4">
          <div className="flex items-center gap-2 shrink-0 w-full xl:w-auto">
            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-foreground">Filters</h3>
          </div>

          <div className="flex-1 w-full flex items-center max-w-sm">
            {/* Role Filter */}
            <div className="relative group/input w-full">
              <SearchableSelect
                options={[
                  { label: "All Roles", value: "" },
                  { label: "Admin", value: "Admin" },
                  { label: "Interviewer", value: "Interviewer" },
                  { label: "Candidate", value: "Candidate" }
                ]}
                value={filters.role}
                onChange={(val) => setFilters({ role: val })}
                placeholder="All Roles"
                icon={<Shield className="w-4 h-4 text-muted-foreground" />}
                className="w-full h-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full xl:w-auto justify-end flex-wrap">
            <button 
              onClick={handleReset}
              className="flex items-center justify-center w-10 h-10 bg-transparent text-muted-foreground hover:text-foreground rounded-xl transition-all hover:bg-secondary active:scale-95"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSearch}
              className="flex items-center gap-2 h-10 px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all hover:shadow-md hover:shadow-primary/30 active:scale-95"
            >
              Search
            </button>
            
            <div className="w-px h-6 bg-border/50 mx-2 hidden sm:block" />
            
            <button 
              onClick={handleReload}
              className="flex items-center justify-center w-10 h-10 bg-transparent text-muted-foreground hover:text-[#00A94B] rounded-xl transition-all hover:bg-[#00A94B]/10 active:scale-95"
              title="Reload Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 h-10 px-4 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#00A94B]/90 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>
      </motion.div>

      {/* Data Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-lg hover:border-[#0085F7]/30 transition-all duration-300"
      >
        {data.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No users found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest">Name</th>
                <th className="px-6 py-4 font-bold tracking-widest">Email ID</th>
                <th className="px-6 py-4 font-bold tracking-widest">Mobile No</th>
                <th className="px-6 py-4 font-bold tracking-widest">Role</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.mobile}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.role === 'Admin' ? 'bg-amber-100 text-amber-700' :
                      item.role === 'Interviewer' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedUser(item);
                          setShowMapModal(true);
                        }}
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                        title="Map Company"
                      >
                        <Building2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        title="Edit User"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
                        title="Delete User"
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

      {/* Add User Modal */}
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[101] border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h3 className="text-xl font-bold font-heading text-foreground">Add New User</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddUserSubmit} noValidate>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Name</label>
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
                      value={newUser.name}
                      onChange={e => {
                        setNewUser({...newUser, name: e.target.value});
                        if (formErrors.name) setFormErrors({...formErrors, name: ""});
                      }}
                      className={`w-full px-4 py-2.5 bg-secondary/30 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                        formErrors.name 
                          ? "border-destructive/50 focus:ring-destructive/20 focus:border-destructive" 
                          : "border-border/50 focus:ring-primary/20 focus:border-primary"
                      }`}
                      placeholder="e.g. Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email ID</label>
                      <AnimatePresence>
                        {formErrors.email && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-destructive font-medium"
                          >
                            {formErrors.email}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <input 
                      type="email" 
                      value={newUser.email}
                      onChange={e => {
                        setNewUser({...newUser, email: e.target.value});
                        if (formErrors.email) setFormErrors({...formErrors, email: ""});
                      }}
                      className={`w-full px-4 py-2.5 bg-secondary/30 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                        formErrors.email 
                          ? "border-destructive/50 focus:ring-destructive/20 focus:border-destructive" 
                          : "border-border/50 focus:ring-primary/20 focus:border-primary"
                      }`}
                      placeholder="e.g. jane@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Mobile No</label>
                        <AnimatePresence>
                          {formErrors.mobile && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-destructive font-medium truncate max-w-[50%]"
                              title={formErrors.mobile}
                            >
                              Required
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <input 
                        type="tel" 
                        value={newUser.mobile}
                        onChange={e => {
                          setNewUser({...newUser, mobile: e.target.value});
                          if (formErrors.mobile) setFormErrors({...formErrors, mobile: ""});
                        }}
                        className={`w-full px-4 py-2.5 bg-secondary/30 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                          formErrors.mobile 
                            ? "border-destructive/50 focus:ring-destructive/20 focus:border-destructive" 
                            : "border-border/50 focus:ring-primary/20 focus:border-primary"
                        }`}
                        placeholder="e.g. +1 234 567 8900"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Role</label>
                        <AnimatePresence>
                          {formErrors.role && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-destructive font-medium"
                            >
                              Required
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className={`rounded-xl border transition-all ${
                        formErrors.role 
                          ? "border-destructive/50 ring-2 ring-destructive/20" 
                          : "border-transparent"
                      }`}>
                        <SearchableSelect
                          options={[
                            { label: "Admin", value: "Admin" },
                            { label: "Interviewer", value: "Interviewer" },
                            { label: "Candidate", value: "Candidate" }
                          ]}
                          value={newUser.role}
                          onChange={val => {
                            setNewUser({...newUser, role: val});
                            if (formErrors.role) setFormErrors({...formErrors, role: ""});
                          }}
                          placeholder="Select Role"
                          className="w-full h-[42px]"
                        />
                      </div>
                    </div>
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
                    Save User
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Map Company Modal */}
      <AnimatePresence>
        {showMapModal && selectedUser && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowMapModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h3 className="text-xl font-bold font-heading text-foreground">Map Company</h3>
                <button 
                  onClick={() => setShowMapModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleMapCompanySubmit}>
                <div className="p-6 space-y-6">
                  <div className="p-4 bg-secondary/50 rounded-xl border border-border/50">
                    <p className="text-sm text-muted-foreground">Mapping company to user:</p>
                    <p className="font-bold text-foreground mt-1">{selectedUser.name} <span className="text-muted-foreground font-normal">({selectedUser.role})</span></p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Select Company</label>
                    <div className="relative">
                      <SearchableSelect
                        options={mockCompanies.map(c => ({ label: c.name, value: c.id }))}
                        value={selectedCompany}
                        onChange={val => setSelectedCompany(val)}
                        placeholder="Choose a company..."
                        icon={<Building2 className="w-4 h-4 text-muted-foreground" />}
                        className="w-full h-11"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50 rounded-b-2xl">
                  <button 
                    type="button"
                    onClick={() => setShowMapModal(false)}
                    className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors"
                  >
                    Confirm Mapping
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirm Mapping Modal */}
      <AnimatePresence>
        {showConfirmMapModal && selectedUser && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              onClick={() => setShowConfirmMapModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[111] overflow-hidden border border-border/50"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Confirm Mapping</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you sure you want to map <span className="font-bold text-foreground">"{selectedUser.name}"</span> to the selected company?
                </p>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50">
                <button 
                  onClick={() => setShowConfirmMapModal(false)}
                  className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmMapping}
                  className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors"
                >
                  Yes, Confirm
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
