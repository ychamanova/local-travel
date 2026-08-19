# Local Travel

Local Travel helps you find outdoor recreation spots near you — national and state parks, trails, and landmarks — without having to venture far from home. It was built with COVID-era "stay close to home" travel in mind: share your location, and the app surfaces nearby facilities you can save to a personal list.

## Features

- **Geolocation-based search** — uses the browser's geolocation API to detect where you are and looks up the nearest city automatically.
- **Nearby facility results** — queries the [Recreation.gov (RIDB) API](https://ridb.recreation.gov/) for parks, trails, and landmarks within a 25-mile radius.
- **Google sign-in** — authentication via Google OAuth 2.0 (Passport.js).
- **Save favorite places** — logged-in users can heart a facility to save it to their profile, stored in MongoDB.

## Tech stack

**Backend**
- Node.js / Express
- MongoDB with Mongoose
- Passport.js (`passport-google-oauth20`) for authentication
- `cookie-session` for session handling
- Axios for outbound API calls (RIDB, GeoDB)

**Frontend** (`client/`)
- React 16 with Redux + `redux-thunk`
- React Router
- CSS Modules
- Font Awesome icons

## Project structure

```
.
├── index.js               # Express app entry point
├── config/
│   ├── keys.js             # picks dev.js or prod.js based on NODE_ENV
│   ├── dev.js               # local secrets — gitignored, you create this
│   └── prod.js               # reads secrets from environment variables
├── middlewares/
│   └── requireLogin.js     # rejects requests from unauthenticated users
├── models/
│   └── User.js             # Mongoose schema: googleId, savedPlaces
├── services/
│   └── passport.js         # Google OAuth strategy
├── routes/
│   ├── authRoutes.js       # /auth/google, /api/current_user, /api/logout
│   ├── apiRoutes.js        # /facilities (RIDB), /city (GeoDB)
│   └── actionRoutes.js     # /save, /savedPlaces
└── client/                 # Create React App frontend
    └── src/
        ├── actions/ & reducers/   # Redux
        └── components/
            ├── Header/
            ├── Landing/           # main search + results view
            ├── Dashboard/
            ├── SavedPlaces/
            └── Common/
```

## Getting started

### Prerequisites

- Node `12.16.2` and npm `6.14.4` (see `engines` in `package.json`)
- A MongoDB instance (local or Atlas)
- A [Google OAuth 2.0](https://console.developers.google.com/) client ID/secret
- A [Recreation.gov RIDB API key](https://ridb.recreation.gov/landing)

### Install dependencies

```bash
npm install
npm install --prefix client
```

### Configure environment

Create `config/dev.js` (gitignored — not committed) with:

```js
module.exports = {
  googleClientID: 'YOUR_GOOGLE_CLIENT_ID',
  googleClientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  mongoURI: 'YOUR_MONGODB_CONNECTION_STRING',
  cookieKey: 'ANY_RANDOM_STRING',
  recreationKey: 'YOUR_RIDB_API_KEY',
};
```

For production, the same values are read from environment variables (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `MONGO_URI`, `COOKIE_KEY`) — see `config/prod.js`.

### Run locally

```bash
npm run dev
```

This runs the Express API (with `nodemon`) and the React dev server concurrently. The client proxies API requests to the server (see `client/src/setupProxy.js`).

Other scripts:

| Command | Description |
| --- | --- |
| `npm run server` | Run only the Express API with `nodemon` |
| `npm run client` | Run only the React dev server |
| `npm start` | Run the Express server (production mode) |

### Build for production

```bash
npm install --prefix client
npm run build --prefix client
NODE_ENV=production npm start
```

When `NODE_ENV=production`, Express serves the built React app from `client/build`.
