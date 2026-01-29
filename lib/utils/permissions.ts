import { User, EmployeeType } from '../types';

// Define permissions for different employee types
export const PERMISSIONS = {
  // Admin has all permissions
  MANAGE_ALL_PATIENTS: ['admin'] as EmployeeType[],
  VIEW_ALL_PATIENTS: ['doctor', 'nurse', 'admin'] as EmployeeType[],
  
  // Content management
  CREATE_CONTENT: ['doctor', 'nurse', 'admin'] as EmployeeType[],
  EDIT_CONTENT: ['doctor', 'nurse', 'admin'] as EmployeeType[],
  DELETE_CONTENT: ['admin'] as EmployeeType[],
  ASSIGN_CONTENT: ['doctor', 'nurse', 'admin'] as EmployeeType[],
  
  // Health plans
  CREATE_HEALTH_PLAN: ['doctor', 'admin'] as EmployeeType[],
  EDIT_HEALTH_PLAN: ['doctor', 'admin'] as EmployeeType[],
  DELETE_HEALTH_PLAN: ['admin'] as EmployeeType[],
  VIEW_HEALTH_PLANS: ['doctor', 'nurse', 'admin'] as EmployeeType[],
  
  // System
  MANAGE_SETTINGS: ['admin'] as EmployeeType[],
  VIEW_ANALYTICS: ['doctor', 'admin'] as EmployeeType[],
} as const;

export type Permission = keyof typeof PERMISSIONS;

/**
 * Check if a user has a specific permission
 */
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user || user.role !== 'employee' || !user.employeeType) {
    return false;
  }

  return PERMISSIONS[permission].includes(user.employeeType);
}

/**
 * Check if a user has any of the specified permissions
 */
export function hasAnyPermission(user: User | null, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(user, permission));
}

/**
 * Check if a user has all of the specified permissions
 */
export function hasAllPermissions(user: User | null, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(user, permission));
}

/**
 * Get a human-readable label for an employee type
 */
export function getEmployeeTypeLabel(employeeType?: EmployeeType): string {
  switch (employeeType) {
    case 'doctor':
      return 'Läkare';
    case 'nurse':
      return 'Sjuksköterska';
    case 'admin':
      return 'Administratör';
    default:
      return 'Okänd';
  }
}

/**
 * Get all permissions for a specific employee type
 */
export function getPermissionsForEmployeeType(employeeType: EmployeeType): Permission[] {
  return (Object.keys(PERMISSIONS) as Permission[]).filter(permission =>
    PERMISSIONS[permission].includes(employeeType)
  );
}
