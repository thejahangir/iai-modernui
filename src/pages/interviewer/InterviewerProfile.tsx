import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RefreshCw, 
  LayoutGrid, 
  List, 
  Plus,
  Trash2,
  X,
  FileEdit,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Layers,
  CalendarClock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchableSelect } from '../../components/SearchableSelect';

// Types
interface Profile {
  id: string;
  profileName: string;
  primarySkill: string;
  secondarySkills: string[];
  interviewsCount: number;
}

const SKILL_OPTIONS = [
  { value: 'React.js', label: 'React.js' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Python', label: 'Python' },
  { value: 'Java / Spring', label: 'Java / Spring' },
  { value: 'C# .NET', label: 'C# .NET' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Docker', label: 'Docker' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'System Design', label: 'System Design' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Data Science', label: 'Data Science' }
];

// Generate Mock Data
const initialMockProfiles: Profile[] = Array.from({ length: 22 }, (_, i) => {
  const primary = SKILL_OPTIONS[i % SKILL_OPTIONS.length].label;
  
  // Vary the number of secondary skills between 2 and 5
  const numSecondary = 2 + (i % 4); 
  const secondarySkills = [];
  for(let j = 0; j < numSecondary; j++) {
    secondarySkills.push(SKILL_OPTIONS[(i + j + 1) % SKILL_OPTIONS.length].label);
  }
  
  const interviewsCount = i === 0 ? 0 : 12 + (i * 3);

  return {
    id: `PROF-${(i + 1).toString().padStart(3, '0')}`,
    profileName: `${primary} Specialist`,
    primarySkill: primary,
    secondarySkills,
    interviewsCount
  };
});

export default function InterviewerProfile() {
  const [profiles, setProfiles] = useState<Profile[]>(initialMockProfiles);
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReloading, setIsReloading] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formName, setFormName] = useState('');
  const [formPrimarySkill, setFormPrimarySkill] = useState('');
  const [formSecondarySkills, setFormSecondarySkills] = useState<string[]>(['', '', '', '', '', '']);

  // Filter Data
  const filteredProfiles = profiles.filter(profile => 
    profile.profileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / itemsPerPage));
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 800);
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this profile?")) {
      setProfiles(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProfile = () => {
    // Validate
    if(!formName || !formPrimarySkill) {
      alert("Profile Name and Primary Skill are required.");
      return;
    }
    const newProfile: Profile = {
      id: `PROF-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      profileName: formName,
      primarySkill: formPrimarySkill,
      secondarySkills: formSecondarySkills.filter(s => s !== ''),
      interviewsCount: 0
    };
    setProfiles([newProfile, ...profiles]);
    setIsModalOpen(false);
    
    // Reset form
    setFormName('');
    setFormPrimarySkill('');
    setFormSecondarySkills(['', '', '', '', '', '']);
  };

  const updateSecondarySkill = (index: number, value: string) => {
    const newSkills = [...formSecondarySkills];
    newSkills[index] = value;
    setFormSecondarySkills(newSkills);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header section with Title */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Interviewer Profiles</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your interview profiles and specialized skill sets.
        </p>
      </div>

      {/* Search & Action Panel */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border/50 flex flex-col xl:flex-row gap-4 items-end xl:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto flex-1">
          {/* Search */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by Profile Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all"
            />
          </div>
          
          <button className="px-5 py-2.5 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold shadow-sm transition-all md:w-auto w-full">
            Search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('cards')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                viewMode === 'cards' 
                  ? "bg-white text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Cards
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                viewMode === 'grid' 
                  ? "bg-white text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5"
              )}
            >
              <List className="w-4 h-4" />
              Grid
            </button>
          </div>

          <button 
            onClick={handleReload}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#0085F7] hover:bg-[#0085F7]/5 transition-colors group shrink-0"
            title="Reload Data"
          >
            <RefreshCw className={cn("w-5 h-5", isReloading && "animate-spin text-[#0085F7]")} />
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-colors shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Profile
          </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProfiles.map(profile => (
            <div key={profile.id} className="bg-white rounded-3xl p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-[#0085F7]/20 transition-all flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0085F7]/5 to-transparent rounded-bl-full" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 mt-1 group-hover:bg-[#0085F7] group-hover:text-white transition-colors duration-300">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col justify-center mt-1">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[#0085F7] transition-colors line-clamp-1" title={profile.profileName}>{profile.profileName}</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">{profile.id}</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Primary Skill:</p>
                    <span className="text-sm font-semibold text-[#0085F7]">
                      {profile.primarySkill}
                    </span>
                  </div>

                  {profile.secondarySkills.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Secondary Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.secondarySkills.map((skill, idx) => (
                          <span key={idx} className="inline-flex px-2.5 py-1 bg-slate-50 text-slate-600 rounded-md text-xs font-semibold border border-slate-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <CalendarClock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold">{profile.interviewsCount} Interviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg text-xs font-bold transition-colors">
                    <FileEdit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(profile.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-rose-50 text-slate-500 hover:text-rose-500 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProfiles.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-border/50 border-dashed">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-700">No profiles found</h3>
              <p className="text-slate-500 max-w-sm mt-1">Try adjusting your search query.</p>
            </div>
          )}
        </div>
      ) : (
        /* Grid (Table) View */
        <div className="bg-white rounded-3xl shadow-sm border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">Profile Name</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Primary Skill</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Secondary Skills</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {paginatedProfiles.map(profile => (
                  <tr key={profile.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-base group-hover:text-[#0085F7] transition-colors">{profile.profileName}</span>
                        <span className="text-xs text-slate-400 mt-0.5">{profile.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-[#0085F7]">
                        {profile.primarySkill}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {profile.secondarySkills.length > 0 ? (
                          profile.secondarySkills.map((skill, idx) => (
                            <span key={idx} className="inline-flex px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold border border-slate-200">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-xs">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="inline-flex items-center justify-center p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors"
                          title="Edit Profile"
                        >
                          <FileEdit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(profile.id)}
                          className="inline-flex items-center justify-center p-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                          title="Delete Profile"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProfiles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      No profiles found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && filteredProfiles.length > 0 && (
        <motion.div 
          layout
          className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-border/50 shadow-sm mt-4 relative z-0"
        >
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-900">{Math.min(currentPage * itemsPerPage, filteredProfiles.length)}</span> of{' '}
                <span className="font-medium text-slate-900">{filteredProfiles.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNumber = idx + 1;
                  const isCurrent = pageNumber === currentPage;
                  
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-slate-200 focus:z-20 focus:outline-offset-0 transition-colors ${
                          isCurrent 
                            ? 'z-10 bg-[#0085F7] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0085F7]' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 || 
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-500 ring-1 ring-inset ring-slate-200 focus:outline-offset-0">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-xl px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Profile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-border/50 max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50 bg-slate-50/50 rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0085F7]/10 text-[#0085F7] flex items-center justify-center border border-[#0085F7]/20">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-heading">Add New Profile</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Create a specialized interviewer profile</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-xl text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Profile Name <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Senior Frontend Engineer"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0085F7]/20 focus:border-[#0085F7] transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Primary Skill <span className="text-rose-500">*</span></label>
                    <SearchableSelect
                      options={SKILL_OPTIONS}
                      value={formPrimarySkill}
                      onChange={setFormPrimarySkill}
                      placeholder="Search and select primary skill..."
                      icon={<Briefcase className="w-4 h-4 text-slate-400" />}
                      className="h-[46px]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#0085F7]" />
                      Secondary Skills
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Add up to 6 additional skills (optional)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3, 4, 5].map(idx => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <SearchableSelect
                            options={SKILL_OPTIONS}
                            value={formSecondarySkills[idx]}
                            onChange={(val) => updateSecondarySkill(idx, val)}
                            placeholder={`Secondary Skill ${idx + 1}...`}
                            className="h-11"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-border/50 flex justify-end gap-3 rounded-b-3xl">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 bg-[#0085F7] hover:bg-[#0085F7]/90 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-[#0085F7]/20"
                >
                  Save Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
