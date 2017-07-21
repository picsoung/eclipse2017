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
  name: 'header'
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
