<template>
    <div>
        <q-chip v-if="price" class="body-1" >
                <q-avatar > <span :class="{ 'priceAvatar': true, 'rubAvatar': rub, 'yuanAvatar': !rub}"></span></q-avatar>
                {{ title }} {{ p1 | currency }} 
                <span v-if="priceTo">&nbsp;до {{ p2 | currency }} </span> 
                &nbsp; <span v-if="rub">руб.</span><span v-else>юаней</span> 
        </q-chip>

        <q-icon v-if="!rub && price" name="help" color="green" size="sm" >
            <q-tooltip v-if="!rub" anchor="top middle" content-class="bg-purple" content-style="font-size: 16px" :offset="[10, 40]">
                <span class="subheading">В пересчете по сегодняшнему курсу: от {{ price*rateYuan.yuan | currency }} руб.
                            <span v-if="priceTo">&nbsp;до {{ priceTo*rateYuan.yuan | currency }} </span> &nbsp; руб.
                </span>
            </q-tooltip>
        </q-icon>
    </div>
</template>                


<script>
import config from 'src/config.js'

export default {
    props: {
        price: Number, 
        priceTo: Number, 
        title: {
            type: String,
            default: 'От'
        },
        rub: Boolean,
        rate: Number,
    },
    data() {
        return {
        }
    },

    computed:
    {
        p1() {
            return this.rub ? this.price * 1000 : this.price;
        },       
        p2() {
            return this.rub ? this.priceTo * 1000 : this.priceTo;
        },   
        rateYuan() {
            return this.$store.getters['rate'];
        }    
    }
}
</script>

<style>

  .priceAvatar{
    padding:10px;
    border-radius: 10px;
  }

  .rubAvatar{
    background: linear-gradient(white, white, blue, red, red);
  }

  .yuanAvatar{
    background: linear-gradient(135deg, yellow,  red, red);
  }
  
    
</style>
