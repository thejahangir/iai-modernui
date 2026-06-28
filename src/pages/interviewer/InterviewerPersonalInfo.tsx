import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  Briefcase, 
  Phone, 
  Home, 
  UploadCloud, 
  FileText, 
  X,
  CheckCircle2,
  Save,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchableSelect } from '../../components/SearchableSelect';

const CITY_OPTIONS = [
  { value: 'New York', label: 'New York, NY' },
  { value: 'San Francisco', label: 'San Francisco, CA' },
  { value: 'London', label: 'London, UK' },
  { value: 'Berlin', label: 'Berlin, DE' },
  { value: 'Tokyo', label: 'Tokyo, JP' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Sydney', label: 'Sydney, AU' },
  { value: 'Remote', label: 'Remote Worldwide' }
];

const EXPERIENCE_OPTIONS = [
  { value: '0-1 Years', label: '0-1 Years (Entry)' },
  { value: '1-3 Years', label: '1-3 Years (Junior)' },
  { value: '3-5 Years', label: '3-5 Years (Mid-Level)' },
  { value: '5-8 Years', label: '5-8 Years (Senior)' },
  { value: '8-12 Years', label: '8-12 Years (Lead)' },
  { value: '12+ Years', label: '12+ Years (Principal/Director)' }
];

export default function InterviewerPersonalInfo() {
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  
  // File Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Save State
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Personal Info</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Update your contact details and professional experience.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-border/50 overflow-hidden">
        
        {/* Form Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Top Grid: City, Experience, Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* City Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                City
              </label>
              <SearchableSelect
                options={CITY_OPTIONS}
                value={city}
                onChange={setCity}
                placeholder="Search and select city..."
                className="h-[46px]"
              />
            </div>

            {/* Experience Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                Total Experience
              </label>
              <SearchableSelect
                options={EXPERIENCE_OPTIONS}
                value={experience}
                onChange={setExperience}
                placeholder="Select total experience..."
                className="h-[46px]"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                Mobile Number
              </label>
              <input 
                type="tel" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91 8888 888888"
                className="w-full px-4 h-[46px] bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all shadow-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          <hr className="border-border/50" />

          {/* Bottom Grid: Address and Resume */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Address Textarea */}
            <div className="space-y-3 flex flex-col h-full">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 shrink-0">
                <Home className="w-4 h-4 text-slate-400" />
                Full Address
              </label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your complete residential address..."
                className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all shadow-sm placeholder:text-slate-400 resize-none flex-1 min-h-[180px]"
              />
            </div>

            {/* Resume Upload Dropzone */}
            <div className="space-y-3 flex flex-col h-full">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 shrink-0">
                <FileText className="w-4 h-4 text-slate-400" />
                Professional Resume
              </label>
              
              {/* Hidden Input */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden" 
              />

              {selectedFile ? (
                /* Selected File State */
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-2xl flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{selectedFile.name}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{formatFileSize(selectedFile.size)} • Uploaded</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 hidden sm:block" />
                    <button 
                      onClick={removeFile}
                      className="p-2 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl transition-colors shadow-sm border border-slate-200"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Dropzone State */
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 group text-center flex-1 min-h-[180px]",
                    isDragging 
                      ? "border-[#0085F7] bg-blue-50" 
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors",
                    isDragging ? "bg-blue-100 text-[#0085F7]" : "bg-white text-slate-400 group-hover:text-slate-500 shadow-sm border border-slate-100"
                  )}>
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700 mb-1">Click to upload or drag and drop</h4>
                  <p className="text-xs text-slate-400">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50/80 p-6 border-t border-border/50 flex justify-end gap-4">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors shadow-sm">
            Cancel
          </button>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm",
              isSaved 
                ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                : "bg-[#0085F7] text-white hover:bg-[#0085F7]/90 shadow-[#0085F7]/20 disabled:opacity-70"
            )}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSaved ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
