<template>
  <section class="hero is-primary is-fullheight" :style="{ backgroundImage: 'url(' + background.hdurl + ')' }">
  <!-- Hero header: will stick at the top -->
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
          <a class="nav-item is-active">
            Home
          </a>
          <a class="nav-item">
            Examples
          </a>
          <a class="nav-item">
            Documentation
          </a>
        </div>
      </div>
    </header>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">
        Eclipse 2017 Events
      </h1>
      <h2 class="subtitle">
        Find events around you and enjoy the biggest total solar eclipse in the US.
      </h2>
    <div class="columns has-text-left">
      <div class="column">
        <Places
        placeholder="Where will you be on August 21st ?"
        @change="processChange"
        debug=true
        :options="{
          language: 'en_US',
          countries: ['US'],
          useDeviceLocation: true,
          type: 'city'
        }">
        </Places>
      </div> <!-- end column -->
    </div> <!-- end columns -->
    <div class="columns content has-text-left">
      <div class="column is-one-quarter" v-if="currentAddress.name">
        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article class="tile is-child box">
                    <h3 class="title is-3 title-no-bottom">Eclipse conditions</h3>
                    <p>
                      <template v-if="currentAddress.type === 'city'">
                        in: {{ currentAddress.name }}, {{ currentAddress.administrative }}
                      </template>
                      <template v-else>
                        in: {{ currentAddress.name }}, {{ currentAddress.city }}, {{ currentAddress.administrative }}
                      </template>
                      <br />
                      Timezone:  {{ currentAddress.tmz }}
                    </p>
                    <div v-if="eclipseDetails.event">
                      <h4 class="title is-4 title-no-bottom">Details</h4>
                      <p>
                        {{ eclipseDetails.description }}
                      </p>
                      <p>
                        Duration {{ eclipseDetails.duration }} <br />
                        Magnitude {{ eclipseDetails.magnitude }} <br />
                        Obscuration {{ eclipseDetails.obscuration }} <br />
                      </p>
                      <h4 class="title is-4 title-no-bottom">Phases</h4>
                        <li v-for="phase, key in eclipseDetails.local_data" class="li-no-bullet">
                          {{ phase.phenomenon }} at {{ localTime(phase.time) }}
                        </li>
                      <p>
                        Maximum phase should look like this: <br/>
                        <img v-bind:src="eclipseDetails.img" />
                      </p>
                    </div> <!-- end v-if -->
                </article>
              </div>
            </div>
          </div>
        </div>
      </div> <!-- end v-if -->

    <div class="column">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile is-parent is-vertical" v-if="searchInfo.nbHits">
            <article class="tile is-child box">
            Found {{ searchInfo.nbHits }} events in {{ searchInfo.processingTimeMS }} ms.
          </article>
            <template v-for="event, key in events">
              <article class="tile is-child box">
                <h4 class="title is-4 title-no-bottom">{{ event.event_name }}</h4>
                  🗺 {{ displayDistance(event._rankingInfo.matchedGeoLocation.distance)}}
                <p v-if="event.description">
                  📜 {{ event.description }}
                </p>
                <p v-if="event.information">ℹ️ {{ event.information }}</p>
                <p v-if="event.info_urls">
                  <template v-for="url, key in event.info_urls">
                    🔗 <a v-bind:href="url">Link {{ key+1 }}</a>
                  </template>
                </p>
                <p v-if="event.location">📍{{ event.location }}</p>
                <p v-if="event.type">🗓 {{ event.type }}</p>
              </article>
            </template>
          </div>
        </div>
      </div>
    </div>
    </div> <!-- end columns -->
  </div> <!-- end container -->
</div> <!-- end hero-body -->
</div>
  <!-- Hero footer: will stick at the bottom -->
  <div class="hero-foot">
      <div class="container">
        <div class="content has-text-centered">
          <p>Made with 🎉 in San Francisco by <a href="//twitter.com/picsoung">@picsoung</a> | 🔍 provided by <a href="//algolia.com">Algolia</a> |  🗓 and 🖼 provided by <a href="https://eclipse2017.nasa.gov/event-location">NASA</a> |  🌒 data provided by <a href="//aa.usno.navy.mil/solareclipse">USNO</a>
        </p>
        </div>
      </div>
  </div>
</section>
</template>

<script>
import Places from 'vue-places';
import moment from 'moment-timezone';

import { mapActions } from 'vuex';
export default {
  name: 'events-list-view',
  data: () => {
    return {
      currentAddress: {},
      events: {},
      searchInfo: {},
      eclipseDetails: {},
      background: {}
    };
  },
  methods: {
    ...mapActions([
      'getEvents',
      'displayTimezone',
      'displayEclipseDetails',
      'displayVisualization',
      'getBackground'
    ]),

    // Reset all data
    reset () {
      this.currentAddress = {};
      this.events = {};
      this.searchInfo = {};
      this.eclipseDetails = {};
    },

    // Get background from NASA APOD API
    changeBackground: function () {
      return this.getBackground().then((value) => {
        this.background = Object.assign({}, value);
      });
    },

    // Convert distance from meters to miles
    displayDistance: function (distMeters) {
      let distMiles = distMeters * 0.000621371;
      let distKm = Math.round((distMeters / 1000) * 100 + Number.EPSILON) / 100;
      let distMilesRound = Math.round(distMiles * 100 + Number.EPSILON) / 100;
      return distKm + ' km (' + distMilesRound + 'mi)';
    },

    // Convert UTC phase time to local timezone time
    localTime: function (time) {
      if (typeof this.currentAddress.tmz !== 'undefined') {
        var l = moment.utc('2017-08-21T' + time); // date is not given by USNO in UTC format
        return l.tz(this.currentAddress.tmz).format('h:mm:ss a');
      }
    },

    // Get informations about eclipse from USNO API
    getEclipseDetails () {
      let details = {};
      // First get details from USNO API
      return this.displayEclipseDetails(this.currentAddress.latlng).then((result) => {
        details = Object.assign({}, result);
        return result;
      }).then(() => { // Find visualization in Algolia index
        return this.displayVisualization(this.currentAddress.latlng);
      }).then((result) => {
        details.img = '../../../../static/eclipses_img/' + result.name.replace(/ /g, '_') + '_' + result.state.replace(/ /g, '_') + '.png';
        this.eclipseDetails = Object.assign({}, details);
        return details;
      });
    },

    // Get timezone information from TimezoneDB API
    getTimezone () {
      return this.displayTimezone(this.currentAddress.latlng).then((result) => {
        this.currentAddress = Object.assign({ tmz: result.zoneName }, this.currentAddress); // update the object to redisplay it
        return result.zoneName;
      });
    },

    // called when algolia place input changes value
    processChange (e) {
      if (Object.keys(e).length === 0) { // empty object, clear input field
        this.reset();
      } else {
        this.currentAddress = Object.assign({}, e);
        this.getEvents(this.currentAddress.latlng).then((result) => {
          // extract urls from information
          var hits = result.hits.map(function (e) {
            let urls = e.information.match(/\bhttps?:\/\/\S+/gi);
            if (urls && urls.length > 0) {
              e['info_urls'] = urls; // add field 'info_urls' to event object
            }
            return e;
          });
          this.events = Object.assign({}, hits);
          this.searchInfo = {
            'nbHits': result.nbHits,
            'processingTimeMS': result.processingTimeMS
          };
        }).then(() => {
          this.getTimezone();
          this.getEclipseDetails();
        });
      }
    }
  },
  mounted: function () {
    this.changeBackground();
  },
  components: {
    Places
  }
};
</script>

<style scoped lang='scss'>
.title-no-bottom {
  margin-bottom: 0 !important;
  color: black !important;
}

.li-no-bullet {
  list-style-type: none;
}

.hero.is-primary {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
