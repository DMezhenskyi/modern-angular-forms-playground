export interface Order {
  user: User;
  company: Company;
  itemCount: number | null;
}
export interface User {
  fullName: string;
  email: string;
}
export interface Company {
  name: string;
  country: 'AT' | 'DE' | 'CH' | 'CA' | 'OTHER' | '';
  taxID: string;
}

// TASK 1: Restructure the Order interface and extract company-related data
//         Into a `Company` interface.
