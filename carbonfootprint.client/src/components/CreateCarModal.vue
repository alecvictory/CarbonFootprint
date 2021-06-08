<template>
  <div class="modal"
       id="new-car-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <img class="modal-logo" src="../assets/img/carbonfootprintlogo2.png" alt="">
          <h5 class="modal-title" id="exampleModalLabel">
            Create Car
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="exit-modal-icon" aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createCar">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="title">Car Title:</label>
                  <input type="text"
                         class="form-control"
                         id="carTitle"
                         placeholder="Car Title..."
                         v-model="state.newCar.title"
                         required
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="make">Make:</label>
                  <input type="text"
                         class="form-control"
                         id="make"
                         placeholder="Make..."
                         v-model="state.newCar.make"
                         required
                  >
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="model">Model:</label>
                  <input type="text"
                         class="form-control"
                         id="model"
                         placeholder="Model..."
                         v-model="state.newCar.model"
                         required
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="year">Year:</label>
                  <input type="number"
                         class="form-control"
                         id="year"
                         placeholder="Year..."
                         v-model="state.newCar.year"
                         required
                  >
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="mpg">Miles Per Gallon:</label>
                  <input type="number"
                         class="form-control"
                         id="mpg"
                         placeholder="MPG..."
                         v-model="state.newCar.mpg"
                         required
                  >
                </div>
              </div>
              <div class="col-12">
                <div class="dropdown">
                  <label class="mr-1">Select Fuel Type</label>
                  <select class="form-select" style="border: 1px gray solid;" aria-labelledby="dropdownMenuButton" v-model="state.newCar.gasType">
                    <option value="unleaded">
                      Unleaded
                    </option>
                    <option value="hybrid">
                      Hybrid
                    </option>
                    <option value="diesel">
                      Diesel
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-grad-modal">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { carsService } from '../services/CarsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import $ from 'jquery'
export default {
  name: 'CreateCarModal',
  props: {
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newCar: {},
      cars: computed(() => AppState.cars),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      route,
      state,
      async createCar() {
        try {
          await carsService.createCar(state.newCar)
          state.newCar = {}
          $('#new-car-form').modal('hide')
          Notification.toast('Successfully Created Car', 'success')
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

.btn-grad-cancel:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}
</style>
