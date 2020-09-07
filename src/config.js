//const mainBrand = "Haval";
const mainBrand = "Geely";

const config = 
{
    mainBrand: mainBrand,
    colorMode: '',
    imageServer:  "http://chinamobil.ru/",  
    newsImagesDir: "news/images/",
    strVendor: mainBrand,
}  



if (mainBrand === "Haval") {
    config.colorMode = 'red',
    config.appTitle = "Haval Club"
    config.forumPage = "http://haval-club.ru/"
    config.httpServer =  "http://api.haval-club.ru/"
    config.apiVendor = "haval/"
    config.imagesDir = "http://haval-club.ru/haval/images/"

    config.urlVendor = ""  // to="'/' + config.urlVendor + curCar + item.href
    //removeExtraPathItem: 1,  // remove great-wall from /great-wall/haval/h9/
    config.removeExtraPathItem = 2  // remove great-wall/haval/ from /great-wall/haval/h9/
}  
else if (mainBrand === "Geely") {
    config.colorMode = 'blue',
    config.appTitle = "Geely Club"
    config.forumPage = "http://haval-club.ru/"
    config.httpServer =  "http://api.haval-club.ru/"
    config.apiVendor = "geely/"
    config.imagesDir = "http://haval-club.ru/haval/images/"

    config.urlVendor = ""   // to="'/' + config.urlVendor + curCar + item.href
    //removeExtraPathItem: 1,  // remove great-wall from /great-wall/haval/h9/
    config.removeExtraPathItem = 1  // remove great-wall/haval/ from /great-wall/haval/h9/
}  


if ( process.env.NODE_ENV !== 'production' ) {
    config.appTitle = "Haval Club DEBUG"
}

export default config;


