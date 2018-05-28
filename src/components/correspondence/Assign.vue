<template>

  <div id="showAssignTo" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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

              <div class="form-group">
                <label>Assign To</label>
                <model-select :options="options"
                              v-model="item"
                              placeholder="Select User Email">
                </model-select>
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
  import { ModelSelect } from 'vue-search-select'
  import router from '../../router/index'
  import axios from 'axios'

  export default {
    data () {
      return {
        options: [
          { value: '1', text: 'osman.alhassan@nca.org.gh' },
          { value: '2', text: 'richosmanthus@gmail.com' },
          { value: '3', text: 'joemo@gmail.com' }

        ],
        item:  '',
          //text: ''
        //},
        comments: ''
      }
    },
    computed: {

      //return this.$store.getters.getAssignCorrId
//      displayDetail (){
////        console.log('corr types', this.$store.getters.getAllCorrTypes)
//        return this.$store.getters.getAssignCorrId
//      },
//      corrTypes(){
//        console.log('corr types', this.$store.getters.getAllCorrTypes)
//        return this.$store.getters.getAllCorrTypes
//      }

    },
    created() {
//      this.$store.dispatch('guser')

    },
    methods:{
      assign() {

       // const dateAssigned = new Date()
        const formData = {
          toUserId: this.item,
          //comments: this.comments,
          fromUserId: localStorage.getItem('userId'),
          dateReceived: new Date(),
          correspondenceId: this.$store.getters.getAssignCorrId
          //dateReceived: this.dateReceived,
          //subject: this.subject,
         //
          //fromWhere: this.fromWhere
          //attachment: ''
        }
        this.$store.dispatch('assignCorrTo', formData)
        $("#showAssignTo").modal("hide")
        console.log('something', formData)
      }
    },

  components: {
    ModelSelect
  }

  }

</script>

<style scoped>

</style>
