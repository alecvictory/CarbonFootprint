<template>
  <a :href="news.url">
    <div class="news-component-spacing d-flex">
      <img v-if="news.image.thumbnail" :src="news.image.thumbnail" alt="Article Thumbnail" class="img-fluid new-container__img">
      <div class="news-container__text d-flex flex-column text-left p-2">
        <h6>{{ news.title }}</h6>
      </div>
    </div>
  </a>
</template>
<script>
import { reactive, computed } from 'vue'
import { apiService } from '../services/ApiService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'NewsFeed',
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      news: computed(() => AppState.newsApi),
      title: computed(() => {
        let t = props.news.title
        if (t.length > 30) {
          t = t.substring(0, 30) + '...'
        }
        return t
      }),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      route,
      state,
      async getNewsApi() {
        try {
          await apiService.getNewsApi()
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
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
a{
  text-decoration: none;
  cursor:pointer;
}
.news-component-spacing {
  background-color: $off-white;
  margin: .5rem !important;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  height:6rem;
}
.news-container__text{
  padding: 1rem 1rem 1rem .5rem;
  width:70%;
  color: $dark;
  overflow: hidden;
  text-overflow: ellipsis;
}
img{
  width:30%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
</style>
