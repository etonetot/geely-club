<template>
    <div>
<svg>
    <circle :cx="center" :cy="center" :r="center" fill="rgb(34,34,234)" stroke-width="0" stroke="rgb(0,0,0)"/>

    <!-- <circle :cx="lineStart" :cy="center" :r="lineW/2" fill="rgb(255,255,255)" stroke-width="0" stroke="rgb(0,0,0)"/> -->
    <rect :x1="lineStart" :y1="center" :x2="lineEnd" :y2="center" :rx="lineW/2" :stroke-width="lineW" stroke="rgb(255,255,255)"   />  
    <!-- <circle :cx="lineEnd" :cy="center" :r="lineW/2" fill="rgb(255,255,255)" stroke-width="0" stroke="rgb(0,0,0)"/> -->
{{angle}}

<g id="1212" :transform='`rotate(${angle} ${center} ${center})`'>
    <circle :cx="center" :cy="center-plusH" :r="lineW/2" fill="rgb(255,255,255)" stroke-width="0" stroke="rgb(0,0,0)"/>
    <line :x1="center" :y1="center" :x2="center" :y2="center-plusH" :stroke-width="lineW" stroke="rgb(255,255,255)"/>  
    <line :x1="center" :y1="center" :x2="center" :y2="center+plusH" :stroke-width="lineW" stroke="rgb(255,255,255)"/>  
    <circle :cx="center" :cy="center+plusH" :r="lineW/2" fill="rgb(255,255,255)" stroke-width="0" stroke="rgb(0,0,0)"/>
</g>
</svg>  



        <div class="row no-wrap">
            <span @click="toggle" class='open-img' :class="{opened : isOpen}" />

            <div @click="toggle" class='open-text'>
                <slot name="label" />
            </div>
        </div> 
        <q-slide-transition>
            <div v-show="isOpen">
                <slot>
                </slot>
            </div>
        </q-slide-transition>


    </div>
</template>

<script>
import config from "src/config.js"

export default {
    components: {
    },
    props: {
        opened: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isOpen: false,
            center : 30,
            lineW:  8,
            lineGap: 2,
            plusH : 0,
            plusHstep: 1,
            timer: 0,
            pulsation: 0,
            angle: 0
        }
    },

    watch: {
        isOpen(newValue) {
            console.log(newValue);
            
            if (newValue)
                this.plusHstep = -1;
            else
                this.plusHstep = 1;

            if (!this.timer)
                this.timer = setInterval(()=>{
                   this.plusH += this.plusHstep;
                   this.angle += this.plusHstep;
                   if (this.plusH < 1 || this.plusH > this.center-this.lineStart-1 ) {
                        clearInterval(this.timer);
                        this.timer = 0;

                   }

                }, 10)
        }
    },

    computed: {
        lineStart() {
            return this.lineGap + this.lineW/2
        },
        lineEnd() {
            return this.center*2 - this.lineGap - this.lineW/2
        },



    },

    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        }
    },
    mounted() {
        this.plusH = this.center - this.lineGap - this.lineW/2
        this.isOpen = this.opened
        
    },

    beforeDestroy() {
        if (this.timer)
            clearInterval(this.timer);
    }


}
</script>


<style scoped>

.open-img {
    background: url(/statics/big-plusminus.gif) no-repeat;
    cursor: pointer;
    line-height: 32px;
    display: block;
    float: left;
    margin-right: 5px;
    height: 16px;
    width: 16px;
    transform: rotate(90deg);
    transition: all .3s ease-in-out;
    background-size: 32px 16px;
}

.opened {
    background-position: -16px 0;
    transform: rotate(0);
}

.open-text {
    display: inline;
    border-bottom: 1px dashed;
    cursor: pointer;
}



</style>

