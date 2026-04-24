const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// ========== ENDPOINT VERIFIKASI DENGAN PARAMETER "token" ==========
// Cara panggil: /data/accesToken?token=ABC123XYZ
server.get('/data/accesToken', (req, res) => {
  const db = router.db;
  const devices = db.get('devices').value();
  const token = req.query.token;  // ← UBAH: dari deviceId jadi token
  
  // Jika parameter token tidak disertakan
  if (!token) {
    return res.status(400).json({
      status: 'Error',
      message: 'Parameter token wajib diisi',
      example: '/data/accesToken?token=ABC123XYZ'
    });
  }
  
  // Cek apakah token (device ID) ada dalam database
  const exists = devices.includes(token);
  
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

// Endpoint verifikasi dengan path parameter (opsional, tetap pakai deviceId)
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
