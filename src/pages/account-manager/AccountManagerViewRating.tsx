import { motion } from "motion/react";
import { User, Star, Briefcase, Mail, Phone, Calendar, ArrowLeft, Building, MessageSquare, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const candidateData = {
  name: "Alexander Hamilton",
  role: "Senior Full Stack Engineer",
  jobCode: "REQ-001",
  company: "TCS",
  email: "a.hamilton@example.com",
  phone: "+1 (555) 012-3456",
  date: "14 Nov 2026",
  overallRating: 4.6,
  status: "Recommended",
  technicalSkills: [
    { name: "React / Next.js", score: 90 },
    { name: "Node.js / Express", score: 85 },
    { name: "System Architecture", score: 80 },
    { name: "Database Design (SQL/NoSQL)", score: 95 },
  ],
  softSkills: [
    { name: "Communication", score: 100 },
    { name: "Problem Solving", score: 90 },
    { name: "Leadership", score: 85 },
    { name: "Team Collaboration", score: 95 },
  ],
  feedback: "Alexander showed exceptional knowledge in frontend state management and backend database optimization. He communicated his thought process very clearly during the system design round. Highly recommended for the Senior role."
};

export default function AccountManagerViewRating() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-8 pb-10 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Candidate Rating</h1>
          <p className="text-slate-500 mt-1">Detailed performance review and interviewer feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
          >
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{candidateData.name}</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">{candidateData.role}</p>
              
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl">
                <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                <span className="font-bold">{candidateData.overallRating} Overall Score</span>
              </div>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-600">{candidateData.jobCode}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-600">{candidateData.company}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-600">{candidateData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-600">{candidateData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-600">Interviewed on {candidateData.date}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <div className="w-full text-center py-2.5 bg-slate-50 text-slate-600 font-bold text-sm rounded-xl border border-slate-200">
                Status: {candidateData.status}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Skills and Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-blue-500" /> Technical Skills
            </h3>
            <div className="space-y-5">
              {candidateData.technicalSkills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-slate-700">{skill.name}</span>
                    <span className="text-xs font-bold text-slate-500">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-purple-500" /> Soft Skills
            </h3>
            <div className="space-y-5">
              {candidateData.softSkills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-slate-700">{skill.name}</span>
                    <span className="text-xs font-bold text-slate-500">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div 
                      className="bg-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <MessageSquare className="w-32 h-32 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4 relative z-10">
              <MessageSquare className="w-5 h-5 text-emerald-400" /> Interviewer Feedback
            </h3>
            <p className="text-slate-300 leading-relaxed font-medium relative z-10">
              "{candidateData.feedback}"
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
