import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, RotateCcw, FileText, CalendarCheck, Star, Building2 } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_COMPANIES = [
  { label: "Wipro", value: "wipro" },
  { label: "TCS", value: "tcs" },
  { label: "Infosys", value: "infosys" },
  { label: "Tech Mahindra", value: "techmahindra" }
];

const MOCK_RECRUITERS = [
  { label: "Rohan Gupta", value: "rohan" },
  { label: "Priya Desai", value: "priya" },
  { label: "Amit Sharma", value: "amit" },
  { label: "Sneha Patel", value: "sneha" },
  { label: "Vikram Singh", value: "vikram" },
  { label: "Kavya Nair", value: "kavya" },
  { label: "Sameer Verma", value: "sameer" }
];

const initialData = [
  { 
    id: "P001", companyName: "Wipro", 
    recruiters: [
      { name: "Rohan Gupta", received: 70, scheduled: 25, rated: 15 },
      { name: "Priya Desai", received: 50, scheduled: 20, rated: 15 }
    ]
  },
  { 
    id: "P002", companyName: "TCS", 
    recruiters: [
      { name: "Amit Sharma", received: 85, scheduled: 30, rated: 20 }
    ]
  },
  { 
    id: "P003", companyName: "Infosys", 
    recruiters: [
      { name: "Sneha Patel", received: 110, scheduled: 50, rated: 40 },
      { name: "Vikram Singh", received: 100, scheduled: 40, rated: 35 }
    ]
  },
  { 
    id: "P004", companyName: "Tech Mahindra", 
    recruiters: [
      { name: "Kavya Nair", received: 35, scheduled: 20, rated: 15 },
      { name: "Sameer Verma", received: 30, scheduled: 20, rated: 20 }
    ]
  },
];

export default function AdminProfilesDashboard() {
  const [data, setData] = useState(initialData);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterRecruiter, setFilterRecruiter] = useState("");
  const [localRecruiterFilters, setLocalRecruiterFilters] = useState<Record<string, string>>({});
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredData = useMemo(() => {
    const selectedCompanyLabel = MOCK_COMPANIES.find(c => c.value === filterCompany)?.label;
    const selectedRecruiterLabel = MOCK_RECRUITERS.find(r => r.value === filterRecruiter)?.label;

    return data.map(item => {
      // Match company if global filter is active
      const matchCompany = selectedCompanyLabel ? item.companyName === selectedCompanyLabel : true;
      if (!matchCompany) return null;

      // Match global recruiter filter (drops companies entirely if they don't have this recruiter)
      const hasGlobalRecruiter = selectedRecruiterLabel 
        ? item.recruiters.some(r => r.name === selectedRecruiterLabel)
        : true;
      if (!hasGlobalRecruiter) return null;

      // Determine which recruiter stats to show for THIS specific company card
      let targetRecruiterName = null;
      if (selectedRecruiterLabel) {
        targetRecruiterName = selectedRecruiterLabel; // Global filter overrides
      } else if (localRecruiterFilters[item.id]) {
        targetRecruiterName = MOCK_RECRUITERS.find(r => r.value === localRecruiterFilters[item.id])?.label;
      }

      const activeRecruiters = targetRecruiterName 
        ? item.recruiters.filter(r => r.name === targetRecruiterName)
        : item.recruiters;

      return {
        ...item,
        displayRecruiters: item.recruiters, 
        activeRecruiterValue: targetRecruiterName ? MOCK_RECRUITERS.find(r => r.label === targetRecruiterName)?.value : null,
        profilesReceived: activeRecruiters.reduce((s, r) => s + r.received, 0),
        profilesScheduled: activeRecruiters.reduce((s, r) => s + r.scheduled, 0),
        profilesRated: activeRecruiters.reduce((s, r) => s + r.rated, 0),
      };
    }).filter(Boolean);
  }, [data, filterCompany, filterRecruiter, localRecruiterFilters]);

  // KPI Calculations based on filtered data
  const stats = useMemo(() => {
    return {
      received: filteredData.reduce((acc, curr) => acc + curr.profilesReceived, 0),
      scheduled: filteredData.reduce((acc, curr) => acc + curr.profilesScheduled, 0),
      rated: filteredData.reduce((acc, curr) => acc + curr.profilesRated, 0)
    };
  }, [filteredData]);

  const handleSearch = () => {
    // Implement search
  };

  const handleReset = () => {
    setFilterCompany("");
    setFilterRecruiter("");
    setLocalRecruiterFilters({});
    setDateFrom("");
    setDateTo("");
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.min(100, Math.round((value / total) * 100));
  };

  return (
    <div className="space-y-8 relative pb-10">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Profiles Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of candidate profile pipeline across companies.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-4 rounded-2xl border border-blue-500/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <FileText className="w-16 h-16 text-blue-600" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Total Received</p>
              <h3 className="text-2xl font-black text-foreground">{stats.received}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-4 rounded-2xl border border-purple-500/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <CalendarCheck className="w-16 h-16 text-purple-600" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 shrink-0">
              <CalendarCheck className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Profiles Scheduled</p>
              <h3 className="text-2xl font-black text-foreground">{stats.scheduled}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-4 rounded-2xl border border-emerald-500/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <Star className="w-16 h-16 text-emerald-600" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 shrink-0">
              <Star className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Profiles Rated</p>
              <h3 className="text-2xl font-black text-foreground">{stats.rated}</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-border/50 flex flex-col xl:flex-row items-center justify-between gap-4 relative z-10"
      >
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <SearchableSelect
            options={MOCK_COMPANIES}
            value={filterCompany}
            onChange={(val) => setFilterCompany(val)}
            placeholder="Company"
            className="w-full sm:w-[180px] h-[48px] rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
          />
          
          <SearchableSelect
            options={MOCK_RECRUITERS}
            value={filterRecruiter}
            onChange={(val) => setFilterRecruiter(val)}
            placeholder="Recruiter"
            className="w-full sm:w-[180px] h-[48px] rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
          />

          <div className="flex items-center h-[48px] bg-secondary/30 border border-transparent rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white transition-all w-full sm:w-auto">
             <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 h-full text-sm outline-none text-foreground bg-transparent w-full sm:w-[130px]" />
             <div className="px-2 text-[10px] font-bold text-muted-foreground uppercase h-full flex items-center border-x border-border/50">to</div>
             <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 h-full text-sm outline-none text-foreground bg-transparent w-full sm:w-[130px]" />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto justify-end shrink-0 border-t xl:border-t-0 xl:border-l border-border/50 pt-4 xl:pt-0 xl:pl-5">
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

      {/* Enhanced List View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        {filteredData.map((item, index) => {
          const scheduledPercent = calculatePercentage(item.profilesScheduled, item.profilesReceived);
          const ratedPercent = calculatePercentage(item.profilesRated, item.profilesScheduled);

          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.05) }}
              className="bg-white p-4 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group flex flex-col lg:flex-row items-center gap-6"
            >
              {/* Company Avatar & Identity */}
              <div className="flex items-center gap-4 w-full lg:w-[25%] shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:scale-105 transition-transform">
                  <span className="text-xl font-black text-primary">{item.companyName.charAt(0)}</span>
                </div>
                <div className="overflow-hidden w-full">
                  <h4 className="text-base font-bold text-foreground truncate">{item.companyName}</h4>
                  
                  {/* Recruiters List */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 w-full">
                    {item.displayRecruiters.map((recruiterObj: any, i: number) => {
                      const recruiterValue = MOCK_RECRUITERS.find(r => r.label === recruiterObj.name)?.value;
                      const isSelected = item.activeRecruiterValue === recruiterValue;
                      return (
                        <button 
                          key={i} 
                          onClick={() => {
                            // If global filter is active, don't allow local toggling to avoid confusion
                            if (filterRecruiter) return;
                            setLocalRecruiterFilters(prev => ({
                              ...prev,
                              [item.id]: isSelected ? "" : (recruiterValue || "")
                            }));
                          }}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border truncate max-w-[120px] transition-colors ${filterRecruiter ? 'cursor-default opacity-80' : 'cursor-pointer'} ${
                            isSelected 
                              ? 'bg-primary text-white border-primary' 
                              : 'bg-secondary/50 text-muted-foreground border-border/50 hover:text-foreground hover:bg-secondary'
                          }`}
                          title={`Filter by ${recruiterObj.name}`}
                        >
                          {recruiterObj.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pipeline Visualization */}
              <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 lg:border-l border-border/50 lg:px-6">
                
                {/* Received */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
                      <FileText className="w-3.5 h-3.5" />
                      Received
                    </div>
                    <span className="text-sm font-black text-foreground">{item.profilesReceived}</span>
                  </div>
                  <div className="h-2 w-full bg-blue-500 rounded-full overflow-hidden" />
                </div>

                {/* Scheduled */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-wider">
                      <CalendarCheck className="w-3.5 h-3.5" />
                      Scheduled
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-foreground">{item.profilesScheduled}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">({scheduledPercent}%)</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${scheduledPercent}%` }}
                    />
                  </div>
                </div>

                {/* Rated */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      <Star className="w-3.5 h-3.5" />
                      Rated
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-foreground">{item.profilesRated}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">({ratedPercent}%)</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${ratedPercent}%` }}
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}

        {filteredData.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-border flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No data found</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">There are no profiles matching your search criteria.</p>
          </div>
        )}
      </motion.div>

    </div>
  );
}
