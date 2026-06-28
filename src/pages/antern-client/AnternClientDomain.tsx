import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Trash2, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw,
  Globe,
  FileEdit,
  X
} from "lucide-react";

const DOMAIN_NAMES = [
  "Healthcare", "Fintech", "E-commerce", "EdTech", "Logistics", 
  "Artificial Intelligence", "Cybersecurity", "Blockchain", "SaaS", 
  "Real Estate", "Automotive", "Entertainment", "Agriculture", 
  "Renewable Energy", "Telecommunications"
];

const MOCK_DOMAINS = Array.from({ length: 45 }).map((_, i) => ({
  id: `DOM-${1000 + i}`,
  name: DOMAIN_NAMES[i % DOMAIN_NAMES.length] + (i >= DOMAIN_NAMES.length ? ` ${Math.floor(i/DOMAIN_NAMES.length) + 1}` : ""),
  description: "Comprehensive solutions and innovations tailored specifically for this industry vertical."
}));

export default function AnternClientDomain() {
  const [domains, setDomains] = useState(MOCK_DOMAINS);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmingSave, setIsConfirmingSave] = useState(false);
  const [domainData, setDomainData] = useState({ name: "", description: "" });
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmingEdit, setIsConfirmingEdit] = useState(false);
  const [editDomainData, setEditDomainData] = useState({ id: "", name: "", description: "" });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredDomains = domains.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDomains.length / itemsPerPage);
  const paginatedDomains = filteredDomains.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleReload = () => {
    setSearchTerm("");
  };

  const openAddModal = () => {
    setDomainData({ name: "", description: "" });
    setIsConfirmingSave(false);
    setIsAddModalOpen(true);
  };

  const openEditModal = (dom: any) => {
    setEditDomainData({ id: dom.id, name: dom.name, description: dom.description });
    setIsConfirmingEdit(false);
    setIsEditModalOpen(true);
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
            Domain
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 font-medium"
          >
            Manage industry domains and functional areas
          </motion.p>
        </div>
      </div>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm items-center justify-between"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by Domain Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-[42px]"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleReload}
              className="flex items-center justify-center gap-2 h-[42px] px-4 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all"
              title="Reload Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              className="flex items-center justify-center gap-2 h-[42px] px-6 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        <button 
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 h-[42px] px-6 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-slate-700 transition-all w-full sm:w-auto whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Domain
        </button>
      </motion.div>

      {/* Cards View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
        <AnimatePresence>
          {paginatedDomains.map((dom, index) => (
            <motion.div
              key={dom.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col relative overflow-hidden group h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="min-w-0 pr-4 flex-1">
                  <h3 className="text-xl font-bold text-slate-800 truncate" title={dom.name}>
                    {dom.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Globe className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-3">
                  {dom.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(dom)}
                  className="p-2 rounded-xl text-indigo-500 hover:bg-indigo-50 transition-all"
                  title="Edit Domain"
                >
                  <FileEdit className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-all"
                  title="Delete Domain"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          {filteredDomains.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
              <p>No domains found matching your search.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && filteredDomains.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-slate-200 shadow-sm mt-4 relative z-0"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredDomains.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredDomains.length}</span> results
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

      {/* Add Domain Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">
                  Add Domain
                </h2>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {isConfirmingSave ? (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Confirm Creation</h3>
                    <p className="text-slate-600 font-medium">
                      Are you sure you want to add the <span className="font-bold text-slate-800">{domainData.name}</span> domain?
                    </p>
                    <div className="pt-6 flex gap-3 mt-4">
                      <button 
                        onClick={() => setIsConfirmingSave(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          setIsAddModalOpen(false);
                        }}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                      >
                        Yes, Add Domain
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Domain Name</label>
                        <input 
                          type="text"
                          value={domainData.name}
                          onChange={(e) => setDomainData({...domainData, name: e.target.value})}
                          placeholder="e.g. Healthcare"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                        <textarea 
                          value={domainData.description}
                          onChange={(e) => setDomainData({...domainData, description: e.target.value})}
                          placeholder="Enter domain description..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[120px] resize-y"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                      <button 
                        onClick={() => setIsAddModalOpen(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          if (!domainData.name) return;
                          setIsConfirmingSave(true);
                        }}
                        disabled={!domainData.name}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20 disabled:opacity-50 disabled:hover:bg-primary"
                      >
                        Save
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Domain Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">
                  Edit Domain
                </h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {isConfirmingEdit ? (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileEdit className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Confirm Updates</h3>
                    <p className="text-slate-600 font-medium">
                      Are you sure you want to save changes to the <span className="font-bold text-slate-800">{editDomainData.name}</span> domain?
                    </p>
                    <div className="pt-6 flex gap-3 mt-4">
                      <button 
                        onClick={() => setIsConfirmingEdit(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          setIsEditModalOpen(false);
                        }}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20"
                      >
                        Yes, Update Domain
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Domain Name</label>
                        <input 
                          type="text"
                          value={editDomainData.name}
                          onChange={(e) => setEditDomainData({...editDomainData, name: e.target.value})}
                          placeholder="e.g. Healthcare"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 h-[42px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                        <textarea 
                          value={editDomainData.description}
                          onChange={(e) => setEditDomainData({...editDomainData, description: e.target.value})}
                          placeholder="Enter domain description..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[120px] resize-y"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                      <button 
                        onClick={() => setIsEditModalOpen(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          if (!editDomainData.name) return;
                          setIsConfirmingEdit(true);
                        }}
                        disabled={!editDomainData.name}
                        className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm shadow-primary/20 disabled:opacity-50 disabled:hover:bg-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

