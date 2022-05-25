require('dotenv').config()

export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const googleClientId = process.env.GOOGLE_CLIENT_ID;
export const googleRedirectURL = process.env.GOOGLE_REDIRECT_URL;

export const moorseUrl = process.env.MOORSE_URL;
export const moorseToken = process.env.MOORSE_TOKEN;
export const moorseIntegration = process.env.MOORSE_INTEGRATION;
export const applicationPort = process.env.APPLICATION_PORT;

export const databasePort = process.env.PORT;
export const databaseUser = process.env.DATABASE_USER;
export const databasePass = process.env.DATABASE_PASS;
export const databaseName = process.env.DATABASE_NAME;