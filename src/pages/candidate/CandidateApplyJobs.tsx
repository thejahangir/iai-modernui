import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Building2, 
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const availableJobs = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India (Hybrid)',
    experience: '5-8 Years',
    salary: '25L - 35L PA',
    type: 'Full-time',
    posted: '2 days ago',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'InnovateX',
    location: 'Remote',
    experience: '3-5 Years',
    salary: '18L - 25L PA',
    type: 'Full-time',
    posted: '5 days ago',
    skills: ['Node.js', 'React.js', 'MongoDB']
  },
  {
    id: '3',
    title: 'UI/UX Engineer',
    company: 'DesignWorks',
    location: 'Mumbai, India',
    experience: '4-7 Years',
    salary: '20L - 30L PA',
    type: 'Full-time',
    posted: '1 week ago',
    skills: ['Figma', 'React.js', 'Framer Motion']
  }
];

const appliedJobs = [
  {
    id: '101',
    title: 'Lead Software Engineer',
    company: 'Global Systems Inc.',
    location: 'Bangalore, India',
    appliedDate: 'Oct 15, 2023',
    status: 'Interview Scheduled',
    statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200',
    salary: '35L - 45L PA',
    experience: '8-10 Years',
    jobType: 'Full-time',
    skills: ['React.js', 'System Design', 'Node.js'],
    nextSteps: 'Check your email for the Google Meet link. Prepare for a 60-minute technical discussion.'
  },
  {
    id: '102',
    title: 'Frontend Developer',
    company: 'StartupGen',
    location: 'Remote',
    appliedDate: 'Oct 10, 2023',
    status: 'In Review',
    statusColor: 'text-amber-700 bg-amber-100 border-amber-200',
    salary: '18L - 24L PA',
    experience: '3-5 Years',
    jobType: 'Contract',
    skills: ['Vue.js', 'Tailwind CSS', 'TypeScript'],
    nextSteps: 'Your application is currently being reviewed by the hiring manager. We will update you shortly.'
  },
  {
    id: '103',
    title: 'React Native Developer',
    company: 'MobileApp Studios',
    location: 'Pune, India',
    appliedDate: 'Sep 28, 2023',
    status: 'Not Selected',
    statusColor: 'text-slate-700 bg-slate-100 border-slate-200',
    salary: '22L - 28L PA',
    experience: '4-6 Years',
    jobType: 'Full-time',
    skills: ['React Native', 'Redux', 'iOS/Android'],
    nextSteps: 'We have decided to move forward with other candidates at this time. Thank you for your interest.'
  }
];

export default function CandidateApplyJobs() {
  const [activeTab, setActiveTab] = useState<'available' | 'applied'>('available');
  const [searchQuery, setSearchQuery] = useState('');

  // UX States
  const [selectedJobDetails, setSelectedJobDetails] = useState<any>(null);
  const [newlyAppliedJobIds, setNewlyAppliedJobIds] = useState<string[]>([]);
  const [confirmApplyJobId, setConfirmApplyJobId] = useState<string | null>(null);
  const [confirmWithdrawJobId, setConfirmWithdrawJobId] = useState<string | null>(null);

  const handleApplyClick = (jobId: string) => {
    if (newlyAppliedJobIds.includes(jobId)) {
      setConfirmWithdrawJobId(jobId);
    } else {
      setConfirmApplyJobId(jobId);
    }
  };

  const confirmApply = () => {
    if (confirmApplyJobId) {
      setNewlyAppliedJobIds(prev => [...prev, confirmApplyJobId]);
      setConfirmApplyJobId(null);
    }
  };

  const confirmWithdraw = () => {
    if (confirmWithdrawJobId) {
      setNewlyAppliedJobIds(prev => prev.filter(id => id !== confirmWithdrawJobId));
      setConfirmWithdrawJobId(null);
    }
  };

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-slate-800">Job Board</h1>
          <p className="text-slate-500 mt-1">Discover new opportunities or track your applications.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl border border-slate-200/60 self-start">
          <button
            onClick={() => setActiveTab('available')}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'available' 
                ? "bg-white text-[#0085F7] shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            New Jobs
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'applied' 
                ? "bg-white text-[#0085F7] shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Applied Jobs
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'available' ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by job title, skill, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all shadow-sm"
              />
            </div>
            <button className="shrink-0 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Job List */}
          <div className="grid grid-cols-1 gap-4">
            {availableJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-all group">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  
                  {/* Job Details */}
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#0085F7] transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-slate-600">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <IndianRupee className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 font-medium text-xs">
                        {job.type}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {job.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Job Actions */}
                  <div className="flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 shrink-0 min-w-[160px]">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-4 lg:mb-0">
                      <Clock className="w-3.5 h-3.5" />
                      Posted {job.posted}
                    </div>
                    <button 
                      onClick={() => handleApplyClick(job.id)}
                      className={cn(
                        "w-full lg:w-auto px-8 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm",
                        newlyAppliedJobIds.includes(job.id)
                          ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-100"
                          : "bg-[#0085F7] hover:bg-[#0085F7]/90 text-white shadow-[#0085F7]/20"
                      )}
                    >
                      {newlyAppliedJobIds.includes(job.id) ? "Withdraw Application" : "Apply Now"}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-all flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", job.statusColor)}>
                    {job.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{job.title}</h3>
                <p className="text-slate-600 font-medium text-sm mt-1 mb-4">{job.company}</p>
                
                <div className="space-y-2 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Applied on {job.appliedDate}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedJobDetails(job)}
                  className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-sm font-bold transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* UX Modals */}
      
      {/* Apply Confirmation Modal */}
      {confirmApplyJobId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 text-[#0085F7] rounded-full flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Confirm Application</h3>
            </div>
            <p className="text-sm text-slate-600 mb-8">
              Are you sure you want to submit your profile for this position? The recruiter will be notified immediately.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmApplyJobId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmApply}
                className="flex-1 py-2.5 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl font-bold transition-all shadow-sm shadow-[#0085F7]/20"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Confirmation Modal */}
      {confirmWithdrawJobId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Withdraw Application</h3>
            </div>
            <p className="text-sm text-slate-600 mb-8">
              Are you sure you want to withdraw your application? You can re-apply later if the position remains open.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmWithdrawJobId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmWithdraw}
                className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold transition-all shadow-sm border border-red-100"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedJobDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 leading-tight">{selectedJobDetails.title}</h3>
                <p className="text-slate-500 font-medium mt-1">{selectedJobDetails.company}</p>
              </div>
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap shrink-0", selectedJobDetails.statusColor)}>
                {selectedJobDetails.status}
              </span>
            </div>
            
            <div className="space-y-4 mb-6">
              
              {/* Application Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="space-y-1 text-sm">
                  <span className="text-slate-500 font-medium">Applied On</span>
                  <p className="font-bold text-slate-700">{selectedJobDetails.appliedDate}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <span className="text-slate-500 font-medium">Location</span>
                  <p className="font-bold text-slate-700">{selectedJobDetails.location}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <span className="text-slate-500 font-medium">Experience</span>
                  <p className="font-bold text-slate-700">{selectedJobDetails.experience}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <span className="text-slate-500 font-medium">Job Type</span>
                  <p className="font-bold text-slate-700">{selectedJobDetails.jobType}</p>
                </div>
                <div className="space-y-1 text-sm col-span-2">
                  <span className="text-slate-500 font-medium">Salary / Pay</span>
                  <p className="font-bold text-slate-700">{selectedJobDetails.salary}</p>
                </div>
              </div>

              {/* Skills Area */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">Required Core Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJobDetails.skills?.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Next Steps Area */}
              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 mt-2">
                <h4 className="text-sm font-bold text-indigo-900 mb-1">Status Update</h4>
                <p className="text-sm text-indigo-700 leading-relaxed">{selectedJobDetails.nextSteps}</p>
              </div>

            </div>

            <button 
              onClick={() => setSelectedJobDetails(null)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
