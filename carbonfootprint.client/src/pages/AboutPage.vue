<template>
  <div class="container-fluid">
    <div class="row flex-column">
      <div class="col-12 about">
        <div class="about__header text-left mt-5 mb-4 d-flex align-items-center">
          <img class="about-logo" src="../assets/img/carbonfootprintlogo2.png" alt="">
          <div>
            <h1 class="about__header--title mb-0">
              Carbon<span class="sub">None</span>
            </h1>
            <p class="about__header--subtitle">
              Healing the world, one step at a time
            </p>
          </div>
        </div>
        <div class="buttons d-flex justify-content-around mb-3">
          <span class="navbar-text">
            <button
              class="btn btn-outline-primary text-uppercase"
              @click="login"
              v-if="!user.isAuthenticated"
            >
              Login
            </button>
          </span>
          <span class="navbar-text">
            <button
              class="btn btn-outline-primary text-uppercase"
              @click="signUp"
              v-if="!user.isAuthenticated"
            >
              Sign Up
            </button>
          </span>
        </div>

        <div class="about__mission-statement">
          <h5 class="about__mission-statement--title">
            Carbon Footprint?
          </h5>
          <p class="about__mission-statement--text">
            Anyone who wants to contribute to stopping <strong>global warming</strong>, at least on an individual scale, needs to measure and keep track of their personal carbon footprint.
          </p>
          <div class="about__mission-statement--icons d-flex justify-content-around my-4 py-3">
            <i class="fas fa-2x fa-car about__mission-statement--icon"></i>
            <i class="fas fa-2x fa-home about__mission-statement--icon"></i>
            <i class="fas fa-2x fa-faucet about__mission-statement--icon"></i>
          </div>
        </div>
        <div class="about__how-to-use">
          <h5 class="about__how-to-use--title">
            How to use:
          </h5>
          <p class="about__how-to-use--text">
            We've created an easy to use application to input your daily data, such as miles driven, as well as basic home utilites to give you a general idea of your carbon footprint, and the awarness to adjust and improve your day to day output.
          </p>
          <div class="about__how-to-use--text d-flex flex-column mb-2">
            <p>For each day you input data you'll receive a customized score. The lower the score, the smaller your carbon footprint.</p>
          </div>
          <div class="about__how-to-use--progress d-flex flex-column mb-2">
            <p class="mb-0">
              Great: &lt; 35 Kg/CO₂ per day
            </p>
            <div class="progress">
              <div class="progress-bar progress-bar-success"
                   role="progressbar"
                   style="width: 25%"
                   aria-valuenow="35"
                   aria-valuemin="0"
                   aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="about__how-to-use--progress d-flex flex-column mb-2">
            <p class="mb-0">
              Average: &lt;
              50 Kg/CO₂ per day
            </p>
            <div class="progress">
              <div class="progress-bar progress-bar-average"
                   role="progressbar"
                   style="width: 50%"
                   aria-valuenow="50"
                   aria-valuemin="0"
                   aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="about__how-to-use--progress d-flex flex-column mb-4">
            <p class="mb-0">
              Extreme: > 50 Kg/CO₂ per day
            </p>
            <div class="progress">
              <div class="progress-bar progress-bar-bad"
                   role="progressbar"
                   style="width: 75%"
                   aria-valuenow="75"
                   aria-valuemin="0"
                   aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  name: 'AboutPage',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async signUp() {
        AuthService.loginWithRedirect({
          screen_hint: 'signup'
        })
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      },
      activeProfile() {
        AppState.activeProfile = state.account
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
@import "../assets/scss/main.scss";
.about-logo{
  transform: rotate(90deg);
  height: 2.5rem;
}
.about {
  font-family: $secondary-font;
  position: relative;
  overflow: hidden;
  &__header {
    font-family: $primary-font;
    line-height: .8;
      i {
      position: absolute;
      top:-1rem;
      left: -1rem;
      font-size: 5rem;
      transform: rotate(120deg);
      color: rgba($primary, .8);
    }
    &--title {
      text-transform: uppercase;
      font-size: 2rem;
      font-weight: 600;
      .sub{
        font-weight: 300;
      }
    }
    &--subtitle {
      font-size: .8rem;
      font-weight: 400;
    }
  }
  &__mission-statement {
    &--title {
      font-family: $primary-font;
      text-transform: uppercase;
      font-size: 1.3em;
      font-weight: bold;
      color: $primary;
    }
    &--text {
      font-family: $secondary-font;
      line-height: 1.6;
      font-size: 1.2rem;
    }
    &--icons {
      border-top: .15rem solid $primary;
      border-bottom: .15rem solid $primary;
    }
  }
  &__how-to-use {
    position: relative;
    i {
      position: absolute;
      top: -1rem;
      right: -1rem;
      font-size: 5rem;
      transform: rotate(-80deg);
      color: rgba($primary, .8);
      z-index: 0
    }
    &--title {
      font-family: $primary-font;
      color: $primary;
      font-weight: bold;
    text-transform: uppercase;
    font-size: 1.3em;
    }
    &--text {
    font-family: $secondary-font;
    font-size: 1.2rem;
    line-height: 1.6;
    }
  }
  .progress-bar-average {
    background-color: $yellow;
  }
  .progress-bar-bad {
    background-color: $danger;
  }
  span {
    color: $dark;
  }
}
</style>
