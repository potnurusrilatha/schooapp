import { createClient } from '@/utils/supabase/server-client';
import { redirect } from 'next/navigation';

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}