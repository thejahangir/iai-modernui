import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Award, 
  Linkedin, 
  Github, 
  UploadCloud, 
  Download,
  ShieldAlert,
  Save,
  Check,
  FileText,
  Lightbulb
} from 'lucide-react';
import { SearchableSelect } from '../../components/SearchableSelect';
import { cn } from '@/lib/utils';

// Mock options for Selects
const cityOptions = [
  { value: 'bangalore', label: 'Bangalore, India' },
  { value: 'hyderabad', label: 'Hyderabad, India' },
  { value: 'pune', label: 'Pune, India' },
  { value: 'mumbai', label: 'Mumbai, India' },
  { value: 'delhi', label: 'Delhi NCR, India' },
];

const experienceOptions = [
  { value: '0-2', label: '0-2 Years' },
  { value: '3-5', label: '3-5 Years' },
  { value: '6-8', label: '6-8 Years' },
  { value: '9-12', label: '9-12 Years' },
  { value: '12+', label: '12+ Years' },
];

const designationOptions = [
  { value: 'se', label: 'Software Engineer' },
  { value: 'sse', label: 'Senior Software Engineer' },
  { value: 'lead', label: 'Tech Lead' },
  { value: 'manager', label: 'Engineering Manager' },
  { value: 'architect', label: 'Solutions Architect' },
];

const noticePeriodOptions = [
  { value: 'immediate', label: 'Immediate Joiner' },
  { value: '15', label: '15 Days' },
  { value: '30', label: '30 Days' },
  { value: '60', label: '60 Days' },
  { value: '90', label: '90 Days' },
];

const primarySkillOptions = [
  { value: 'react', label: 'React.js' },
  { value: 'node', label: 'Node.js' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'aws', label: 'AWS' },
];

export default function CandidateProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // State
  const [formData, setFormData] = useState({
    city: 'bangalore',
    experience: '6-8',
    designation: 'sse',
    currentPay: '25,00,000 INR',
    noticePeriod: '30',
    city: 'bangalore',
    primarySkill: 'react',
    mobile: '+91 9876543210',
    email: 'rahul.sharma@example.com',
    linkedin: 'linkedin.com/in/rahulsharma',
    github: 'github.com/rahulcodes',
    isConfidential: false
  });
  const [resumeLastUpdated, setResumeLastUpdated] = useState('2 days ago');
  const [isSaving, setIsSaving] = useState(false);

  // Handlers
  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleConfidential = () => {
    setFormData(prev => ({ ...prev, isConfidential: !prev.isConfidential }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 800);
  };

  const handleDownloadResume = () => {
    const blob = new Blob(['Mock Resume Content'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Resume.pdf';
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-2">Manage your personal details, resume, and visibility settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: Basic Info */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
              <User className="w-5 h-5 text-[#0085F7]" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">LinkedIn Profile</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Linkedin className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">GitHub Portfolio</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Github className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Professional Details */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
              <Briefcase className="w-5 h-5 text-[#0085F7]" />
              Professional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Designation</label>
                <SearchableSelect
                  options={designationOptions}
                  value={formData.designation}
                  onChange={handleSelectChange('designation')}
                  placeholder="Select Designation"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Experience</label>
                <SearchableSelect
                  options={experienceOptions}
                  value={formData.experience}
                  onChange={handleSelectChange('experience')}
                  placeholder="Select Experience"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Primary Skill</label>
                <SearchableSelect
                  options={primarySkillOptions}
                  value={formData.primarySkill}
                  onChange={handleSelectChange('primarySkill')}
                  placeholder="Select Primary Skill"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Current City</label>
                <SearchableSelect
                  options={cityOptions}
                  value={formData.city}
                  onChange={handleSelectChange('city')}
                  placeholder="Search City..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Current Pay</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm font-medium">₹</span>
                  </div>
                  <input
                    type="text"
                    name="currentPay"
                    value={formData.currentPay}
                    onChange={handleInputChange}
                    placeholder="e.g. 15,00,000 INR"
                    className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Notice Period</label>
                <SearchableSelect
                  options={noticePeriodOptions}
                  value={formData.noticePeriod}
                  onChange={handleSelectChange('noticePeriod')}
                  placeholder="Select Notice Period"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Resume & Info */}
        <div className="space-y-8">
          
          {/* Profile Strength */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-800">Profile Strength</h3>
              <span className="text-emerald-500 font-bold text-lg">85%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Your profile is looking great! Add a few more details to reach 100% and stand out to top recruiters.
            </p>
          </div>

          {/* Privacy Settings */}
          <div className="bg-slate-800 rounded-3xl p-6 shadow-md relative overflow-hidden text-white border border-slate-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold">Privacy Settings</h3>
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                When enabled, your profile details will be hidden from public searches and recruiters. Only companies you apply to will see your information.
              </p>
              
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                <span className="font-semibold text-sm">Keep Profile Confidential</span>
                <button 
                  onClick={toggleConfidential}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none shrink-0",
                    formData.isConfidential ? "bg-amber-500" : "bg-slate-600"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
                    formData.isConfidential ? "left-[26px]" : "left-1"
                  )} />
                </button>
              </div>
            </div>
          </div>

          {/* Resume Block */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-blue-50 text-[#0085F7] rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">My Resume</h3>
                <p className="text-sm text-slate-500 mt-0.5">Updated: <span className="font-semibold text-slate-700">{resumeLastUpdated}</span></p>
              </div>
            </div>
            
            <div className="w-full flex gap-3">
              <button 
                onClick={handleUploadClick}
                className="flex-1 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-blue-100"
              >
                <UploadCloud className="w-4 h-4" />
                Upload
              </button>
              
              <button 
                onClick={handleDownloadResume}
                className="flex-1 py-3 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            <p className="text-xs text-slate-400 mt-5 text-center w-full">
              Supported formats: PDF, DOCX (Max 5MB)
            </p>
          </div>
          
        </div>
      </div>

      {/* Page-level Action */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl font-bold transition-all shadow-sm shadow-[#0085F7]/20 flex items-center gap-2"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
