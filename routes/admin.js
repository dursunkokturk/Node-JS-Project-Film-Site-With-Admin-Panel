// express Library yi Ekliyoruz
const express = require("express");

// express Library Uzerinden
// Router Interface ini Kullaniyoruz
const router = express.Router();

// Dosya Upload Edilirken Ayni Dosyadan Daha Once Var Ise
// Onceki Dosyayi Silmek Icin Kullaniyoruz
const fs = require("fs");

// Proje Klasoru Icindeki data Klasoru Icinde
// Database Baglantisi Icin Gereken Kodlarin Modul Haline Getirildigi 
// db.js Dosyasini Projeye Import Ediyoruz
const db = require("../data/db");

// Fotograf Upload Islemini Dahil Ediyoruz
const imageUpload = require("../helpers/image-upload");

// Blog List Uzerinden Gosterilen Bilgilerin Database den Silinmesi Asamasinda
// GET Metodu Kullanilabilir
router.get("/blog/delete/:blog_id", async function(request, response){

    // Delete Butonuna Tiklandiginda id Bilgisi Uzerinden 
    // Database Icinde Eslesen Bir Deger Varsa
    // O Degeri Siliyoruz
    const blogid = request.params.blog_id;

    try {

        // Database Icindeki blog Tablosu Icindeki Data larin Hepsini Tarama Yapiyoruz
        // Delete Butonuna Tiklandiginda Denk Gelen id Bilgisi Ile
        // Database Icindeki id Bilgilerini Karsilastiriyoruz
        const [blogs,] = await db.execute("select * from blog where blog_id=?", [blogid]);
        const blog = blogs[0];

        // Sayfa Yonlendirme Isleminde SendFile Yerine
        // render Kullaniliyor
        response.render("admin/blog-delete", {
            title: "delete blog",
            blog: blog
        });
    }
    catch(err) {
        console.log(err); 
    }
});

// Blog List Uzerinden Gosterilen Bilgilerin Database den Silinmesi Asamasinda
// POST Metodu Kullanilabilir
router.post("/blog/delete/:blog_id", async function(request, response) {
    const blogid = request.body.blog_id;
    try {

        // Database Icindeki blog Tablosu Icindeki Data larin Hepsini Tarama Yapiyoruz
        // Delete Butonuna Tiklandiginda Denk Gelen id Bilgisi Ile
        // Database Icindeki id Bilgilerini Karsilastiriyoruz
        await db.execute("delete from blog where blog_id=?", [blogid]);

        // Delete Isleminin Yapildigini Kod Olarak Bildirmek Icin
        // Kullanici Mesajina Yonlendiriyoruz
        response.redirect("/admin/blogs?action=delete");
    }
    catch(err) {
        console.log(err);
    }
});

// categories delete
router.get("/category/delete/:category_id", async function(request, response){
    const categoryid = request.params.category_id;

    try {
        const [categories,] = await db.execute("select * from category where category_id=?", [categoryid]);
        const category = categories[0];

        response.render("admin/category-delete", {
            title: "delete category",
            category: category
        });
    }
    catch(err) {
        console.log(err);
    }
});

router.post("/category/delete/:category_id", async function(request, response) {
    const categoryid = request.body.category_id;
    try {
        await db.execute("delete from category where category_id=?", [categoryid]);

        // Delete Isleminin Yapildigini Kod Olarak Bildirmek Icin
        // Kullanici Mesajina Yonlendiriyoruz
        response.redirect("/admin/categories?action=delete");
    }
    catch(err) {
        console.log(err);
    }
});

// Form Uzerinden Girilecek Bilgilerin Database e Gonderilmesi Asamasinda
// GET Metodu Kullanilabilir
router.get("/blog/create", async function(request, response) {
    try {

        // Database Icindeki category Tablosu Icindeki Data larin Hepsini Tarama Yapiyoruz
        const [categories, ] = await db.execute("select * from category");

        // Sayfa Yonlendirme Isleminde SendFile Yerine
        // render Kullaniliyor
        response.render("admin/blog-create", {
            title: "add blog",
            categories: categories
        });
    }
    catch(err) {
        console.log(err);
    }
});

// Form Uzerinden Girilecek Bilgilerin Database e Gonderilmesi Asamasinda
// POST Metodu Kullanilabilir
// Database e Gonderilen Data lar Icine 
// imageUpload Degiskeni Uzerinden
// image-upload.js Dosyasi Icindeki upload Degiskeni Uzerinden
// Database e Eklenecek Fotograf Bilgisini De Ekliyoruz
router.post("/blog/create", imageUpload.upload.single("image"), async function(request, response) {
    
    // Form Uzerinden Girilen Bilgileri Database e Gondermek Icin
    // Eslestirme Yapiyoruz
    const title = request.body.title;
    const subhead = request.body.subhead;
    const description = request.body.description;

    // Fotograf Bilgilerini Dosya Uzerinden Aliyoruz
    const image = request.file.filename;
    const homepage = request.body.home_page == "on" ? 1:0;
    const approval = request.body.approval == "on"? 1:0;
    const category = request.body.category;

    try {
        console.log(image);

        // Form Uzerinden Girilen Bilgileri Database e Gondermek Icin
        // Girilen Bilgileri Database Icindeki Sutunlara Kaydediyoruz
        await db.execute("INSERT INTO blog(title, subhead, description, image, home_page, approval, category_id) VALUES (?,?,?,?,?,?,?)", [title, subhead, description, image, homepage, approval, category]);
        
        // Database e Data Ekleme Isleminin Yapildigini Kod Olarak Bildirmek Icin
        // Kullanici Mesajina Yonlendiriyoruz
        response.redirect("/admin/blogs?action=create");
    }
    catch(err) {
        console.log(err);
    }
});

// Form Uzerinden Girilecek Bilgilerin Database e Gonderilmesi Asamasinda
// GET Metodu Kullanilabilir
router.get("/category/create", async function(request, response) {
    try {

        // Database Icine Eklenecek Data nin Eklendigi Sayfaya Yonlendiriyoruz
        response.render("admin/category-create", {
            title: "add category"
        });
    }
    catch(err) {
        console.log(err);
    }
});

// Form Uzerinden Girilecek Bilgilerin Database e Gonderilmesi Asamasinda
// POST Metodu Kullanilabilir
router.post("/category/create", async function(request, response) {
    const categoryname = request.body.category_name;
    try {
        await db.execute("INSERT INTO category(category_name) VALUES (?)", [categoryname]);

        // Database e Data Ekleme Isleminin Yapildigini Kod Olarak Bildirmek Icin
        // Kullanici Mesajina Yonlendiriyoruz
        response.redirect("/admin/categories?action=create");
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/blogs/:blog_id", async function(request, response) {

    // Edit Butonuna Tiklandiginda id Bilgisi Uzerinden 
    // Database Icinde Eslesen Bir Deger Varsa
    // O Degeri Aliyoruz
    const blogid = request.params.blog_id;

    try {

        // id Bilgisi Uzerinden Eslesen Data Var Ise
        // Bu Data yi Aliyoruz
        const [blogs, ] = await db.execute("select * from blog where blog_id=?", [blogid]);

        // id Bilgisi Uzerinden Eslesen Data ya Ait Category Bilgisi Var Ise
        // Bu Category Bilgilerini Aliyoruz
        const [categories, ] = await db.execute("select * from category");
        const blog = blogs[0];

        // id Bilgisi Uzerinden Database Icinde Esleyen Data Var Ise
        if(blog) {

            // Tablo Icinde Data lari Gosteriyoruz
            return response.render("admin/blog-edit", {
                title: blog.title,
                blog: blog,
                categories: categories
            });
        }

        // id Bilgisi Uzerinden Database Icinde Esleyen Data Yok Ise
        // Database Icindeki Data larin Listelendigi Sayfaya Gonderiyoruz
        response.redirect("admin/blogs");
    }
    catch(err) {
        console.log(err);
    }
});

// id Bilgisine Gore Database den Alinan Data larin Update Isleminden Sonra
// id Bilgisine Gore Tekrar Database e Kaydedilmesi Gerekiyor.
// imageUpload Degiskeni Uzerinden
// image-upload.js Dosyasi Icindeki upload Degiskeni Uzerinden
// Database e Eklenecek Fotograf Bilgisini De Ekliyoruz
router.post("/blogs/:blog_id", imageUpload.upload.single("image"), async function(request, response) {
    
    // Form Uzerinden Guncellenen Bilgileri Database e Gondermek Icin
    // Eslestirme Yapiyoruz
    const blogid = request.body.blog_id;
    const title = request.body.title;
    const subhead = request.body.subhead;
    const description = request.body.description;
    let image = request.body.image;

    if(request.file) {

        // Var Olan Fotograf Bilgisini Aliyoruz
        image = request.file.filename;

        // unlink Metodu Ile Silinmek Istenilen Dosyanin Dizin Yolunu Belirtiyoruz
        fs.unlink("./public/images/" + request.body.image, err => {
            console.log(err);
        });
    }

    const homepage = request.body.home_page == "on" ? 1 : 0;
    const approval = request.body.approval == "on" ? 1 : 0;
    const categoryid = request.body.category;

    try {

        // Form Uzerinden Guncellenen Bilgileri Database e Kaydetmek Icin
        // Girilen Bilgileri Database Icindeki Sutunlara Kaydediyoruz
        await db.execute("UPDATE blog SET title=?,subhead=?, description=?, image=?, home_page=?, approval=?, category_id=? WHERE blog_id=?", [title,subhead,description, image,homepage,approval,categoryid, blogid]);
        
        // Database deki Data nin Guncelleme Isleminin Yapildigini Kod Olarak Bildirmek Icin
        // Kullanici Mesajina Yonlendiriyoruz
        response.redirect("/admin/blogs?action=edit&blog_id=" + blogid);
    }
    catch(err) {
        console.log(err);
    }
});

// categories edit
router.get("/categories/:category_id", async function(request, response) {

    // Edit Butonuna Tiklandiginda id Bilgisi Uzerinden 
    // Database Icinde Eslesen Bir Deger Varsa
    // O Degeri Aliyoruz
    const categoryid = request.params.category_id;

    try {

        // id Bilgisi Uzerinden Eslesen Data Var Ise
        // Bu Data yi Aliyoruz
        const [categories, ] = await db.execute("select * from category where category_id=?", [categoryid]);
        const category = categories[0];

        // id Bilgisi Uzerinden Database Icinde Esleyen Data Var Ise
        if(category) {
            return response.render("admin/category-edit", {

                // Tablo Icinde Data lari Gosteriyoruz
                title: category.category_name,
                category: category
            });
        }

        // id Bilgisi Uzerinden Database Icinde Esleyen Data Yok Ise
        // Database Icindeki Data larin Listelendigi Sayfaya Gonderiyoruz
        response.redirect("admin/categories");
    }
    catch(err) {
        console.log(err);
    }
});

router.post("/categories/:category_id", async function(request, response) {
    const categoryid = request.body.category_id;
    const categoryname = request.body.category_name;


    try {
        await db.execute("UPDATE category SET category_name=? where category_id=?", [categoryname, categoryid]);
        response.redirect("/admin/categories?action=edit&category_id=" + categoryid);
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/blogs", async function(request, response) {
    try {

        // Database Icinde Yer Alan Data lardan Icinden
        // Alacagimiz Bilgileri Ve Bilgilerin Bulundugu Table Bilgisini Yaziyoruz
        const [blogs,] = await db.execute("select blog_id, title, subhead, image from blog");
        response.render("admin/blog-list", {
            title: "blog list",
            blogs: blogs,

            // Yapilan Islemlerin Kod Olarak Bilgilendirildigi 
            // Satirlarden Gelen Bilgileri Aliyoruz
            action: request.query.action,

            // Yapilan Islemlerin Kod Olarak Bilgilendirildigi 
            // Satirlara Ait Bilgileri Aliyoruz
            // Yapilan Isleme Ait Istenilen Bilgileri 
            // Kullaniciya Islem Sonunda
            // Bilgilendirme Yapabiliriz
            blogid: request.query.blog_id
        });
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/categories", async function(request, response) {
    try {
        const [categories,] = await db.execute("select * from category");
        response.render("admin/category-list", {
            title: "blog list",
            categories: categories,

            // Yapilan Islemlerin Kod Olarak Bilgilendirildigi 
            // Satirlarden Gelen Bilgileri Aliyoruz
            action: request.query.action,

            // Yapilan Islemlerin Kod Olarak Bilgilendirildigi 
            // Satirlara Ait Bilgileri Aliyoruz
            // Yapilan Isleme Ait Istenilen Bilgileri 
            // Kullaniciya Islem Sonunda
            // Bilgilendirme Yapabiliriz
            categoryid: request.query.category_id
        });
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;