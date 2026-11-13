const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'lapangan.json');

function getLapanganData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    return [];
  }
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/lapangan' && req.method === 'GET') {
    const data = getLapanganData();
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'success', total: data.length, data }));
  } else if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      app: 'Sistem Informasi Pemetaan Lapangan Olahraga Kota Palu',
      kelompok: 'Kelompok 8 RPL - Kelas TI C',
      endpoints: ['GET /api/lapangan']
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ status: 'error', message: 'Endpoint tidak ditemukan' }));
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server RPL Lapangan Olahraga berjalan di http://localhost:${PORT}`);
  });
}

module.exports = { server, getLapanganData };
