// Temporary database implementation for IP data
export type IPData = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  totalShares: number;
  soldShares: number;
  owners: number;
  files: {
    audio?: File;
    pdf?: File;
    video?: File;
    images: File[];
  };
  legalDocument: string;
  createdAt: Date;
  creator: string;
}

class TempIPDatabase {
  private ips: Map<string, IPData>;

  constructor() {
    this.ips = new Map();
  }

  // Create a new IP
  createIP(data: Omit<IPData, 'id' | 'createdAt' | 'soldShares' | 'owners'>): IPData {
    const id = `ip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newIP: IPData = {
      ...data,
      id,
      createdAt: new Date(),
      soldShares: 0,
      owners: 0,
    };
    this.ips.set(id, newIP);
    return newIP;
  }

  // Get all IPs
  getAllIPs(): IPData[] {
    return Array.from(this.ips.values());
  }

  // Get IP by ID
  getIPById(id: string): IPData | undefined {
    return this.ips.get(id);
  }

  // Update IP
  updateIP(id: string, data: Partial<IPData>): IPData | undefined {
    const ip = this.ips.get(id);
    if (!ip) return undefined;

    const updatedIP = { ...ip, ...data };
    this.ips.set(id, updatedIP);
    return updatedIP;
  }

  // Delete IP
  deleteIP(id: string): boolean {
    return this.ips.delete(id);
  }

  // Get IPs by category
  getIPsByCategory(category: string): IPData[] {
    return Array.from(this.ips.values()).filter(ip => ip.category === category);
  }

  // Get IPs by creator
  getIPsByCreator(creator: string): IPData[] {
    return Array.from(this.ips.values()).filter(ip => ip.creator === creator);
  }

  // Update shares and owners
  updateShares(id: string, shares: number): IPData | undefined {
    const ip = this.ips.get(id);
    if (!ip) return undefined;

    const updatedIP = {
      ...ip,
      soldShares: ip.soldShares + shares,
      owners: ip.owners + 1,
    };
    this.ips.set(id, updatedIP);
    return updatedIP;
  }
}

// Create a singleton instance
const tempIPDatabase = new TempIPDatabase();

export { tempIPDatabase as default, type IPData }; 