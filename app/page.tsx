import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#0a0e1a', minHeight: '100vh', color: 'white' }}>

      {/* Navbar */}
      <nav style={{ background: '#111827', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1f2937' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#a855f7' }}>🎨 CreatorHub</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link href="/"          style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          <Link href="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/payouts"   style={{ color: '#9ca3af', textDecoration: 'none' }}>Payouts</Link>
          <Link href="/analytics" style={{ color: '#9ca3af', textDecoration: 'none' }}>Analytics</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '80px 32px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          The <span style={{ color: '#a855f7' }}>Creator Economy</span> Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '20px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Track revenue, manage payouts, and grow your creator business across all platforms in one place.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/dashboard" style={{ padding: '14px 32px', background: '#a855f7', borderRadius: '8px', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
            Get Started →
          </Link>
          <Link href="/analytics" style={{ padding: '14px 32px', background: '#1f2937', borderRadius: '8px', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
            View Analytics
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '0 64px 80px' }}>
        {[
          { icon: '💰', title: 'Revenue Tracking',  desc: 'Track earnings across YouTube, Twitch, Instagram and more in real-time.' },
          { icon: '📊', title: 'Cohort Analytics',  desc: 'Understand retention patterns and reduce churn with data-driven insights.' },
          { icon: '⚡', title: 'Instant Payouts',   desc: 'Automated payout flows with 35% reduction in processing time.' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#111827', borderRadius: '12px', padding: '32px', borderTop: '3px solid #a855f7' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{f.icon}</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '20px' }}>{f.title}</h3>
            <p style={{ color: '#6b7280', margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}