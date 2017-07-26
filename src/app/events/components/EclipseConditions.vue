<template lang="html">
<div>
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
      Magnitude <tooltip label="Fraction of the angular diameter of a celestial body being eclipsed. (0.0-1.0)" placement="top-right">
                          <span class="icon">
                            <icon name="question-circle"></icon>
                          </span>
                        </tooltip> {{ eclipseDetails.magnitude }} <br />
      Obscuration <tooltip label="Fraction of the Sun’s area occulted by the Moon" placement="top-right">
                            <span class="icon">
                              <icon name="question-circle"></icon>
                            </span>
                          </tooltip> {{ eclipseDetails.obscuration }} <br />
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
</div>
</template>

<script>
  import Tooltip from 'vue-bulma-tooltip';
  import moment from 'moment-timezone';
  export default {
    name: 'eclipse-conditions',
    props: ['currentAddress', 'eclipseDetails'],
    methods: {
      // Convert UTC phase time to local timezone time
      localTime: function (time) {
        if (typeof this.currentAddress.tmz !== 'undefined') {
          var l = moment.utc('2017-08-21T' + time); // date is not given by USNO in UTC format
          return l.tz(this.currentAddress.tmz).format('h:mm:ss a');
        }
      }
    },
    components: {
      Tooltip
    }
  };
</script>

<style lang="css">
  .li-no-bullet {
    list-style-type: none;
  }
</style>
