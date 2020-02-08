<template>
  <div class="container">
    <div>
      <h1 class="title">
        Users
      </h1>
      <nuxt-link :to="{ path: '/users/soarflat' }">soarflat</nuxt-link>
      <nuxt-link :to="{ path: '/users/ornstein' }">ornstein</nuxt-link>
      <nuxt-link :to="{ path: '/users/smough' }">smough</nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
