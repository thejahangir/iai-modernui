import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Pencil, Trash2, Building2, Plus, RefreshCw, X, Shield, LayoutGrid, List, Users, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";
const initialData = [
  { id: "USR-001", name: "Kavya Nair", email: "kavya@example.com", mobile: "+1 234 567 8900", role: "Admin" },
  { id: "USR-002", name: "Sameer Verma", email: "sameer@example.com", mobile: "+1 345 678 9012", role: "Interviewer" },
  { id: "USR-003", name: "Chandan Das", email: "chandan@example.com", mobile: "+1 456 789 0123", role: "Candidate" },
  { id: "USR-004", name: "Divya Prasad", email: "divya@example.com", mobile: "+1 567 890 1234", role: "Interviewer" },
  { id: "USR-005", name: "Eshaan Wadhwa", email: "eshaan@example.com", mobile: "+1 678 901 2345", role: "Admin" },
  { id: "USR-006", name: "Aarav Gupta", email: "aarav@example.com", mobile: "+1 789 012 3456", role: "Candidate" },
  { id: "USR-007", name: "Priya Sharma", email: "priya@example.com", mobile: "+1 890 123 4567", role: "Interviewer" },
  { id: "USR-008", name: "Rohan Kapoor", email: "rohan@example.com", mobile: "+1 901 234 5678", role: "Candidate" },
  { id: "USR-009", name: "Meera Reddy", email: "meera@example.com", mobile: "+1 012 345 6789", role: "Admin" },
  { id: "USR-010", name: "Aditya Singh", email: "aditya@example.com", mobile: "+1 123 456 7890", role: "Interviewer" },
  { id: "USR-011", name: "Ananya Desai", email: "ananya@example.com", mobile: "+1 234 567 8901", role: "Candidate" },
  { id: "USR-012", name: "Vikram Malhotra", email: "vikram@example.com", mobile: "+1 345 678 9012", role: "Candidate" },
];

const mockCompanies = [
  { id: "C-01", name: "Wipro" },
  { id: "C-02", name: "TCS" },
  { id: "C-03", name: "Infosys" },
];

export default function SuperAdminAddIAIUser() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ search: "", role: "" });
  const [appliedFilters, setAppliedFilters] = useState({ search: "", role: "" });
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showConfirmMapModal, setShowConfirmMapModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [newUser, setNewUser] = useState({ name: "", email: "", mobile: "", role: "" });
  const [editingUser, setEditingUser] = useState({ id: "", name: "", email: "", mobile: "", role: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const searchMatch = appliedFilters.search 
        ? item.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) || 
          item.email.toLowerCase().includes(appliedFilters.search.toLowerCase())
        : true;
      const roleMatch = appliedFilters.role ? item.role === appliedFilters.role : true;
      return searchMatch && roleMatch;
    });
  }, [data, appliedFilters]);

  const handleSearch = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ search: "", role: "" });
    setAppliedFilters({ search: "", role: "" });
    setCurrentPage(1);
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

  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    if (!editingUser.name.trim()) errors.name = "Name is required.";
    if (!editingUser.email.trim()) {
      errors.email = "Email ID is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingUser.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!editingUser.mobile.trim()) errors.mobile = "Mobile No is required.";
    if (!editingUser.role) errors.role = "Role is required.";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    console.log("Updating user:", editingUser);
    setData(data.map(u => u.id === editingUser.id ? editingUser : u));
    setShowEditModal(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setData(data.filter(u => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
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

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">IAI Users Management</h2>
          <p className="text-muted-foreground mt-1">Manage system users, roles, and company mappings.</p>
        </div>
        <div className="flex items-center p-1 bg-secondary rounded-xl border border-border/50">
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
              viewMode === "card" 
                ? "bg-white text-primary shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-black/5"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Cards
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
              viewMode === "grid" 
                ? "bg-white text-primary shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-black/5"
            }`}
          >
            <List className="w-4 h-4" />
            Grid
          </button>
        </div>
      </div>

      {/* Toolbar / Search Panel */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-5 border border-border/50 shadow-sm flex flex-col xl:flex-row gap-5 items-center justify-between"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto flex-1">
          <div className="relative w-full sm:w-[320px]">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by Name or Email..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full h-[48px] pl-11 pr-4 rounded-2xl bg-secondary/30 border-transparent focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal"
            />
          </div>
          <div className="hidden sm:block w-px h-10 bg-border/50 mx-2" />
          <div className="relative w-full sm:w-[240px]">
            <SearchableSelect
              options={[
                { label: "All Roles", value: "" },
                { label: "Admin", value: "Admin" },
                { label: "Interviewer", value: "Interviewer" },
                { label: "Candidate", value: "Candidate" }
              ]}
              value={filters.role}
              onChange={(val) => setFilters({ ...filters, role: val })}
              placeholder="All Roles"
              icon={<Shield className="w-4 h-4 text-muted-foreground" />}
              className="w-full h-[48px] rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-[48px] px-6 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto justify-end shrink-0 border-t xl:border-t-0 xl:border-l border-border/50 pt-4 xl:pt-0 xl:pl-5">
          <button 
            onClick={handleReset}
            className="flex items-center justify-center gap-2 h-[48px] px-5 bg-secondary text-muted-foreground hover:text-foreground text-sm font-bold rounded-2xl hover:bg-black/5 transition-all shrink-0 active:scale-95"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button 
            onClick={handleReload}
            className="flex items-center justify-center w-[48px] h-[48px] bg-secondary text-muted-foreground hover:text-[#00A94B] rounded-2xl transition-all hover:bg-[#00A94B]/10 shrink-0 active:scale-95"
            title="Reload Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="w-px h-8 bg-border/50 mx-1 hidden sm:block" />
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 h-[48px] px-6 bg-[#00A94B] text-white text-sm font-bold rounded-2xl shadow-lg shadow-[#00A94B]/20 hover:bg-[#00A94B]/90 transition-all active:scale-95 flex-1 sm:flex-none"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </motion.div>

      {/* Data Views */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {filteredData.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-border/50 shadow-sm">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No users found matching your criteria.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
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
                {paginatedData.map((item) => (
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
                          onClick={() => {
                            setEditingUser(item);
                            setFormErrors({});
                            setShowEditModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                          title="Edit User"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedUser(item);
                            setShowDeleteModal(true);
                          }}
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">{item.name}</h4>
                      <p className="text-xs font-medium text-muted-foreground">{item.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => {
                        setSelectedUser(item);
                        setShowMapModal(true);
                      }}
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-all opacity-0 group-hover:opacity-100"
                      title="Map Company"
                    >
                      <Building2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setEditingUser(item);
                        setFormErrors({});
                        setShowEditModal(true);
                      }}
                      className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      title="Edit User"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedUser(item);
                        setShowDeleteModal(true);
                      }}
                      className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.id}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border w-fit ${
                        item.role === 'Admin' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        item.role === 'Interviewer' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                        'bg-emerald-100 text-emerald-700 border-emerald-200'
                      }`}>
                      {item.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center bg-secondary/50 p-2 rounded-xl border border-border/50">
                    <span className="font-mono px-2 text-muted-foreground text-xs font-semibold">
                      {item.mobile}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && filteredData.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-border/50 shadow-sm mt-4"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
                <span className="font-medium text-foreground">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border/50 hover:bg-secondary focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
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
                            : 'text-foreground hover:bg-secondary'
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
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border/50 hover:bg-secondary focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
          
          {/* Mobile Pagination */}
          <div className="flex flex-1 justify-between sm:hidden items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-xl border border-border/50 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl border border-border/50 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

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
                      placeholder="e.g. priya@example.com"
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

      {/* Edit User Modal */}
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[101] border border-border/50"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h3 className="text-xl font-bold font-heading text-foreground">Edit User</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleEditUserSubmit} noValidate>
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
                      value={editingUser.name}
                      onChange={e => {
                        setEditingUser({...editingUser, name: e.target.value});
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
                      value={editingUser.email}
                      onChange={e => {
                        setEditingUser({...editingUser, email: e.target.value});
                        if (formErrors.email) setFormErrors({...formErrors, email: ""});
                      }}
                      className={`w-full px-4 py-2.5 bg-secondary/30 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                        formErrors.email 
                          ? "border-destructive/50 focus:ring-destructive/20 focus:border-destructive" 
                          : "border-border/50 focus:ring-primary/20 focus:border-primary"
                      }`}
                      placeholder="e.g. priya@example.com"
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
                        value={editingUser.mobile}
                        onChange={e => {
                          setEditingUser({...editingUser, mobile: e.target.value});
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
                          value={editingUser.role}
                          onChange={val => {
                            setEditingUser({...editingUser, role: val});
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
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors"
                  >
                    Update User
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedUser && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[111] overflow-hidden border border-border/50"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Delete User</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you sure you want to delete the user <span className="font-bold text-foreground">"{selectedUser.name}"</span>? This action cannot be undone.
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
                  onClick={handleDeleteUser}
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

