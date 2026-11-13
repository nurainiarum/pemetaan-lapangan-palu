const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'lapangan.json');

test('1. Validasi keberadaan file database fasilitas lapangan.json', () => {
  assert.equal(fs.existsSync(dataPath), true, 'File data/lapangan.json harus ada');
});

test('2. Validasi format file adalah JSON Array yang valid', () => {
  const content = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(content);
  assert.equal(Array.isArray(data), true, 'Data lapangan harus berupa array JSON');
  assert.ok(data.length > 0, 'Database minimal memiliki 1 data lapangan');
});

test('3. Validasi struktur field wajib pada setiap fasilitas lapangan', () => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const mandatoryFields = ['id', 'nama', 'kategori', 'alamat', 'latitude', 'longitude', 'status'];

  for (const item of data) {
    for (const field of mandatoryFields) {
      assert.ok(item[field] !== undefined, `Field "${field}" wajib ada pada data: ${item.nama || item.id}`);
    }
  }
});

test('4. Validasi koordinat GIS berada dalam batas wilayah geografis Kota Palu', () => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const item of data) {
    assert.equal(typeof item.latitude, 'number', `Latitude harus numerik pada ${item.nama}`);
    assert.equal(typeof item.longitude, 'number', `Longitude harus numerik pada ${item.nama}`);
    
    // Batas koordinat Kota Palu sekitar -1.1 s/d -0.7 (Lat) dan 119.7 s/d 120.1 (Long)
    assert.ok(item.latitude >= -1.1 && item.latitude <= -0.7, `Latitude ${item.latitude} di luar area Palu`);
    assert.ok(item.longitude >= 119.7 && item.longitude <= 120.1, `Longitude ${item.longitude} di luar area Palu`);
  }
});

test('5. Validasi logika penolakan input fasilitas tanpa nama', () => {
  const invalidField = { kategori: 'Futsal', alamat: 'Palu' };
  const isValid = Boolean(invalidField.nama && invalidField.nama.trim().length > 0);
  // Sengaja digagalkan untuk simulasi Failed Run CI:
  assert.equal(isValid, true, 'Fasilitas tanpa nama tidak boleh valid');
});
