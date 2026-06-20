import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusBadgeClasses = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'selected':
    case 'completed':
    case 'active':
    case 'resolved':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'rejected':
    case 'failed':
    case 'inactive':
    case 'no show':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'in progress':
    case 'pending':
    case 'scheduled':
    case 'open':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'new':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'rescheduled':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
