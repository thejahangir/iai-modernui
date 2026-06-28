import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchableSelect } from "../../components/SearchableSelect";
import { 
  Search, 
  Plus, 
  Trash2, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight,
  RotateCcw,
  RefreshCw,
  LayoutGrid,
  List,
  Mail,
  Phone,
  MapPin,
  Briefcase
} from "lucide-react";

const MOCK_PANELS = Array.from({ length: 45 }).map((_, i) => ({
  id: `PAN-${1000 + i}`,
  name: ["Aarav Sharma", "Priya Patel", "Vikram Singh", "Neha Gupta", "Rohan Desai", "Anjali Reddy"][i % 6],
  email: `user${1000 + i}@example.com`,
  mobile: `+91 ${Math.floor(Math.random() * 90000) + 10000}${Math.floor(Math.random() * 90000) + 10000}`,
  primarySkills: ["React, Node.js", "Python, Django", "AWS, Terraform", "UI/UX, Figma", "Java, Spring Boot", "QA Automation"][i % 6],
  city: ["Mumbai", "Bengaluru", "Delhi", "Hyderabad", "Pune", "Chennai"][i % 6],
  experience: ["3-5 Years", "5-8 Years", "8-10 Years", "10+ Years"][i % 4],
}));

export default function AnternClientCompanyPanels() {
  const [panels, setPanels] = useState(MOCK_PANELS);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    primarySkills: "",
    city: "",
    experience: ""
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredPanels = panels.filter(panel => 
    panel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    panel.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    panel.primarySkills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPanels.length / itemsPerPage);
  const paginatedPanels = filteredPanels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleReset = () => {
    setSearchTerm("");
  };

  const handleReload = () => {
    setPanels(MOCK_PANELS);
    setSearchTerm("");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this panel?")) {
      setPanels(panels.filter(p => p.id !== id));
    }
  };

  const openViewModal = (panel: any) => {
    setFormData(panel);
    setFormErrors({});
    setIsViewModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({
      id: `PAN-${Math.floor(Math.random() * 9000) + 1000}`,
      name: "",
      email: "",
      mobile: "",
      primarySkills: "",
      city: "",
      experience: ""
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.mobile) errors.mobile = "Mobile is required";
    if (!formData.primarySkills) errors.primarySkills = "Primary Skills are required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.experience) errors.experience = "Experience is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setPanels([formData, ...panels]);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setPanels(panels.map(p => p.id === formData.id ? formData : p));
    setIsViewModalOpen(false);
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
            Company Panels
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 font-medium"
          >
            Manage and monitor your company panel list
          </motion.p>
        </div>
      </div>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto flex-1">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, email, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center justify-center gap-2 h-[48px] px-5 bg-slate-100 text-slate-500 hover:text-slate-800 text-sm font-bold rounded-2xl hover:bg-slate-200 transition-all shrink-0"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button 
            onClick={handleReload}
            className="flex items-center justify-center w-[48px] h-[48px] bg-slate-100 text-slate-500 hover:text-slate-800 rounded-2xl transition-all hover:bg-slate-200 shrink-0"
            title="Reload Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />
          <button 
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 h-[48px] px-6 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex-1 sm:flex-none"
          >
            <Plus className="w-5 h-5" />
            Add Panel
          </button>
        </div>
      </motion.div>

      {/* Grid / Table View Content */}
      {viewMode === "grid" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Mobile No</th>
                  <th className="px-6 py-4">Primary Skills</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                  {paginatedPanels.map((panel, index) => (
                    <motion.tr 
                      key={panel.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td 
                        className="px-6 py-4 font-bold text-slate-800 max-w-[150px] sm:max-w-[200px] truncate"
                        title={panel.name}
                      >
                        {panel.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {panel.email}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {panel.mobile}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {panel.primarySkills}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openViewModal(panel)}
                            className="p-1.5 rounded-lg text-blue-500 bg-blue-50 hover:bg-blue-100 transition-all"
                            title="View / Edit"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(panel.id)}
                            className="p-1.5 rounded-lg text-rose-500 bg-rose-50 hover:bg-rose-100 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredPanels.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No panels found matching your search.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {paginatedPanels.map((panel, index) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
                
                <div className="flex justify-between items-start mb-5">
                  <div className="min-w-0 pr-4 flex-1">
                    <h3 
                      className="text-xl font-bold text-slate-800 truncate" 
                      title={panel.name}
                    >
                      {panel.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary mt-2 truncate max-w-full" title={panel.primarySkills}>
                      {panel.primarySkills}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openViewModal(panel)}
                      className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-all"
                      title="View / Edit"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(panel.id)}
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
                    <span className="truncate">{panel.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-slate-400" />
                    </div>
                    {panel.mobile}
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {panel.city}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      {panel.experience}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredPanels.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
                <p>No panels found matching your search.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && filteredPanels.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-slate-200 shadow-sm mt-4"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredPanels.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredPanels.length}</span> results
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

      {/* Add / View Modal */}
      <AnimatePresence>
        {(isAddModalOpen || isViewModalOpen) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddModalOpen(false);
                setIsViewModalOpen(false);
              }}
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
                    {isAddModalOpen ? "Add New Panel" : "View / Edit Panel"}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {isAddModalOpen ? "Enter panel details below" : `Editing ID: ${formData.id}`}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsViewModalOpen(false);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form 
                  onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit}
                  className="space-y-5"
                >
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
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">Email</label>
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
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
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
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Primary Skill</label>
                      <AnimatePresence>
                        {formErrors.primarySkills && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-rose-500 font-medium"
                          >
                            {formErrors.primarySkills}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <SearchableSelect
                      value={formData.primarySkills}
                      onChange={(val) => {
                        setFormData({ ...formData, primarySkills: val });
                        setFormErrors({ ...formErrors, primarySkills: "" });
                      }}
                      options={[
                        { value: "React, Node.js", label: "React, Node.js" },
                        { value: "Python, Django", label: "Python, Django" },
                        { value: "AWS, Terraform", label: "AWS, Terraform" },
                        { value: "UI/UX, Figma", label: "UI/UX, Figma" },
                        { value: "Java, Spring Boot", label: "Java, Spring Boot" },
                        { value: "QA Automation", label: "QA Automation" },
                      ]}
                      className="h-[42px]"
                      placeholder="Select Primary Skill"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">City</label>
                        <AnimatePresence>
                          {formErrors.city && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-rose-500 font-medium"
                            >
                              {formErrors.city}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <SearchableSelect
                        value={formData.city}
                        onChange={(val) => {
                          setFormData({ ...formData, city: val });
                          setFormErrors({ ...formErrors, city: "" });
                        }}
                        options={[
                          { value: "Mumbai", label: "Mumbai" },
                          { value: "Bengaluru", label: "Bengaluru" },
                          { value: "Delhi", label: "Delhi" },
                          { value: "Hyderabad", label: "Hyderabad" },
                          { value: "Pune", label: "Pune" },
                          { value: "Chennai", label: "Chennai" },
                        ]}
                        className="h-[42px]"
                        placeholder="Select City"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">Experience</label>
                        <AnimatePresence>
                          {formErrors.experience && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              className="text-[11px] text-rose-500 font-medium"
                            >
                              {formErrors.experience}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <SearchableSelect
                        value={formData.experience}
                        onChange={(val) => {
                          setFormData({ ...formData, experience: val });
                          setFormErrors({ ...formErrors, experience: "" });
                        }}
                        options={[
                          { value: "0-2 Years", label: "0-2 Years" },
                          { value: "3-5 Years", label: "3-5 Years" },
                          { value: "5-8 Years", label: "5-8 Years" },
                          { value: "8-10 Years", label: "8-10 Years" },
                          { value: "10+ Years", label: "10+ Years" },
                        ]}
                        className="h-[42px]"
                        placeholder="Select Experience"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setIsViewModalOpen(false);
                      }}
                      className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                    >
                      {isAddModalOpen ? "Save Panel" : "Update Panel"}
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

