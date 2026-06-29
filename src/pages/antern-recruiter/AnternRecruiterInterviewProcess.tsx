import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Edit, X, Plus, Minus, Search, Trash2, CheckCircle2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_ROUNDS = [
  { label: "Technical Interview 1", value: "tech_1" },
  { label: "Technical Interview 2", value: "tech_2" },
  { label: "Managerial Interview", value: "managerial" },
  { label: "HR Round", value: "hr" },
];

const MOCK_SKILLS = [
  { label: "API GATEWAYS", value: "api_gateways" },
  { label: "AWS S3", value: "aws_s3" },
  { label: "SQS", value: "sqs" },
  { label: "React", value: "react" },
  { label: "Node.js", value: "node" },
];

const initialData = [
  { id: 1, step: "Technical Interview 1", round: "Round 1" },
  { id: 2, step: "Managerial Interview", round: "Round 2" },
];

export default function AnternRecruiterInterviewProcess() {
  const navigate = useNavigate();
  const [data] = useState(initialData);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  
  const [selectedRound, setSelectedRound] = useState("tech_1");
  const [skills, setSkills] = useState([
    { id: 1, skill: "api_gateways", needComments: true },
    { id: 2, skill: "aws_s3", needComments: true },
    { id: 3, skill: "sqs", needComments: true }
  ]);

  const handleAddSkill = () => {
    setSkills([...skills, { id: Date.now(), skill: "", needComments: false }]);
  };

  const handleRemoveSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <button onClick={() => navigate("/dashboard/antern-recruiter/post-job")} className="hover:text-primary transition-colors">Post Job</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Interview Process</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground">Interview Process</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl border border-border/50 bg-white text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors shadow-sm">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              setSelectedRound("");
              setSkills([]);
              setModalMode('add');
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add Interview Process
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white border border-border/50 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold">Interview Step</th>
                <th className="px-6 py-4 font-bold">Round</th>
                <th className="px-6 py-4 font-bold text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{item.step}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.round}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setModalMode('edit')}
                      className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors inline-flex"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {modalMode && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setModalMode(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-[101] border border-border/50 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                <h3 className="text-xl font-bold font-heading text-foreground">{modalMode === 'add' ? 'Add Interview Round' : 'Edit Interview Round'}</h3>
                <button 
                  onClick={() => setModalMode(null)}
                  className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 space-y-8 bg-secondary/5">
                <div className="relative">
                  <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Interview Round *</div>
                  <SearchableSelect 
                    options={MOCK_ROUNDS} 
                    value={selectedRound} 
                    onChange={setSelectedRound} 
                    placeholder="Interview Round *" 
                    className="w-full h-11 bg-white" 
                  />
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between pb-3 border-b border-border/50">
                    <h4 className="text-sm font-bold text-foreground">Secondary Skills Evaluated</h4>
                    <button 
                      onClick={handleAddSkill}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> ADD NEW SKILL
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {skills.map((skillItem, index) => (
                      <div key={skillItem.id} className="flex items-center gap-3 p-2.5 bg-white border border-border/50 rounded-xl shadow-sm relative group hover:border-primary/30 transition-colors">
                        <div className="relative flex-1">
                          <div className="absolute -top-2 left-2.5 bg-white px-1 text-[10px] font-bold text-muted-foreground z-10">Secondary Skill {index + 1} *</div>
                          <SearchableSelect 
                            options={MOCK_SKILLS} 
                            value={skillItem.skill} 
                            onChange={(val) => {
                              setSkills(skills.map(s => s.id === skillItem.id ? { ...s, skill: val } : s));
                            }} 
                            placeholder={`Select Skill...`} 
                            className="w-full h-10 bg-white" 
                          />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="flex items-center gap-2 cursor-pointer group/cb w-fit">
                            <div className="relative flex items-center justify-center">
                              <input 
                                type="checkbox" 
                                checked={skillItem.needComments} 
                                onChange={(e) => {
                                  setSkills(skills.map(s => s.id === skillItem.id ? { ...s, needComments: e.target.checked } : s));
                                }} 
                                className="peer sr-only" 
                              />
                              <div className="w-4 h-4 border-2 border-border rounded text-primary flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover/cb:border-primary/50">
                                {skillItem.needComments && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                            <span className="text-xs font-medium text-muted-foreground group-hover/cb:text-foreground transition-colors mr-2">Need Comments</span>
                          </label>
                        </div>
                        <div className="shrink-0 flex items-center justify-center border-l border-border/50 pl-3 py-0.5">
                          <button 
                            onClick={() => handleRemoveSkill(skillItem.id)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
                            title="Remove Skill"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {skills.length === 0 && (
                      <div className="text-center p-8 border border-dashed border-border/80 rounded-xl bg-white text-muted-foreground text-sm">
                        No secondary skills added yet. Click "Add New Skill" to evaluate specific skills in this round.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border/50 flex justify-end gap-3 bg-white shrink-0 rounded-b-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <button 
                  onClick={() => setModalMode(null)}
                  className="px-6 py-2 rounded-xl text-sm font-bold bg-white text-muted-foreground border border-border/50 hover:bg-secondary hover:text-foreground transition-colors"
                >
                  CLOSE
                </button>
                <button 
                  onClick={() => setModalMode(null)}
                  className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                >
                  SAVE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

