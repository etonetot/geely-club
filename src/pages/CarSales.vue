<template>
    <div>
            <div v-if="curCarData.has_sales_rus || curCarData.has_sales" class="sales-caption">
                <span class="title mb-4">Продажи в &nbsp;</span>
                <span v-if="curCarData.has_sales_rus && !curCarData.has_sales" class="title mb-4">
                    России
                </span>    
                <span v-else-if="!curCarData.has_sales_rus && curCarData.has_sales" class="title mb-4">
                    Китае
                </span>    

                <q-btn-dropdown v-else-if="curCarData.has_sales_rus && curCarData.has_sales" 
                    class="glossy" color="primary" :label="curCountry" content-class="bg-menu"
                >
                    <q-list>
                        <q-item clickable v-close-popup :to="{ name: 'car-rusales' }">
                            <q-item-section ><q-item-label>России</q-item-label></q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup :to="{ name: 'car-sales' }">
                            <q-item-section ><q-item-label>Китае</q-item-label></q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>

            <GChart v-if="sales.length" type="ColumnChart" :data="chartRows" :options="chartOptions"/>
            
            <q-table flat hide-bottom :columns="tableHeaders" :data="tableRows" class="sales-table" />
    </div>
</template>

<script>
import config from 'src/config.js'
import { GChart } from 'vue-google-charts'
export default {
    components: {
        GChart
    },

    meta () {
        return {
            title: this.$store.state.curCarData.modelname + " - Статистика продаж",
        }
    },
    breadcrumb: () => ({ title: "Статистика продаж" }),

    data() {
        return {
            months: ['Январь', 'Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            chartOptions: {
                chart: {
                    title: 'Sales',
                },
                height: 400,
                width: '100%',
                legend: {position : 'none'} ,
                series: {   0: { color: config.colorMode==='red' ? '#9F1102' : '#68A7F3' }	},
                //series: {   0: { color: this.$q.config.brand.salesStripes }	},
                //series: {   0: { color: this.$q.config.brand.salesStripes }	},
                
            }
        }
    },

    computed: {
        config() {
            return config;
        },

        curCarData() {
            return this.$store.getters['curCarData'];
        },

        rusCountry() {
            return this.$route.path.endsWith("rusales");

        },

        curCountry() {
            return this.rusCountry ? "России" : "Китае"
        },

        sales(){
            let arr = this.rusCountry ? this.$store.getters['sales/sales_rus'] : this.$store.getters['sales/sales_china'];
            return arr ? arr : [];
        },

        chartRows(){
            let prev = this.sales[0];     
            
            let arr = [['Year', 'Sales']];
            this.sales.forEach((item, ind) => {
                if (ind>0)    
                {
                    for (let y=prev.year ; y<=item.year ; y++)
                    {
                        let m1 = y==prev.year ? prev.mon+1 : 1;    
                        let m2 = y==item.year ? item.mon : 13;    
                        for (let i=m1 ; i<m2 ; i++)
                            arr.push( [ i+"."+(2000+y), 0 ] );
                    }        
                    prev=item;
                }
                arr.push( [ item.mon+"."+(2000+item.year), item.sales ] );
            });   
                
            return arr;   

        },

        tableHeaders(){
            let arr = [{   label: 'Год', align: 'center', class: "subtitle-1 font-weight-bold", field: 'dt'   }];
            this.months.forEach( (item, ind) => 
                arr.push({   
                    label: item, 
                    align: 'center', 
                    field: 'value'+ind   
                })
            );
            arr.push({   label: 'Итого', align: 'center', field: 'total'   });
            return arr;
        },

        tableRows(){
            let years = [], yearsTotal = [];
            this.sales.forEach(item => {
                    if (years.indexOf(item.year)==-1)
                    years.push(item.year);
                    yearsTotal[item.year] = yearsTotal[item.year] ? yearsTotal[item.year]+item.sales : +item.sales;    
            });

            if (!years.length)
                return [];

            let arr = [];
            years.forEach(year=>{
                arr.push({ dt: year+2000 });
            });    
            
            this.sales.forEach(item=>{
                let indYear = years.indexOf(item.year);
                let m = "value"+(item.mon-1).toString();
                arr[indYear][m] = item.sales;    
            });

            years.forEach((year, ind)=>{
                arr[ind]['total'] = yearsTotal[year];    
            });    

            return arr;
            },

    },

    methods: {
    },

    mounted: function () {
    },

    async preFetch ({ store, redirect, currentRoute }) {
        await store.dispatch('sales/load', { curCar: currentRoute.params.car } );
        if (store.state.neterror)
            redirect( {name: "404" } )
    }

}
</script>


<style lang="sass">

.sales-caption
    text-align: center

.sales-table
  thead tr:first-child th:first-child
    background-color: #fff

  td:first-child
    background-color: #f5f5dc

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1

  td
    padding: 7px 12px    

  th:last-child, td:last-child  
    font-weight: bold
</style>
