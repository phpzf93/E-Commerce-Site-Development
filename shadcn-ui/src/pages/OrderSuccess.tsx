import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Mail } from 'lucide-react';

interface OrderDetails {
  id: string;
  status: string;
  amount: number;
  currency: string;
  created: string;
}

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the order details using the session_id
    // For now, we'll simulate order details
    if (sessionId) {
      setOrderDetails({
        id: sessionId,
        status: 'completed',
        amount: 0, // This would come from the actual order
        currency: 'PHP',
        created: new Date().toISOString(),
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed and is being processed.
            </p>
          </div>

          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                Order confirmation and receipt information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessionId && (
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span className="font-mono text-sm">{sessionId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-green-600 font-semibold">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Method:</span>
                <span>Magpie Payment</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Email Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email confirmation with your order details shortly.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Download className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Project Kickoff</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will contact you within 24 hours to start your project.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
              <Button variant="outline">Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}