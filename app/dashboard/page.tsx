'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockCreators = [
  { id: 1, name: 'Alex Chen',     platform: 'YouTube',   subscribers: 125000, revenue: 4500, growth: 12.5, status: 'active' },
  { id: 2, name: 'Sarah Kim',     platform: 'Twitch',    subscribers: 89000,  revenue: 3200, growth: 8.3,  status: 'active' },
  { id: 3, name: 'Marcus Lee',    platform: 'Instagram', subscribers: 210000, revenue: 6800, growth: 22.1, status: 'active' },
  { id: 4, name: 'Priya Sharma',  platform: 'YouTube',   subscribers: 45000,  revenue: 1800, growth: -2.4, status: 'churned' },
  { id: 5, name: 'Jake Wilson',   platform: 'TikTok',    subscribers: 380000, revenue: 9200, growth: 35.6, status: 'active' },
];

const revenueData = [
  { month: 'Jan', revenue: 18000, creators: 420 },
  { month: 'Feb', revenue: 22000, creators: 445 },
  { month: 'Mar', revenue: 19500, creators: 438 },
  { month: 'Apr', revenue: 28000, creators: 462 },
  { month: 'May', revenue: 31000, creators: 478 },
  { month: 'Jun', revenue: 35000, creators: 501 },
];

const retentionData = [
  { week: 'W1', retention: 100 },
  { week: 'W2', retention: 82  },
  { week: 'W3', retention: 74  },
  { week: 'W4', retention: 68  },
  { week: 'W5', retention: 65  },
  { week: 'W6', retention: 63  },
  { week: 'W7', retention: 61  },
  { week: 'W8', retention: 60  },
];

export default function Dashboard() {
  const [search,   setSearch]   = useState('');
  const [platform, setPlatform] = useState('All');

  const filtered = mockCreators.filter(c =>
    (platform === 'All' || c.platform === platform) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue   = mockCreators.reduce((s, c) => s + c.revenue, 0);
  const activeCreators = mockCreators.filter(c => c.status === 'active').length;
  const churnRate      = ((mockCreators.filter(c => c.status === 'churned').length / mockCreators.length) * 100).toFixed(1);
  const avgRevenue     = (totalRevenue / mockCreators.length).toFixed(0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#0a0e1a', minHeight: '100vh', color: 'white', padding: '32px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0 }}>Creator Dashboard</h1>
          <p style={{ color: '#6b7280', margin: '4px 0 0' }}>500+ beta users · Real-time analytics</p>
        </div>
        <a href="/" style={{ color: '#a855f7', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Revenue',    value: `$${totalRevenue.toLocaleString()}`, color: '#a855f7' },
          { label: 'Active Creators',  value: activeCreators,                       color: '#22c55e' },
          { label: 'Churn Rate',       value: `${churnRate}%`,                      color: '#f59e0b' },
          { label: 'Avg Revenue',      value: `$${avgRevenue}`,                     color: '#ec4899' },
        ].map((card, i) => (
          <div key={i} style={{ background: '#111827', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${card.color}` }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{card.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0', color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginTop: 0 }}>Monthly Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: 'white' }} />
              <Bar dataKey="revenue" fill="#a855f7" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginTop: 0 }}>Cohort Retention (8 weeks)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={retentionData}>
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: 'white' }} />
              <Line type="monotone" dataKey="retention" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Creator Table */}
      <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>Creator Roster</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input placeholder="Search creators..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 12px', background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white' }} />
            <select value={platform} onChange={e => setPlatform(e.target.value)}
              style={{ padding: '8px 12px', background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: 'white' }}>
              {['All', 'YouTube', 'Twitch', 'Instagram', 'TikTok'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1f2937', color: '#6b7280', textAlign: 'left' }}>
              {['Creator', 'Platform', 'Subscribers', 'Revenue', 'Growth', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1f2937' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{c.name}</td>
                <td style={{ padding: '12px', color: '#a855f7' }}>{c.platform}</td>
                <td style={{ padding: '12px' }}>{c.subscribers.toLocaleString()}</td>
                <td style={{ padding: '12px' }}>${c.revenue.toLocaleString()}</td>
                <td style={{ padding: '12px', color: c.growth > 0 ? '#22c55e' : '#ef4444' }}>
                  {c.growth > 0 ? '↑' : '↓'} {Math.abs(c.growth)}%
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px',
                    background: c.status === 'active' ? '#052e16' : '#2d0a0a',
                    color: c.status === 'active' ? '#22c55e' : '#ef4444' }}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}