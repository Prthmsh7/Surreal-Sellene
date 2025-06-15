# Tomo SDK Integration Guide

This guide explains how to set up and integrate the Tomo SDK into your project, from local development to production deployment.

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- ngrok account (for development testing)
- Tomo credentials from the Reown team

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Development Setup

### 1. Local Development Server

1. Start your Vite development server:
```bash
npm run dev
```
This will run your app on `http://localhost:3000`

### 2. Setting up ngrok

1. Install ngrok globally:
```bash
npm install -g ngrok
```

2. Start ngrok tunnel for port 3000:
```bash
ngrok http 3000
```

3. Copy the generated HTTPS URL (e.g., `https://xxxx-xx-xx-xx-xx.ngrok-free.app`)

### 3. Reown Cloud Console Setup

1. Visit [Reown Cloud Console](https://cloud.reown.com)
2. Add your ngrok URL to the allowed domains list
3. Get your credentials:
   - Client ID: `foagCugAzwQrEyWjETM3x0VTAtp1YG9ZL6blI6c5rDZEGnfQxJripV1vkxxmS3nzVVGNHoDieV8NbAPlXlbNnrDj`
   - Project ID: `a6fe50d71ddcd662f68ae2708132b51f`

### 4. Project Configuration

1. Update `vite.config.js`:
```javascript
server: {
  port: 3000,
  cors: true,
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp'
  }
}
```

2. Configure Tomo SDK in `main.jsx`:
```javascript
const config = getDefaultConfig({
  clientId: 'your_client_id',
  appName: 'Sellene',
  projectId: 'your_project_id',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});
```

## File Structure

```
tomo/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx         # Entry point with Tomo configuration
│   └── components/      # React components
├── public/              # Static assets
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## Important Files

1. `main.jsx`: Contains the Tomo SDK provider setup
2. `App.jsx`: Main application component with wallet connection
3. `vite.config.js`: Development server and build configuration

## Development Workflow

1. Start local development:
```bash
npm run dev
```

2. Start ngrok tunnel:
```bash
ngrok http 3000
```

3. Update Reown Cloud Console with new ngrok URL

4. Test wallet connection:
   - Click "Connect Wallet" button
   - Choose login method (social/email)
   - Verify connection status

## Production Deployment

1. Build the project:
```bash
npm run build
```

2. Update Reown Cloud Console:
   - Add your production domain
   - Update domain verification
   - Configure production environment

3. Deploy the `dist` folder to your hosting provider

## Security Considerations

1. Never commit sensitive credentials to version control
2. Use environment variables for production deployments
3. Implement proper error handling
4. Follow Tomo SDK security best practices

## Troubleshooting

### Common Issues

1. **Cross-Origin Errors**
   - Verify ngrok URL is added to allowed domains
   - Check CORS configuration in `vite.config.js`

2. **Wallet Connection Issues**
   - Confirm Client ID and Project ID are correct
   - Check browser console for errors
   - Verify domain is properly verified in Reown Console

3. **Build Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Support

For additional support:
- Visit [Tomo Documentation](https://docs.tomo.inc)
- Contact Reown support team
- Check GitHub issues for common solutions

## License

This project is licensed under the MIT License - see the LICENSE file for details. 