<template>
  <div>
    <img src="your-image-path" usemap="#image-map" />
    <map name="image-map">
      <area
          shape="rect"
          coords="0,0,100,100"
          @click.prevent="goToPage('/page-1')"
      />
      <area
          shape="rect"
          coords="100,0,200,100"
          @click.prevent="goToPage('/page-2')"
      />
      <!-- Ajoutez d'autres zones d'image ici -->
    </map>
  </div>
</template>

<script>
export default {
  methods: {
    goToPage(path) {
      this.$router.push(path);
    },
  },
};
</script>