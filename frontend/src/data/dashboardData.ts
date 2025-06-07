import { FaChartLine, FaUsers, FaCoins, FaLock, FaMusic, FaPalette, FaBook } from 'react-icons/fa'

// Overview Data
export const overviewStats = [
  {
    title: "Total Sales",
    value: "$24,500",
    change: "+12%",
    icon: FaChartLine,
    color: "brand.blue"
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "+8%",
    icon: FaUsers,
    color: "brand.green"
  },
  {
    title: "Total Revenue",
    value: "$45,678",
    change: "+15%",
    icon: FaCoins,
    color: "brand.yellow"
  },
  {
    title: "Protected IPs",
    value: "567",
    change: "+23%",
    icon: FaLock,
    color: "brand.red"
  }
]

// Geography Data
export const geographyData = {
  countries: [
    { name: "United States", value: 35 },
    { name: "United Kingdom", value: 25 },
    { name: "Germany", value: 15 },
    { name: "France", value: 10 },
    { name: "Japan", value: 8 },
    { name: "Others", value: 7 }
  ],
  regions: [
    { name: "North America", value: 40 },
    { name: "Europe", value: 35 },
    { name: "Asia", value: 15 },
    { name: "Others", value: 10 }
  ]
}

// Monthly Data
export const monthlyData = {
  sales: [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 15000 },
    { month: "Mar", value: 18000 },
    { month: "Apr", value: 22000 },
    { month: "May", value: 25000 },
    { month: "Jun", value: 28000 },
    { month: "Jul", value: 30000 },
    { month: "Aug", value: 32000 },
    { month: "Sep", value: 35000 },
    { month: "Oct", value: 38000 },
    { month: "Nov", value: 40000 },
    { month: "Dec", value: 45000 }
  ],
  users: [
    { month: "Jan", value: 800 },
    { month: "Feb", value: 950 },
    { month: "Mar", value: 1100 },
    { month: "Apr", value: 1250 },
    { month: "May", value: 1400 },
    { month: "Jun", value: 1550 },
    { month: "Jul", value: 1700 },
    { month: "Aug", value: 1850 },
    { month: "Sep", value: 2000 },
    { month: "Oct", value: 2150 },
    { month: "Nov", value: 2300 },
    { month: "Dec", value: 2450 }
  ]
}

// Breakdown Data
export const breakdownData = {
  categories: [
    { name: "Music", value: 35, icon: FaMusic },
    { name: "Art", value: 25, icon: FaPalette },
    { name: "Writing", value: 20, icon: FaBook },
    { name: "Other", value: 20, icon: FaChartLine }
  ],
  subcategories: {
    music: [
      { name: "Songs", value: 40 },
      { name: "Albums", value: 30 },
      { name: "Soundtracks", value: 20 },
      { name: "Other", value: 10 }
    ],
    art: [
      { name: "Digital Art", value: 45 },
      { name: "Paintings", value: 25 },
      { name: "Sculptures", value: 20 },
      { name: "Other", value: 10 }
    ],
    writing: [
      { name: "Books", value: 50 },
      { name: "Articles", value: 30 },
      { name: "Poems", value: 15 },
      { name: "Other", value: 5 }
    ]
  }
}

// Daily Data
export const dailyData = {
  stats: [
    { day: "Monday", users: 65, sales: 1200 },
    { day: "Tuesday", users: 59, sales: 1100 },
    { day: "Wednesday", users: 80, sales: 1500 },
    { day: "Thursday", users: 81, sales: 1600 },
    { day: "Friday", users: 56, sales: 1000 },
    { day: "Saturday", users: 55, sales: 900 },
    { day: "Sunday", users: 40, sales: 800 }
  ],
  recentTransactions: [
    {
      id: 1,
      asset: "Summer Vibes Album",
      category: "Music",
      amount: 1200,
      date: "2024-03-15",
      status: "completed"
    },
    {
      id: 2,
      asset: "Digital Art Collection",
      category: "Art",
      amount: 2500,
      date: "2024-03-14",
      status: "pending"
    },
    {
      id: 3,
      asset: "Novel Rights",
      category: "Writing",
      amount: 3500,
      date: "2024-03-13",
      status: "completed"
    },
    {
      id: 4,
      asset: "Song License",
      category: "Music",
      amount: 800,
      date: "2024-03-12",
      status: "completed"
    },
    {
      id: 5,
      asset: "Art Exhibition",
      category: "Art",
      amount: 1800,
      date: "2024-03-11",
      status: "pending"
    }
  ]
}

// Portfolio Data
export const portfolioData = {
  totalValue: 24500,
  activeInvestments: 12,
  totalReturns: 3200,
  diversity: 85,
  recentTransactions: dailyData.recentTransactions,
  trendingAssets: [
    {
      id: 1,
      name: "Summer Vibes Album",
      category: "Music",
      price: 1200,
      trend: "+15%",
      owners: 3
    },
    {
      id: 2,
      name: "Digital Art Collection",
      category: "Art",
      price: 2500,
      trend: "+8%",
      owners: 5
    },
    {
      id: 3,
      name: "Novel Rights",
      category: "Writing",
      price: 3500,
      trend: "+12%",
      owners: 2
    }
  ]
} 