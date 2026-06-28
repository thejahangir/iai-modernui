export type UserRole = "SuperAdmin" | "Vendor Recruiter" | "Antern Recruiter" | "Vendor" | "Candidate" | "Interviewer" | "Antern Client";

export interface MockUser {
  email: string;
  passwordHash: string; // Storing plain text password for mock purposes
  role: UserRole;
  name: string;
}

export const mockUsers: MockUser[] = [
  {
    email: "superadmin@iaminterviewed.com",
    passwordHash: "superadmin123",
    role: "SuperAdmin",
    name: "System SuperAdmin"
  },
  {
    email: "vendorrecruiter@iaminterviewed.com",
    passwordHash: "vendorrecruiter123",
    role: "Vendor Recruiter",
    name: "Global Vendor Recruiter"
  },
  {
    email: "recruiter@company.com",
    passwordHash: "recruiter123",
    role: "Antern Recruiter",
    name: "Aarohi Recruiter"
  },
  {
    email: "vendor@agency.com",
    passwordHash: "vendor123",
    role: "Vendor",
    name: "Rahul Vendor"
  },
  {
    email: "candidate@gmail.com",
    passwordHash: "candidate123",
    role: "Candidate",
    name: "Vikram Candidate"
  },
  {
    email: "interviewer@iaminterviewed.com",
    passwordHash: "interviewer123",
    role: "Interviewer",
    name: "Deepak Interviewer"
  },
  {
    email: "client@company.com",
    passwordHash: "client123",
    role: "Antern Client",
    name: "Esha Client"
  }
];

export const authenticateUser = (email: string, passwordHash: string): MockUser | null => {
  const user = mockUsers.find(u => u.email === email && u.passwordHash === passwordHash);
  return user || null;
};
