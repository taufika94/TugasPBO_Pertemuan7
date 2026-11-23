const fs = require('fs');

// 1. Process app.js
let app = fs.readFileSync('app.js', 'utf8');
app = app.split('<span>\u2192</span>').join('');
app = app.replace('Berikutnya \u2192', 'Berikutnya');
app = app.replace('\u2190 <span class="nav-btn-lbl">Tema </span>Sebelumnya', '<span class="nav-btn-lbl">Tema </span>Sebelumnya');
fs.writeFileSync('app.js', app, 'utf8');

// 2. Process index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.split('<span>\u2192</span>\n').join('');
html = html.split('<span>\u2192</span>').join('');
html = html.replace('Buka Pintu (Unlock) \u2192', 'Buka Pintu (Unlock)');
html = html.replace('Generate QR Tamu \u2192', 'Generate QR Tamu');
html = html.replace('Pesan Slot \u2192', 'Pesan Slot');
html = html.replace('Bayar via Virtual Account \u2192', 'Bayar via Virtual Account');
html = html.replace('Buat Laporan \u2192', 'Buat Laporan');
html = html.replace('Kirim SOS \u2192', 'Kirim SOS');
html = html.split('<span class="back-arrow">\u2190</span>').join('');
fs.writeFileSync('index.html', html, 'utf8');

console.log('Successfully stripped all arrow symbols');
