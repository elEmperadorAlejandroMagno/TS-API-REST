import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:1234',
  'http://127.0.0.1:5000',
  'http://localhost:5500'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}): any => cors({
  origin: (origin, callback) => {
    if (origin === undefined) {
      return callback(null, true)
    }
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
})
