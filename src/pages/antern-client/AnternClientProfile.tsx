import { useState } from "react";
import { User, Mail, Phone, MapPin, Globe, Building, Camera, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AnternClientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    companyName: "Acme Corp",
    mobile: "+91 9876543210",
    website: "https://www.acmecorp.com",
    contactPersonName: "Priya Sharma",
    contactPersonMobile: "+91 9988776655",
    contactPersonEmail: "priya.sharma@acmecorp.com",
    address: "123 Tech Park, Phase 1, Hinjewadi\nPune, Maharashtra, 411057\nIndia",
    logoUrl: ""
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  // Mock logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setTempData(prev => ({ ...prev, logoUrl: url }));
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-heading text-foreground"
          >
            Company Profile
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-2 font-medium"
          >
            Manage your company information and contact details.
          </motion.p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
      >
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative" />
        
        <div className="px-8 pb-8 relative">
          
          {/* Avatar / Logo */}
          <div className="absolute -top-12 left-8 w-24 h-24 rounded-full bg-white p-1.5 shadow-md group">
            <div className="relative w-full h-full rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
              {(isEditing ? tempData.logoUrl : profileData.logoUrl) ? (
                <img 
                  src={isEditing ? tempData.logoUrl : profileData.logoUrl} 
                  alt="Company Logo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building className="w-10 h-10 text-slate-300" />
              )}
              
              {isEditing && (
                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold">Edit Logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
              )}
            </div>
          </div>
          
          <div className="pt-16 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="w-full max-w-md">
              {isEditing ? (
                <input 
                  type="text" 
                  name="companyName"
                  value={tempData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="text-2xl font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              ) : (
                <h3 className="text-2xl font-bold text-slate-800">{profileData.companyName}</h3>
              )}
            </div>
            
            <div className="flex gap-3 shrink-0">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleCancel}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10 mt-12 pt-10 border-t border-slate-100">
            
            {/* Company Info */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">Company Details</h4>
              
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" /> Mobile
                </label>
                {isEditing ? (
                  <input 
                    type="tel" 
                    name="mobile"
                    value={tempData.mobile}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <div className="text-slate-700 font-medium">{profileData.mobile || "Not specified"}</div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4" /> Website
                </label>
                {isEditing ? (
                  <input 
                    type="url" 
                    name="website"
                    value={tempData.website}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <div className="text-blue-600 font-medium">
                    {profileData.website ? (
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {profileData.website}
                      </a>
                    ) : "Not specified"}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" /> Address
                </label>
                {isEditing ? (
                  <textarea 
                    name="address"
                    value={tempData.address}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                ) : (
                  <div className="text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                    {profileData.address || "Not specified"}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Person Info */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">Contact Person Details</h4>
              
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" /> Name
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="contactPersonName"
                    value={tempData.contactPersonName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <div className="text-slate-700 font-medium">{profileData.contactPersonName || "Not specified"}</div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" /> Mobile
                </label>
                {isEditing ? (
                  <input 
                    type="tel" 
                    name="contactPersonMobile"
                    value={tempData.contactPersonMobile}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <div className="text-slate-700 font-medium">{profileData.contactPersonMobile || "Not specified"}</div>
                )}
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                {isEditing ? (
                  <input 
                    type="email" 
                    name="contactPersonEmail"
                    value={tempData.contactPersonEmail}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <div className="text-slate-700 font-medium">{profileData.contactPersonEmail || "Not specified"}</div>
                )}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

