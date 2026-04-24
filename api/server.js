const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

// Gunakan middleware default (logging, CORS, static)
server.use(middlewares);

// Custom route untuk endpoint /data/register
server.get('/data/register', (req, res) => {
  // Baca data dari router.db
  const db = router.db;
  const devices = db.get('devices').value();
  
  res.json({
    status: 'success',
    endpoint: '/data/register',
    total_devices: devices.length,
    devices: devices
  });
});

// Gunakan router default json-server
server.use(router);

module.exports = server;
