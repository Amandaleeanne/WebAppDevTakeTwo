import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())

// Simple health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

// Example API endpoint
app.get('/api/echo', (req, res) => {
  res.json({ query: req.query })
})

// Serve my-react-app build if present at ./my-react-app/dist
const clientDist = path.join(__dirname, 'my-react-app', 'dist')
app.use(express.static(clientDist))

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'), err => {
    if (err) {
      res.status(404).send('Not found')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
