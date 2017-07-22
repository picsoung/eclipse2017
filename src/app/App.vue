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
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: '🌚🌞.ws',
    // all titles will be injected into this template
    titleTemplate: '%s | Solar Eclipse Events',
    meta: [
      { name: 'title', content: '🌚🌞.ws - Solar Eclipse Events' },
      { name: 'description', content: 'You want to enjoy the biggest solar eclipse in the US on August 21st 2017? With 🌚🌞.ws find all the events near you.', id: 'desc' }, // id to replace intead of create element

      // Twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: '🌚🌞.ws - Solar Eclipse Events' },
      {name: 'twitter:description', content: 'You want to enjoy the biggest solar eclipse in the US on August 21st 2017? With 🌚🌞.ws find all the events near you.'},
      { name: 'twitter:creator', content: '@picsoung' },
      { name: 'twitter:image:src', content: 'https://eclipse.scalingo.io/static/opengraph.png' },

      // Google+ / Schema.org
      { itemprop: 'name', content: '🌚🌞.ws - Solar Eclipse Events' },
      { itemprop: 'description', content: 'You want to enjoy the biggest solar eclipse in the US on August 21st 2017? With 🌚🌞.ws find all the events near you.' },

      // Facebook / Open Graph
      { property: 'og:title', content: '🌚🌞.ws - Solar Eclipse Events' },
      { property: 'og:image', content: 'https://eclipse.scalingo.io/static/opengraph.png' },
      { property: 'og:url', content: 'https://🌚🌞.ws' },
      { property: 'og:site_name', content: 'Eclipse Events 2017' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:description', content: 'You want to enjoy the biggest solar eclipse in the US on August 21st 2017? With 🌚🌞.ws find all the events near you.' },
      { property: 'og:type', content: 'website' }
    ]
  },
  head: {
    title: {
      inner: '🌚🌞.ws'
    }
    // // Meta tags
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
