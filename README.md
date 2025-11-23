# 🤫 Anonymous Confessions - Farcaster Mini App

An anonymous confessions app for Farcaster where users can share secrets without revealing their identity.

## Features

- ✍️ Write anonymous confessions
- 👀 Read confessions from others
- 🔒 Complete anonymity
- 📱 Beautiful, responsive design
- ⚡ Fast and lightweight
- 💾 Local storage for confessions

## Project Structure

```
confessions-app/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── app.js          # Main app logic with Farcaster SDK
├── manifest.json   # Farcaster mini app manifest
└── server.py       # Simple Python server (optional)
```

## How to Run Locally

### Option 1: Using Python (Simplest)
```bash
cd /Users/mac/Documents/confessions-app
python3 -m http.server 3000
```

Then visit: http://localhost:3000

### Option 2: Using Node.js (Recommended)
First install Node.js from https://nodejs.org/, then:
```bash
cd /Users/mac/Documents/confessions-app
npx serve -p 3000
```

### Option 3: Using PHP
```bash
cd /Users/mac/Documents/confessions-app
php -S localhost:3000
```

## Testing in Farcaster

1. Start your local server (see above)
2. Open the Mini App Debug Tool: https://warpcast.com/~/developers/mini-apps
3. Enter your local URL: `http://localhost:3000`
4. Click "Preview" to test in Warpcast

## Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project directory
3. Follow the prompts
4. Your app will be deployed with a public URL

### Option 2: Netlify
1. Go to https://app.netlify.com
2. Drag and drop the `confessions-app` folder
3. Your app will be deployed instantly

### Option 3: GitHub Pages
1. Create a GitHub repository
2. Push your code
3. Enable GitHub Pages in Settings → Pages
4. Your app will be available at `https://username.github.io/repo-name`

### Option 4: Cloudflare Pages
1. Go to https://pages.cloudflare.com
2. Connect your GitHub repo or upload files
3. Deploy with one click

## Publishing to Farcaster

After deploying:

1. Go to https://warpcast.com/~/developers/mini-apps
2. Click "Create Mini App"
3. Enter your deployment URL
4. Fill in the app details:
   - Name: Anonymous Confessions
   - Description: Share your secrets anonymously
   - Icon: Upload an icon (512x512 recommended)
5. Submit for review

## How It Works

- **Anonymous by Design**: No user data is collected or stored
- **Local Storage**: Confessions are stored in browser localStorage
- **Farcaster Integration**: Uses `@farcaster/miniapp-sdk` for native features
- **No Backend**: Pure client-side app (can be extended with backend)

## Extending the App

To add a backend (for persistent confessions across users):

1. Create a simple API (Node.js, Python, etc.)
2. Store confessions in a database (MongoDB, PostgreSQL, etc.)
3. Update `app.js` to use API calls instead of localStorage
4. Deploy backend separately

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Farcaster Mini App SDK
- Local Storage API
- CSS Grid & Flexbox
- CSS Animations

## License

MIT License - feel free to use and modify!
