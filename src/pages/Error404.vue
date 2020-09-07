<template>
  <div class="column">
    <div class="text-center error404">
        <p>
        <!-- <img
            src="~assets/sad.svg"
            style="width:30vw;max-width:150px;"
        > -->
        </p>
        <p class="text-faded">
        <strong>Ошибка 404</strong> 
        <br>
        Страница не найдена 
        </p>
        <q-btn color="info" style="width:200px;" to="/" label="На главную" />
    </div>
    </div>  
</template>

<script >
export default {
  name: 'Error404'
}
</script>

<style scoped>
.error404 {
    margin-top: 30vh
}

</style>
