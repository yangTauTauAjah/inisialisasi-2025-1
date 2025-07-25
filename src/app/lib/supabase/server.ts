import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const AssignmentGroupsTableName = 'task-group';
export const AssignmentsTableName = 'sub-tasks';
export const SubmissionsTableName = 'file_managers';
export const StudentsTableName = 'users';
export const StorageBucketName = 'submissions'

export interface Assignment {
  id: number;
  name: string;
  description: string;
  due: Date;
  active: boolean;
  is_link: boolean;
  task_group_id?: number;
  created_at: number;
}

export interface AssignmentGroup {
  id: number;
  name: string;
  is_active: boolean;
  created_at: number;
}

export interface Submission {
  id: number;
  name: string;
  path?: string;
  link?: string;
  user_id: number;
  sub_task_id?: number;
  created_at: number;
}

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}