import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Plus, 
  Trash2, 
  Pencil, 
  X, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw,
  Briefcase,
  AlignLeft
} from "lucide-react";

const MOCK_DESIGNATIONS = Array.from({ length: 55 }).map((_, i) => ({
  id: `DESG-${1000 + i}`,
  name: [
    "Software Engineer", "Senior Developer", "Project Manager", "UI/UX Designer", "Data Analyst", 
    "Quality Assurance", "DevOps Engineer", "Scrum Master", "Product Owner", "System Administrator"
  ][i % 10] + (i >= 10 ? ` - L${Math.floor(i / 10) + 1}` : ""),
  description: [
    "Develops and maintains front-end and back-end application software.",
    "Leads development teams and architects complex software solutions.",
    "Oversees project timelines, resources, and stakeholder communication.",
    "Designs intuitive user interfaces and optimizes the overall user experience.",
    "Analyzes complex datasets to provide actionable business intelligence.",
    "Ensures software quality through manual and automated testing procedures.",
    "Manages CI/CD pipelines, cloud infrastructure, and deployment processes.",
    "Facilitates agile ceremonies and removes blockers for the development team.",
    "Defines product vision, manages the backlog, and prioritizes features.",
    "Maintains and secures IT infrastructure, servers, and corporate networks."
  ][i % 10]
}));

export default function AnternClientDesignations() {
  const [designations, setDesignations] = useState(MOCK_DESIGNATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  
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
    description: ""
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredDesignations = designations.filter(desg => 
    desg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    desg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDesignations.length / itemsPerPage);
  const paginatedDesignations = filteredDesignations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleReload = () => {
    setDesignations(MOCK_DESIGNATIONS);
    setSearchTerm("");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      setDesignations(designations.filter(d => d.id !== id));
    }
  };

  const openEditModal = (desg: any) => {
    setFormData(desg);
    setFormErrors({});
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({
      id: `DESG-${Math.floor(Math.random() * 9000) + 1000}`,
      name: "",
      description: ""
    });
    setFormErrors({});
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Designation Name is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (isEditMode) {
      setDesignations(designations.map(d => d.id === formData.id ? formData : d));
    } else {
      setDesignations([formData, ...designations]);
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
            Designations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 font-medium"
          >
            Manage job titles and professional designations
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
              placeholder="Search by designation name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto justify-end shrink-0 border-t xl:border-t-0 xl:border-l border-slate-100 pt-4 xl:pt-0 xl:pl-5">
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
            Add Designation
          </button>
        </div>
      </motion.div>

      {/* Cards View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {paginatedDesignations.map((desg, index) => (
            <motion.div
              key={desg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: (index % 12) * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col relative overflow-hidden group"
            >
              {/* Decorative background flair */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 truncate" title={desg.name}>
                    {desg.name}
                  </h3>
                </div>
                
                {/* Persistent Action Icons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(desg)}
                    className="p-1.5 rounded-lg text-blue-500 bg-blue-50 hover:bg-blue-100 transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(desg.id)}
                    className="p-1.5 rounded-lg text-rose-500 bg-rose-50 hover:bg-rose-100 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed mt-2">
                <AlignLeft className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="line-clamp-3" title={desg.description}>{desg.description}</p>
              </div>
            </motion.div>
          ))}
          {filteredDesignations.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
              <p>No designations found matching your search.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && filteredDesignations.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-slate-200 shadow-sm mt-4"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredDesignations.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredDesignations.length}</span> results
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {isEditMode ? "Edit Designation" : "Add Designation"}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {isEditMode ? `Editing ID: ${formData.id}` : "Create a new professional designation"}
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
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Designation Name</label>
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
                      placeholder="e.g. Senior Developer"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Description</label>
                      <AnimatePresence>
                        {formErrors.description && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[11px] text-rose-500 font-medium"
                          >
                            {formErrors.description}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        setFormErrors({ ...formErrors, description: "" });
                      }}
                      placeholder="Describe the designation's role..."
                      rows={4}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
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
                      {isEditMode ? "Update Designation" : "Save Designation"}
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

