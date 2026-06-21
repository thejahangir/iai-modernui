import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, Copy, CheckCircle2, Eye, UserMinus, AlertTriangle, X, Star } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_COMPANIES = [
  { label: "Wipro", value: "wipro" },
  { label: "TCS", value: "tcs" },
  { label: "Infosys", value: "infosys" },
  { label: "Tech Mahindra", value: "techmahindra" }
];

const MOCK_SKILLS = [
  { label: "React.js", value: "react" },
  { label: "Node.js", value: "node" },
  { label: "Java Spring Boot", value: "java" },
  { label: "Python Django", value: "python" },
];

const MOCK_DATA = [
  { id: "1", uniqueId: "UID-7842", name: "Rahul Sharma", email: "rahul.s@example.com", mobile: "+91 9876543210", skills: "React.js, TypeScript", jobCode: "FE-2024", interviewDate: "2026-06-18", rating: 4.5, company: "wipro" },
  { id: "2", uniqueId: "UID-9021", name: "Sneha Patel", email: "sneha.p@example.com", mobile: "+91 8765432109", skills: "Node.js, Express", jobCode: "BE-2024", interviewDate: "2026-06-19", rating: 4.0, company: "tcs" },
  { id: "3", uniqueId: "UID-3314", name: "Vikram Singh", email: "vikram.s@example.com", mobile: "+91 7654321098", skills: "Java Spring Boot", jobCode: "JD-101", interviewDate: "2026-06-20", rating: 3.5, company: "infosys" },
  { id: "4", uniqueId: "UID-5592", name: "Priya Desai", email: "priya.d@example.com", mobile: "+91 6543210987", skills: "Python Django", jobCode: "PY-505", interviewDate: "2026-06-21", rating: 4.8, company: "techmahindra" },
];

export default function AdminReleaseCandidates() {
  const [data, setData] = useState(MOCK_DATA);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Modals state
  const [viewCandidate, setViewCandidate] = useState<any>(null);
  const [releaseCandidate, setReleaseCandidate] = useState<any>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredData = data.filter(item => {
    const matchCompany = filterCompany ? item.company === filterCompany : true;
    const matchSkill = filterSkill 
      ? item.skills.toLowerCase().includes(MOCK_SKILLS.find(s => s.value === filterSkill)?.label.toLowerCase() || "")
      : true;
    return matchCompany && matchSkill;
  });

  const handleSearch = () => {
    // Search is automatically handled by the filter variable, this is just a visual CTA.
  };

  const handleReset = () => {
    setFilterCompany("");
    setFilterSkill("");
  };

  const confirmRelease = () => {
    if (releaseCandidate) {
      setData(prev => prev.filter(c => c.id !== releaseCandidate.id));
      setReleaseCandidate(null);
      if (viewCandidate?.id === releaseCandidate.id) {
        setViewCandidate(null);
      }
    }
  };

  return (
    <div className="space-y-8 relative pb-10">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Release Candidates</h2>
        <p className="text-muted-foreground mt-1">Manage and release candidates back to the available pool.</p>
      </div>

      {/* Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10"
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <SearchableSelect
            options={MOCK_COMPANIES}
            value={filterCompany}
            onChange={(val) => setFilterCompany(val)}
            placeholder="Company"
            className="w-full sm:w-[200px] h-[48px] rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
          />
          <SearchableSelect
            options={MOCK_SKILLS}
            value={filterSkill}
            onChange={(val) => setFilterSkill(val)}
            placeholder="Primary Skills"
            className="w-full sm:w-[200px] h-[48px] rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-5">
          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-[48px] px-6 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex-1 sm:flex-none"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center justify-center gap-2 h-[48px] px-5 bg-secondary text-muted-foreground hover:text-foreground text-sm font-bold rounded-2xl hover:bg-black/5 transition-all shrink-0 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </motion.div>

      {/* Grid View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 rounded-tl-3xl">Candidate Info</th>
                <th className="px-6 py-4 hidden md:table-cell">Contact</th>
                <th className="px-6 py-4 hidden lg:table-cell">Primary Skills</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-right rounded-tr-3xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              <AnimatePresence>
                {filteredData.map((item) => (
                  <motion.tr 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="hover:bg-primary/5 transition-colors group"
                  >
                    {/* Candidate Info */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-base">{item.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                            {item.uniqueId}
                          </span>
                          <button 
                            onClick={() => handleCopy(item.uniqueId, `id-${item.id}`)}
                            className={`p-1.5 rounded-lg transition-all ${
                              copiedId === `id-${item.id}`
                                ? 'bg-emerald-100 text-emerald-600' 
                                : 'bg-primary/10 text-primary hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100'
                            }`}
                            title="Copy ID"
                          >
                            {copiedId === `id-${item.id}` ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Contact (Hidden on mobile) */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">{item.email}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.mobile}</span>
                          <button 
                            onClick={() => handleCopy(item.mobile, `mobile-${item.id}`)}
                            className={`p-1.5 rounded-lg transition-all ${
                              copiedId === `mobile-${item.id}`
                                ? 'bg-emerald-100 text-emerald-600' 
                                : 'bg-primary/10 text-primary hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100'
                            }`}
                            title="Copy Mobile"
                          >
                            {copiedId === `mobile-${item.id}` ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Skills (Hidden on small screens) */}
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {item.skills.split(',').map((skill, i) => (
                          <span key={i} className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary text-foreground border border-border/50">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 w-fit px-2.5 py-1 rounded-lg border border-amber-200/50">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="font-bold">{item.rating}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setViewCandidate(item)}
                          className="p-2 text-foreground bg-secondary hover:bg-black/5 rounded-xl transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setReleaseCandidate(item)}
                          className="p-2 text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-xl transition-colors"
                          title="Release Candidate"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No candidates found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* View Modal */}
      <AnimatePresence>
        {viewCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setViewCandidate(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden border border-border/50"
            >
              <div className="px-6 py-5 border-b border-border/50 flex justify-between items-center bg-secondary/30">
                <h3 className="text-xl font-bold font-heading text-foreground">Candidate Details</h3>
                <button onClick={() => setViewCandidate(null)} className="p-2 rounded-xl hover:bg-white text-muted-foreground transition-colors shadow-sm border border-transparent hover:border-border/50">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-black text-primary border border-primary/20">
                    {viewCandidate.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground">{viewCandidate.name}</h4>
                    <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
                      ID: <span className="text-foreground">{viewCandidate.uniqueId}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Email ID</p>
                    <p className="text-sm font-medium text-foreground">{viewCandidate.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Mobile Number</p>
                    <p className="text-sm font-medium text-foreground">{viewCandidate.mobile}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Primary Skills</p>
                    <p className="text-sm font-medium text-foreground">{viewCandidate.skills}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Job Code</p>
                    <p className="text-sm font-medium text-foreground bg-secondary w-fit px-2 py-0.5 rounded-md">{viewCandidate.jobCode}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Interview Date</p>
                    <p className="text-sm font-medium text-foreground">{viewCandidate.interviewDate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Rating</p>
                    <div className="flex items-center gap-1 text-sm font-bold text-amber-600">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      {viewCandidate.rating} / 5
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 px-6 py-4 flex justify-end gap-3 border-t border-border/50">
                <button 
                  onClick={() => setViewCandidate(null)}
                  className="px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => setReleaseCandidate(viewCandidate)}
                  className="px-5 py-2.5 text-sm font-bold text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-xl transition-colors flex items-center gap-2"
                >
                  <UserMinus className="w-4 h-4" />
                  Release Candidate
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Release Confirmation Prompt */}
      <AnimatePresence>
        {releaseCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              onClick={() => setReleaseCandidate(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-3xl shadow-2xl z-[111] overflow-hidden border border-border/50"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4 border border-destructive/20">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-bold font-heading text-foreground mb-2">Confirm Release</h3>
                <p className="text-muted-foreground text-sm">
                  Are you sure you want to release <span className="font-bold text-foreground">{releaseCandidate.name}</span>? This action cannot be undone.
                </p>
              </div>
              <div className="bg-secondary/50 p-4 flex gap-3 border-t border-border/50">
                <button 
                  onClick={() => setReleaseCandidate(null)}
                  className="flex-1 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmRelease}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-destructive hover:bg-destructive/90 rounded-xl shadow-md transition-colors"
                >
                  Confirm Release
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
