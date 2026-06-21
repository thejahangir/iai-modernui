import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, RotateCcw, X, CheckCircle2, Building2, ShieldCheck, Calendar, Users, Settings2, Mail, Hash } from "lucide-react";
import { SearchableSelect } from "../../components/SearchableSelect";

const MOCK_COMPANIES = [
  { label: "Wipro", value: "wipro" },
  { label: "TCS", value: "tcs" },
  { label: "Infosys", value: "infosys" },
  { label: "Tech Mahindra", value: "techmahindra" }
];

const initialData = [
  { id: "C001", companyName: "Wipro", email: "contact@wipro.com", interviewsAllowed: 50, startDate: "2026-01-01", endDate: "2026-12-31", authorized: true },
  { id: "C002", companyName: "TCS", email: "hr@tcs.com", interviewsAllowed: 100, startDate: "2026-02-15", endDate: "2027-02-14", authorized: false },
  { id: "C003", companyName: "Infosys", email: "talent@infosys.com", interviewsAllowed: 200, startDate: "2026-03-01", endDate: "2027-02-28", authorized: true },
  { id: "C004", companyName: "Tech Mahindra", email: "careers@techmahindra.com", interviewsAllowed: 75, startDate: "2026-04-10", endDate: "2026-10-10", authorized: true },
];

export default function AdminCompanyOnBoard() {
  const [data, setData] = useState(initialData);
  const [filterCompany, setFilterCompany] = useState("");

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const [configForm, setConfigForm] = useState({
    interviewsAllowed: 0,
    authorized: false,
    startDate: "",
    endDate: ""
  });

  // KPI Calculations
  const stats = useMemo(() => {
    return {
      total: data.length,
      active: data.filter(d => d.authorized).length,
      interviews: data.reduce((acc, curr) => acc + curr.interviewsAllowed, 0)
    };
  }, [data]);

  const handleSearch = () => {
    // Implement search logic
  };

  const handleReset = () => {
    setFilterCompany("");
  };

  const handleEditConfig = (company: any) => {
    setSelectedCompany(company);
    setConfigForm({
      interviewsAllowed: company.interviewsAllowed,
      authorized: company.authorized,
      startDate: company.startDate,
      endDate: company.endDate
    });
    setShowConfigModal(true);
  };

  const handleSaveConfig = () => {
    setData(data.map(item => {
      if (item.id === selectedCompany.id) {
        return {
          ...item,
          ...configForm
        };
      }
      return item;
    }));
    setShowConfigModal(false);
  };

  return (
    <div className="space-y-8 relative pb-10">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">Company On Board</h2>
        <p className="text-muted-foreground mt-1">Manage onboarded companies and configure their access permissions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-4 rounded-2xl border border-blue-500/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <Building2 className="w-16 h-16 text-blue-600" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 shrink-0">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Total Companies</p>
              <h3 className="text-2xl font-black text-foreground">{stats.total}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-4 rounded-2xl border border-emerald-500/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <ShieldCheck className="w-16 h-16 text-emerald-600" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Active</p>
              <h3 className="text-2xl font-black text-foreground">{stats.active}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-4 rounded-2xl border border-purple-500/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <Users className="w-16 h-16 text-purple-600" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 shrink-0">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Interviews Allowed</p>
              <h3 className="text-2xl font-black text-foreground">{stats.interviews}</h3>
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
          <div className="relative flex-1 sm:flex-none">
             <SearchableSelect
              options={MOCK_COMPANIES}
              value={filterCompany}
              onChange={(val) => setFilterCompany(val)}
              placeholder="Search Company..."
              className="w-full sm:w-[280px] h-[48px] rounded-2xl bg-secondary/30 border-transparent focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto justify-end shrink-0 border-t xl:border-t-0 xl:border-l border-border/50 pt-4 xl:pt-0 xl:pl-5">
          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 h-[48px] px-6 bg-foreground text-background text-sm font-bold rounded-2xl shadow-lg shadow-foreground/10 hover:bg-foreground/90 transition-all active:scale-95 flex-1 sm:flex-none"
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
        {data.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (index * 0.05) }}
            className="bg-white p-4 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group flex flex-col lg:flex-row items-center gap-4"
          >
            {/* Company Avatar & Identity */}
            <div className="flex items-center gap-4 w-full lg:w-[25%]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover:scale-105 transition-transform">
                <span className="text-xl font-black text-primary">{item.companyName.charAt(0)}</span>
              </div>
              <div className="overflow-hidden">
                <h4 className="text-base font-bold text-foreground truncate">{item.companyName}</h4>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.email}</span>
                </div>
              </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:flex-1 lg:border-l lg:border-r border-border/50 lg:px-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <Hash className="w-3 h-3" />
                  Allowed
                </div>
                <p className="text-sm font-bold text-foreground">{item.interviewsAllowed}</p>
              </div>
              
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  Start Date
                </div>
                <p className="text-xs font-semibold text-foreground">{item.startDate}</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  End Date
                </div>
                <p className="text-xs font-semibold text-foreground">{item.endDate}</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" />
                  Status
                </div>
                <div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border shadow-sm ${item.authorized ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                    {item.authorized ? "Authorized" : "Unauthorized"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full lg:w-auto flex justify-end shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/50">
              <button 
                onClick={() => handleEditConfig(item)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 text-xs font-bold transition-all active:scale-95"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Configure
              </button>
            </div>
          </motion.div>
        ))}

        {data.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-border flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No companies found</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">There are no onboarded companies matching your search criteria.</p>
          </div>
        )}
      </motion.div>

      {/* Modern Edit Configuration Modal */}
      <AnimatePresence>
        {showConfigModal && selectedCompany && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]" onClick={() => setShowConfigModal(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[2rem] shadow-2xl z-[101] border border-white/20 flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="relative h-32 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shrink-0 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Settings2 className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center shrink-0">
                      <span className="text-2xl font-black text-white">{selectedCompany.companyName.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-white">Configuration</h3>
                      <p className="text-sm font-medium text-blue-100 mt-0.5 opacity-90">{selectedCompany.companyName}</p>
                    </div>
                  </div>
                  <button onClick={() => setShowConfigModal(false)} className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors bg-white/10 backdrop-blur-md border border-white/20"><X className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-6 bg-slate-50/50">
                <div className="bg-white p-6 rounded-3xl border border-border/50 shadow-sm space-y-6">
                  
                  {/* Interviews Allowed Input */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider z-10 rounded-full">
                      Interviews Allowed
                    </label>
                    <div className="relative flex items-center h-[52px] border border-border/50 rounded-2xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white transition-all">
                      <Hash className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
                      <input 
                        type="number" 
                        value={configForm.interviewsAllowed}
                        onChange={(e) => setConfigForm({...configForm, interviewsAllowed: parseInt(e.target.value) || 0})}
                        className="w-full h-full bg-transparent outline-none text-foreground font-bold text-base" 
                      />
                    </div>
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider z-10 rounded-full">
                        Start Date
                      </label>
                      <div className="relative flex items-center h-[52px] border border-border/50 rounded-2xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white transition-all">
                         <input 
                          type="date" 
                          value={configForm.startDate}
                          onChange={(e) => setConfigForm({...configForm, startDate: e.target.value})}
                          className="w-full h-full bg-transparent outline-none text-foreground font-semibold text-sm" 
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider z-10 rounded-full">
                        End Date
                      </label>
                      <div className="relative flex items-center h-[52px] border border-border/50 rounded-2xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white transition-all">
                         <input 
                          type="date" 
                          value={configForm.endDate}
                          onChange={(e) => setConfigForm({...configForm, endDate: e.target.value})}
                          className="w-full h-full bg-transparent outline-none text-foreground font-semibold text-sm" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Authorization Toggle */}
                  <div className="pt-2 flex items-center justify-between p-4 rounded-2xl bg-secondary/50 border border-border/50">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Platform Authorization</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Allow this company to access the platform.</p>
                    </div>
                    <label htmlFor="authorize" className="flex items-center gap-2 cursor-pointer group/cb">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          id="authorize"
                          checked={configForm.authorized}
                          onChange={(e) => setConfigForm({...configForm, authorized: e.target.checked})}
                          className="peer sr-only"
                        />
                        <div className="w-6 h-6 border-2 border-border rounded-lg text-emerald-500 flex items-center justify-center transition-colors peer-checked:bg-emerald-500 peer-checked:border-emerald-500 group-hover/cb:border-emerald-500/50 shadow-sm">
                          {configForm.authorized && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </label>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-white border-t border-border/50 flex justify-end gap-3 shrink-0 rounded-b-[2rem]">
                <button onClick={() => setShowConfigModal(false)} className="px-6 py-3 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground rounded-2xl transition-all">Cancel</button>
                <button onClick={handleSaveConfig} className="px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 rounded-2xl transition-all active:scale-95">Save Changes</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
