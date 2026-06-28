import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trash2, 
  RotateCw, 
  Plus, 
  X, 
  Search,
  Users,
  LayoutGrid,
  List,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Edit
} from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_SKILLS = [
  { label: "React", value: "react" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "AWS", value: "aws" }
];

const MOCK_CITIES = [
  { label: "Bengaluru", value: "bengaluru" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Pune", value: "pune" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Delhi NCR", value: "delhi" }
];

const MOCK_EXPERIENCE = [
  { label: "0-2 Years", value: "0-2" },
  { label: "3-5 Years", value: "3-5" },
  { label: "5-8 Years", value: "5-8" },
  { label: "8-12 Years", value: "8-12" },
  { label: "12+ Years", value: "12+" }
];

const initialData = [
  { id: "1", name: "Rohan Gupta", email: "rohan@example.com", mobile: "+91 9876543210", primarySkill: "React" },
  { id: "2", name: "Priya Desai", email: "priya@example.com", mobile: "+91 9876543211", primarySkill: "Node.js" },
  { id: "3", name: "Sameer Verma", email: "sameer@example.com", mobile: "+91 9876543212", primarySkill: "AWS" },
  { id: "4", name: "Neha Sharma", email: "neha@example.com", mobile: "+91 9876543213", primarySkill: "Python" },
  { id: "5", name: "Vikram Singh", email: "vikram@example.com", mobile: "+91 9876543214", primarySkill: "Java" },
  { id: "6", name: "Anjali Patel", email: "anjali@example.com", mobile: "+91 9876543215", primarySkill: "React" },
  { id: "7", name: "Rahul Kumar", email: "rahul@example.com", mobile: "+91 9876543216", primarySkill: "Node.js" },
  { id: "8", name: "Kavita Reddy", email: "kavita@example.com", mobile: "+91 9876543217", primarySkill: "AWS" },
  { id: "9", name: "Suresh Menon", email: "suresh@example.com", mobile: "+91 9876543218", primarySkill: "Python" },
  { id: "10", name: "Meera Joshi", email: "meera@example.com", mobile: "+91 9876543219", primarySkill: "Java" },
  { id: "11", name: "Karan Johar", email: "karan@example.com", mobile: "+91 9876543220", primarySkill: "React" },
  { id: "12", name: "Sneha Kapoor", email: "sneha@example.com", mobile: "+91 9876543221", primarySkill: "Node.js" },
  { id: "13", name: "Amitabh Bachchan", email: "amitabh@example.com", mobile: "+91 9876543222", primarySkill: "AWS" },
  { id: "14", name: "Rekha Ganesan", email: "rekha@example.com", mobile: "+91 9876543223", primarySkill: "Python" },
  { id: "15", name: "Shahrukh Khan", email: "shahrukh@example.com", mobile: "+91 9876543224", primarySkill: "Java" },
  { id: "16", name: "Kajol Devgan", email: "kajol@example.com", mobile: "+91 9876543225", primarySkill: "React" }
];

export default function AnternRecruiterCompanyPanels() {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Copy state
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter state
  const [filterName, setFilterName] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  
  // Add form state
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addMobile, setAddMobile] = useState("");
  const [addSkill, setAddSkill] = useState("");
  const [addCity, setAddCity] = useState("");
  const [addExp, setAddExp] = useState("");

  const handleReload = () => {
    // Reset data to initial mock state for demo purposes
    setData([...initialData]);
    setFilteredData([...initialData]);
    setFilterName("");
    setFilterSkill("");
    setCurrentPage(1);
  };

  const handleSearch = () => {
    // Demo implementation for search
    let filtered = [...initialData];
    if (filterName) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(filterName.toLowerCase()));
    }
    if (filterSkill) {
      const skillLabel = MOCK_SKILLS.find(s => s.value === filterSkill)?.label;
      if (skillLabel) {
        filtered = filtered.filter(item => item.primarySkill === skillLabel);
      }
    }
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this panel?")) {
      const newData = data.filter(item => item.id !== id);
      setData(newData);
      // Re-apply filters
      let newFiltered = [...newData];
      if (filterName) {
        newFiltered = newFiltered.filter(item => item.name.toLowerCase().includes(filterName.toLowerCase()));
      }
      if (filterSkill) {
        const skillLabel = MOCK_SKILLS.find(s => s.value === filterSkill)?.label;
        if (skillLabel) {
          newFiltered = newFiltered.filter(item => item.primarySkill === skillLabel);
        }
      }
      setFilteredData(newFiltered);
    }
  };

  const handleCopyPhone = (id: string, phone: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedPhoneId(id);
      setTimeout(() => setCopiedPhoneId(null), 2000);
    }
  };

  const handleEditClick = (item: any) => {
    setEditingId(item.id);
    setAddName(item.name);
    setAddEmail(item.email);
    setAddMobile(item.mobile);
    
    // Find the value for the skill label to pre-select
    const skillObj = MOCK_SKILLS.find(s => s.label === item.primarySkill);
    setAddSkill(skillObj ? skillObj.value : "");
    
    setAddCity("");
    setAddExp("");
    
    setShowAddModal(true);
  };

  const handleSavePanel = () => {
    if (!addName || !addEmail || !addMobile) {
      alert("Please fill in the required fields (Name, Email, Mobile)");
      return;
    }
    
    let newData;
    if (editingId) {
      newData = data.map(item => {
        if (item.id === editingId) {
          return {
            ...item,
            name: addName,
            email: addEmail,
            mobile: addMobile,
            primarySkill: MOCK_SKILLS.find(s => s.value === addSkill)?.label || "N/A"
          };
        }
        return item;
      });
    } else {
      const newPanel = {
        id: Date.now().toString(),
        name: addName,
        email: addEmail,
        mobile: addMobile,
        primarySkill: MOCK_SKILLS.find(s => s.value === addSkill)?.label || "N/A"
      };
      newData = [...data, newPanel];
    }

    setData(newData);
    
    // Automatically reset filters when saving an item to see it
    setFilteredData(newData);
    setFilterName("");
    setFilterSkill("");
    setCurrentPage(1);
    
    setShowAddModal(false);
    
    // Reset form
    setEditingId(null);
    setAddName("");
    setAddEmail("");
    setAddMobile("");
    setAddSkill("");
    setAddCity("");
    setAddExp("");
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 relative">
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Company Panels</h2>
        <p className="text-muted-foreground mt-1">Manage external or internal interview panels.</p>
      </div>

      {/* Toolbar (Panel above the grid) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-border/50 relative z-10"
      >
        {/* Left Side: Filters */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full xl:w-auto">
          <div className="relative w-full md:w-[220px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Name" 
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="pl-9 pr-4 h-[42px] w-full border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium bg-secondary/20 placeholder:font-normal"
            />
          </div>
          
          <SearchableSelect 
            options={MOCK_SKILLS} 
            value={filterSkill} 
            onChange={setFilterSkill} 
            placeholder="Primary Skill" 
            className="w-full md:w-[220px] h-[42px]" 
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
              setAddEmail("");
              setAddMobile("");
              setAddSkill("");
              setAddCity("");
              setAddExp("");
              setShowAddModal(true);
            }}
            className="flex items-center justify-center gap-2 h-[42px] px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Panel
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
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold mt-1">
                      {item.primarySkill}
                    </span>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <button 
                    onClick={() => handleEditClick(item)}
                    className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                    title="Edit Panel"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete Panel"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-4 flex-1">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 rounded-lg bg-secondary/50 text-muted-foreground shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-foreground font-medium truncate">{item.email}</span>
                </div>
                <div 
                  className="flex items-center gap-3 text-sm group/phone cursor-pointer"
                  onClick={() => handleCopyPhone(item.id, item.mobile)}
                >
                  <div className="p-2 rounded-lg bg-secondary/50 text-muted-foreground shrink-0 group-hover/phone:bg-primary/10 group-hover/phone:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium truncate group-hover/phone:text-primary transition-colors">{item.mobile}</span>
                    <button 
                      className="p-1.5 rounded-lg text-muted-foreground opacity-0 group-hover/phone:opacity-100 hover:bg-secondary hover:text-foreground transition-all focus:opacity-100"
                      title="Copy Mobile Number"
                      onClick={(e) => { e.stopPropagation(); handleCopyPhone(item.id, item.mobile); }}
                    >
                      {copiedPhoneId === item.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {paginatedData.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-muted-foreground bg-white rounded-2xl border border-border/50">
              <div className="p-4 bg-secondary rounded-full mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-bold text-foreground text-lg">No company panels found</p>
              <p className="text-sm mt-1 max-w-[300px] text-center">Click the "Add Panel" button to create one, or adjust your search filters.</p>
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
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Email</th>
                <th className="px-6 py-4 font-bold">Mobile No</th>
                <th className="px-6 py-4 font-bold">Primary Skills</th>
                <th className="px-6 py-4 font-bold text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.email}</td>
                  <td className="px-6 py-4 text-muted-foreground group/phone whitespace-nowrap cursor-pointer" onClick={() => handleCopyPhone(item.id, item.mobile)}>
                    <div className="flex items-center gap-2">
                      <span className="group-hover/phone:text-primary transition-colors">{item.mobile}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleCopyPhone(item.id, item.mobile); }}
                        className="p-1.5 rounded-lg text-muted-foreground opacity-0 group-hover/phone:opacity-100 hover:bg-secondary hover:text-foreground transition-all focus:opacity-100"
                        title="Copy Mobile Number"
                      >
                        {copiedPhoneId === item.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{item.primarySkill}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                        title="Edit Panel"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete Panel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 bg-secondary rounded-full mb-3">
                        <Users className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="font-bold text-foreground">No company panels found</p>
                      <p className="text-sm mt-1">Click the "Add Panel" button to create one.</p>
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

      {/* Add Panel Modal */}
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">{editingId ? "Edit Panel" : "Add New Panel"}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{editingId ? "Update the details for this company panel" : "Fill in the details to add a new company panel"}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Name *</div>
                    <input 
                      type="text" 
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      placeholder="Enter full name" 
                      className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" 
                    />
                  </div>

                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Email ID *</div>
                    <input 
                      type="email" 
                      value={addEmail}
                      onChange={(e) => setAddEmail(e.target.value)}
                      placeholder="Enter email address" 
                      className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" 
                    />
                  </div>

                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Mobile No *</div>
                    <input 
                      type="text" 
                      value={addMobile}
                      onChange={(e) => setAddMobile(e.target.value)}
                      placeholder="Enter mobile number" 
                      className="w-full px-4 h-11 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:font-normal bg-white" 
                    />
                  </div>

                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Primary Skill *</div>
                    <SearchableSelect 
                      options={MOCK_SKILLS} 
                      value={addSkill} 
                      onChange={setAddSkill} 
                      placeholder="Search primary skill..." 
                      className="w-full h-11" 
                    />
                  </div>

                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">City</div>
                    <SearchableSelect 
                      options={MOCK_CITIES} 
                      value={addCity} 
                      onChange={setAddCity} 
                      placeholder="Search city..." 
                      className="w-full h-11" 
                    />
                  </div>

                  <div className="relative mt-2">
                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Experience</div>
                    <SearchableSelect 
                      options={MOCK_EXPERIENCE} 
                      value={addExp} 
                      onChange={setAddExp} 
                      placeholder="Search experience..." 
                      className="w-full h-11" 
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
                  onClick={handleSavePanel}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 active:scale-95"
                >
                  {editingId ? "Update Panel" : "Save Panel"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

