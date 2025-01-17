import cors from 'cors'

const ACCEPTED_ORIGINS = [
  process.env.Deployed,
  process.env.Local
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
