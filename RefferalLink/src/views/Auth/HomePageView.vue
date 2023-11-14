<template>
    <p>Hello </p>
</template>
<script setup lang="ts">
import { decode } from 'jsonwebtoken';
import Cookies from 'js-cookie';




function a (){
    var token = Cookies.get('accessToken')?.toString();
    const decodedToken = decode(token ?? '');
    console.log(decodedToken);
}
a();
</script>
