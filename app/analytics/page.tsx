'use client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const cohortData = [
  { cohort: 'Jan',  w1: 100, w2: 85, w3: 72, w4: 65, w5: 61, w6: 58, w7: 56, w8: 55 },
  { cohort: 'Feb',  w1: 100, w2: 88, w3: 76, w4: 69, w5: 65, w6: 62, w7: 60, w8: 59 },
  { cohort: 'Mar',  w1: 100, w2: 82, w3: 70, w4: 63, w5: 59, w6: 57, w7: 55, w8: 54 },
  { cohort: 'Apr',  w1: 100, w2: 90, w3: 79, w4: 73, w5: 69, w6: 67, w7: 65, w8: 64 },
];

const revenueByPlatform = [
  { platform: 'YouTube',   revenue: 45000, creators: 180 },
  { platform: 'TikTok',    revenue: 38000, creators: 145 },
  { platform: 'Instagram', revenue: 29000, creators: 110 },
  { platform: 'Twitch',    revenue: 18000, creators: 66  },
];

const growthData = [
  { month: 'Jan', newCreators: 42,  churned: 8,  net: 34  },
  { month: 'Feb', newCreators: 58,  churned: 12, net: 46  },
  { month: 'Mar', newCreators: 51,  churned: 15, net: 36  },
  { month: 'Apr', newCreators: 74,  churned: 10, net: 64  },
  { month: 'May', newCreators: 89,  churned: 9,  net: 80  },
  { month: 'Jun', newCreators: 102, churned: 11, net: 91  },
];

const platformShare = [
  { name: 'YouTube',   value: 36 },
  { name: 'TikTok',    value: 29 },
  { name: 'Instagram', value: 22 },
  { name: 'Twitch',    value: 13 },
];

const COLORS = ['#a855f7', '#22c55e', '#f59e0b', '#ec4899'];

export default function Analytics() {
  const [selectedCohort, setSelectedCohort] = useState('Apr');
  const cohort = cohortData.find(c => c.cohort === selectedCohort) || cohortData[0];
  const retentionLine = ['w1','w2','w3','w4','w5','w6','w7','w8'].map(w => ({
    week: w.toUpperCase(), retention: (cohort as any)[w]
  }));

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#0a0e1a', minHeight: '100vh', color: 'white', padding: '32px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0 }}>Analytics & Retention</h1>
          <p style={{ color: '#6b7280', margin: '4px 0 0' }}>Cohort analysis · Churn reduction · Growth tracking</p>
        </div>
        <a href="/" style={{ color: '#a855f7', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Avg Retention W8', value: '58%',   color: '#a855f7', change: '+12%' },
          { label: 'Churn Reduced',    value: '35%',   color: '#22c55e', change: 'vs last quarter' },
          { label: 'Net New Creators', value: '351',   color: '#f59e0b', change: '+23% MoM' },
          { label: 'Total Revenue',    value: '$130K',  color: '#ec4899', change: '+41% YoY' },
        ].map((card, i) => (
          <div key={i} style={{ background: '#111827', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${card.color}` }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{card.label}</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 4px', color: card.color }}>{card.value}</p>
            <p style={{ color: '#22c55e', fontSize: '12px', margin: 0 }}>{card.change}</p>
          </div>
        ))}
      </div>

      {/* Cohort Retention */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0 }}>Cohort Retention Curve</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {cohortData.map(c => (
                <button key={c.cohort} onClick={() => setSelectedCohort(c.cohort)}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                    background: selectedCohort === c.cohort ? '#a855f7' : '#1f2937', color: 'white', fontSize: '13px' }}>
                  {c.cohort}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={retentionLine}>
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: 'white' }}
                formatter={(v: any) => [`${v}%`, 'Retention']} />
              <Line type="monotone" dataKey="retention" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Share */}
        <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginTop: 0 }}>Platform Share</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={platformShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
                label={({ name, value }) => `${name} ${value}%`}>
                {platformShare.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: 'white' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth + Revenue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginTop: 0 }}>Creator Growth (Net New vs Churned)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={growthData}>
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: 'white' }} />
              <Bar dataKey="newCreators" fill="#22c55e" radius={[4,4,0,0]} name="New" />
              <Bar dataKey="churned"     fill="#ef4444" radius={[4,4,0,0]} name="Churned" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: '#111827', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginTop: 0 }}>Revenue by Platform</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1f2937', color: '#6b7280', textAlign: 'left' }}>
                {['Platform', 'Revenue', 'Creators', 'Avg/Creator'].map(h => (
                  <th key={h} style={{ padding: '10px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueByPlatform.map((p, i) => (
                <tr key={p.platform} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: '10px', color: COLORS[i], fontWeight: 'bold' }}>{p.platform}</td>
                  <td style={{ padding: '10px' }}>${p.revenue.toLocaleString()}</td>
                  <td style={{ padding: '10px' }}>{p.creators}</td>
                  <td style={{ padding: '10px', color: '#22c55e' }}>${Math.round(p.revenue / p.creators)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}