const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// ========== ENDPOINT VERIFIKASI: /data/accesToken ==========
// Cara panggil: /data/accesToken?deviceId=ABC123XYZ
server.get('/data/accesToken', (req, res) => {
  const db = router.db;
  const devices = db.get('devices').value();
  const deviceId = req.query.deviceId;
  
  // Jika parameter deviceId tidak disertakan
  if (!deviceId) {
    return res.status(400).json({
      error: 'Parameter deviceId wajib diisi',
      example: '/data/accesToken?deviceId=ABC123XYZ'
    });
  }
  
  // Cek apakah device ID ada dalam database
  const exists = devices.includes(deviceId);
  
  if (exists) {
    res.json({
      status: 'Success'
    });
  } else {
    res.status(404).json({
      status: 'None'
    });
  }
});

// Endpoint lain (opsional)
server.get('/verify/:deviceId', (req, res) => {
  const db = router.db;
  const devices = db.get('devices').value();
  const deviceId = req.params.deviceId;
  const exists = devices.includes(deviceId);
  
  if (exists) {
    res.json({ status: 'Success', device_id: deviceId });
  } else {
    res.status(404).json({ status: 'None', device_id: deviceId });
  }
});

server.use(router);
module.exports = server;
