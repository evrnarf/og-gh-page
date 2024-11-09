const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL bağlantısı
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'oto_galeri'
});

// API Routes
app.get('/api/araclar', (req, res) => {
    connection.query('SELECT * FROM araclar', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/api/arac/:id', (req, res) => {
    connection.query(
        'SELECT * FROM araclar WHERE id = ?',
        [req.params.id],
        (error, results) => {
            if (error) throw error;
            res.json(results[0]);
        }
    );
});

app.post('/api/contact', (req, res) => {
    const { ad, email, telefon, mesaj } = req.body;
    connection.query(
        'INSERT INTO iletisim (ad, email, telefon, mesaj) VALUES (?, ?, ?, ?)',
        [ad, email, telefon, mesaj],
        (error) => {
            if (error) throw error;
            res.json({ success: true });
        }
    );
});

app.get('/api/search', (req, res) => {
    const searchTerm = `%${req.query.term}%`;
    connection.query(
        'SELECT * FROM araclar WHERE marka LIKE ? OR model LIKE ?',
        [searchTerm, searchTerm],
        (error, results) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

// Admin Routes
app.post('/api/admin/arac', (req, res) => {
    const { marka, model, yil, km, yakit, fiyat } = req.body;
    connection.query(
        'INSERT INTO araclar (marka, model, yil, km, yakit, fiyat) VALUES (?, ?, ?, ?, ?, ?)',
        [marka, model, yil, km, yakit, fiyat],
        (error) => {
            if (error) throw error;
            res.json({ success: true });
        }
    );
});

app.put('/api/admin/arac/:id', (req, res) => {
    const { marka, model, yil, km, yakit, fiyat } = req.body;
    connection.query(
        'UPDATE araclar SET marka = ?, model = ?, yil = ?, km = ?, yakit = ?, fiyat = ? WHERE id = ?',
        [marka, model, yil, km, yakit, fiyat, req.params.id],
        (error) => {
            if (error) throw error;
            res.json({ success: true });
        }
    );
});

app.delete('/api/admin/arac/:id', (req, res) => {
    connection.query(
        'DELETE FROM araclar WHERE id = ?',
        [req.params.id],
        (error) => {
            if (error) throw error;
            res.json({ success: true });
        }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});