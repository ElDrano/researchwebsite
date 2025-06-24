import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthSidebar() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) return setError('E-Mail und Passwort erforderlich');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (session) {
    return (
      <div>
        <p>👤 {session.user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleAuth}>
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      />
      <button type="submit" style={{ marginBottom: '0.5rem' }}>
        {isLogin ? 'Einloggen' : 'Registrieren'}
      </button>
      <br />
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        style={{ fontSize: '0.8rem' }}
      >
        {isLogin ? 'Noch kein Konto?' : 'Schon registriert?'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
