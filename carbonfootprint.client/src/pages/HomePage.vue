<template>
  <div v-if="state.loading === true">
    Loading...
  </div>
  <div v-else class="home container-fluid flex-grow-1 d-flex flex-column">
    <div class="row" v-if="state.profileDay">
      <div class="col-12">
        <div class="current-score current-score__container text-left component-spacing">
          <small class="current-score__welcome">Welcome User</small>
          <h6 class="current-score__title" v-if="state.profileDay">
            Most Recent CO₂ Score - <span>{{ state.profileDay.dailyScore }} Kg/CO₂</span>
          </h6>
          <div class="progress current-score__progress">
            <div class="progress-bar"
                 role="progressbar"
                 :class="`${state.profileDay.dailyScore}` >= 50 ? 'bg-above' : `${state.profileDay.dailyScore}` >= 35 ? 'bg-average': 'bg-below'"
                 :style="'width:' + `${state.profileDay.dailyScore}` +'%;'"
                 :aria-valuenow="`${state.profileDay.dailyScore}`"
                 aria-valuemin="0"
                 aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
      <div class="col-12" v-if="state.ytdScores">
        <div class="weekly-score component-spacing weekly-score__container text-left">
          <h6 class="weekly-score__title">
            YTD Daily Average - <span :value="averageScore()"> {{ state.totalScore }} Kg/CO₂ </span>
          </h6>
          <div class="progress weekly-score__progress">
            <div class="progress-bar"
                 role="progressbar"
                 :class="`${state.profileDay.dailyScore}` >= 50 ? 'bg-above' : `${state.profileDay.dailyScore}` >= 35 ? 'bg-average': 'bg-below'"
                 :style="'width:' + `${state.totalScore}` +'%;'"
                 :aria-valuenow="`${state.totalScore}`"
                 aria-valuemin="0"
                 aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div>
          <small>
            Please go to the <router-link :to="{ name: 'ProfilePage', params: {id: state.account.id}}">
              Profile Page
            </router-link>
            to register your scores
          </small>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 flex-grow-1 d-flex stretch">
        <div class="component-spacing--small w-100">
          <img class="img-fluid eco-logo" src="../assets/img/EcoLogo3.png" alt="ecoLogo">
        </div>
      </div>
      <div class="col-6">
        <div class="weather weather__container component-spacing--small" v-if="state.weather">
          <div class="show-weather">
            <p class="weather__air-quality">
              Air Quality: <strong>{{ state.weather.current.pollution.aqius }} AQI</strong>
            </p>
            <small class="weather__data--temp">{{ state.tempFahrenheit }}°</small>
            <p class="weather__data--location mb-0">
              {{ state.weather.city }}, ID
            </p>
          </div>
          <img :src="getPic()" class="weatherImg" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 ml-2">
        <h5 class="text-left mt-2 user__title">
          Profiles
        </h5>
      </div>
      <div class="col-12">
        <Profile v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
      </div>
      <div class="row">
        <div class="col-12">
          <h5 class="text-left mt-3 news__title">
            Environmental News Feed
          </h5>
          <NewsFeed v-for="news in state.news" :key="news.id" :news="news" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { apiService } from '../services/ApiService'
import { daysService } from '../services/DaysService'
export default {
  name: 'HomePage',
  props: {
  },
  setup() {
    const state = reactive({
      loading: true,
      activeProfile: computed(() => AppState.activeProfile),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      profiles: computed(() => AppState.profiles.slice(0, 5)),
      news: computed(() => AppState.newsApi),
      weather: computed(() => AppState.weatherApi),
      profileDay: computed(() => AppState.days.find(d => d.creatorId === state.account.id)),
      ytdScores: computed(() => AppState.days.filter(d => d.creatorId === state.account.id)),
      totalScore: 0,
      tempFahrenheit: computed(() => {
        const C = state.weather.current.weather.tp
        return Math.floor(C * (9 / 5) + 32)
      })
    })
    onMounted(async() => {
      daysService.getAllDays()
      profilesService.getAllProfiles()
      apiService.getNewsApi()
      apiService.getWeatherApi()
      state.loading = false
    })
    return {
      state,
      getPic() {
        return require(`@/assets/img/${state.weather.current.weather.ic}.png`)
      },
      averageScore() {
        let totalScore = 0
        state.ytdScores.forEach(d => {
          totalScore += d.dailyScore
        })
        state.totalScore = Math.floor(totalScore / state.ytdScores.length, -1)
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/_variables.scss';
@import "../assets/scss/main.scss";
.home{
  text-align: center;
  user-select: none;
  font-family: $secondary-font;
}
.current-score {
  &__title {
    font-family: $primary-font;
    span {
      font-size: 1.2em;
      font-weight: bold;
    }
  }
}
.weekly-score {
  &__title {
    font-family: $primary-font;
    span {
      font-size: 1.2em;
      font-weight: bold;
    }
  }
}
  div {
    padding: 0 !important;
    margin: 0 !important;
  }
.weather {
  position: relative;
  overflow: hidden;
  min-height: 10rem;

  &__air-quality {
    font-size: 1rem;
    font-weight: thin;
  }
  &__data {
    &--icon {
      color: $yellow;
    }
    &--temp {
      top: .5em;
      right: 2.25em;
      font-size: 2rem;
      font-weight: bold;
    }
    &--location {
      position: absolute;
      bottom: -4rem;
      left: .1rem;
      font-size: 1.35rem;
      font-weight: bold;
    }
  }
}
.weatherImg{
  height: 10rem;
  position: absolute;
  top: 2rem;
  right: -3rem;
}
.eco-logo{
  max-height: 99%;
}
.user__title {
  font-family: $primary-font;;
  font-size: 1.4rem;
}
.news__title {
  font-family: $primary-font;
  font-size: 1.4rem;
}

.user-summary {
  &__avatar {
    height: 3rem;
    border-radius: 50%;
    background-color: $dark;
  }
  .progress-bar {
    color: $dark !important;
  }
}
.news-container {
  background-color: $off-white;
  margin: .5rem !important;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  img {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  }
}
.bg-above{
 background-color: $danger;
}
.bg-average{
background-color: $yellow;
}
.bg-below{
background-color: $primary;
}

.show-weather {
  z-index: 1 !important;
  position: relative;
}
</style>
