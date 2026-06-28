import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Plus, 
  Trash2, 
  Link as LinkIcon, 
  X, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw,
  AlertCircle,
  LayoutGrid,
  List,
  Mail,
  Phone
} from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_REQUIREMENTS = [
  { id: "REQ-001", title: "Senior Frontend Engineer", jobCode: "JC-FE-01", company: "TechCorp India" },
  { id: "REQ-002", title: "Backend Developer (Node.js)", jobCode: "JC-BE-02", company: "InnovateTech" },
  { id: "REQ-003", title: "Full Stack Developer", jobCode: "JC-FS-03", company: "Global Systems" },
  { id: "REQ-004", title: "DevOps Engineer", jobCode: "JC-DE-04", company: "CloudNet Solutions" },
  { id: "REQ-005", title: "UI/UX Designer", jobCode: "JC-UX-05", company: "Creative Minds" },
];

const INDIAN_NAMES = ["Aarav Sharma", "Priya Patel", "Vikram Singh", "Neha Gupta", "Rohan Desai", "Anjali Reddy", "Kiran Verma", "Sneha Iyer", "Arjun Nair", "Pooja Joshi"];

const MOCK_USERS = Array.from({ length: 25 }).map((_, i) => ({
  id: `V-USR-${1000 + i}`,
  name: INDIAN_NAMES[i % INDIAN_NAMES.length],
  email: `${INDIAN_NAMES[i % INDIAN_NAMES.length].split(' ')[0].toLowerCase()}${i+1}@vendor.com`,
  mobile: `+91 ${90000 + Math.floor(Math.random() * 9999)} ${10000 + Math.floor(Math.random() * 89999)}`
}));

export default function VendorUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSearchTerm]);

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(activeSearchTerm.toLowerCase());
    return matchSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };

  const handleReload = () => {
    setSearchTerm("");
    setActiveSearchTerm("");
    setUsers(MOCK_USERS);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this vendor recruiter?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Map Requirement Modal State
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMapUser, setSelectedMapUser] = useState<string | null>(null);
  const [selectedRequirementId, setSelectedRequirementId] = useState("");
  
  const selectedRequirement = MOCK_REQUIREMENTS.find(r => r.id === selectedRequirementId);

  const handleMapRequirement = (id: string) => {
    setSelectedMapUser(id);
    setSelectedRequirementId("");
    setIsMapModalOpen(true);
  };

  const submitMapRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequirementId) {
      alert("Please select a requirement first");
      return;
    }
    
    setIsConfirmModalOpen(true);
  };

  const executeMapRequirement = () => {
    setIsConfirmModalOpen(false);
    setIsMapModalOpen(false);
    setSelectedMapUser(null);
    setSelectedRequirementId("");
  };

  const openAddModal = () => {
    setFormData({ name: "", email: "", mobile: "" });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.mobile.trim()) errors.mobile = "Mobile No is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const newUser = {
      id: `V-USR-${Math.floor(Math.random() * 9000) + 1000}`,
      ...formData
    };
    setUsers([newUser, ...users]);
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
            Vendor Users
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 font-medium"
          >
            Manage your vendor recruiters
          </motion.p>
        </div>
      </div>

      {/* Toolbar / Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-11 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]"
            />
          </div>
          <button 
            onClick={handleReload}
            className="flex items-center justify-center w-[42px] h-[42px] bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl transition-all hover:bg-slate-200 shrink-0"
            title="Reload Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={handleSearch}
            className="px-6 h-[42px] bg-primary text-white font-bold rounded-xl flex justify-center items-center text-sm shadow-sm hover:bg-primary/90 transition-colors shrink-0"
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-5">
          <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
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
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 h-[42px] px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all w-full sm:w-auto shrink-0"
          >
            <Plus className="w-5 h-5" />
            Add Vendor Recruiter
          </button>
        </div>
      </motion.div>

      {/* Grid / Table View */}
      {viewMode === "grid" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative z-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Vendor Sub User Name</th>
                  <th className="px-6 py-4">Email ID</th>
                  <th className="px-6 py-4">Mobile No</th>
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
                      <td className="px-6 py-4 font-bold text-slate-800 max-w-[200px] truncate" title={user.name}>
                        {user.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600 whitespace-nowrap">
                        {user.mobile}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleMapRequirement(user.id)}
                            className="p-1.5 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all"
                            title="Map Requirement"
                          >
                            <LinkIcon className="w-4 h-4" />
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
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        No vendor users found matching your search.
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
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="flex justify-between items-start mb-5">
                  <div className="min-w-0 pr-4 flex-1">
                    <h3 className="text-xl font-bold text-slate-800 truncate" title={user.name}>
                      {user.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMapRequirement(user.id)}
                      className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all"
                      title="Map Requirement"
                    >
                      <LinkIcon className="w-4 h-4" />
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

                <div className="space-y-3 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="truncate">{user.mobile}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
                <p>No vendor users found matching your search.</p>
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
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4" />
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
                      <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-500 ring-1 ring-inset ring-slate-200">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" />
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

      {/* Add Modal */}
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
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Add Vendor Recruiter
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    Create a new recruiter account
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
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
                      <label className="block text-sm font-bold text-slate-700">Email ID</label>
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

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Mobile No</label>
                      <AnimatePresence>
                        {formErrors.mobile && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-rose-500 font-medium"
                          >
                            {formErrors.mobile}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <input 
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => {
                        setFormData({ ...formData, mobile: e.target.value });
                        setFormErrors({ ...formErrors, mobile: "" });
                      }}
                      placeholder="Mobile Number"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
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
                      Save Recruiter
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Map Requirement Modal */}
      <AnimatePresence>
        {isMapModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMapModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Map Requirement
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    Assign a requirement to this recruiter
                  </p>
                </div>
                <button 
                  onClick={() => setIsMapModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={submitMapRequirement} className="space-y-6">
                  
                  <div className="relative z-[100]">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Requirement</label>
                    </div>
                    <SearchableSelect
                      value={selectedRequirementId}
                      onChange={setSelectedRequirementId}
                      options={MOCK_REQUIREMENTS.map(r => ({ value: r.id, label: `${r.id} - ${r.title}` }))}
                      placeholder="Search and select requirement..."
                      className="h-[42px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Job Code</label>
                    <input 
                      type="text"
                      value={selectedRequirement?.jobCode || ""}
                      readOnly
                      placeholder="Auto-populated"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none transition-all text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                    <input 
                      type="text"
                      value={selectedRequirement?.company || ""}
                      readOnly
                      placeholder="Auto-populated"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none transition-all text-slate-500"
                    />
                  </div>

                  <div className="pt-4 flex gap-3 mt-8 border-t border-slate-100">
                    <button 
                      type="button"
                      onClick={() => setIsMapModalOpen(false)}
                      className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={!selectedRequirementId}
                      className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary rounded-xl transition-colors shadow-sm shadow-primary/20"
                    >
                      Map Requirement
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirmModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-3 mb-4 w-full justify-center">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shadow-inner shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Confirm Action</h2>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-6">
                Are you sure you want to map <span className="font-bold text-slate-700">{selectedRequirement?.title}</span> to this recruiter?
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeMapRequirement}
                  className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-500/20"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
