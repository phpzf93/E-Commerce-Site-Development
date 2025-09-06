import { Header } from '@/components/Header';
import { PaymentForm } from '@/components/PaymentForm';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Checkout() {
  const { items } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to cart if no items
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  const handlePaymentSuccess = () => {
    // This will be handled by the redirect to success page
    console.log('Payment initiated successfully');
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // Error handling is done in the PaymentForm component
  };

  if (items.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">
              Complete your purchase securely with Magpie Payment
            </p>
          </div>
          
          <PaymentForm 
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    </div>
  );
}