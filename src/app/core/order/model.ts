export interface Order {
  fullName: string;
  email: string;
  itemCount: number | null;
  companyName: string;
  country: 'AT' | 'DE' | 'CH' | 'CA' | 'OTHER' | '';
  taxID: string;
}
