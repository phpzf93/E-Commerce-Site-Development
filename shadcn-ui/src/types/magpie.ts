// Magpie payment integration types
export interface MagpieConfig {
  publishableKey: string;
  secretKey: string;
  apiUrl?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'alipay' | 'wechat_pay' | 'card';
  status: 'pending' | 'succeeded' | 'failed';
}

export interface CheckoutSession {
  id: string;
  url: string;
  payment_status: 'unpaid' | 'paid' | 'no_payment_required';
  amount_total: number;
  currency: string;
  success_url: string;
  cancel_url: string;
}

export interface LineItem {
  name: string;
  amount: number;
  currency: string;
  quantity: number;
  description?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  metadata?: Record<string, string>;
}

export interface Charge {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  description?: string;
  customer?: string;
  source?: string;
}

export interface CreateCheckoutSessionParams {
  line_items: LineItem[];
  success_url: string;
  cancel_url: string;
  customer_email?: string;
  payment_method_types?: string[];
  mode?: 'payment' | 'subscription';
  metadata?: Record<string, string>;
}

export interface MagpieError {
  type: string;
  message: string;
  code?: string;
  param?: string;
}