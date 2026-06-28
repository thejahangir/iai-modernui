import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Send,
  Info,
  HelpCircle
} from 'lucide-react';
import { SearchableSelect } from '../../components/SearchableSelect';
import { cn } from '@/lib/utils';

// Mock Options
const timeSlotOptions = [
  { value: '10:00 AM - 11:00 AM', label: '10:00 AM - 11:00 AM' },
  { value: '11:30 AM - 12:30 PM', label: '11:30 AM - 12:30 PM' },
  { value: '02:00 PM - 03:00 PM', label: '02:00 PM - 03:00 PM' },
  { value: '04:00 PM - 05:00 PM', label: '04:00 PM - 05:00 PM' },
];

const skillOptions = [
  { value: 'react', label: 'React.js' },
  { value: 'node', label: 'Node.js' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'aws', label: 'AWS' },
  { value: 'docker', label: 'Docker' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'sql', label: 'SQL / Databases' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'system-design', label: 'System Design' },
];

export default function CandidateScheduleInterview() {
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    primarySkill: '',
    secondarySkills: ['', '', '', '', ''],
    agreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecondarySkillChange = (index: number) => (value: string) => {
    setFormData(prev => {
      const newSkills = [...prev.secondarySkills];
      newSkills[index] = value;
      return { ...prev, secondarySkills: newSkills };
    });
  };

  const isFormValid = () => {
    const hasMandatorySecondary = formData.secondarySkills.slice(0, 3).every(skill => skill !== '');
    return (
      formData.date !== '' &&
      formData.timeSlot !== '' &&
      formData.primarySkill !== '' &&
      hasMandatorySecondary &&
      formData.agreed
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold font-heading text-slate-800 mb-2">Interview Scheduled!</h2>
        <p className="text-slate-500 max-w-md text-center mb-8">
          Your interview has been successfully scheduled. You will receive an email confirmation with the meeting link shortly.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFormData({
              date: '',
              timeSlot: '',
              primarySkill: '',
              secondarySkills: ['', '', '', '', ''],
              agreed: false
            });
          }}
          className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
        >
          Schedule Another
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-800">Schedule Interview</h1>
        <p className="text-slate-500 mt-1">Select your preferred time and list your core competencies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card 1: Timing & Availability */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 text-[#0085F7] rounded-xl flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Timing & Availability</h2>
              <p className="text-sm text-slate-500">When would you like to schedule your interview?</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Interview Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all text-slate-700 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Time Slot <span className="text-red-500">*</span>
              </label>
              <SearchableSelect
                options={timeSlotOptions}
                value={formData.timeSlot}
                onChange={handleSelectChange('timeSlot')}
                placeholder="Select Time Slot"
                icon={<Clock className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Skill Assessment */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Skill Assessment</h2>
              <p className="text-sm text-slate-500">Select the skills you want to be evaluated on.</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Primary Skill */}
            <div className="space-y-2 border-b border-slate-100 pb-8">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Primary Skill <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-500 ml-1 mb-2">This will be the main focus of your technical interview.</p>
              <div className="max-w-md">
                <SearchableSelect
                  options={skillOptions}
                  value={formData.primarySkill}
                  onChange={handleSelectChange('primarySkill')}
                  placeholder="Select Primary Skill"
                />
              </div>
            </div>

            {/* Secondary Skills */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 ml-1 block">
                Secondary Skills
              </label>
              <p className="text-xs text-slate-500 ml-1 mb-4">Please select up to 5 additional skills. The first 3 are mandatory.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3, 4].map((index) => {
                  const isMandatory = index < 3;
                  return (
                    <div key={index} className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 ml-1">
                        Skill {index + 1} {isMandatory && <span className="text-red-500">*</span>}
                        {!isMandatory && <span className="text-slate-400 font-normal ml-1">(Optional)</span>}
                      </label>
                      <SearchableSelect
                        options={skillOptions}
                        value={formData.secondarySkills[index]}
                        onChange={handleSecondarySkillChange(index)}
                        placeholder={`Select Skill ${index + 1}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        </div>

        {/* Right Column: Information Cards */}
        <div className="space-y-8">
          
          {/* What to Expect Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">What to Expect</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 mb-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <p>The interview will be conducted via video call and lasts approximately 60 minutes.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <p>You will be evaluated primarily on the <strong>Primary Skill</strong> you select.</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <p>Be prepared to discuss your experience related to your mandatory Secondary Skills.</p>
              </li>
            </ul>
          </div>

          {/* Need Help Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-slate-50 text-slate-500 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Need Assistance?</h3>
            <p className="text-sm text-slate-500 mt-1 mb-5">
              Having trouble finding a suitable time slot or have questions about the process?
            </p>
            <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-sm font-bold transition-colors">
              Contact Support
            </button>
          </div>

        </div>
      </div>

      {/* Action Area (Full Width / Bottom) */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={formData.agreed}
                onChange={(e) => setFormData(prev => ({ ...prev, agreed: e.target.checked }))}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-slate-300 rounded-[6px] peer-checked:bg-[#0085F7] peer-checked:border-[#0085F7] transition-all group-hover:border-[#0085F7]" />
              <CheckCircle2 className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-800">I Agree to the Terms & Conditions <span className="text-red-500">*</span></p>
              <p className="text-slate-500 mt-0.5 max-w-md">By scheduling, you agree to our interview policy and confirm your availability for the selected time slot.</p>
            </div>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className={cn(
              "shrink-0 px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2",
              isFormValid() 
                ? "bg-[#0085F7] hover:bg-[#0085F7]/90 text-white shadow-[#0085F7]/20" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Schedule Interview
              </>
            )}
          </button>
        </div>

    </div>
  );
}
