import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  RotateCw, 
  Plus, 
  X, 
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Globe
} from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_DOMAIN_LIST = [
  { label: "Finance", value: "Finance" },
  { label: "Banking", value: "Banking" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Education", value: "Education" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Telecommunications", value: "Telecommunications" },
  { label: "Retail", value: "Retail" },
  { label: "Logistics", value: "Logistics" },
  { label: "Energy", value: "Energy" }
];

const initialData = [
  { id: "1", name: "Finance", description: "Financial services, investments, and accounting." },
  { id: "2", name: "Banking", description: "Core banking solutions and consumer banking products." },
  { id: "3", name: "Healthcare", description: "Medical technology, hospital management, and health tech." },
  { id: "4", name: "E-commerce", description: "Online retail, marketplaces, and digital storefronts." },
  { id: "5", name: "Education", description: "EdTech platforms, e-learning, and educational software." },
  { id: "6", name: "Manufacturing", description: "Industrial automation, supply chain, and production systems." },
  { id: "7", name: "Telecommunications", description: "Network infrastructure and communication services." },
  { id: "8", name: "Retail", description: "Brick-and-mortar retail tech and inventory management." },
  { id: "9", name: "Logistics", description: "Fleet management, shipping, and delivery optimization." },
  { id: "10", name: "Energy", description: "Renewable energy tech, smart grids, and utilities." }
];

export default function AnternRecruiterDomain() {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter state
  const [filterDomain, setFilterDomain] = useState("");
  
  // Add/Edit form state
  const [addName, setAddName] = useState("");
  const [addDescription, setAddDescription] = useState("");

  const handleReload = () => {
    setData([...initialData]);
    setFilteredData([...initialData]);
    setFilterDomain("");
    setCurrentPage(1);
  };

  const handleSearch = () => {
    let filtered = [...data]; // Fix: Filter from 'data', not 'initialData' to persist edits
    if (filterDomain) {
      filtered = filtered.filter(item => item.name === filterDomain);
    }
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this domain?")) {
      const newData = data.filter(item => item.id !== id);
      setData(newData);
      
      // Re-apply filters
      let newFiltered = [...newData];
      if (filterDomain) {
        newFiltered = newFiltered.filter(item => item.name === filterDomain);
      }
      setFilteredData(newFiltered);
    }
  };

  const handleEditClick = (item: any) => {
    setEditingId(item.id);
    setAddName(item.name);
    setAddDescription(item.description);
    setShowAddModal(true);
  };

  const handleSaveDomain = () => {
    if (!addName || !addDescription) {
      alert("Please fill in the required fields (Name, Description)");
      return;
    }
    
    let newData;
    if (editingId) {
      newData = data.map(item => {
        if (item.id === editingId) {
          return {
            ...item,
            name: addName,
            description: addDescription
          };
        }
        return item;
      });
    } else {
      const newDomain = {
        id: Date.now().toString(),
        name: addName,
        description: addDescription
      };
      newData = [...data, newDomain];
    }

    setData(newData);
    
    // Automatically reset filters when saving an item to see it
    setFilteredData(newData);
    setFilterDomain("");
    setCurrentPage(1);
    
    setShowAddModal(false);
    
    // Reset form
    setEditingId(null);
    setAddName("");
    setAddDescription("");
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Domains</h2>
        <p className="text-muted-foreground mt-1">Manage all available industry domains.</p>
      </div>

      {/* Toolbar (Panel above the grid) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-border/50 relative z-10"
      >
        {/* Left Side: Filters */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full xl:w-auto">
          <SearchableSelect 
            options={MOCK_DOMAIN_LIST} 
            value={filterDomain} 
            onChange={setFilterDomain} 
            placeholder="Search Domain..." 
            className="w-full md:w-[300px] h-[42px]" 
          />

          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-[42px] px-6 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all active:scale-95 w-full md:w-auto"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 shrink-0 w-full xl:w-auto justify-end border-t xl:border-t-0 xl:border-l border-border/50 pt-4 xl:pt-0 xl:pl-4">
          <div className="flex items-center bg-secondary/50 rounded-xl p-1 border border-border/50 shrink-0">
            <button 
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'cards' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              title="Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={handleReload}
            title="Reload Data"
            className="flex items-center justify-center h-[42px] w-[42px] bg-secondary text-secondary-foreground rounded-xl hover:bg-black/5 transition-all shrink-0"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setEditingId(null);
              setAddName("");
              setAddDescription("");
              setShowAddModal(true);
            }}
            className="flex items-center justify-center gap-2 h-[42px] px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Domain
          </button>
        </div>
      </motion.div>

      {/* Content Area */}
      {viewMode === 'cards' ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {paginatedData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group overflow-hidden flex flex-col">
              <div className="p-5 border-b border-border/50 flex items-start justify-between bg-secondary/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0 border border-primary/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <button 
                    onClick={() => handleEditClick(item)}
                    className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                    title="Edit Domain"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete Domain"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-4 flex-1 text-sm text-muted-foreground">
                <p className="line-clamp-4 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
          {paginatedData.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-muted-foreground bg-white rounded-2xl border border-border/50">
              <div className="p-4 bg-secondary rounded-full mb-4">
                <Globe className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-bold text-foreground text-lg">No domains found</p>
              <p className="text-sm mt-1 max-w-[300px] text-center">Click the "Add Domain" button to create one, or adjust your search filters.</p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold">Domain Name</th>
                <th className="px-6 py-4 font-bold">Description</th>
                <th className="px-6 py-4 font-bold text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground min-w-[300px] whitespace-normal">{item.description}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                        title="Edit Domain"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete Domain"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 bg-secondary rounded-full mb-3">
                        <Globe className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="font-bold text-foreground">No domains found</p>
                      <p className="text-sm mt-1">Click the "Add Domain" button to create one.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && filteredData.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-border/50 shadow-sm mt-4"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-foreground">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
                <span className="font-bold text-foreground">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border/50 hover:bg-secondary/50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
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
                            : 'text-foreground hover:bg-secondary/50'
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
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border/50 hover:bg-secondary/50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
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
              className="relative inline-flex items-center rounded-xl border border-border/50 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl border border-border/50 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">{editingId ? "Edit Domain" : "Add New Domain"}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{editingId ? "Update the details for this domain" : "Fill in the details to add a new domain"}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="space-y-6">
                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Domain Name *</div>
                    <input 
                      type="text" 
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      placeholder="Enter domain name" 
                      className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" 
                    />
                  </div>

                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Description *</div>
                    <textarea 
                      value={addDescription}
                      onChange={(e) => setAddDescription(e.target.value)}
                      placeholder="Enter description..." 
                      rows={4}
                      className="w-full p-4 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white resize-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-white shrink-0 rounded-b-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveDomain}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 active:scale-95"
                >
                  {editingId ? "Update Domain" : "Save Domain"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

