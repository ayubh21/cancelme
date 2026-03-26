export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';

export interface Subscription {
  id: string;
  userId: string;
  categoryId: string;
  subscriptionType: string;
  status: SubscriptionStatus;
  price: string | null;
  currency: string;
  startDate: string;
  endDate: string | null;
  renewalDate: string | null;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}
