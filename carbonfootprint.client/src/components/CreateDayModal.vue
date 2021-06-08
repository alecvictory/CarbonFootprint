<template>
  <div class="create-day-modal container-fluid
       modal"
       id="new-day-form"
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
            Create Day
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createDay">
          <div class="modal-body container-fluid modalScroll modal-height">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="title">Date:</label>
                  <input type="date"
                         class="form-control"
                         id="date"
                         v-model="state.newDay.date"
                         required
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h6>TRANSPORTATION</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="dropdown">
                  <label class="mr-1">Select Your Vehicle</label>
                  <select class="form-select" aria-labelledby="dropdownMenuButton" style="border: 1px gray solid;" v-model="state.newDay.carId" required>
                    <option v-for="car in state.closedCar" :key="car.id" :value="car.id">
                      {{ car.title }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="title">Miles Driven</label>
                  <input type="number"
                         class="form-control"
                         id="carMiles"
                         placeholder="Miles..."
                         v-model="state.newDay.carMiles"
                  >
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="title">Miles by bus</label>
                  <input type="number"
                         class="form-control"
                         id="busMiles"
                         placeholder="Miles..."
                         v-model="state.newDay.busMiles"
                  >
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="title">Miles by bicycle</label>
                  <input type="number"
                         class="form-control"
                         id="bikeMiles"
                         placeholder="Miles..."
                         v-model="state.newDay.bikeMiles"
                  >
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="title">Miles walked</label>
                  <input type="number"
                         class="form-control"
                         id="walkMiles"
                         placeholder="Miles..."
                         v-model="state.newDay.walkMiles"
                  >
                </div>
              </div>
              <div class="col-12">
                <h6>HOUSING INFO</h6>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="dropdown">
                    <label class="ml-3 mr-1">Select Your House</label>
                    <select class="form-select" aria-labelledby="dropdownMenuButton" style="border: 1px gray solid;" v-model="state.newDay.houseId" required>
                      <option v-for="house in state.house" :key="house.id" :value="house.id">
                        {{ house.title }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="modal-footer d-flex justify-content-end col-12">
                <button type="submit" class="btn btn-grad-modal">
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { daysService } from '../services/DaysService'
import Notification from '../utils/Notification'
import $ from 'jquery'

export default {
  name: 'CreateDayModal',
  setup() {
    const state = reactive({
      newDay: {},
      closedCar: computed(() => AppState.cars.filter(c => c.closed === false)),
      house: computed(() => AppState.house),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      cars: computed(() => AppState.cars)
    })
    return {
      state,
      async createDay() {
        try {
          state.newDay.date = new Date(state.newDay.date).toISOString().slice(0, 10)
          await daysService.createDay(state.newDay)
          state.newDay = {}
          $('#new-day-form').modal('hide')
          Notification.toast('Successfully Created Day', 'success')
          location.reload()
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
@import "../assets/scss/main.scss";
.btn-grad-cancel {
  background-image: linear-gradient(to right, $danger 0%, #d32020 100%);
  margin: 2px;
  padding: 3px 10px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 0px #eee;
  border-radius: 10px;
  display: block;
  font-size: .7em;
}
.btn-grad-cancel:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}
.modalScroll{
  overflow: scroll;
}
.modal-height{
  max-height: 80vh;
}
</style>
