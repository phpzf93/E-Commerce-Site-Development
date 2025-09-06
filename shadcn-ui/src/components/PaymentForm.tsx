import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, QrCode, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { magpieClient } from '@/lib/magpie-client';
import { toast } from 'sonner';

interface PaymentFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function PaymentForm({ onSuccess, onError }: PaymentFormProps) {
  const { items, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const paymentMethods = [
    {
      id: 'alipay',
      name: 'Alipay',
      description: 'Pay with Alipay',
      icon: QrCode,
    },
    {
      id: 'wechat_pay',
      name: 'WeChat Pay',
      description: 'Pay with WeChat Pay',
      icon: Smartphone,
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with card',
      icon: CreditCard,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsLoading(true);

    try {
      // Convert cart items to Magpie line items
      const lineItems = items.map(item => ({
        name: item.name,
        amount: Math.round(item.price * item.quantity * 100), // Convert to centavos
        currency: 'php',
        quantity: item.quantity,
        description: item.description,
      }));

      // Create checkout session
      const session = await magpieClient.createCheckoutSession({
        line_items: lineItems,
        success_url: `${window.location.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/cart`,
        customer_email: customerInfo.email,
        payment_method_types: [paymentMethod],
        mode: 'payment',
        metadata: {
          customer_name: customerInfo.name,
          customer_phone: customerInfo.phone || '',
        },
      });

      // Redirect to Magpie checkout
      await magpieClient.redirectToCheckout(session.id);
      
      // Clear cart on successful redirect
      clearCart();
      onSuccess?.();
      
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Complete your order by providing your payment details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                disabled={isLoading}
              />
            </div>
          </div>

          <Separator />

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              disabled={isLoading}
            >
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent transition-colors">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                      <Icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-muted-foreground">{method.description}</div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₱{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isLoading || items.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay ₱${total.toLocaleString()}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}