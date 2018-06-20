<template>

  <div id="showUserDetails" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> -->
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="tableDetails" id="comp-detail-bottom">
            <tr class="detail-title">
              <td colspan="4">
                User Details
              </td>
            </tr>
            <tr>
              <td class="comp-detail-body-ld">
                Full Name
              </td>
              <td class="comp-detail-body-rd">
                {{ displayDetail.fullname }}
              </td>

            </tr>
            <tr>
              <td class="comp-detail-body-ld">
                Username
              </td>
              <td class="comp-detail-body-rd">
                {{ displayDetail.username }}
              </td>

            </tr>
            <tr>
              <td class="comp-detail-body-ld">
                Division
              </td>
              <td class="comp-detail-body-rd">
                {{ displayDetail.division }}
              </td>

            </tr>

            <tr>
              <td class="comp-detail-body-ld">
                Email
              </td>
              <td class="comp-detail-body-rd">
                {{ displayDetail.email }}
              </td>

            </tr>
            <tr>
              <td class="comp-detail-body-ld">
                User Role
              </td>
              <td class="comp-detail-body-rd" >
                <div v-for="roleType in roleTypes" >
                  <span v-if="displayDetail.userRole == roleType.id">

                {{ roleType.userRole }}
                  </span>
                </div>
              </td>

            </tr>


          </table>
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
//        console.log('corr types', this.$store.getters.getAllCorrTypes)
        return this.$store.getters.fetchedUserDetails
      },
      roleTypes(){
        console.log('corr types', this.$store.getters.getAllUserRoles)
        return this.$store.getters.getAllUserRoles
      }

    },
    created() {
      this.$store.dispatch('getAllUserRoles')

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
