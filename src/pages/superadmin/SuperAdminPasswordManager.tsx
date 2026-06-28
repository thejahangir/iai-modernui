import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Copy, CheckCircle2, Shield, User, Mail, X, Trash2, AlertTriangle, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const initialData = [
  { id: "UID-1001", name: "Kavya Nair", email: "kavya@example.com", password: "Password123!", role: "Admin" },
  { id: "UID-1002", name: "Sameer Verma", email: "sameer@example.com", password: "SecurePass!456", role: "Interviewer" },
  { id: "UID-1003", name: "Chandan Das", email: "chandan@example.com", password: "MyPassword@789", role: "Candidate" },
  { id: "UID-1004", name: "Divya Prasad", email: "divya@example.com", password: "WonderWoman!1", role: "Interviewer" },
  { id: "UID-1005", name: "Eshaan Wadhwa", email: "eshaan@example.com", password: "Evan#Pass2026", role: "Admin" },
  { id: "UID-1006", name: "Aarav Gupta", email: "aarav@example.com", password: "Alpha@1006", role: "Candidate" },
  { id: "UID-1007", name: "Priya Sharma", email: "priya@example.com", password: "Beta#Pass1007", role: "Interviewer" },
  { id: "UID-1008", name: "Rohan Kapoor", email: "rohan@example.com", password: "Gamma!Pass1008", role: "Candidate" },
  { id: "UID-1009", name: "Meera Reddy", email: "meera@example.com", password: "Delta$Pass1009", role: "Admin" },
  { id: "UID-1010", name: "Aditya Singh", email: "aditya@example.com", password: "Epsilon%1010", role: "Interviewer" },
  { id: "UID-1011", name: "Ananya Desai", email: "ananya@example.com", password: "Zeta^Pass1011", role: "Candidate" },
  { id: "UID-1012", name: "Vikram Malhotra", email: "vikram@example.com", password: "Eta&Pass1012", role: "Candidate" },
];

export default function SuperAdminPasswordManager() {
  const [data, setData] = useState(initialData);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    role: "",
    nameLike: "",
    emailId: ""
  });

  const [appliedFilters, setAppliedFilters] = useState({
    role: "",
    nameLike: "",
    emailId: ""
  });

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const roleMatch = appliedFilters.role ? item.role === appliedFilters.role : true;
      const nameMatch = appliedFilters.nameLike ? item.name.toLowerCase().includes(appliedFilters.nameLike.toLowerCase()) : true;
      const emailMatch = appliedFilters.emailId ? item.email.toLowerCase().includes(appliedFilters.emailId.toLowerCase()) : true;
      return roleMatch && nameMatch && emailMatch;
    });
  }, [data, appliedFilters]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      setData(data.filter(item => item.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      role: "",
      nameLike: "",
      emailId: ""
    });
    setAppliedFilters({
      role: "",
      nameLike: "",
      emailId: ""
    });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Password Management</h2>
          <p className="text-muted-foreground mt-1">View and manage user passwords securely.</p>
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

      {/* Compact Search Panel */}
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

          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Role Filter */}
            <div className="relative group/input">
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
                className="w-full h-10"
              />
            </div>

            {/* Name Filter */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within/input:text-primary transition-colors">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={filters.nameLike}
                onChange={(e) => setFilters({ ...filters, nameLike: e.target.value })}
                className="w-full h-10 pl-9 pr-8 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 hover:border-primary/40 text-foreground"
                placeholder="Name"
              />
              <AnimatePresence>
                {filters.nameLike && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setFilters({ ...filters, nameLike: "" })}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5 bg-border/50 rounded-full p-0.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Email Filter */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within/input:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={filters.emailId}
                onChange={(e) => setFilters({ ...filters, emailId: e.target.value })}
                className="w-full h-10 pl-9 pr-8 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60 hover:border-primary/40 text-foreground"
                placeholder="Email Id"
              />
              <AnimatePresence>
                {filters.emailId && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setFilters({ ...filters, emailId: "" })}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5 bg-border/50 rounded-full p-0.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full xl:w-auto justify-end">
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
          </div>
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
              <Shield className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No user passwords found matching your criteria.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-widest">Unique ID</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Name</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Email ID</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Password</th>
                  <th className="px-6 py-4 font-bold tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-foreground whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {item.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono bg-secondary px-2 py-1 rounded-md text-foreground text-xs border border-border/50 group-hover:border-primary/20 transition-colors">
                          {item.password}
                        </span>
                        <button
                          onClick={() => handleCopy(item.id, item.password)}
                          className={`p-1.5 rounded-lg transition-all ${
                            copiedId === item.id 
                              ? 'bg-emerald-100 text-emerald-600' 
                              : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                          }`}
                          title="Copy Password"
                        >
                          {copiedId === item.id ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-lg text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">{item.name}</h4>
                      <p className="text-xs font-medium text-muted-foreground">{item.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.id}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border bg-secondary border-border/50 w-fit">
                      {item.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-secondary/50 p-1.5 rounded-xl border border-border/50">
                    <span className="font-mono px-2 text-foreground text-xs font-semibold">
                      {item.password}
                    </span>
                    <button
                      onClick={() => handleCopy(item.id, item.password)}
                      className={`p-1.5 rounded-lg transition-all ${
                        copiedId === item.id 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-white text-primary shadow-sm hover:bg-primary hover:text-white'
                      }`}
                      title="Copy Password"
                    >
                      {copiedId === item.id ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Delete Password Record</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you sure you want to delete this record? This action cannot be undone.
                </p>
              </div>
              <div className="p-4 bg-secondary/50 flex justify-end gap-3 border-t border-border/50">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 text-sm font-medium text-foreground bg-white border border-border/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-xl shadow-sm shadow-red-600/20 hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

