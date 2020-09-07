<template>
    <div>

        <q-img class="news-image" :src="getNewsImage(newsitem, 0)" >
            <div class="news-subject">
                    <div class="news-posted">{{ newsitem.posted | dateFormat}}</div>
                    <h5>{{newsitem.subject}}</h5>
            </div>
        </q-img>

        <p class="news-content" v-html="newsitem.content"></p>

        <q-img class="news-image" v-if="newsitem['news_image2']" :src="getNewsImage(newsitem, 2)"></q-img>
        <q-img class="news-image" v-if="newsitem['news_image3']" :src="getNewsImage(newsitem, 3)"></q-img>
        <q-img class="news-image" v-if="newsitem['news_image4']" :src="getNewsImage(newsitem, 4)"></q-img>
        <q-img class="news-image" v-if="newsitem['news_image5']" :src="getNewsImage(newsitem, 5)"></q-img>
    </div>
</template>


<script>
import config from 'src/config.js'
export default {
    data() {
        return {
        }
    },

    computed: {
        newsitem() {
            return this.$store.getters['news/newsItem'];
        },
    },

    methods: {
        getNewsImage(item, numImage){
            let postfix = numImage > 1 ? numImage.toString() : '';
            return config.imageServer + config.newsImagesDir + item['news_image' + postfix];
        },

    },
    
}
</script>

<style lang="scss">

.news-card{
    max-width: 744px;
}

.news-image{
    border-radius: 5px;
    position: relative;
    margin-bottom: 10px;
}

.news-image:last-child{
    margin-bottom: 0px;
}

.news-subject{
    color: white;
    width: 100%;
    padding: 10px;
    transition: 0.3s all;
}

.news-posted{
    text-align: right;
    padding:5px;
}

.news-subject h5 {
    margin: 0px 0px 10px 0px;
}

.news-subject:hover{
    background-color:rgba(0,0,0,.8);
}

.news-content {
    margin: 10px; 
}

.news-content a {
    font-size: 1.15em;
    color: $primary ;
}

</style>

