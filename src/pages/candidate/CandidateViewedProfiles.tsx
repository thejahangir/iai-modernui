import React from 'react';
import { 
  Building2, 
  Briefcase, 
  Tag, 
  Unlock, 
  Lock, 
  Clock,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const profileViews = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    designation: 'Senior Frontend Engineer',
    jobCode: 'REQ-2023-89',
    hasAccess: true,
    viewedAt: '2 hours ago',
    companyColor: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    id: '2',
    company: 'InnovateX',
    designation: 'Full Stack Developer',
    jobCode: 'INX-FS-04',
    hasAccess: false,
    viewedAt: '5 hours ago',
    companyColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    id: '3',
    company: 'Global Systems Inc.',
    designation: 'Lead Software Engineer',
    jobCode: 'GSI-LSE-99',
    hasAccess: true,
    viewedAt: '1 day ago',
    companyColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: '4',
    company: 'DesignWorks Studios',
    designation: 'UI/UX Engineer',
    jobCode: 'DW-UX-12',
    hasAccess: false,
    viewedAt: '2 days ago',
    companyColor: 'bg-rose-50 text-rose-600 border-rose-100',
  },
  {
    id: '5',
    company: 'FinTech Startup',
    designation: 'React Specialist',
    jobCode: 'FTS-RS-01',
    hasAccess: true,
    viewedAt: '3 days ago',
    companyColor: 'bg-amber-50 text-amber-600 border-amber-100',
  }
];

export default function CandidateViewedProfiles() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-slate-800 flex items-center gap-3">
            Who Viewed Your Profile
            <span className="px-3 py-1 bg-blue-100 text-[#0085F7] text-sm font-bold rounded-full">
              {profileViews.length} Views
            </span>
          </h1>
          <p className="text-slate-500 mt-1">
            Track which companies and recruiters are actively looking at your resume.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200/60 self-start shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewMode === 'grid' 
                ? "bg-white text-[#0085F7] shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <ListIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewMode === 'list' 
                ? "bg-white text-[#0085F7] shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Layout Area */}
      {viewMode === 'grid' ? (
        /* ================= DATA GRID (TABLE) VIEW ================= */
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Job Code</th>
                  <th className="px-6 py-4 text-center">Has Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {profileViews.map((view) => (
                  <tr key={view.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Company Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border shrink-0", view.companyColor)}>
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#0085F7] transition-colors">
                            {view.company}
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5 text-xs font-medium text-slate-500">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {view.viewedAt}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Designation Column */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">{view.designation}</span>
                    </td>
                    
                    {/* Job Code Column */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        {view.jobCode}
                      </span>
                    </td>
                    
                    {/* Has Access Column */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {view.hasAccess ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                            <Unlock className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">Unlocked</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                            <Lock className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold">Limited</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ================= SOCIAL COMMENT FEED (LIST) VIEW ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {profileViews.map((view) => (
            <div key={view.id} className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
              
              {/* Avatar (Left side) */}
              <div className="shrink-0">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center border", view.companyColor)}>
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              
              {/* Comment Content (Right side) */}
              <div className="flex-1 min-w-0 pt-0.5">
                
                {/* Comment Header: Name & Time */}
                <div className="flex items-center flex-wrap gap-2 mb-1.5">
                  <h3 className="text-[15px] font-bold text-slate-800 group-hover:text-[#0085F7] transition-colors leading-none">
                    {view.company}
                  </h3>
                  <span className="text-slate-300 text-xs leading-none">•</span>
                  <span className="text-sm font-medium text-slate-500 flex items-center gap-1 leading-none">
                    <Clock className="w-3.5 h-3.5 opacity-70" />
                    {view.viewedAt}
                  </span>
                </div>

                {/* Comment Body */}
                <div className="text-slate-700 text-sm mb-3 leading-relaxed max-w-2xl bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="font-medium text-slate-800 mb-1">Viewed your profile for an open role:</p>
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">{view.designation}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {view.jobCode}
                    </span>
                  </p>
                </div>

                {/* Comment Footer (Actions / Badges) */}
                <div className="flex items-center gap-4 mt-2">
                  {view.hasAccess ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <Unlock className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">Profile Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">Limited View</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
