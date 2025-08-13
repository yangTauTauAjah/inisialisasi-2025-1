import { createClient, StudentsTableName } from '@/lib/supabase/server';
import { /* NextRequest,  */NextResponse } from 'next/server';

// --- Supabase Configuration ---
// In a real Next.js application, these should be loaded from environment variables.
// For server-side code, you would typically use the service_role key for more permissions,
// but for simple GET requests fetching public data, the anon key is often sufficient
// if your RLS policies allow it.

// Initialize Supabase client for server-side use

export async function GET(/* request: NextRequest */) {
  try {
    const supabase = await createClient();
    // Fetch all data from the 'students' table
    const { data, error } = await supabase
      .from(StudentsTableName)
      .select('id,nim,nama,kelompok,is_admin'); // Select all columns

    if (error) {
      console.error('Error fetching students:', error.message);
      // Return a 500 Internal Server Error with the error message
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return the fetched data as a JSON response with a 200 OK status
    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    console.error('An unexpected error occurred in students API:', err);
    // Handle unexpected errors
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}