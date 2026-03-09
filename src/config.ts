export const DEMO_CONFIG = {
  ownerName: 'Marcus Chen',
  groupName: 'Chen Hospitality Group',
  version: 'v1.0',
}

export const RESTAURANTS = [
  {
    id: 'harbor',
    name: 'Harbor Kitchen',
    short: 'Harbor',
    location: 'Walker\'s Point, Milwaukee',
    type: 'Full-Service · Japanese Fusion',
    seats: 85,
    staff: 22,
    partners: [
      { name: 'Marcus Chen', pct: 40 },
      { name: 'Sofia Ruiz', pct: 35 },
      { name: 'Daniel Park', pct: 25 },
    ],
    color: 'emerald',
    accent: '#10b981',
  },
  {
    id: 'loft',
    name: 'The Loft',
    short: 'Loft',
    location: 'Mequon Public Market',
    type: 'Fast Casual · Sushi & Ramen',
    seats: 45,
    staff: 11,
    partners: [
      { name: 'Marcus Chen', pct: 50 },
      { name: 'Sofia Ruiz', pct: 50 },
    ],
    color: 'blue',
    accent: '#3b82f6',
  },
  {
    id: 'omakase',
    name: 'Omakase 76',
    short: 'O76',
    location: 'East Side, Milwaukee',
    type: 'Omakase · Hand Roll Bar',
    seats: 32,
    staff: 9,
    partners: [
      { name: 'Marcus Chen', pct: 45 },
      { name: 'James Okafor', pct: 30 },
      { name: 'East Side Hospitality LLC', pct: 25 },
    ],
    color: 'amber',
    accent: '#f59e0b',
    opening: true,
  },
]
