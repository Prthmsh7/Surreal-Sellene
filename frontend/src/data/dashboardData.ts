import { FaChartLine, FaUsers, FaCoins, FaLock, FaPalette, FaImage, FaPaintBrush, FaCamera } from 'react-icons/fa'

// Overview Data
export const overviewStats = [
  {
    title: "Total Art Sales",
    value: "$124,500",
    change: "+18%",
    icon: FaChartLine,
    color: "brand.blue"
  },
  {
    title: "Active Artists",
    value: "2,567",
    change: "+12%",
    icon: FaUsers,
    color: "brand.green"
  },
  {
    title: "Total Revenue",
    value: "$245,678",
    change: "+25%",
    icon: FaCoins,
    color: "brand.yellow"
  },
  {
    title: "Art Pieces",
    value: "15,234",
    change: "+32%",
    icon: FaPalette,
    color: "brand.purple"
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
    { month: "Jan", value: 45000 },
    { month: "Feb", value: 52000 },
    { month: "Mar", value: 58000 },
    { month: "Apr", value: 62000 },
    { month: "May", value: 68000 },
    { month: "Jun", value: 72000 },
    { month: "Jul", value: 78000 },
    { month: "Aug", value: 85000 },
    { month: "Sep", value: 92000 },
    { month: "Oct", value: 98000 },
    { month: "Nov", value: 105000 },
    { month: "Dec", value: 124500 }
  ],
  users: [
    { month: "Jan", value: 1800 },
    { month: "Feb", value: 1950 },
    { month: "Mar", value: 2100 },
    { month: "Apr", value: 2250 },
    { month: "May", value: 2400 },
    { month: "Jun", value: 2550 },
    { month: "Jul", value: 2700 },
    { month: "Aug", value: 2850 },
    { month: "Sep", value: 3000 },
    { month: "Oct", value: 3150 },
    { month: "Nov", value: 3300 },
    { month: "Dec", value: 3450 }
  ]
}

// Breakdown Data
export const breakdownData = {
  categories: [
    { name: "Digital Art", value: 45, icon: FaPalette },
    { name: "Photography", value: 25, icon: FaCamera },
    { name: "Illustrations", value: 20, icon: FaPaintBrush },
    { name: "Other", value: 10, icon: FaImage }
  ],
  subcategories: {
    digitalArt: [
      { name: "NFTs", value: 50 },
      { name: "Digital Paintings", value: 30 },
      { name: "3D Art", value: 15 },
      { name: "Other", value: 5 }
    ],
    photography: [
      { name: "Fine Art", value: 40 },
      { name: "Portraits", value: 30 },
      { name: "Landscape", value: 20 },
      { name: "Other", value: 10 }
    ],
    illustrations: [
      { name: "Character Design", value: 45 },
      { name: "Concept Art", value: 25 },
      { name: "Comics", value: 20 },
      { name: "Other", value: 10 }
    ]
  }
}

// Daily Data
export const dailyData = {
  stats: [
    { day: "Monday", users: 165, sales: 5200 },
    { day: "Tuesday", users: 159, sales: 5100 },
    { day: "Wednesday", users: 180, sales: 5500 },
    { day: "Thursday", users: 181, sales: 5600 },
    { day: "Friday", users: 156, sales: 5000 },
    { day: "Saturday", users: 155, sales: 4900 },
    { day: "Sunday", users: 140, sales: 4800 }
  ],
  recentTransactions: [
    {
      id: 1,
      asset: "Digital Landscape #123",
      category: "Digital Art",
      amount: 2.5,
      date: "2024-03-15",
      status: "completed"
    },
    {
      id: 2,
      asset: "Portrait Collection",
      category: "Photography",
      amount: 1.8,
      date: "2024-03-14",
      status: "pending"
    },
    {
      id: 3,
      asset: "Character Design Set",
      category: "Illustrations",
      amount: 3.2,
      date: "2024-03-13",
      status: "completed"
    },
    {
      id: 4,
      asset: "Abstract NFT #456",
      category: "Digital Art",
      amount: 1.5,
      date: "2024-03-12",
      status: "completed"
    },
    {
      id: 5,
      asset: "Fine Art Photography",
      category: "Photography",
      amount: 2.8,
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
      name: "Digital Landscape #123",
      category: "Digital Art",
      price: 2.5,
      trend: "+15%",
      owners: 3
    },
    {
      id: 2,
      name: "Portrait Collection",
      category: "Photography",
      price: 1.8,
      trend: "+8%",
      owners: 5
    },
    {
      id: 3,
      name: "Character Design Set",
      category: "Illustrations",
      price: 3.2,
      trend: "+12%",
      owners: 2
    }
  ]
} 