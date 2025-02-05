// Proje Ve Database Arasindaki Baglantiyi Kuruyoruz
const express = require("express");

const app = express();

// Ilk Parametre Global Olarak Kullanilan Engine Adi
// Ikinci Parametre Kullanilacak Template Adi
app.set("view engine", "ejs");

// Form Uzerinden Girilen Bilgileri 
// JSON Formati Haline Gelmesini Sagliyoruz
app.use(express.urlencoded({ extended: false }));

const path = require("path");

// user.js Dosyasini Import Ediyoruz 
// user Bilgilerini Ana Dosyadan Erisilebilir Hale Getiriyoruz
const userRoutes = require("./routes/user");

// admin.js Dosyasini Import Ediyoruz
const adminRoutes = require("./routes/admin");

// Bootstrap Kullanilan Proje Icin
// node_modules Klasoru Icindeki
// jpg - css - js - png - html
// Uzantili Dosyalarin Erisime Acik Hale Gelmesini Sagliyoruz
app.use("/libs", express.static(path.join(__dirname, "node_modules")));

// Bootstrap Kullanilan Proje Icin
// public Klasoru Icindeki 
// jpg - css - js - png - html 
// Uzantili Dosyalarin Erisime Acik Hale Gelmesini Sagliyoruz
app.use("/static", express.static(path.join(__dirname, "public")));

// user.js Dosyasini middlewear Olarak Ana Proje Ekliyoruz
// admin.js Dosyasinda Yapilan Yonlendirme Islemlerinde Her Seferinde admin
// Eklemek Yerine Tek Bir Kez Yazdiktan Sonra Yonlendirme Yapmak Daha Kolay Olur
app.use("/admin", adminRoutes);

// user.js Dosyasini middlewear Olarak Ana Proje Ekliyoruz
app.use(userRoutes); 

// Belirtilen Port Numarasi Uzerinden 
// Calisacak Olan Islemi Fonksiyon Olarak Calistiriyoruz
app.listen(3000, function() {
    console.log("listening on port 3000");
});