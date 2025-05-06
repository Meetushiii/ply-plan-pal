
export interface PlywoodSheet {
  id: string;
  type: string; // e.g., "Birch", "Oak", "Pine"
  grade: string; // e.g., "A", "B", "C"
  thickness: number; // in mm
  width: number; // in mm
  length: number; // in mm
  quantity: number;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  supplier: string;
  notes?: string;
  lastUpdated: string;
  updatedBy: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

export interface Transaction {
  id: string;
  type: 'addition' | 'removal';
  plywoodId: string;
  quantity: number;
  date: string;
  performedBy: string;
  reason: string;
  notes?: string;
}

// Mock data for initial testing
export const mockPlywoodData: PlywoodSheet[] = [
  {
    id: '1',
    type: 'Birch',
    grade: 'A',
    thickness: 18,
    width: 1220,
    length: 2440,
    quantity: 24,
    location: 'Rack A1',
    purchaseDate: '2023-09-15',
    purchasePrice: 45.99,
    supplier: 'Premium Wood Supplies',
    lastUpdated: '2023-10-01',
    updatedBy: 'John Doe'
  },
  {
    id: '2',
    type: 'Oak',
    grade: 'B',
    thickness: 12,
    width: 1220,
    length: 2440,
    quantity: 18,
    location: 'Rack B3',
    purchaseDate: '2023-08-22',
    purchasePrice: 38.50,
    supplier: 'Forest Products Inc.',
    notes: 'Some sheets have minor defects on edges',
    lastUpdated: '2023-09-28',
    updatedBy: 'Jane Smith'
  },
  {
    id: '3',
    type: 'Pine',
    grade: 'C',
    thickness: 9,
    width: 1220,
    length: 2440,
    quantity: 32,
    location: 'Rack C2',
    purchaseDate: '2023-10-05',
    purchasePrice: 29.99,
    supplier: 'Budget Timber Co.',
    lastUpdated: '2023-10-05',
    updatedBy: 'Alice Johnson'
  },
  {
    id: '4',
    type: 'Maple',
    grade: 'A',
    thickness: 24,
    width: 1220,
    length: 2440,
    quantity: 12,
    location: 'Rack A4',
    purchaseDate: '2023-09-30',
    purchasePrice: 62.75,
    supplier: 'Premium Wood Supplies',
    lastUpdated: '2023-10-02',
    updatedBy: 'John Doe'
  },
  {
    id: '5',
    type: 'Walnut',
    grade: 'A',
    thickness: 18,
    width: 1220,
    length: 2440,
    quantity: 8,
    location: 'Rack D1',
    purchaseDate: '2023-09-18',
    purchasePrice: 85.00,
    supplier: 'Luxury Hardwoods',
    notes: 'Premium quality, store with care',
    lastUpdated: '2023-09-29',
    updatedBy: 'Robert Brown'
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Premium Wood Supplies',
    contactPerson: 'Mike Peterson',
    email: 'mike@premiumwood.com',
    phone: '555-123-4567',
    address: '123 Timber Lane, Woodville, WA 98123'
  },
  {
    id: '2',
    name: 'Forest Products Inc.',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@forestproducts.com',
    phone: '555-987-6543',
    address: '456 Cedar Street, Pinetown, OR 97301'
  },
  {
    id: '3',
    name: 'Budget Timber Co.',
    contactPerson: 'Tom Williams',
    email: 'tom@budgettimber.com',
    phone: '555-456-7890',
    address: '789 Pine Road, Oakfield, CA 90210'
  },
  {
    id: '4',
    name: 'Luxury Hardwoods',
    contactPerson: 'Elizabeth Chen',
    email: 'elizabeth@luxuryhardwoods.com',
    phone: '555-234-5678',
    address: '101 Walnut Avenue, Mapleville, NY 10001'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'addition',
    plywoodId: '1',
    quantity: 25,
    date: '2023-09-15',
    performedBy: 'John Doe',
    reason: 'Initial stock',
  },
  {
    id: '2',
    type: 'removal',
    plywoodId: '1',
    quantity: 1,
    date: '2023-09-25',
    performedBy: 'Jane Smith',
    reason: 'Project #A2984',
  },
  {
    id: '3',
    type: 'addition',
    plywoodId: '2',
    quantity: 20,
    date: '2023-08-22',
    performedBy: 'John Doe',
    reason: 'Restocking',
  },
  {
    id: '4',
    type: 'removal',
    plywoodId: '2',
    quantity: 2,
    date: '2023-09-10',
    performedBy: 'Alice Johnson',
    reason: 'Project #B3421',
  },
];

// Utility functions for the mock database
export const getNextId = (items: { id: string }[]): string => {
  const maxId = Math.max(...items.map(item => parseInt(item.id)));
  return (maxId + 1).toString();
};

export const formatDate = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};
