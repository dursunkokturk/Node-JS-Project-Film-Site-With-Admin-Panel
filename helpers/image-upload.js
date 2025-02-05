const multer = require("multer");
const path = require("path");

// Upload Edilen Dosyanin Kaydedilecegi Dizin Yolunu Belirtiyoruz
const storage = multer.diskStorage({

    // Upload Islemini Fonksiyon Kullanarak Yapiyoruz
    // request Parametresi Yapilan Islem Icin Gonderilen Sorguyu Belirtiyor
    // file Parametresi Upload Edilecek Dosyanin Alinacagi Degisken Adi
    // cb Parametresi Upload Islemi Bittikten Sonra
    // Cagirilacak Fonksiyonu Beliriyor
    destination: function(request, file, cb) {

        // Dosya Upload Asamasinda Hata Olur Ise Bunu null Degiskeni Ile Yonetiyoruz
        // Dosya Upload Asamasinda Hata Olmaz Ise Dosyayi Belirtilen Dizine Aliyoruz
        cb(null, './public/images/');
    },

    // Upload Islemini Fonksiyon Kullanarak Yapiyoruz
    // request Parametresi Yapilan Islem Icin Gonderilen Sorguyu Belirtiyor
    // file Parametresi Upload Edilecek Dosyanin Alinacagi Degisken Adi
    // cb Parametresi Upload Islemi Bittikten Sonra
    // Cagirilacak Fonksiyonu Beliriyor
    filename: function(request, file, cb) {

        // null Parametresi Dosya Upload Asamasinda Hata Olur Ise Bunu null Degiskeni Ile Yonetiyoruz
        // null Parametresi Dosya Upload Asamasinda Hata Olmaz Ise Dosyayi Belirtilen Dizine Aliyoruz
        // originalname Parametresi Ile Upload Edilecek Dosyanin Orjinal Adini Aliyoruz
        // Parse Metodu Ile Orjinal Dosya Adini Ve Uzantisini Ayiriyoruz
        // Dosya Adi Ile Uzantisi Arasinda - Karakterini Ekliyoruz
        // Date.now() Kullanarak Tarih Ve Saat Bilgisini Milisecond Cinsinden Aliyoruz
        // extname Metodu Ile Dosya Uzantisini Aliyoruz
        cb(null, path.parse(file.originalname).filename + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

module.exports.upload = upload;