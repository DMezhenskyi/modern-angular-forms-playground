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
