<template>
  <h1>{{ id }}</h1>
</template>

<script>
export default {
  async asyncData({ route }) {
    const { id } = route.params;
    return { id };
  },
  data: {
    id: ""
  }
};
</script>
