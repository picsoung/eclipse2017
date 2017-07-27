<template>
  <div>
  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">
        🌚🌞
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
          type: 'city',
          appId: 'plCN6BSS1UB5',
          apiKey: 'b0c2122eb198add61e6389274f8d7699'
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
                  <EclipseConditions :eclipseDetails="eclipseDetails" :currentAddress="currentAddress"></EclipseConditions>
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
  <!-- Hero footer: will stick at the bottom -->
</div>
</template>

<script>
import Places from 'vue-places';
import EclipseConditions from './EclipseConditions';

import { mapActions } from 'vuex';
export default {
  name: 'events-list-view',
  data: () => {
    return {
      currentAddress: {},
      events: {},
      searchInfo: {},
      eclipseDetails: {}
    };
  },
  methods: {
    ...mapActions([
      'getEvents',
      'displayTimezone',
      'displayEclipseDetails',
      'displayVisualization'
    ]),

    // Reset all data
    reset () {
      this.currentAddress = {};
      this.events = {};
      this.searchInfo = {};
      this.eclipseDetails = {};
    },

    // Convert distance from meters to miles
    displayDistance: function (distMeters) {
      let distMiles = distMeters * 0.000621371;
      let distKm = Math.round((distMeters / 1000) * 100 + Number.EPSILON) / 100;
      let distMilesRound = Math.round(distMiles * 100 + Number.EPSILON) / 100;
      return distKm + ' km (' + distMilesRound + 'mi)';
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
  components: {
    Places,
    EclipseConditions
  }
};
</script>

<style scoped lang='scss'>
.title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 7rem;
}
</style>
