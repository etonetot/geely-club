import Vue from 'vue'


Vue.filter('dateFormat', function (value) {
    if (!value) return '';
    return new Date(value).toLocaleDateString('ru-RU')
});


Vue.filter('currency', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');
});

Vue.filter('volume', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
});
