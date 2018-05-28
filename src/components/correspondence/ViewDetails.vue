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
                {{ displayDetail.toWhom }}
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
                {{ displayDetail.dateReceived }}
              </td>

            </tr>
            <tr>
              <td class="comp-detail-body-ld">
                Download Correspondence
              </td>
              <td class="comp-detail-body-rd">
                download link
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
        return this.$store.getters.fetchedCorrDetails
      },
      corrTypes(){
        console.log('corr types', this.$store.getters.getAllCorrTypes)
        return this.$store.getters.getAllCorrTypes
      }

    },
    created() {
      this.$store.dispatch('getAllCorrTypes')

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
