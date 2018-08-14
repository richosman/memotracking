<template>

  <div id="showCorrDetails" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> -->
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#corrdetails">Correspondence Details</a></li>
            <li><a data-toggle="tab" href="#logs">Correspondence Assignment Logs</a></li>
          </ul>

          <div class="tab-content">
            <div id="corrdetails" class="tab-pane fade in active">
              <table class="tableDetails" id="comp-detail-bottom">
                <tr class="detail-title">
                  <td colspan="4">
                    Details Of Correspondence
                  </td>
                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    To Whom Received
                  </td>
                  <td class="comp-detail-body-rd">
                    <span v-if="displayDetail.toWhom !==null">
                      {{ displayDetail.toWhom }}
                    </span>

                  </td>

                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    Type Of Correspondence
                  </td>
                  <td class="comp-detail-body-rd" >
                    <div v-for="corrType in corrTypes" >
                  <span v-if="displayDetail.typeOfCorrespondence == corrType.id">

                {{ corrType.typeOfCorrespondence }}
                  </span>
                    </div>
                  </td>

                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    Subject Matter
                  </td>
                  <td class="comp-detail-body-rd">
                    {{ displayDetail.subject }}
                  </td>

                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    Division/Company/Clients
                  </td>
                  <td class="comp-detail-body-rd">
                    {{ displayDetail.fromWhere }}
                  </td>

                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    Date Received
                  </td>
                  <td class="comp-detail-body-rd">
                    {{ displayDetail.dateReceived  | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
                  </td>

                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    Download Correspondence
                  </td>
                  <td class="comp-detail-body-rd">
                    <ul>
                      <li v-for="file in displayDetail.attachment">
                        <a :href="'http://localhost:3000/api/containers/memo-file-uploads/download/'+file.name">{{ file.originalFilename }}</a>
                      </li>
                    </ul>
                  </td>

                </tr>
                <tr class="detail-title">
                  <td colspan="4">
                    Details Of Correspondence Assignment
                  </td>
                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    Currently Assigned to
                  </td>
                  <td class="comp-detail-body-rd">
                    {{ assignedDetails.toUserName }}
                  </td>

                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    Date Correspondence was Received
                  </td>
                  <td class="comp-detail-body-rd">
                    {{ assignedDetails.dateOfAssignment | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
                  </td>

                </tr>
                <tr>
                  <td class="comp-detail-body-ld">
                    Duration Since Assigned
                  </td>
                  <td class="comp-detail-body-rd">
                    {{ assignedDetails.duration }} Days
                  </td>

                </tr>
              </table>
            </div>
            <div id="logs" class="tab-pane fade">

              <table id="example3" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Date Received</th>
                  <th>Date Assigned</th>
                  <th>Duration (Days)</th>
                  <th>Comments</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for=" corrAssignedLog in corrAssignedLogs">
                  <td >
                    <div v-for="user in users">

                              <span v-if="user.id == corrAssignedLog.fromUserId" >
                                {{ user.fullname }}
                              </span>
                    </div>
                  </td>
                  <td>
                    <div v-for="user in users">

                              <span v-if="user.id == corrAssignedLog.toUserId" >
                                {{ user.fullname }}
                              </span>
                    </div>
                  </td>
                  <td>{{ corrAssignedLog.dateReceived | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>
                  <td>{{ corrAssignedLog.dateAssigned | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>

                  <td> {{ corrAssignedLog.duration }}</td>
                  <td >
                    <el-popover
                      placement="bottom"

                      width="400"
                      trigger="click"
                      :content="corrAssignedLog.comments">
                      <el-button slot="reference">View Comments</el-button>
                    </el-popover>

                  </td>

                </tr>
                </tbody>

                <tfoot>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Date Received</th>
                  <th>Date Assigned</th>
                  <th>Duration (Days)</th>
                  <th>Comments</th>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>

        </div>
        <div class="modal-footer modalButtons">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {

    computed: {

      displayDetail (){
        //console.log('corresponde types', this.$store.getters.fetchedCorrDetails)
        return this.$store.getters.fetchedCorrDetails
      },
      corrTypes(){
        console.log('corres types', this.$store.getters.getAllCorrTypes)
        return this.$store.getters.getAllCorrTypes
      },
      assignedDetails (){

        console.log('assignment details', this.$store.getters.assignedCorrUser)
        return this.$store.getters.assignedCorrUser
      },
      corrAssignedLogs() {
        return this.$store.getters.getAllAssignedLogs
      },
      users() {

        return this.$store.getters.getAllUsers
      }

    },
    created() {
      this.$store.dispatch('getAllCorrTypes')
      this.$store.dispatch('getAllUsers')
     // console.log('detail data', this.displayDetail)
    }

  }

</script>

<style scoped>
  .tableDetails{
    width: 80%;
    font-size: 14px;
    margin: 0 auto;
  }
  .detail-title{
    background-color: #2f90ba;
    color: #fff;
    font-weight: bold;
  }
  .comp-detail-body-ld {
    width: 50%;
    font-weight: bold;
  }
  .comp-detail-body-rd {
    width: 60%;
  }
  #comp-detail-bottom td {
    border: 1px solid #eee;
    padding: 9px;
  }
  .modalButtons{
    text-align:center;
  }
</style>
