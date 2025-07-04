import AuthSidebar from './AuthSidebar';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
        
      <aside style={{ width: '250px', background: 'grey', padding: '1rem' }}>
        <h2>📚 ResearchWebsite</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/">🏠 Startseite</a></li>
          <li><a href="/tools">🛠️ Tools</a></li>
        </ul>
        <hr style={{ margin: '1rem 0' }} />
        <AuthSidebar />
      </aside>

      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
