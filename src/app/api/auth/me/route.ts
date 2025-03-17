import { createClient } from '@/app/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    
    return NextResponse.json({ 
      user: data.user 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' }, 
      { status: 500 }
    );
  }
} 