
import * as Bearer from 'express-oauth2-jwt-bearer'

export const jwtCheck = Bearer.auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH_TOKEN_SIGNING_ALG
})
