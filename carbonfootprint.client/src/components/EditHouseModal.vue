<template>
  <div class="modal"
       id="edit-house-form"
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
            Edit House
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="editHouse">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="title">House Title:</label>
                  <input type="text"
                         class="form-control"
                         id="editTitle"
                         placeholder="New House Title..."
                         v-model="state.newHouse.title"
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="make">Members:</label>
                  <input type="number"
                         class="form-control"
                         id="editMembers"
                         placeholder="Household Members(#)..."
                         v-model="state.newHouse.members"
                  >
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="electricKwh">Electric:</label>
                  <input type="number"
                         class="form-control"
                         id="editElectricKwh"
                         placeholder="Kwh per month..."
                         v-model="state.newHouse.electricKwh"
                  >
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="waterGallons">Water:</label>
                  <input type="number"
                         class="form-control"
                         id="editWaterGallons"
                         placeholder="Gallons per month..."
                         v-model="state.newHouse.waterGallons"
                  >
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-grad-modal">
                Submit
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
import { housesService } from '../services/HousesService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import $ from 'jquery'
export default {
  name: 'EditHouseModal',
  props: {
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newHouse: {},
      house: computed(() => AppState.house),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      route,
      state,
      async editHouse() {
        try {
          state.newHouse.id = state.house[0].id
          await housesService.editHouse(state.newHouse)
          $('#edit-house-form').modal('hide')
          state.newHouse = {}
          Notification.toast('Successfully Edited House', 'success')
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
</style>
