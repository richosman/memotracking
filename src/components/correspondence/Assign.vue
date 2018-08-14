<template>

  <div id="showAssignTo" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
       aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> -->
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form role="form" enctype="multipart/form-data">

            <div class="box-body">
              <div class="form-group"
                   v-if="userRole != 'Director' && getAssignedCorrDetails.natureOfCorrespondence == 'Confidential'">
                <label>Assign To</label>
                <input type="text" id="subject" class="form-control" :value="getFromUserEmail.email" disabled>
              </div>

              <div class="form-group"
                   v-if="(userRole != 'Director') &&  getAssignedCorrDetails.natureOfCorrespondence == 'Non-Confidential'">
                <label>Assign To</label>
                <!--<model-select :options="getAllUserEmails.email"-->
                <!--v-model="emailSelect"-->
                <!--placeholder="Select User Email">-->
                <!--</model-select>-->
                <!--<el-select class="form-control" filterable v-model="emailSelect">-->
                <!--<el-option v-for="getAllUserEmail in getAllUserEmails" :value="getAllUserEmail.id"  placeholder="Select User Email">{{ getAllUserEmail.email }}</el-option>-->

                <!--</el-select>-->
                <el-select
                  v-model="emailSelect"
                  filterable
                  placeholder="Select"
                >
                  <el-option
                    v-for="getAllUserEmail in getAllUserEmails"
                    :key="getAllUserEmail.id"
                    :label="getAllUserEmail.email"
                    :value="getAllUserEmail.id">
                  </el-option>
                </el-select>
              </div>

              <div class="form-group"
                   v-if="(userRole == 'Director') &&  getAssignedCorrDetails.natureOfCorrespondence == 'Non-Confidential'">
                <label>Assign To</label>
                <!--<model-select :options="getAllUserEmails.email"-->
                <!--v-model="emailSelect"-->
                <!--placeholder="Select User Email">-->
                <!--</model-select>-->
                <!--<el-select class="form-control" filterable v-model="emailSelect">-->
                <!--<el-option v-for="getAllUserEmail in getAllUserEmails" :value="getAllUserEmail.id"  placeholder="Select User Email">{{ getAllUserEmail.email }}</el-option>-->

                <!--</el-select>-->
                <el-select
                  v-model="emailSelect"
                  filterable
                  placeholder="Select"
                >
                  <el-option
                    v-for="getAllUserEmail in getAllUserEmails"
                    :key="getAllUserEmail.id"
                    :label="getAllUserEmail.email"
                    :value="getAllUserEmail.id">
                  </el-option>
                </el-select>
              </div>

              <div class="form-group" v-if="userRole == 'Director' && getAssignedCorrDetails.natureOfCorrespondence == 'Confidential' ">
                <label>Assign To</label>
                <!--<model-select :options="getAllUserEmails.email"-->
                <!--v-model="emailSelect"-->
                <!--placeholder="Select User Email">-->
                <!--</model-select>-->
                <!--<el-select class="form-control" filterable v-model="emailSelect">-->
                <!--<el-option v-for="getAllUserEmail in getAllUserEmails" :value="getAllUserEmail.id"  placeholder="Select User Email">{{ getAllUserEmail.email }}</el-option>-->

                <!--</el-select>-->
                <el-select
                  v-model="emailSelect"
                  filterable
                  placeholder="Select"
                >
                  <el-option
                    v-for="getAllUserEmail in getAllUserEmails"
                    :key="getAllUserEmail.id"
                    :label="getAllUserEmail.email"
                    :value="getAllUserEmail.id">
                  </el-option>
                </el-select>
              </div>

              <div class="form-group">
                <label>Leave Any Comments</label>
                <textarea class="form-control" rows="5" v-model="comments" placeholder="Enter ..."></textarea>
              </div>


              <!-- /.box-body -->

              <div class="box-footer">
                <button type="submit" @click.prevent="assign" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer modalButtons">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {ModelSelect} from 'vue-search-select'
  import router from '../../router/index'
  import axios from 'axios'

  export default {
    data() {
      return {
        userRole: localStorage.getItem('userRole'),
//        options: [
//          { value: '1', text: 'osman.alhassan@nca.org.gh' },
//          { value: '2', text: 'richosmanthus@gmail.com' },
//          { value: '3', text: 'joemo@gmail.com' }
//
//        ],
        emailSelect: '',
        comments: ''
      }
    },
    computed: {
//      this.$store.dispatch('getAllUserEmails')
      //return this.$store.getters.getAssignCorrId
      getAllUserEmails() {
        //console.log('Users Emails', this.$store.getters.getAllUsers)
        return this.$store.getters.getAllUsers
      },
      getFromUserEmail() {
        //console.log("user email is ", this.$store.getters.getFromUserEmail)
        return this.$store.getters.getFromUserEmail
      },
      getAssignedCorrDetails() {
        return this.$store.getters.getSelectedCorr
      }


    },
    created() {

      this.$store.dispatch('getAllUsers')


    },
    methods: {
      assign() {

        // const dateAssigned = new Date()
        const formData = {
          toUserId: this.emailSelect,
          comments: this.comments,
          fromUserId: localStorage.getItem('userId'),
          dateReceived: new Date(),
          correspondenceId: this.$store.getters.getAssignCorrId,
          dateAssigned: '',
          duration: ''


        }

        this.$store.dispatch('assignCorrTo', formData)
        $("#showAssignTo").modal("hide")

      }
    },

    components: {
      ModelSelect
    }

  }

</script>

<style scoped>
  .el-select {
    width: 100%;
  }
</style>
