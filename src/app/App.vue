<template>
  <div id="app">
    <section class="hero is-primary is-fullheight" :style="{ backgroundImage: 'url(' + background.hdurl + ')' }">
      <HeaderComponent></HeaderComponent>
      <router-view></router-view>
      <FooterComponent></FooterComponent>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FooterComponent from './layouts/FooterComponent';
import HeaderComponent from './layouts/HeaderComponent';

export default {
  name: 'app',
  data: () => {
    return {
      background: {}
    };
  },
  methods: {
    ...mapActions([
      'getBackground'
    ]),
    // Get background from NASA APOD API
    changeBackground: function () {
      return this.getBackground().then((value) => {
        this.background = Object.assign({}, value);
      });
    }
  },
  mounted: function () {
    this.changeBackground();
  },
  components: {
    FooterComponent,
    HeaderComponent
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Algolia suggestion in black */
.ap-suggestion {
  color: black;
}

.hero.is-primary {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.title-no-bottom {
  margin-bottom: 0 !important;
  color: black !important;
}
</style>
