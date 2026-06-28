import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Plus, 
  Trash2, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw,
  LayoutGrid,
  List,
  Mail,
  MapPin,
  Briefcase,
  Users,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const NAMES = ["Aarav Sharma", "Priya Patel", "Vikram Singh", "Neha Gupta", "Rohan Desai", "Anjali Reddy", "Kiran Verma", "Sneha Iyer", "Arjun Nair", "Pooja Joshi"];
const ROLES = ["Standard User", "Power User", "Coordinator", "Reviewer", "Read-Only"];
const DEPARTMENTS = ["Engineering", "Human Resources", "Sales", "Marketing", "Finance", "Operations"];
const LOCATIONS = ["Mumbai", "Bengaluru", "Delhi", "Hyderabad", "Pune", "Chennai"];

const MOCK_SUB_USERS = Array.from({ length: 65 }).map((_, i) => ({
  id: `USR-${1000 + i}`,
  name: NAMES[i % NAMES.length],
  email: `user${1000 + i}@example.com`,
  role: ROLES[i % ROLES.length],
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  location: LOCATIONS[i % LOCATIONS.length],
  reportingTo: NAMES[(i + 3) % NAMES.length]
}));

export default function AnternClientSubUsers() {
  const [subUsers, setSubUsers] = useState(MOCK_SUB_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    department: "",
    location: "",
    reportingTo: "" // Keeping it in state but requirement only specifies first 5 fields for modal
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole, filterDepartment]);

  const filteredUsers = subUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole ? u.role === filterRole : true;
    const matchDept = filterDepartment ? u.department === filterDepartment : true;
    return matchSearch && matchRole && matchDept;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleReset = () => {
    setSearchTerm("");
    setFilterRole("");
    setFilterDepartment("");
  };

  const handleReload = () => {
    setSubUsers(MOCK_SUB_USERS);
    handleReset();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this sub-user?")) {
      setSubUsers(subUsers.filter(u => u.id !== id));
    }
  };

  const openViewModal = (user: any) => {
    setFormData(user);
    setFormErrors({});
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({
      id: `USR-${Math.floor(Math.random() * 9000) + 1000}`,
      name: "",
      email: "",
      role: "",
      department: "",
      location: "",
      reportingTo: "Unassigned"
    });
    setFormErrors({});
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.role) errors.role = "User Type is required";
    if (!formData.department) errors.department = "Department is required";
    if (!formData.location) errors.location = "Location is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (isEditMode) {
      setSubUsers(subUsers.map(u => u.id === formData.id ? formData : u));
    } else {
      setSubUsers([formData, ...subUsers]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-heading text-foreground"
          >
            Sub Users
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 font-medium"
          >
            Manage access, roles, and organizational assignments for your team
          </motion.p>
        </div>
      </div>

      {/* Toolbar / Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto flex-1">
          <div className="relative w-full sm:max-w-xs shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]"
            />
          </div>
          
          <div className="w-full sm:w-48 shrink-0 relative z-30">
            <SearchableSelect
              value={filterRole}
              onChange={setFilterRole}
              options={[
                { value: "", label: "All Roles" },
                ...ROLES.map(r => ({ value: r, label: r }))
              ]}
              placeholder="Filter by Role"
              className="h-[42px]"
            />
          </div>
          
          <div className="w-full sm:w-48 shrink-0 relative z-20">
            <SearchableSelect
              value={filterDepartment}
              onChange={setFilterDepartment}
              options={[
                { value: "", label: "All Departments" },
                ...DEPARTMENTS.map(d => ({ value: d, label: d }))
              ]}
              placeholder="Filter by Department"
              className="h-[42px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto justify-end shrink-0 border-t xl:border-t-0 xl:border-l border-slate-100 pt-4 xl:pt-0 xl:pl-5">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === "card" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              title="Card View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              title="Grid View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleReload}
            className="flex items-center justify-center w-[42px] h-[42px] bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl transition-all hover:bg-slate-200 shrink-0"
            title="Reload Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />
          <button 
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 h-[42px] px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex-1 sm:flex-none"
          >
            <Plus className="w-5 h-5" />
            Add Sub User
          </button>
        </div>
      </motion.div>

      {/* Grid / Table View Content */}
      {viewMode === "grid" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative z-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Reporting to</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {paginatedUsers.map((user, index) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 font-bold text-slate-800 max-w-[150px] truncate" title={user.name}>
                        {user.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 whitespace-nowrap">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {user.location}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {user.reportingTo}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openViewModal(user)}
                            className="p-1.5 rounded-lg text-blue-500 bg-blue-50 hover:bg-blue-100 transition-all"
                            title="View / Edit"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 rounded-lg text-rose-500 bg-rose-50 hover:bg-rose-100 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                        No sub-users found matching your search.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-0">
          <AnimatePresence>
            {paginatedUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
                
                <div className="flex justify-between items-start mb-5">
                  <div className="min-w-0 pr-4 flex-1">
                    <h3 className="text-xl font-bold text-slate-800 truncate" title={user.name}>
                      {user.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600 mt-2 truncate max-w-full" title={user.role}>
                      <ShieldCheck className="w-3 h-3 mr-1.5" />
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openViewModal(user)}
                      className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-all"
                      title="View / Edit"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="truncate">{user.department}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 mt-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium truncate">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate" title={user.location}>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium truncate">
                      <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate" title={user.reportingTo}>{user.reportingTo}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
                <p>No sub-users found matching your search.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && filteredUsers.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-slate-200 shadow-sm mt-4 relative z-0"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredUsers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
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
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-slate-200 focus:z-20 focus:outline-offset-0 transition-colors ${
                          isCurrent 
                            ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary' 
                            : 'text-slate-700 hover:bg-slate-50'
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
                      <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-500 ring-1 ring-inset ring-slate-200 focus:outline-offset-0">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
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
              className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-500">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {isEditMode ? "View / Edit Sub User" : "Add Sub User"}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {isEditMode ? `Managing User ID: ${formData.id}` : "Create a new user account for your organization"}
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">Name</label>
                        <AnimatePresence>
                          {formErrors.name && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-rose-500 font-medium"
                            >
                              {formErrors.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          setFormErrors({ ...formErrors, name: "" });
                        }}
                        placeholder="Full Name"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">Email Address</label>
                        <AnimatePresence>
                          {formErrors.email && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-rose-500 font-medium"
                            >
                              {formErrors.email}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setFormErrors({ ...formErrors, email: "" });
                        }}
                        placeholder="Email Address"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative z-[100]">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">User Type</label>
                        <AnimatePresence>
                          {formErrors.role && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-rose-500 font-medium"
                            >
                              {formErrors.role}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <SearchableSelect
                        value={formData.role}
                        onChange={(val) => {
                          setFormData({ ...formData, role: val });
                          setFormErrors({ ...formErrors, role: "" });
                        }}
                        options={ROLES.map(r => ({ value: r, label: r }))}
                        placeholder="Select User Type"
                        className="h-[42px]"
                      />
                    </div>
                    
                    <div className="relative z-50">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">Department</label>
                        <AnimatePresence>
                          {formErrors.department && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-rose-500 font-medium"
                            >
                              {formErrors.department}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <SearchableSelect
                        value={formData.department}
                        onChange={(val) => {
                          setFormData({ ...formData, department: val });
                          setFormErrors({ ...formErrors, department: "" });
                        }}
                        options={DEPARTMENTS.map(d => ({ value: d, label: d }))}
                        placeholder="Select Department"
                        className="h-[42px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div className="relative z-40">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">Location</label>
                        <AnimatePresence>
                          {formErrors.location && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-rose-500 font-medium"
                            >
                              {formErrors.location}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <SearchableSelect
                        value={formData.location}
                        onChange={(val) => {
                          setFormData({ ...formData, location: val });
                          setFormErrors({ ...formErrors, location: "" });
                        }}
                        options={LOCATIONS.map(l => ({ value: l, label: l }))}
                        placeholder="Select Location"
                        className="h-[42px]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3 mt-8 border-t border-slate-100">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                    >
                      {isEditMode ? "Update Sub User" : "Save Sub User"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

