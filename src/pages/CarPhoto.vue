<template>
    <div class="pagePhoto text-center">
        <q-btn-dropdown class="glossy" color="primary" :label="curFolderTitle" content-class="bg-menu">
            <q-list>
                <q-item clickable v-close-popup v-for="item in folderlist" :key="item.folder" 
                    :to="curFolderLink(item.folder)" exact
                >
                    <q-item-section>
                        <q-item-label>{{ item.title }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-btn-dropdown>

        <div class="text-right q-ma-xs">
            {{slide}}/{{arrCurFolderFiles.length+1}} 
        </div>

		<swiper class="gallery-top swiper-container" :options="mainOptions" ref="mainSwiper" @slideChange="slideChange">
			<swiper-slide v-for="(item,ind) in arrCurFolderFiles"  :key="ind">
				<q-img class="product-img" :src="folderPath+item" spinner-color="white" spinner-size="82px" />
			</swiper-slide>
            <swiper-slide class="last-slide" :key="arrCurFolderFiles.length+1">
   				<q-img class="product-img" :src="folderPath+arrCurFolderFiles[0]" spinner-color="white" spinner-size="82px" />
                <div class="last-slide-content">
                    <router-link v-for="folder in folderlist" :key="folder.folder" :to="curFolderLink(folder.folder)">{{folder.title}}</router-link>
                </div>   
            </swiper-slide>  
            
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
		</swiper>

		<swiper	class="gallery-thumbs swiper-container" :options="thumbOptions" ref="thumbSwiper">
			<swiper-slide v-for="(item,ind) in arrCurFolderFiles"  :key="'thumb'+ind">
				<q-img class="product-img" :src="folderPath+item" spinner-color="white" spinner-size="82px" />
			</swiper-slide>
            <swiper-slide class="last-slide" :key="arrCurFolderFiles.length+1">
   				<img class="product-img" :src="folderPath+arrCurFolderFiles[0]" spinner-color="white" spinner-size="82px" />
                <div class="last-slide-content">
                    <router-link v-for="folder in folderlist" :key="folder.folder" :to="curFolderLink(folder.folder)">{{folder.title}}</router-link>
                </div>   
            </swiper-slide>  
			<!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
		</swiper>

    </div>
</template>


<script>
import config from "src/config.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  components: { Swiper, SwiperSlide },

  meta() {
      return {
        title: this.$store.state.curCarData.modelname + " - Фотографии"
      }
  },

  breadcrumb() {
    return {
      title: this.$store.getters["photos/photos"][this.$route.params.folder ? this.$route.params.folder : 0].title  
    };
  },

  data() {
    return {
        
      slide: 1,

      mainOptions: {
        spaceBetween: 10,
        grabCursor: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
      },

      thumbOptions: {
        grabCursor: true,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
      }
    };
  },

  computed: {
    photos() {
      return this.$store.getters["photos/photos"];
    },

    arrCurFolderFiles() {
      return this.curFolder < this.photos.length
        ? this.photos[this.curFolder].files
        : [];
    },

    curFolder() {
      return this.$route.params.folder ? this.$route.params.folder : 0;
    },

    folderPath: function() {
      return this.photos.length ? config.imageServer + this.photos[this.curFolder].path : "";
    },

    folderlist: function() {
      let arr = [];
      for (let i = 0; i < this.photos.length; i++)
        if (i != this.curFolder)
          arr.push({
            folder: this.photos[i].folder,
            title: this.photos[i].title
          });
      return arr;
    },

    curFolderTitle() {
      return this.$store.getters["photos/curFolderTitle"](this.curFolder);
    }
  },

  watch: {
      curFolder() {
        //   console.log("curFolder changed")
          this.$refs.mainSwiper.$swiper.slideTo(0);
      }

  }, 
  methods: {
    curFolderLink(folder) {
      return "/" + config.urlVendor +  this.$route.params.car +  "/photo/" +  (folder ? folder : "")     
    },

    getBreadCrumbName: function() {
      return this.photos.length ? this.photos[this.curFolder].title + " " : "";
    },

    slideChange(event) {
        this.slide = this.$refs.mainSwiper.$swiper.activeIndex + 1
        // console.log("slide changed")
        
    }
  },

  mounted() {
    this.$refs.mainSwiper.$swiper.controller.control = this.$refs.thumbSwiper.$swiper;
    this.$refs.thumbSwiper.$swiper.controller.control = this.$refs.mainSwiper.$swiper;
    // console.log(this.$refs.pictSwiper)
  },

  async preFetch({ store, redirect, currentRoute: { params } }) {
    await store.dispatch("photos/load", { curCar: params.car });
    if (store.state.neterror)
        redirect( {name: "404" } )
  }
};
</script>


<style scoped lang="scss" >
@import "~swiper/css/swiper.css";

.pagePhoto {
  max-width: 800px;
  margin: 0 auto;
}

.swiper-container {
}

.swiper-slide {
}

.gallery-top {
    // width: 100%;
}

.gallery-top .swiper-button-next, .gallery-top .swiper-button-prev {
  background: $info;
  border-radius: 100%;
  top: 50%;
  margin-top: -42px;
  border: none;
  font-size: 0;
  position: absolute;
  z-index: 20;
  left: 10px;
  width: 55px;
  height: 55px;
  opacity: 0.8;
  transition: 0.3s all;
}

.gallery-top .swiper-button-next:hover, .gallery-top .swiper-button-prev:hover  {
  opacity: 1;
}

.gallery-top  .swiper-button-next:after, .gallery-top  .swiper-button-prev:after {
  content: '';
  transform: translate(-50%, -50%);
  top: 50%;
  left: 45%;
  position: absolute;
  width: 19px;
  height: 32px;
  background: url(/statics/prev-white.png) no-repeat;
  background-size: 100% 100%;
}

.gallery-top .swiper-button-next {
  right: 10px;
  left: auto;
}

.gallery-top .swiper-button-next:after {
  left: 55%;
  transform: translate(-50%, -50%) rotate(180deg);
}




.gallery-thumbs {
    box-sizing: border-box;
    padding: 10px 0;
}

.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
}

.gallery-thumbs .swiper-slide-active {
    opacity: 1;
}

.last-slide {
    position: relative;
}

.last-slide-content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.last-slide .product-img {
    opacity: 0.1;
}

.last-slide a {
    display: block;
    font-size: 2em;
    color: #000;
    text-decoration: none;
    transition: all 0.3s;
}

.last-slide a:hover {
    color: $primary;
    text-decoration: underline;
}

.gallery-thumbs  .last-slide .product-img {
    width: 97%;
}

.gallery-thumbs .last-slide-content {
    padding: 5px;
}

.gallery-thumbs .last-slide a {
    font-size: 0.5em;
}



@media screen and (max-width: 650px)
  {
    .gallery-top .swiper-button-next, .gallery-top .swiper-button-prev 
    {
      display:none;
    }

  }



</style>





