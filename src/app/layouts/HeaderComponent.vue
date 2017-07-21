<template lang="html">
  <div class="hero-head">
    <header class="nav">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <!-- <img src="images/bulma-type-white.png" alt="Logo"> -->
          </a>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <router-link :to="{ name: 'home', params: {} }" class="nav-item" exact>Home</router-link>
          <router-link :to="{ name: 'about', params: {} }" class="nav-item" exact>About</router-link>
          <a class="nav-item" href="https://github.com/picsoung/eclipse2017">
            <span class="icon">
              <icon name="github-alt"></icon>
            </span>
            <span>Github</span>
          </a>
        </div>
      </div>
    </header>
  </div> <!-- end of hero-head -->
</template>

<script>
export default {
  name: 'header',
  head: {
    title: {
      inner: '🌚🌞.ws'
    },
    // Meta tags
    meta: [
      { name: 'title', content: '🌚🌞.ws - Solar Eclipse Events' },
      { name: 'description', content: 'You want to enjoy the biggest solar eclipse in the US on August 21st 2017? With 🌚🌞.ws find all the events near you.', id: 'desc' }, // id to replace intead of create element

      // Twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: '🌚🌞.ws - Solar Eclipse Events' },
      {name: 'twitter:description', content: 'You want to enjoy the biggest solar eclipse in the US on August 21st 2017? With 🌚🌞.ws find all the events near you.'},
      { name: 'twitter:creator', content: '@picsoung' },
      { name: 'twitter:image:src', content: 'https://🌚🌞.ws/static/opengraph.png' },

      // Google+ / Schema.org
      { itemprop: 'name', content: '🌚🌞.ws - Solar Eclipse Events' },
      { itemprop: 'description', content: 'You want to enjoy the biggest solar eclipse in the US on August 21st 2017? With 🌚🌞.ws find all the events near you.' },

      // Facebook / Open Graph
      { property: 'og:title', content: '🌚🌞.ws - Solar Eclipse Events' },
      { property: 'og:image', content: 'https://🌚🌞.ws/static/opengraph.png' },
      { property: 'og:url', content: 'https://🌚🌞.ws' },
      { property: 'og:site_name', content: 'Eclipse Events 2017' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:description', content: 'You want to enjoy the biggest solar eclipse in the US on August 21st 2017? With 🌚🌞.ws find all the events near you.' },
      { property: 'og:type', content: 'website' }
    ]
  }
};
</script>

<style lang="css">
.hero-head .nav {
  background-color: white !important;
  color: black;
  opacity: 0.6;
}

.hero.is-primary a.nav-item{
  color: black !important;
}

.hero.is-primary a.nav-item.is-active{
  background: grey;
  color: white !important;
  opacity: 0.6;
}
</style>
