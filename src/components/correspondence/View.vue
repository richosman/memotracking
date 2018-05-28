<template>
  <div>
    <div class="wrapper">

      <header class="main-header">


        <app-header-nav></app-header-nav>

      </header>
      <!-- Left side column. contains the logo and sidebar -->

      <app-sidebar></app-sidebar>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Dashboard

          </h1>

        </section>

        <!-- Main content -->
        <section class="content">

          <!-- Default box -->
          <div class="box">

            <div class="box-body">
              <!-- Main content -->
              <section class="content">
                <div class="row">
                  <div class="col-xs-12">

                    <!-- /.box -->

                    <div class="box">

                      <!-- /.box-header -->
                      <div class="box-body">
                        <table id="example1" class="table table-bordered table-striped">
                          <thead>
                          <tr v-for="">
                            <th>To Whom Received</th>
                            <th>Type of Correspondence</th>
                            <th>Subject Matter</th>
                            <th>From</th>
                            <th>Date Received</th>
                            <th>Assigned To</th>
                            <th>Edit</th>
                            <th>Details</th>
                            <th>Assign</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for=" memo in memos">
                            <td> {{ memo.toWhom }} </td>
                            <td>
                              <div v-for="corrType in getCorrTypes" >
                                <span v-if="memo.typeOfCorrespondence == corrType.id">

                                    {{ corrType.typeOfCorrespondence }}
                                </span>
                              </div>
                            </td>
                            <td>{{ memo.subject }}</td>
                            <td> {{ memo.fromWhere }}</td>
                            <td> {{ memo.dateReceived }}</td>
                            <td>Maxwell Marfo </td>
                            <td> <router-link
                              tag="button"
                              :to="{ name: 'EditCorrespondence', params: { correspondenceId: memo.id } }"
                              class="btn btn-primary">Edit</router-link></td>
                            <td> <button

                              @click="getCorrespondenceDetails(memo.id)"
                              class="btn btn-primary">Details</button></td>

                            <td><button  @click="assignTo(memo.id)" class="btn btn-success">Send To</button> </td>
                          </tr>
                          </tbody>

                          <tfoot>
                          <tr>
                            <th>To Whom Received</th>
                            <th>Type of Correspondence</th>
                            <th>Subject Matter</th>
                            <th>From</th>
                            <th>Date Received</th>
                            <th>Assigned To</th>
                            <th>Edit</th>
                            <th>Details</th>
                            <th>Assign</th>
                          </tr>
                          </tfoot>
                        </table>
                      </div>
                      <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </section>
              <!-- /.content -->
            </div>
            <!-- /.box-body -->


          </div>
          <!-- /.box -->

        </section>        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->

      <app-footer></app-footer>



    </div>


    <!-- Modal -->

    <app-view-details></app-view-details>
     <app-assign-modal></app-assign-modal>



  </div>

</template>

<script>
  import HeaderNav from '../header/HeaderNav.vue'
  import Sidebar from '../sidebar/Sidebar.vue'
  import Footer from '../footer/Footer.vue'
  import ViewDetails from './ViewDetails.vue'
  import AssignModal from './Assign.vue'


  import axios from 'axios'
  export default {
    data(){
      return {
//        showDetailModal: false
      }
    },
    components:{
      appHeaderNav:HeaderNav,
      appSidebar:Sidebar,
      appFooter:Footer,
      appViewDetails: ViewDetails,
      appAssignModal: AssignModal



    },

    computed: {
      memos () {

        return this.$store.getters.memos

      },
      getCorrTypes(){
        console.log('corr types', this.$store.getters.getAllCorrTypes)
        return this.$store.getters.getAllCorrTypes
      }

    },
    created() {
      this.$store.dispatch('getAllCorrespondence')
      this.$store.dispatch('getAllCorrTypes')
    },

    methods: {
      getCorrespondenceDetails(correspondenceId){

        console.log(correspondenceId)
        this.$store.dispatch('fetchCorrDetails', correspondenceId)
      },
      assignTo(correspondenceId){
        $("#showAssignTo").modal("show")
        console.log(correspondenceId)
        this.$store.dispatch('assignCorrId', correspondenceId)
      }

    }
  }
</script>

<style scoped>

</style>

