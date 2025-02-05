// express Library yi Ekliyoruz
const express = require("express");

// express Library Uzerinden
// Router Interface ini Kullaniyoruz
const router = express.Router();

// Proje Klasoru Icindeki data Klasoru Icinde
// Database Baglantisi Icin Gereken Kodlarin Modul Haline Getirildigi 
// db.js Dosyasini Projeye Import Ediyoruz
const db = require("../data/db");

router.use("/blogs/category/:category_id", async function(request, response) {

    // Tiklanilan Kisimdaki id Bilgisi Ile 
    // Database Icinde Eslesen Bir Deger Varsa
    // O Degeri Aliyoruz
    const id = request.params.categoryid;
    try {

        // Tiklanilan Yaziya Denk Gelen id Bilgisi Ile 
        // Database Icindeki Data nin id Bilgisinin Eslesmesini Bekliyoruz
        const [blogs, ] = await db.execute("select * from blog where category_id=?", [id]); 
        const [categories, ] = await db.execute("select * from category");

        response.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: id
        })
    }
    catch(err) {
        console.log(err);
    }
});

router.use("/blogs/:blog_id", async function(request, response) {

    // Tiklanilan Kisimdaki id Bilgisi Ile 
    // Database Icinde Eslesen Bir Deger Varsa
    // O Degeri Aliyoruz
    const id = request.params.blog_id;
    try {

        // Tiklanilan Yaziya Denk Gelen id Bilgisi Ile 
        // Database Icindeki Data nin id Bilgisinin Eslesmesini Bekliyoruz
        const [blogs, ] = await db.execute("select * from blog where blog_id=?", [id]);

        const blog = blogs[0];

        // Tiklanilan Yaziya Denk Gelen id Bilgisinin 
        // Database Icinde Karsiligi Var Ise
        // Detay Bilgilerini Gosteriyoruz
        if(blog) {

            // Sayfa Yonlendirme Isleminde SendFile Yerine
            // render Kullaniliyor
            return response.render("users/blog-details", {

                // Tiklanilan Yaziya Denk Gelen id Bilgisi Ile Esleyen 
                // Bilgiler Arasindan Almamiz Gerekenleri Aliyoruz
                title: blog.title,
                blog: blog
            });
        }

        // Tiklanilan Yaziya Denk Gelen id Bilgisinin 
        // Database Icinde Karsiligi Yok Ise
        // Ana Sayfaya Yonlendiriyoruz
        response.redirect("/");
    }
    catch(err) {
        console.log(err);
    }
});

router.use("/blogs", async function(request, response) {
    try {
        const [blogs, ] = await db.execute("select * from blog where approval=1")
        const [categories, ] = await db.execute("select * from category");

        response.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: null
        })
    }
    catch(err) {
        console.log(err);
    }
});

router.use("/", async function(request, response) {
    try {

        // Database Icinde Yapilan approval Ve home_page Islem Sonuclarina Gore 
        // Filtreleme Islemi Yapiyoruz
        const [blogs, ] = await db.execute("select * from blog where approval=1 and home_page=1")
        const [categories, ] = await db.execute("select * from category");

        response.render("users/index", {
            title: "Popüler Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: null
        })
    }
    catch(err) {
        console.log(err);
    }
});
 
module.exports = router;