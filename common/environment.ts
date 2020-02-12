export const environment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  db: { url: process.env.DB_URl || 'mongodb://localhost:27017/meat-api' },
}
