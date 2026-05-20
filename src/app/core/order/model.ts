export interface Order {
  user: User;
  company: Company;
  businessPurchase: boolean;
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
