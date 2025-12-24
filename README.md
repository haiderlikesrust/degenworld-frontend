# DegenWorld Frontend

React frontend for DegenWorld - A self-evolving on-chain city simulation game.

## Features

- 3D interactive city map (Three.js)
- Solana wallet integration (Phantom)
- Real-time game state updates
- Job system with AI riddles
- Quest system
- NPC chat
- AI events and planning
- Responsive design

## Setup

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure API URL:**
   Create `.env` file:
   ```bash
   REACT_APP_API_URL=https://your-backend-api.com/api
   ```
   Or for local development:
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_API_URL` | Yes | Backend API base URL |

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd client
   vercel
   ```

3. Add environment variable:
   - Go to Vercel dashboard
   - Settings → Environment Variables
   - Add `REACT_APP_API_URL` with your backend URL

### Netlify

1. Connect GitHub repository
2. Set build directory to `client`
3. Set build command: `npm install --legacy-peer-deps && npm run build`
4. Set publish directory: `client/build`
5. Add environment variable: `REACT_APP_API_URL`

### Cloudflare Pages

1. Connect GitHub repository
2. Set build directory to `client`
3. Set build command: `npm install --legacy-peer-deps && npm run build`
4. Set output directory: `build`
5. Add environment variable: `REACT_APP_API_URL`

### GitHub Pages

1. Update `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/degenworld-frontend"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Project Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/      # React components
│   ├── services/        # API service
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
└── package.json
```

## Technologies

- React 18
- React Router DOM
- Three.js / React Three Fiber
- Axios
- Solana Web3.js
- Inter font

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

