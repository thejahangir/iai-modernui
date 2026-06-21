import { Bell, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function AdminNotifications() {
  const notifications = [
    { 
      id: 1, 
      type: "success",
      title: "New Company Registered", 
      message: "Wipro has completed the onboarding process and is pending final approval.", 
      time: "10 minutes ago", 
      read: false 
    },
    { 
      id: 2, 
      type: "alert",
      title: "Interview Escalation", 
      message: "Client 'TCS' has raised an escalation for an interview with candidate Rohan Gupta regarding technical issues.", 
      time: "1 hour ago", 
      read: false 
    },
    { 
      id: 3, 
      type: "info",
      title: "System Update", 
      message: "The platform will be down for scheduled maintenance at 2 AM EST on Sunday.", 
      time: "3 hours ago", 
      read: true 
    },
    { 
      id: 4, 
      type: "info",
      title: "Candidate Follow-up", 
      message: "Reminder to follow up with Sarah Jenkins regarding her final stage interview.", 
      time: "5 hours ago", 
      read: true 
    },
    { 
      id: 5, 
      type: "success",
      title: "Payment Processed", 
      message: "Invoice #INV-2023-089 has been successfully processed for Vendor XYZ.", 
      time: "1 day ago", 
      read: true 
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-[#00A94B]" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default: return <Bell className="w-5 h-5 text-[#0085F7]" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground">Notifications</h2>
          <p className="text-muted-foreground mt-1">View and manage all your platform alerts and updates.</p>
        </div>
        <button className="px-4 py-2 text-sm font-bold text-[#0085F7] bg-[#0085F7]/10 hover:bg-[#0085F7]/20 rounded-xl transition-colors shrink-0">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden">
        <div className="divide-y divide-border/50">
          {notifications.map((notif) => (
            <div 
              key={notif.id}
              className={`p-6 flex gap-4 transition-colors hover:bg-secondary/30 ${!notif.read ? 'bg-primary/5' : ''}`}
            >
              <div className="mt-1 shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className={`text-base ${!notif.read ? 'font-bold text-foreground' : 'font-semibold text-muted-foreground'}`}>
                    {notif.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    {notif.time}
                  </div>
                </div>
                <p className={`mt-2 text-sm leading-relaxed ${!notif.read ? 'text-muted-foreground font-medium' : 'text-muted-foreground'}`}>
                  {notif.message}
                </p>
              </div>
              {!notif.read && (
                <div className="shrink-0 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0085F7]" title="Unread" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-border/50 bg-secondary/20 flex items-center justify-between text-sm text-muted-foreground font-medium">
          <span>Showing 1 to 5 of 24 notifications</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-border/50 hover:bg-white transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-border/50 hover:bg-white transition-colors bg-white shadow-sm text-foreground">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-border/50 hover:bg-white transition-colors">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-border/50 hover:bg-white transition-colors">3</button>
            <button className="px-3 py-1.5 rounded-lg border border-border/50 hover:bg-white transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
