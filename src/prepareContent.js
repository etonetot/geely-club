import config from 'src/config.js'




export function PrepareNews(news) {

    if (config.mainBrand==="Haval") {
        news.content = news.content.replace(/\n/g, "<br />");
        news.content = news.content.replace(/http:\/\/chinamobil.ru\/great-wall\/haval/g, "");
        news.content = news.content.replace(/\/great-wall\/haval/g, "");
        news.content = news.content.replace(/href='\/great-wall/g, "href='http:\/\/chinamobil.ru\/great-wall");
    }
    else if (config.mainBrand==="Geely") {
        news.content = news.content.replace(/\n/g, "<br />");
        news.content = news.content.replace(/http:\/\/chinamobil.ru\/geely/g, "");
        news.content = news.content.replace(/\/geely/g, "");
    }

}




export function PrepareReview(carData) {

    if (config.mainBrand==="Haval") {
        carData.review2 = carData.review2.replace(/href='\//g, "href='http://chinamobil.ru/");
        carData.review2 = carData.review2.replace(/href=\//g, "href=http://chinamobil.ru/");
        
        carData.review2 = carData.review2.replace(/href='http:\/\/chinamobil.ru\/great-wall\/haval/g, "href='");
        carData.review2 = carData.review2.replace(/href=http:\/\/chinamobil.ru\/great-wall\/haval/g, "href=");
    }
    else if (config.mainBrand==="Geely") {
        carData.review2 = carData.review2.replace(/href='\//g, "href='http://chinamobil.ru/");
        carData.review2 = carData.review2.replace(/href=\//g, "href=http://chinamobil.ru/");
        
        carData.review2 = carData.review2.replace(/href='http:\/\/chinamobil.ru\/geely/g, "href='");
        carData.review2 = carData.review2.replace(/href=http:\/\/chinamobil.ru\/geely/g, "href=");
    }

}

