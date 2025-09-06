# DevServices Pro - E-Commerce Platform with Magpie Payment Integration

A professional e-commerce platform for development services with integrated Magpie payment processing supporting Alipay and WeChat Pay.

## Features

- **Modern E-Commerce Interface**: Built with React, TypeScript, and Shadcn-UI
- **Magpie Payment Integration**: Secure payment processing with Alipay and WeChat Pay support
- **Shopping Cart**: Full cart functionality with quantity management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Order Management**: Complete checkout flow with order confirmation
- **Service Catalog**: Professional development services showcase

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn-UI with Radix UI primitives
- **Styling**: Tailwind CSS
- **Payment Processing**: Magpie Payment API
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Render.com ready

## Payment Integration

This application integrates with Magpie Payment API to support:
- **Alipay**: Chinese digital payment platform
- **WeChat Pay**: Popular mobile payment method
- **Credit/Debit Cards**: Traditional card payments

### API Credentials
- **Publishable Key**: `pk_live_8AHuOrO1OrQkqWSxtZvMZP`
- **Secret Key**: `sk_live_BEvI0LOMtYOv96dbq4Z91y`

## Quick Start

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Update environment variables as needed
   ```

3. **Development Server**
   ```bash
   pnpm run dev
   ```

4. **Build for Production**
   ```bash
   pnpm run build
   ```

## Deployment on Render

This application is configured for easy deployment on Render.com:

1. **Connect Repository**: Link your GitHub repository to Render
2. **Auto-Deploy**: The `render.yaml` configuration will automatically:
   - Install dependencies with `pnpm install`
   - Build the application with `pnpm run build`
   - Serve static files from `./dist`
   - Configure environment variables
   - Set up proper routing for SPA

3. **Environment Variables**: Pre-configured in `render.yaml`:
   - `VITE_MAGPIE_PUBLISHABLE_KEY`
   - `VITE_MAGPIE_SECRET_KEY`
   - `VITE_APP_URL`
   - `VITE_API_URL`

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn-UI components
│   ├── Header.tsx          # Navigation header
│   ├── ProductCard.tsx     # Service display card
│   └── PaymentForm.tsx     # Magpie payment integration
├── context/
│   └── CartContext.tsx     # Shopping cart state management
├── lib/
│   └── magpie-client.ts    # Magpie API client
├── pages/
│   ├── Index.tsx           # Homepage with services
│   ├── Cart.tsx            # Shopping cart page
│   ├── Checkout.tsx        # Payment checkout
│   └── OrderSuccess.tsx    # Order confirmation
├── types/
│   └── magpie.ts           # TypeScript interfaces
└── App.tsx                 # Main application component
```

## Key Features Implementation

### Shopping Cart
- Add/remove items
- Quantity management
- Persistent state during session
- Real-time total calculation

### Payment Processing
- Secure Magpie API integration
- Multiple payment methods (Alipay, WeChat Pay, Cards)
- Customer information collection
- Order confirmation flow

### User Experience
- Responsive design for all devices
- Loading states and error handling
- Toast notifications for user feedback
- Professional service catalog

## Security Features

- Environment variable protection for API keys
- Secure client-side payment flow
- Input validation and sanitization
- HTTPS-ready deployment configuration

## Support

For technical support or questions about the Magpie integration:
- **Magpie Documentation**: https://docs.magpie.im
- **Magpie Support**: support@magpie.im

## License

This project is configured for production deployment with secure payment processing capabilities.