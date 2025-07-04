'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Aktuellen Nutzer abfragen
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    };

    getUser();

    // Listener für Login/Logout-Ereignisse (optional)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser(); // neu laden
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  return user ? (
    <button onClick={handleLogout}>🚪 Logout</button>
  ) : (
    <button onClick={() => router.push('/auth')}>🔐 Login / Registrieren</button>
  );
}
