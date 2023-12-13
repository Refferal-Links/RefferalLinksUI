<template>
    <!-- <p>http://localhost:5173/Register/Code={{decodedToken.RefferalCode}} </p> -->
</template>
<script setup lang="ts">
// import { decode,verify } from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { ref } from 'vue';


const decodedToken = ref();

// function getCode(){
//     var token = Cookies.get('accessToken')?.toString();
//     decodedToken.value = decode(token ?? '');
//     console.log(decodedToken.value);
// }
// getCode();
</script>
