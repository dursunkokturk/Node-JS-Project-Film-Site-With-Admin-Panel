# Project Screens
![alt text](/ss/ss1.jpg)

![alt text](/ss/ss2.jpg)

![alt text](/ss/ss3.jpg)

![alt text](/ss/ss4.jpg)

![alt text](/ss/ss5.jpg)


# Purpose of the Project
Retrieving, updating and deleting data in MySQL database via admin panel.

# Creating the Project

## Creating User and Admin Operations in Routes Folder
Grouping User and Admin Processes Separately in Routes Folder

### Admin operations :
Using router interface via express library in admin.js
using the fs module for file operations
Getting data from database with get method
Sending the result of the operation to the database with post method

### User operations :
Using router interface via express library in user.js
using the fs module for file operations
Retrieving data from database with use method according to the desired conditions

#### Operations on Database Linked Files in Project
Using MySQL as a database
Adding, deleting and updating blog categories and photos via database

### Establishing the Connection between Project and Database
Create database connection in project folder and config.js file

# Nodemon
We use it to quickly display the operations performed in the project on the screen.

# Express JS
It performs communication with Node JS for fast development of web pages using Node JS Frameeork.

# EJS
It ensures that the Request sent to the database on web pages dynamically receives the Response from the database.

# Steps in the Creation of the Project
* Using Nodejs framework.
* Using nodemon to quickly display the operations performed in the project on the screen.
* Realizing communication with node js for fast development of web pages using express js.
* Ensuring that the request sent to the database and the response from the database arrive dynamically on web pages using ejs.
* Usage middleware.
* Storing data sent from web pages to database using mysql.

# Projenin Amacı
MySQL database içindeki dataların admin paneli üzerinden alınması, güncellenmesi ve silinmesi.

# Projenin Oluşturulması

## Routes Klasöründe User ve Admin İşlemlerinin Oluşturulması
Routes Klasöründe User İşlemlerini ve Admin İşlemlerini Ayrı Gruplandırma

### Admin işlemleri :
admin.js içinde express library üzerinden router interface kullanımı
dosya işlemleri için fs modülü kullanımı
get Method ile database'den data alınması
post Method ile işlem sonucunun database'e gönderilmesi

### User işlemleri :
user.js içinde express library üzerinden router interface kullanımı
dosya işlemleri için fs modülü kullanımı
use method ile database'den istenen şartlara göre data alınması

### Proje İçinde Database Bağlantılı Dosyalarda İşlemler
Database olarak MySQL kullanımı
Blog Kategori ve Fotoğraf ekleme silme güncelleme işlemlerini database üzerinden yapma

### Proje ve Database Arasındaki Bağlantının Kurulması
Proje klasörü içinde ve config.js dosyasında database bağlantısı oluşturma

# Nodemon
Projede yapılan işlemlerin hızlı bir şekilde ekranda görünmesi için kullanıyoruz.

# Express JS
Node JS Frameeork kullanılarak web sayfalarının hızlı geliştirilmesinde Node JS ile haberleşmeyi gerçekleştirir.

# EJS
Web sayfalarında database'e gönderilen Request'in database'den gelen Response'unun dinamik olarak gelmesini sağlar.
