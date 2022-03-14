import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
  "298950770954-mgh7fed1uki24sha9lh1sur5dgtv7hrt.apps.googleusercontent.com",
  "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",
  "http://localhost:5432/google/auth"
);

export const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

export const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});