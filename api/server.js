
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// *** ENDPOINT BARU: /connect/acces ***
server.get('/connect/acces', (req, res) => {
  const db = router.db;
  const devices = db.get('devices').value();
  
  res.json({
    status: 'connected',
    message: 'Akses berhasil',
    total_devices: devices.length,
    devices: devices,
    endpoint: '/connect/acces',
    timestamp: new Date().toISOString()
  });
});

// Endpoint /data/register (dari sebelumnya)
server.get('/data/register', (req, res) => {
  const db = router.db;
  const devices = db.get('devices').value();
  
  res.json({
    success: true,
    message: 'Data device ID berhasil diambil',
    endpoint: '/data/register',
    total_devices: devices.length,
    devices: devices,
    timestamp: new Date().toISOString()
  });
});

server.use(router);
module.exports = server;
