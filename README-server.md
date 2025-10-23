Server for development and optionally serving the built React client.

Endpoints:

- GET /api/health -> { status: 'ok', uptime }
- GET /api/echo?msg=hi -> { query: { msg: 'hi' } }

To run locally:

```powershell
# from workspace root
npm install
npm start
```

If you build the client (`cd my-react-app && npm run build`), the server will serve the static files from `my-react-app/dist` automatically.
