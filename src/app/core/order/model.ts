export interface Order {
  user: User;
  itemCount: number | null;
  companyName: string;
  country: 'AT' | 'DE' | 'CH' | 'CA' | 'OTHER' | '';
  taxID: string;
}
export interface User {
  fullName: string;
  email: string;
}

// TASK 1: Restructure the Order interface and extract company-related data
//         Into a `Company` interface.
