import { MagpieConfig, CreateCheckoutSessionParams, CheckoutSession, MagpieError } from '@/types/magpie';

class MagpieClient {
  private publishableKey: string;
  private apiUrl: string;

  constructor(config: MagpieConfig) {
    this.publishableKey = config.publishableKey;
    this.apiUrl = config.apiUrl || 'https://api.magpie.im/v1';
  }

  async createCheckoutSession(params: CreateCheckoutSessionParams): Promise<CheckoutSession> {
    try {
      const response = await fetch(`${this.apiUrl}/checkout/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.publishableKey}`,
        },
        body: JSON.stringify({
          ...params,
          payment_method_types: params.payment_method_types || ['alipay', 'wechat_pay'],
        }),
      });

      if (!response.ok) {
              const error: MagpieError = await response.json();
              throw new Error(
                error.message || 
                `Failed to create checkout session (${response.status}): ${
                  error.code ? `[${error.code}] ` : ''
                }${error.param ? `Invalid parameter: ${error.param}` : 'Unknown error'}`
              );
            }
            return await response.json();
          } catch (error) {
            console.error('Magpie checkout session creation failed:', error);
            throw error;
          }
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/checkout/sessions/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${this.publishableKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve checkout session');
      }

      const session: CheckoutSession = await response.json();
      window.location.href = session.url;
    } catch (error) {
      console.error('Redirect to checkout failed:', error);
      throw error;
    }
  }
}

// Initialize Magpie client with environment variables
export const magpieClient = new MagpieClient({
  publishableKey: import.meta.env.VITE_MAGPIE_PUBLISHABLE_KEY || '',
  secretKey: import.meta.env.VITE_MAGPIE_SECRET_KEY || '',
});

export default MagpieClient;