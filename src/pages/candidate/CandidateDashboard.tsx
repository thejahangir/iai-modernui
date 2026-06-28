import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Briefcase, 
  Star, 
  Download, 
  UploadCloud, 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle,
  Lightbulb,
  Award,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const candidateProfile = {
  name: 'Rahul Sharma',
  designation: 'Senior Frontend Engineer',
  primarySkill: 'React.js',
  location: 'Bangalore, India',
  experience: '6 Years',
  rating: 4.8,
  totalReviews: 12
};

const upcomingInterviews = [
  {
    id: 'INT-01',
    date: 'Today, 2:00 PM',
    skills: 'React, System Design',
    interviewer: 'Priya Patel',
    meetingLink: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 'INT-02',
    date: 'Tomorrow, 10:30 AM',
    skills: 'JavaScript, CSS Architecture',
    interviewer: 'Amit Kumar',
    meetingLink: 'https://zoom.us/j/1234567890'
  }
];

const completedInterviews = [
  {
    id: 'INT-00',
    date: 'Jun 24, 2026',
    time: '11:00 AM',
    skills: 'Frontend Basics',
    interviewer: 'Sneha Gupta',
    status: 'Passed'
  }
];

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeLastUpdated, setResumeLastUpdated] = useState('2 days ago');

  const handleDownloadResume = () => {
    // Mock download behavior
    const blob = new Blob(['Mock Resume Content'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Rahul_Sharma_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`Successfully uploaded: ${e.target.files[0].name}`);
      setResumeLastUpdated('Just now');
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-800">
          Welcome back, {candidateProfile.name.split(' ')[0]}!
        </h1>
        <p className="text-slate-500 mt-2">Here is an overview of your profile and interview schedules.</p>
      </div>

      {/* Top Grid: Profile & Rating */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* My Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-10" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="space-y-4 flex-1">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                My Profile
              </h2>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Name</p>
                  <p className="text-sm font-semibold text-slate-800">{candidateProfile.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Designation</p>
                  <p className="text-sm font-semibold text-slate-800">{candidateProfile.designation}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Primary Skill</p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold">
                    {candidateProfile.primarySkill}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {candidateProfile.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {candidateProfile.experience}
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Section */}
            <div className="w-full md:w-64 bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 border border-slate-200">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">My Resume</h3>
                <p className="text-xs text-slate-500 mt-1">Last updated {resumeLastUpdated}</p>
              </div>
              <div className="flex gap-2 w-full mt-2">
                <button 
                  onClick={handleDownloadResume}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-lg text-xs font-bold transition-colors"
                >
                  Download
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <button 
                  onClick={handleUploadClick}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Rating Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-50 to-transparent rounded-bl-full -z-10" />
           <Award className="w-8 h-8 text-amber-500 mb-4" />
           <h2 className="text-xl font-bold text-slate-800 mb-1">My Rating</h2>
           <p className="text-sm text-slate-500 mb-6">Based on {candidateProfile.totalReviews} past interviews</p>
           
           <div className="flex items-end gap-2 mb-3">
             <span className="text-5xl font-black text-slate-800 tracking-tighter">{candidateProfile.rating}</span>
             <span className="text-xl font-bold text-slate-400 mb-1">/ 5</span>
           </div>

           <div className="flex gap-1">
             {[1, 2, 3, 4, 5].map((star) => (
               <Star 
                 key={star} 
                 className={cn(
                   "w-6 h-6",
                   star <= Math.floor(candidateProfile.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"
                 )} 
               />
             ))}
           </div>
        </div>
      </div>

      {/* Bottom Grid: Schedules & Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Schedules */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Interviews */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0085F7]" />
                My Interview Schedule
              </h2>
            </div>
            
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{interview.date}</p>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">Interviewer: <span className="text-slate-700">{interview.interviewer}</span></p>
                      <div className="inline-flex items-center gap-1 mt-2">
                        <span className="px-2 py-0.5 bg-slate-200/50 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                          {interview.skills}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={interview.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-[#0085F7]/20 shrink-0"
                  >
                    <Video className="w-4 h-4" />
                    Join Meeting
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Interviews */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              My Completed Interviews
            </h2>
            
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
              {completedInterviews.map((interview) => (
                <div key={interview.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 border border-slate-200">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{interview.date} at {interview.time}</p>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">Interviewer: <span className="text-slate-700">{interview.interviewer}</span></p>
                      <div className="inline-flex items-center gap-1 mt-2">
                        <span className="px-2 py-0.5 bg-slate-200/50 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                          {interview.skills}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold border border-emerald-100 shrink-0">
                    <CheckCircle className="w-4 h-4" />
                    {interview.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Helpful Info */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Interview Tips</h3>
            </div>

            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-blue-600">#1 Master the STAR Method</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Structure your answers using Situation, Task, Action, and Result. This keeps you focused and ensures you provide a complete narrative.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-blue-600">#2 Test Your Setup</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Always test your microphone, camera, and internet connection 15 minutes before clicking "Join Meeting".
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-blue-600">#3 Ask Good Questions</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Prepare 2-3 thoughtful questions about the role or company culture to show genuine interest.
                </p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/dashboard/candidate/interview-tips')}
              className="mt-8 w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              View All Resources
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
