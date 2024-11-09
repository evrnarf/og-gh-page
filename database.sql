CREATE DATABASE oto_galeri;
USE oto_galeri;

CREATE TABLE araclar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marka VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    yil INT NOT NULL,
    km INT NOT NULL,
    yakit VARCHAR(20) NOT NULL,
    fiyat DECIMAL(10, 2) NOT NULL,
    kategori VARCHAR(20) NOT NULL,
    resimler JSON,
    ozellikler JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE iletisim (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefon VARCHAR(20) NOT NULL,
    mesaj TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kullanicilar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullanici_adi VARCHAR(50) NOT NULL UNIQUE,
    sifre VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'editor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Örnek veri ekleme
INSERT INTO araclar (marka, model, yil, km, yakit, fiyat, kategori) VALUES
('Mercedes', 'C200d AMG', 2023, 15000, 'Dizel', 2250000.00, 'sedan'),
('BMW', '520i', 2023, 0, 'Benzin', 2850000.00, 'sedan'),
('Audi', 'Q8', 2022, 25000, 'Dizel', 3150000.00, 'suv');