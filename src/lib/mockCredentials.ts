export type UserRole = "Admin" | "SuperAdmin" | "Recruiter" | "Vendor" | "Candidate" | "Interviewer" | "Client";

export interface MockUser {
  email: string;
  passwordHash: string; // Storing plain text password for mock purposes
  role: UserRole;
  name: string;
}

export const mockUsers: MockUser[] = [
  {
    email: "admin@iaminterviewed.com",
    passwordHash: "admin123",
    role: "Admin",
    name: "System Admin"
  },
  {
    email: "superadmin@iaminterviewed.com",
    passwordHash: "superadmin123",
    role: "SuperAdmin",
    name: "Global SuperAdmin"
  },
  {
    email: "recruiter@company.com",
    passwordHash: "recruiter123",
    role: "Recruiter",
    name: "Alice Recruiter"
  },
  {
    email: "vendor@agency.com",
    passwordHash: "vendor123",
    role: "Vendor",
    name: "Bob Vendor"
  },
  {
    email: "candidate@gmail.com",
    passwordHash: "candidate123",
    role: "Candidate",
    name: "Charlie Candidate"
  },
  {
    email: "interviewer@iaminterviewed.com",
    passwordHash: "interviewer123",
    role: "Interviewer",
    name: "David Interviewer"
  },
  {
    email: "client@company.com",
    passwordHash: "client123",
    role: "Client",
    name: "Eve Client"
  }
];

export const authenticateUser = (email: string, passwordHash: string): MockUser | null => {
  const user = mockUsers.find(u => u.email === email && u.passwordHash === passwordHash);
  return user || null;
};
