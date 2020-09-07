<template>
    <div >
        <q-card class="car-topcard">

            <div class="row topcard-title">
                <div class="title-dummy" />
                <h1>{{curCarData.modelname}}</h1>
                <q-btn color="black" round flat dense 
                    :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                    @click="expanded = !expanded"
                    size="lg" 
                />
            </div>

            <q-slide-transition>
                <div class="row car-logo-desc" v-show="expanded">
                    <div class="car-logo-wrapper">
                        <q-img class="car-logo" :src="logo" />
                    </div>
                    <div class="car-desc">
                        <div class="body-1" v-html="curCarData.review2"></div>
                        <price-informer rub :price="curCarData.price1" title="Цена в России: от" class="ma-1"></price-informer>
                        <price-informer :price="curCarData.chinaprice1" :priceTo="curCarData.chinaprice2" title="Цена в Китае: от" class="ma-1"></price-informer>
                    </div>
                </div>
            </q-slide-transition>
        </q-card>    

        <q-tabs class="bg-primary text-white car-tabs">
            <q-route-tab v-for="item in carMenuTabs" :key="item.name" :to="'/' + config.urlVendor + curCar + item.href" >
                {{item.title}}
            </q-route-tab>

                    <q-btn-dropdown v-if="$q.screen.lt.sm" auto-close stretch flat label="...">
                    <q-list>
                        <q-item clickable v-for="menuitem in carMenuDropdown" :key="menuitem.name" :to="'/' + config.urlVendor + curCar + menuitem.href" >
                            <q-item-section>{{menuitem.title}}</q-item-section>
                        </q-item>
                    </q-list>
                    </q-btn-dropdown>            

        </q-tabs>
    </div>
</template>

<script>

import config from 'src/config.js'

export default
{
    components: {
        PriceInformer: () => import('src/components/PriceRub'),
    },

    data () {
        return {
            expanded: true
        }
    },

    computed: {
        config: () => config,
        logo() {
            return this.$store.getters['cars/getLogo'](this.curCarData);
        },
        curCar() {
            return this.$route.params.car;
        },
        curCarData() {
            return this.$store.state.curCarData;
        },
        carMenuTabs() {
            return this.$store.getters['carMenu'].filter( (menuitem, i) => menuitem.show(this.curCarData) && (i<2 || this.$q.screen.gt.xs ) )    
        },
        carMenuDropdown() {
            return this.$store.getters['carMenu'].filter( (menuitem, i) => menuitem.show(this.curCarData) && ( i>=2 && this.$q.screen.lt.sm ) )    
        }
    },

}
</script>

<style lang="scss">

.topcard-title {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 20px;
}

.title-dummy {
    display: none;
}


.car-topcard h1 {
    display:inline-block;
    margin: 0;
    line-height: 2rem;
    font-size: 1.7em;
    font-weight: bold;
}

.car-topcard ul {
    margin-top: 0;
}

.car-logo {
    width: 240px;
    border-radius: 3px;
    margin: 0px 10px 10px 10px;
    transition: 0.3s all;  
}

.car-logo:hover {
    // filter: brightness(120%);  
}

.car-tabs .q-tab__indicator {
    height: 5px;
    color: $info
}

.car-logo-desc {
    flex-wrap: nowrap;
}


@media (max-width: 1024px) {
    .car-topcard {
        box-shadow: none;
    }

} 


@media (max-width: 800px) {

    // .car-topcard {
    //       text-align: center;
    // }
    .car-logo-desc {
        flex-wrap: wrap;
    }

    .car-logo-wrapper, .car-desc {
         width:100%;
         text-align: center;
    }

    .title-dummy {
        display: block;
        width: 20px;
    }



}


</style>
