import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, X, Lock, Unlock, FileEdit, ChevronDown, ChevronUp, Eye, CheckCircle2, Star } from "lucide-react";

const initialData = [
  { 
    id: "INT-1001", 
    date: "11-11-2025 - 21:30", 
    name: "Jahnavi Pudi", 
    email: "jahnavi.p@example.com",
    mobile: "9876543210",
    interviewer: "Alice Smith",
    primarySkill: "Python", 
    rating: "Pending",
    editMode: false,
    technicalSkills: [
      { id: "ts1", name: "Python", rating: "2", comment: "Not good in python programming could not solve the given problem" },
      { id: "ts2", name: "Cloud (AWS, Azure, GCP)", rating: "2", comment: "Not good with cloud concepts not suitable for the role." },
      { id: "ts3", name: "NO SQL / Object (Key /Value) RDBMS", rating: "2", comment: "Not good with RDMBS concepts not suitable for the role." },
      { id: "ts4", name: "Data Engineer on complex data sets", rating: "2", comment: "Not good with data engineering concepts not suitable for the role." },
      { id: "ts5", name: "ETL", rating: "2", comment: "" },
    ],
    overallComment: "Over all not suitable for this role, she could not solve the given python problem even she wrote a clean code but code was not working. Every question asked her she is taking lot of time to think and than answering correctly.",
    isGenuine: false,
    recommendNextRound: false,
    softSkills: [
      { id: "ss1", name: "Communication", rating: "3", comment: "Clear and articulate, but sometimes speaks too fast." },
      { id: "ss2", name: "Problem Solving", rating: "2", comment: "Struggles with ambiguous problems without clear instructions." },
      { id: "ss3", name: "Teamwork", rating: "4", comment: "Great team player, very collaborative and helpful." }
    ]
  },
  { 
    id: "INT-1002", 
    date: "12-11-2025 - 10:00", 
    name: "John Doe", 
    email: "john.doe@example.com",
    mobile: "+1 555-0202",
    interviewer: "Mike Davis",
    primarySkill: "Node.js", 
    rating: "4.5/5",
    editMode: true,
    technicalSkills: [],
    overallComment: "",
    isGenuine: true,
    recommendNextRound: true
  },
];

export default function AdminEditRating() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ candidateName: "", interviewId: "" });
  
  const [showModal, setShowModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [techExpanded, setTechExpanded] = useState(true);
  const [softExpanded, setSoftExpanded] = useState(false);

  const handleSearch = () => {
    console.log("Searching with:", filters);
  };

  const handleReset = () => {
    setFilters({ candidateName: "", interviewId: "" });
  };

  const toggleEditMode = (id: string) => {
    setData(data.map(item => item.id === id ? { ...item, editMode: !item.editMode } : item));
  };

  const openRatingModal = (item: any) => {
    setSelectedInterview(item);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Edit Rating</h2>
          <p className="text-muted-foreground mt-1">Manage and update candidate interview ratings.</p>
        </div>
      </div>

      {/* Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="p-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Candidate Name"
              value={filters.candidateName}
              onChange={(e) => setFilters({ ...filters, candidateName: e.target.value })}
              className="w-full h-9 px-3 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/40 text-foreground"
            />
            <input
              type="text"
              placeholder="Interview ID"
              value={filters.interviewId}
              onChange={(e) => setFilters({ ...filters, interviewId: e.target.value })}
              className="w-full h-9 px-3 bg-secondary/40 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/40 text-foreground"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={handleReset}
              className="flex items-center justify-center gap-2 h-9 px-4 bg-[#00A94B] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#00A94B]/90 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button 
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 h-9 px-5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </motion.div>

      {/* Data Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        {data.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-muted-foreground max-w-sm">No interviews found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold tracking-widest">Interview ID</th>
                <th className="px-6 py-4 font-bold tracking-widest">Date</th>
                <th className="px-6 py-4 font-bold tracking-widest">Name</th>
                <th className="px-6 py-4 font-bold tracking-widest">Email Id</th>
                <th className="px-6 py-4 font-bold tracking-widest">Mobile No</th>
                <th className="px-6 py-4 font-bold tracking-widest">Interviewer</th>
                <th className="px-6 py-4 font-bold tracking-widest">Primary Skill</th>
                <th className="px-6 py-4 font-bold tracking-widest">Rating</th>
                <th className="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">{item.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.mobile}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.interviewer}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.primarySkill}</td>
                  <td className="px-6 py-4 font-bold text-foreground">{item.rating}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openRatingModal(item)}
                        className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-colors"
                        title={item.editMode ? "Update Rating" : "View Rating"}
                      >
                        {item.editMode ? <FileEdit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => toggleEditMode(item.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.editMode 
                            ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white' 
                            : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                        }`}
                        title={item.editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
                      >
                        {item.editMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </motion.div>

      {/* Add Rating Modal */}
      <AnimatePresence>
        {showModal && selectedInterview && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl bg-white rounded-3xl shadow-2xl z-[101] flex flex-col max-h-[90vh] border border-border/50"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground tracking-tight">
                      {selectedInterview.editMode ? "Edit Rating" : "View Rating"}
                    </h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{selectedInterview.id} - {selectedInterview.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white">
                
                {/* Info Header - Card Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-2xl border border-border/50">
                  <div className="space-y-2">
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Primary Skill</p>
                      <p className="text-[13px] font-semibold text-foreground">{selectedInterview.primarySkill}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Candidate Email</p>
                      <p className="text-[13px] font-semibold text-foreground">{selectedInterview.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Interview Date & Time</p>
                      <p className="text-[13px] font-semibold text-foreground">{selectedInterview.date}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Mobile No</p>
                      <p className="text-[13px] font-semibold text-foreground">{selectedInterview.mobile}</p>
                    </div>
                  </div>
                </div>

                {/* References */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Rating Interpretation
                    </h3>
                    <ul className="text-[12px] text-muted-foreground space-y-1.5">
                      <li className="flex gap-2"><span className="font-bold text-foreground">1.</span> <span>Know the subject but no good knowledge, need to learn.</span></li>
                      <li className="flex gap-2"><span className="font-bold text-foreground">2.</span> <span>Know the subject, have knowledge but no good working exp.</span></li>
                      <li className="flex gap-2"><span className="font-bold text-foreground">3.</span> <span>Have the knowledge and can work independently.</span></li>
                      <li className="flex gap-2"><span className="font-bold text-foreground">4.</span> <span>Can work and Guide the team also to work.</span></li>
                      <li className="flex gap-2"><span className="font-bold text-foreground">5.</span> <span>Exceptionally talented in this and is an asset to the team and to organization.</span></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Key Responsibilities
                    </h3>
                    <div className="bg-secondary/30 rounded-xl p-4 border border-border/50 h-16 flex items-center justify-center text-muted-foreground text-[13px] italic">
                      No responsibilities documented for this role.
                    </div>
                  </div>
                </div>

                {/* Technical Rating Accordion */}
                <div className="border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setTechExpanded(!techExpanded)}
                    className="w-full flex items-center justify-between p-4 bg-secondary/20 hover:bg-secondary/40 transition-colors"
                  >
                    <h4 className="text-sm font-bold text-foreground tracking-widest uppercase">Technical Rating</h4>
                    {techExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <AnimatePresence>
                    {techExpanded && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-border/50 bg-white"
                      >
                        <div className="p-4 space-y-4">
                          {selectedInterview.technicalSkills?.map((skill: any, idx: number) => (
                            <div key={idx} className="grid grid-cols-12 gap-4 items-start">
                              <div className="col-span-3 text-[13px] font-bold text-foreground pt-2">{skill.name}</div>
                              <div className="col-span-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 block">Rating</label>
                                <div className="relative">
                                  <select 
                                    defaultValue={skill.rating}
                                    className="w-full h-9 px-3 bg-secondary/30 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                  <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-muted-foreground pointer-events-none" />
                                </div>
                              </div>
                              <div className="col-span-7">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 block">Comments</label>
                                <textarea 
                                  defaultValue={skill.comment}
                                  rows={1} 
                                  placeholder="Add comments on this skill..."
                                  className="w-full p-2.5 bg-secondary/30 border border-border/50 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Soft Skill Rating Accordion */}
                <div className="border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setSoftExpanded(!softExpanded)}
                    className="w-full flex items-center justify-between p-4 bg-secondary/20 hover:bg-secondary/40 transition-colors"
                  >
                    <h4 className="text-sm font-bold text-foreground tracking-widest uppercase">Soft Skill Rating</h4>
                    {softExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  <AnimatePresence>
                    {softExpanded && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-border/50 bg-white"
                      >
                        <div className="p-4 space-y-4">
                          {selectedInterview.softSkills?.map((skill: any, idx: number) => (
                            <div key={idx} className="grid grid-cols-12 gap-4 items-start">
                              <div className="col-span-3 text-[13px] font-bold text-foreground pt-2">{skill.name}</div>
                              <div className="col-span-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 block">Rating</label>
                                <div className="relative">
                                  <select 
                                    defaultValue={skill.rating}
                                    className="w-full h-9 px-3 bg-secondary/30 border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                  <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-muted-foreground pointer-events-none" />
                                </div>
                              </div>
                              <div className="col-span-7">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 block">Comments</label>
                                <textarea 
                                  defaultValue={skill.comment}
                                  rows={1} 
                                  placeholder="Add comments on this skill..."
                                  className="w-full p-2.5 bg-secondary/30 border border-border/50 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                                />
                              </div>
                            </div>
                          ))}
                          {(!selectedInterview.softSkills || selectedInterview.softSkills.length === 0) && (
                            <div className="p-4 text-center text-muted-foreground text-[13px] italic">
                              No soft skills evaluated for this role.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Global Comments */}
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Overall Comments</label>
                  <textarea 
                    defaultValue={selectedInterview.overallComment}
                    rows={2}
                    placeholder="Provide a final summary or overall feedback..."
                    className="w-full p-3 bg-secondary/30 border border-border/50 rounded-2xl text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/50"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        defaultChecked={selectedInterview.isGenuine}
                        className="peer sr-only" 
                      />
                      <div className="w-5 h-5 border-2 border-border/80 rounded flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary">
                        <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Is Genuine</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        defaultChecked={selectedInterview.recommendNextRound}
                        className="peer sr-only" 
                      />
                      <div className="w-5 h-5 border-2 border-border/80 rounded flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary">
                        <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Recommend For Next Round</span>
                  </label>
                </div>
              </div>
              
              {/* Footer Buttons */}
              <div className="px-6 py-4 flex justify-end gap-3 border-t border-border/50 shrink-0 bg-secondary/10 rounded-b-3xl">
                {selectedInterview.editMode ? (
                  <>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2 text-sm font-bold text-secondary-foreground bg-white border border-border/50 hover:bg-secondary rounded-xl shadow-sm transition-all active:scale-95"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setShowSuccessDialog(true)}
                      className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm shadow-primary/20 transition-all active:scale-95"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 text-sm font-bold text-secondary-foreground bg-white border border-border/50 hover:bg-secondary rounded-xl shadow-sm transition-all active:scale-95"
                  >
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccessDialog && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-border/50 p-8 z-[111] text-center"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-heading tracking-tight">Rating Saved!</h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                The candidate's rating has been successfully updated and saved to the system. Would you like to close this window and proceed?
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setShowSuccessDialog(false)}
                  className="px-5 py-2 text-sm font-bold text-secondary-foreground bg-secondary hover:bg-secondary/80 rounded-xl transition-all active:scale-95"
                >
                  Keep Editing
                </button>
                <button 
                  onClick={() => {
                    setShowSuccessDialog(false);
                    setShowModal(false);
                  }}
                  className="px-5 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm shadow-primary/20 transition-all active:scale-95"
                >
                  Close & Proceed
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
