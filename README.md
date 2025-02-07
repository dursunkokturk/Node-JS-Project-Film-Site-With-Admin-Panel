# Projenin Amacı
MySQL database içindeki dataların admin paneli üzerinden alınması güncellemensi ve silinmesi.

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
