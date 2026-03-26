export type SubscriptionCategory = 'all' | 'entertainment' | 'productivity' | 'finance' | 'lifestyle';

export type Subscription = {
  id: string;
  name: string;
  plan: string;
  price: number;
  currency: string;
  expiresOn: string;
  category: Exclude<SubscriptionCategory, 'all'>;
  color: string;
  initial: string;
  logoUrl: string;
};

export const CATEGORIES: { id: SubscriptionCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'finance', label: 'Finance' },
  { id: 'lifestyle', label: 'Lifestyle' },
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'YouTube',
    plan: 'Individual',
    price: 13.99,
    currency: '$',
    expiresOn: '01.09.2025',
    category: 'entertainment',
    color: '#FF0000',
    initial: '▶',
    logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=youtube.com',
  },
  {
    id: '2',
    name: 'Spotify',
    plan: 'Duo',
    price: 16.99,
    currency: '$',
    expiresOn: '01.09.2025',
    category: 'entertainment',
    color: '#1DB954',
    initial: 'S',
    logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=spotify.com',
  },
  {
    id: '3',
    name: 'Netflix',
    plan: 'Standard plan',
    price: 17.99,
    currency: '$',
    expiresOn: '01.09.2025',
    category: 'entertainment',
    color: '#E50914',
    initial: 'N',
    logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=netflix.com',
  },
  {
    id: '4',
    name: 'Adobe Creative Cloud',
    plan: 'Standard plan',
    price: 54.99,
    currency: '$',
    expiresOn: '01.09.2025',
    category: 'productivity',
    color: '#FF61F6',
    initial: 'Ai',
    logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=adobe.com',
  },
  {
    id: '5',
    name: 'Figma',
    plan: 'Professional',
    price: 12.00,
    currency: '$',
    expiresOn: '01.09.2025',
    category: 'productivity',
    color: '#A259FF',
    initial: 'F',
    logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=figma.com',
  },
  {
    id: '6',
    name: 'iCloud+',
    plan: '200 GB',
    price: 2.99,
    currency: '$',
    expiresOn: '15.10.2025',
    category: 'productivity',
    color: '#3B82F6',
    initial: 'iC',
    logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=icloud.com',
  },
  {
    id: '7',
    name: 'Headspace',
    plan: 'Annual',
    price: 12.99,
    currency: '$',
    expiresOn: '20.11.2025',
    category: 'lifestyle',
    color: '#F97316',
    initial: 'H',
    logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=headspace.com',
  },
  {
    id: '8',
    name: 'YNAB',
    plan: 'Monthly',
    price: 14.99,
    currency: '$',
    expiresOn: '05.10.2025',
    category: 'finance',
    color: '#85C0FF',
    initial: 'Y',
    logoUrl: 'https://www.google.com/s2/favicons?sz=128&domain=ynab.com',
  },
];
