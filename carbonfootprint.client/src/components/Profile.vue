<template>
  <div @click="profilePage" class="profile col-12">
    <div class="user-summary component-spacing d-flex align-items-center">
      <i class="fas fa-user-circle fa-2x sm-img user-summary__avatar mr-2"></i>
      <div class="user-summary__data d-flex flex-column w-100 text-left">
        <p class="user-summary__data--name mb-0">
          {{ profile.name }}
        </p>
        <div class="progress" v-if="state.profileDay">
          <div class="progress-bar"
               :class="`${state.profileDay.dailyScore}` >= 50 ? 'bg-above' : `${state.profileDay.dailyScore}` >= 35 ? 'bg-average': 'bg-below'"
               role="progressbar"
               :style="'width:' + `${state.profileDay.dailyScore}` +'%;'"
               :aria-valuenow="`${state.profileDay.dailyScore}`"
               aria-valuemin="0"
               aria-valuemax="100"
          >
            {{ state.profileDay.dailyScore }} Kg/CO₂
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'

export default {
  name: 'Profile',
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      profileDay: computed(() => AppState.days.find(d => d.creatorId === props.profile.id))
    })
    return {
      router,
      state,
      getScore() {
        try {
          return state.profileDay.dailyScore
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      profilePage() {
        try {
          router.push({ name: 'ProfilePage', params: { id: props.profile.id } })
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
@import "../assets/scss/main.scss";
.sm-img{
border-radius: 50%;
max-height: 3rem;
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
</style>
