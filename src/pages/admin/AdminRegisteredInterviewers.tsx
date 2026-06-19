import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Trash2, Users, AlertTriangle } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

// Mock data to load when searched
const mockData = [
  {
    id: "INT-1001",
    name: "Alice Smith",
    primarySkill: "React",
    experience: "5 Years",
    verified: "Yes",
    location: "New York, NY",
  },
  {
    id: "INT-1002",
    name: "Bob Johnson",
    primarySkill: "React",
    experience: "3 Years",
    verified: "No",
    location: "Austin, TX",
  },
  {
    id: "INT-1003",
    name: "Charlie Davis",
    primarySkill: "Python",
    experience: "7 Years",
    verified: "Yes",
    location: "San Francisco, CA",
  },
];

const SKILLS = ["React", "Python", "Node.js", "Java", "DevOps"];

export default function AdminRegisteredInterviewers() {
  const [data, setData] = useState<any[]>([]); // Initially empty
  const [hasSearched, setHasSearched] = useState(false);
  const [primarySkill, setPrimarySkill] = useState("");
  
  // Modals state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState<any>(null);

  const handleSearch = () => {
    if (!primarySkill) {
      setShowAlertModal(true);
      return;
    }
    setHasSearched(true);
    // Filter mock data based on the skill
    setData(mockData.filter(item => item.primarySkill === primarySkill));
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== selectedInterviewer.id));
    setShowDeleteModal(false);
    setSelectedInterviewer(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Registered Interviewers</h2>
          <p className="text-muted-foreground mt-1">View and manage interviewers registered on the platform.</p>
        </div>
      </div>

      {/* Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
        
        <div className="p-4 flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full max-w-md space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Primary Skill</label>
            <SearchableSelect
              options={SKILLS.map(skill => ({ label: skill, value: skill }))}
              value={primarySkill}
              onChange={(val) => setPrimarySkill(val)}
              placeholder="Select Primary Skill"
              className="w-full h-11"
            />
          </div>

          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-11 px-8 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </motion.div>

      {/* Data Grid / Empty State */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        {!hasSearched ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">Select Primary Skills to get the list of Registered Interviewer</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-widest">Unique ID</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Name</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Primary Skill</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Experience</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Verified</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Location</th>
                  <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4 font-bold text-foreground">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                          {item.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-medium">{item.primarySkill}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.experience}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                        item.verified === "Yes" 
                          ? "bg-green-500/10 text-green-600 border-green-500/20" 
                          : "bg-red-500/10 text-red-600 border-red-500/20"
                      }`}>
                        {item.verified}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{item.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedInterviewer(item);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Interviewer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                      No interviewers found for the selected skill.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedInterviewer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-border/50"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground">Remove Interviewer</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you sure you want to remove <span className="font-bold text-foreground">"{selectedInterviewer.name}"</span>? This action cannot be undone.
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
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-bold text-white bg-destructive hover:bg-destructive/90 rounded-xl shadow-sm transition-colors"
                >
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Alert Modal */}
      <AnimatePresence>
        {showAlertModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowAlertModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-border/50"
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground mb-2">Selection Required</h3>
                    <p className="text-muted-foreground text-sm">
                      Please select a Primary Skill before searching to view the registered interviewers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-center border-t border-border/50">
                <button 
                  onClick={() => setShowAlertModal(false)}
                  className="px-8 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm transition-colors active:scale-95 w-full"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
