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
            Search All Correspondence

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
                          <tr>
                            <th>Received From</th>
                            <th>Type of Correspondence</th>
                            <th>Nature of Correspondence</th>
                            <th>Subject Matter</th>
                            <th>From</th>
                            <th>Date Received</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th v-if="getCurrentUserRole === 'Director' ">Re-Assign</th>
                            <th>Details</th>

                            <!--<th>Assign </th>-->
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for=" memo in memos" >
                            <td>
                              <span v-if="memo.toWhom">
                                {{ memo.toWhom }}
                              </span>


                            </td>
                            <td>
                              <div v-for="corrType in getCorrTypes" >
                                <span v-if="memo.typeOfCorrespondence == corrType.id">

                                    {{ corrType.typeOfCorrespondence }}
                                </span>
                              </div>
                            </td>
                            <!--<td>-->
                              <!--<div v-for="corrNature in getCorrNatures" >-->
                                <!--<span v-if="memo.natureOfCorrespondence == corrNature.id">-->

                                    <!--{{ corrNature.natureOfCorrespondence }}-->
                                <!--</span>-->
                              <!--</div>-->
                            <!--</td>-->
                            <td>

                              {{ memo.natureOfCorrespondence }}
                            </td>
                            <td>{{ memo.subject }}</td>
                            <td> {{ memo.fromWhere }}</td>
                            <td> {{ memo.dateReceived  | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>
                            <td >
                              <div v-for="user in users">

                              <span v-if="user.id == memo.currentUserAssignedId" >
                                {{ user.fullname }}
                              </span>
                              </div>
                            </td>
                            <td>{{ memo.status }} </td>

                          <td v-if="getCurrentUserRole === 'Director' ">
                              <button  @click="assignTo(memo.id)" class="btn btn-success" :disabled="memo.status === 'Inactive'">Re-Assign</button>
                          </td>
                            <td>
                              <button

                              @click="getCorrespondenceDetails(memo.id)"
                              class="btn btn-primary">Details</button>
                            </td>


                            <!--<td><button  @click="assignTo(memo.id)" class="btn btn-success">Send To</button> </td>-->
                          </tr>
                          </tbody>

                          <tfoot>
                          <tr>
                            <th>Received From</th>
                            <th>Type of Correspondence</th>
                            <th>Nature of Correspondence</th>
                            <th>Subject Matter</th>
                            <th>From</th>
                            <th>Date Received</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th v-if="getCurrentUserRole === 'Director' ">Re-Assign</th>
                            <th>Details</th>
                            <!--<th>Assign</th>-->
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

        //toUSerName: this.$store.getters.assignedCorrUser
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
        //console.log('users name is', this.toUSerName)
        return this.$store.getters.memos

      },
      users() {

        return this.$store.getters.getAllUsers
      },
      userAssigned() {
        //console.log('full name is', this.$store.getters.assignedCorrUser)
        //return this.$store.getters.assignedCorrUser
      return this.$store.getters.assignedCorrUser
      },
      getCorrTypes(){
        //console.log('correspon types', this.$store.getters.getAllCorrTypes)
        return this.$store.getters.getAllCorrTypes
      },
      getCurrentUserRole(){
        return this.$store.getters.getCurrentUserRole
      }

//      getCorrNatures(){
//        //console.log('correspon types', this.$store.getters.getAllCorrTypes)
//        return this.$store.getters.getAllCorrNatures
//      }

    },
    created() {
      this.$store.dispatch('getAllCorrespondence')
      this.$store.dispatch('getAllCorrTypes')
      //this.$store.dispatch('getAllCorrNatures')
      this.$store.dispatch('getAllUsers')
      this.$store.dispatch('getUserRole')

    },

    methods: {
      getCorrespondenceDetails(correspondenceId){

        this.$store.dispatch('toUserAssigned', correspondenceId)
//        this.$store.dispatch('assignCorrTo', correspondenceId)
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


