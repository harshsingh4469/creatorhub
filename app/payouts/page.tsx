'use client';
import { useState } from 'react';

const mockPayouts = [
  { id: 'PAY001', creator: 'Jake Wilson',   platform: 'TikTok',    amount: 9200,  status: 'completed', date: '2026-04-28' },
  { id: 'PAY002', creator: 'Marcus Lee',    platform: 'Instagram', amount: 6800,  status: 'completed', date: '2026-04-27' },
  { id: 'PAY003', creator: 'Alex Chen',     platform: 'YouTube',   amount: 4500,  status: 'pending',   date: '2026-04-26' },
  { id: 'PAY004', creator: 'Sarah Kim',     platform: 'Twitch',    status: 'processing', amount: 3200, date: '2026-04-25' },
  { id: 'PAY005', creator: 'Priya Sharma',  platform: 'YouTube',   amount: 1800,  status: 'failed',    date: '2026-04-24' },
  { id: 'PAY006', creator: 'Jake Wilson',   platform: 'TikTok',    amount: 8100,  status: 'completed', date: '2026-03-28' },
  { id: 'PAY007', creator: 'Marcus Lee',    platform: 'Instagram', amount: 5900,  status: 'completed', date: '2026-03-27' },
];

const statusColor: any = {
  completed:  { bg: '#052e16', color: '#22c55e' },
  pending:    { bg: '#1c1408', color: '#f59e0b' },
  processing: { bg: '#0c1a3a', color: '#3b82f6' },
  failed:     { bg: '#2d0a0a', color: '#ef4444' },
};

export default function Payouts() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockPayouts.filter(p =>
    (filter === 'All' || p.status === filter.toLowerCase()) &&
    p.creator.toLowerCase().includes(search.toLowerCase())
  );

  const totalPaid    = mockPayouts.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const totalPending = mockPayouts.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const successRate  = ((mockPayouts.filter(p => p.status === 'completed').length / mockPayouts.length) * 100).toFixed(1);

  const [newPayout, setNewPayout] = useState({ creator: '', amount: '', platform: 'YouTube' });
  const [payouts,   setPayouts]   = useState(mockPayouts);
  const [message,   setMessage]   = useState('');

  const submitPayout = () => {
    if (!newPayout.creator || !newPayout.amount) { alert('Fill all fields!'); return; }
    const p = {
      id:       `PAY00${payouts.length + 1}`,
      creator:  newPayout.creator,
      platform: newPayout.platform,
      amount:   parseFloat(newPayout.amount),
      status:   'pending',
      date:     new Date().toISOString().split('T')[0]
    };
    setPayouts([p, ...payouts]);
    setMessage(`✅ Payout of $${newPayout.amount} queued for ${newPayout.creator}!`);
    setNewPayout({ creator: '', amount: '', platform: 'YouTube' });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#0a0e1a', minHeight: '100vh', color: 'white', padding: '32px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0 }}>Payout Management</h1>
          <p style={{ color: '#6b7280', margin: '4px 0 0' }}>Automated payout flows · 35% faster processing</p>
        </div>
        <a href="/" style={{ color: '#a855f7', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Paid Out',   value: `$${totalPaid.toLocaleString()}`,    color: '#22c55e' },
          { label: 'Pending Payouts',  value: `$${totalPending.toLocaleString()}`, color: '#f59e0b' },
          { label: 'Success Rate',     value: `${successRate}%`,                   color: '#a855f7' },
        ].map((card, i) => (
          <div key={i} style={{ background: '#111827', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${card.color}` }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{card.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0', color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>

        {/* New Payout Form */}
        <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginTop: 0 }}>New Payout</h3>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#6b7280', fontSize: '14px' }}>Creator Name</label>
            <input value={newPayout.creator} onChange={e => setNewPayout({ ...newPayout, creator: e.target.value })}
              placeholder="Enter name..."
              style={{ width: '100%', padding: '10px', marginTop: '6px', background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#6b7280', fontSize: '14px' }}>Amount ($)</label>
            <input type="number" value={newPayout.amount} onChange={e => setNewPayout({ ...newPayout, amount: e.target.value })}
              placeholder="0.00"
              style={{ width: '100%', padding: '10px', marginTop: '6px', background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#6b7280', fontSize: '14px' }}>Platform</label>
            <select value={newPayout.platform} onChange={e => setNewPayout({ ...newPayout, platform: e.target.value })}
              style={{ width: '100%', padding: '10px', marginTop: '6px', background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white' }}>
              {['YouTube', 'Twitch', 'Instagram', 'TikTok'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <button onClick={submitPayout}
            style={{ width: '100%', padding: '14px', background: '#a855f7', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            ⚡ Submit Payout
          </button>
          {message && <p style={{ color: '#22c55e', marginTop: '12px', fontSize: '14px' }}>{message}</p>}
        </div>

        {/* Payouts Table */}
        <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0 }}>Payout History</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Completed', 'Pending', 'Failed'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '13px',
                    background: filter === f ? '#a855f7' : '#1f2937', color: 'white' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1f2937', color: '#6b7280', textAlign: 'left' }}>
                {['ID', 'Creator', 'Platform', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ padding: '10px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: any) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: '10px', color: '#6b7280', fontSize: '13px' }}>{p.id}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{p.creator}</td>
                  <td style={{ padding: '10px', color: '#a855f7' }}>{p.platform}</td>
                  <td style={{ padding: '10px' }}>${p.amount.toLocaleString()}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', ...statusColor[p.status] }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px', color: '#6b7280', fontSize: '13px' }}>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}