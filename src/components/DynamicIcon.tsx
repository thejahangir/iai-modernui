import React from 'react';
import { 
  Users, 
  Settings, 
  Brain, 
  HelpCircle,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  type LucideProps 
} from 'lucide-react';

/**
 * Define the registry of icons available to be rendered dynamically by string name.
 * We use a registry pattern instead of importing all icons (`import * as icons`) 
 * to preserve tree-shaking and avoid bloating the bundle size with unused SVGs.
 * 
 * If the backend adds a new icon name, simply import it from 'lucide-react' 
 * and add it to this registry.
 */
export const IconRegistry = {
  Users,
  Settings,
  Brain,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle,
  // Add more predefined icons below as needed
} as const;

// This type trick preserves IDE autocomplete for known keys while still allowing any string
export type IconName = keyof typeof IconRegistry | (string & {});

export interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  /**
   * The name of the icon to render (must match the exact Lucide component name, e.g., "Users").
   */
  name: IconName;
  /**
   * Optional fallback icon component to render if the requested name is not found in the registry.
   * Defaults to HelpCircle.
   */
  fallbackIcon?: React.ElementType;
}

/**
 * Dynamically renders a Lucide icon based on a string name.
 * Optimized for performance by using a local registry rather than importing all icons.
 */
export function DynamicIcon({ 
  name, 
  fallbackIcon: FallbackIcon = HelpCircle, 
  ...props 
}: DynamicIconProps) {
  
  // Lookup the icon in the registry
  const Icon = (IconRegistry as Record<string, React.ElementType>)[name];

  if (!Icon) {
    // Graceful fallback for invalid or unregistered names
    console.warn(`[DynamicIcon] Icon "${name}" not found in IconRegistry. Ensure it is imported and registered.`);
    return <FallbackIcon {...props} />;
  }

  return <Icon {...props} />;
}
