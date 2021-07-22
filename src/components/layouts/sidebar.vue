<template>
  <div id="sidebar">
    <div class="sidebar-el"><router-link to="/">Главная</router-link></div>
    <!--        <div class="sidebar-el"><router-link to="/user/qwerty">Профиль qwerty</router-link></div>-->
    <!--        <div class="sidebar-el"><router-link to="/user/0">Профиль 0</router-link></div>-->
    <div class="sidebar-el">
      <router-link to="/user/1">Профиль 1</router-link>
    </div>
    <!--        <div class="sidebar-el"><router-link to="/user/953">Профиль 953</router-link></div>-->
    <div class="sidebar-el"><router-link to="/me">Чат</router-link></div>
    <!--        <div class="sidebar-el"><router-link to="/users">Сообщества</router-link></div>-->
  </div>
</template>
<script src="./sidebar.js"></script>
<style src="./sidebar.css" scoped></style>

