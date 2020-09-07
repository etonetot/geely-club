<template>
    <div class="q-pb-md">        
        <div class="row justify-center" v-if="items.length > newsCountOnPage">
            <q-pagination v-model="page" :to-fn="getPageLink(page)" :max="pageCount" :max-pages="9" />
        </div>
        <div class="row wrap justify-center">
            <div class="col-xs-12 col-md-6 news-cards" v-for="item in newsOnPage" :key="item.id">
                    <q-card class="news-card" >
                        <router-link :to="getNewsLink(item)">
                            <q-img class="news-image" :src="getNewsImage(item, 0)" height="300px" >
                                <!-- <q-img class="news-image" slot="error" placeholder-src="" /> -->
                                
                                <div class="news-subject">
                                    <div class="news-posted">{{ item.posted | dateFormat}}</div>
                                    <h5>{{item.subject}}</h5>
                                </div>
                                <div class="news-review">
                                    {{item.review}}
                                </div>
                            </q-img>
                        </router-link>
                    </q-card>
            </div>
        </div> 

        <div class="row justify-center" v-if="items.length > newsCountOnPage">
            <q-pagination v-model="page" :to-fn="getPageLink(page)" :max="pageCount" :max-pages="9" />
        </div>

    </div>
</template>

<script>
    import config from 'src/config.js'

    export default {
        props: {
            items: Array,
            //initialPage: [Number, String],
            newsitemRouteName: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                newsCountOnPage: 6,
                page: 1,
            }
        },

        computed: {
            newsOnPage(){
                let start = (this.page-1) * this.newsCountOnPage;
                let end = start + this.newsCountOnPage;
                return this.items.slice(start, end);    
            },
            pageCount(){
                return Math.ceil(this.items.length / this.newsCountOnPage);
            },
        },

        watch: {
            page(newPage) {
                this.$emit('pageChanged', newPage);
            },
            $route(newPage) {  
                this.page = this.$route.params.page ? +this.$route.params.page : 1;
            }

        },

        methods: {
            getNewsImage(item, numImage){
                let postfix = numImage > 1 ? numImage.toString() : '';
                if (!item['news_image' + postfix])
                    return "statics/news-placeholder.jpg"
                return config.imageServer + config.newsImagesDir + item['news_image' + postfix];
            },
            getNewsLink(item) {
                // return 'newsitem/' + item.id;
                //return this.$route.params.car ? this.$route.params.car + '/newsitem/' + item.id : '/newsitem/' + item.id;
                return { 
                    name: this.newsitemRouteName, 
                    params: {
                        id: item.id
                    }
                }
            },
            getPageLink(page) {
                return (page) => +page>1 ? { params: { page: page } } : {params: {page:null}}
            }
        },
        mounted() {  
            this.page = this.$route.params.page ? +this.$route.params.page : 1;
        }


    }
</script>

<style scoped>

.news-cards{
    padding: 10px;
    
}

.news-card{
    /* margin: 10px 20px 10px 0; */
    margin: 0px auto;
    border-radius: 5px;
    max-width: 744px;
}

.news-image{
    border-radius: 5px;
    position: relative;
}

.news-subject{
    color: white;
    width: 100%;
    padding: 10px;
    transition: 0.3s all;
}

.news-subject:hover, .news-review:hover{
    background-color:rgba(0,0,0,.8);
}

.news-posted{
    text-align: right;
    padding:5px;
}

.news-subject h5 {
    margin: 0px 0px 10px 0px;
}
    
.news-review {
	padding: 5px 20px 10px 10px;
	background-color: rgba(0,0,0,0.6);
	position:absolute;
	bottom: -200px;
	transition: all 0.4s; 
	border-radius: 0px 0px 5px 5px;
}

.news-image:hover .news-review{
	bottom: 0;
}
    

</style>
