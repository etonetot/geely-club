<template>
    <h2>{{title}} 
        <q-icon name="help" color="green" size="md" class="q-pb-xs" >
            <q-tooltip content-class="bg-green" content-style="font-size: 16px">
                {{help}}
            </q-tooltip>
        </q-icon>
    </h2>
</template>

<script>
import config from "src/config.js"
export default {
    components: {
    },
    props: {
        title: String, help: String, 
    },

    data() {
        return {
        }
    },
}
</script>


<style lang="sass" scoped>

h2
    font-size: 1.4em
    font-weight: bold
    margin-bottom: 0px
    line-height: 40px
        
</style>
