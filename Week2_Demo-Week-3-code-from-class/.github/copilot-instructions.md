# AI Agent Instructions for Week2_Demo Project

## Project Architecture

This is a full-stack web application with:
- Express.js backend (`app.js`)
- React frontend (`client/src/`)
- In-memory data model (`models/item.js`)

### Key Components

1. **Backend (Express.js)**
   - Entry: `app.js` - Main server with CORS middleware and API routes
   - Port: 3000
   - API endpoints:
     - `GET /items` - List all items
     - Other CRUD operations for items

2. **Frontend (React)**
   - Entry: `client/src/App.jsx`
   - Uses React hooks for state management
   - API communication via fetch to `http://localhost:3000`
   - Component structure:
     - `ItemForm` - Reusable form for create/edit operations
     - `App` - Main component with items CRUD logic

3. **Data Model**
   - `models/item.js` - In-memory item store using Map
   - Item schema: `{ id: string, name: string, description: string }`
   - Includes validation logic for items

## Development Workflows

1. **Starting the Application**
   ```
   # Start backend
   npm start

   # Start frontend dev server (in separate terminal)
   npm run client:dev
   ```

2. **Building for Production**
   ```
   npm run client:build
   npm run client:preview  # Preview production build
   ```

## Project Patterns

1. **State Management**
   - Frontend uses React's `useState` for local state
   - Items fetched on visibility change (see `App.jsx` useEffect)
   - CRUD operations trigger immediate UI refresh

2. **API Communication**
   - Backend implements CORS for dev server access
   - Frontend centralizes API URL as constant
   - Standard REST endpoints with JSON payloads

3. **Error Handling**
   - Model includes validation for required fields
   - Frontend gracefully handles API failures (empty array fallback)
   - Backend middleware logs all requests

## Integration Points

1. **Client-Server Communication**
   - All API calls from frontend centralized in `App.jsx`
   - Backend CORS configured for frontend dev server
   - JSON content type required for POST/PUT requests

2. **Data Flow**
   - In-memory data store in `ItemModel` class
   - REST API endpoints map to model methods
   - Frontend state syncs via explicit refresh calls