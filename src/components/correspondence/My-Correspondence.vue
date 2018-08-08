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
            My Correspondences

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
                            <th>Nature of Correspondence</th>
                            <th>Type of Correspondence</th>
                            <th>Subject Matter</th>
                            <th>From</th>
                            <!--<th>Date Received</th>-->
                            <th>Assigned To</th>
                            <th v-if="getCurrentUserRole === 'Director' || getCurrentUserRole === 'Secretary' ">Edit</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Assign </th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for=" memo in myMemos">
                            <td> {{ memo.toWhom }} </td>
                            <td> {{ memo.natureOfCorrespondence }} </td>
                            <td>
                              <div v-for="corrType in getCorrTypes" >
                                <span v-if="memo.typeOfCorrespondence == corrType.id">

                                    {{ corrType.typeOfCorrespondence }}
                                </span>
                              </div>
                            </td>
                            <td>{{ memo.subject }}</td>
                            <td> {{ memo.fromWhere }}</td>
                            <!--<td> {{ memo.dateReceived  | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>-->
                            <td >
                              <div v-for="user in users">

                              <span v-if="user.id == memo.currentUserAssignedId" >
                                {{ user.fullname }}
                              </span>
                              </div>
                            </td>
                            <td v-if="getCurrentUserRole === 'Director' || getCurrentUserRole === 'Secretary' "> <router-link
                              tag="button"
                              :to="{ name: 'EditCorrespondence', params: { correspondenceId: memo.id } }"
                              class="btn btn-primary">Edit</router-link></td>
                            <td> <button

                              @click="getCorrespondenceDetails(memo.id)"
                              class="btn btn-primary">Details</button></td>
                            <td>
                              <el-switch v-model="value1"
                                         active-color="#13ce66"
                                         inactive-color="#ff4949">
                              </el-switch>

                            </td>

                            <td><button  @click="assignTo(memo.id)" class="btn btn-success">Send To</button> </td>
                          </tr>
                          </tbody>

                          <tfoot>
                          <tr>
                            <th>Received From</th>
                            <th>Nature of Correspondence</th>
                            <th>Type of Correspondence</th>
                            <th>Subject Matter</th>
                            <th>From</th>
                            <!--<th>Date Received</th>-->
                            <th>Assigned To</th>
                            <th v-if="getCurrentUserRole === 'Director' || getCurrentUserRole === 'Secretary' ">Edit</th>
                            <th>Details</th>
                            <th>Status</th>
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
        value1:true
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
      myMemos () {
        //console.log('users name is', this.toUSerName)
        return this.$store.getters.getMyMemos

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

    },
    created() {
      this.$store.dispatch('getMyCorrespondence')
      this.$store.dispatch('getAllCorrTypes')
      this.$store.dispatch('getAllUsers')
      this.$store.dispatch('getUserRole')
      this.$store.dispatch('getAllUserRoles')


    },

    methods: {
      getCorrespondenceDetails(correspondenceId){

        this.$store.dispatch('toUserAssigned', correspondenceId)
//        this.$store.dispatch('assignCorrTo', correspondenceId)
        this.$store.dispatch('fetchCorrDetails', correspondenceId)
      },
      assignTo(correspondenceId){
        $("#showAssignTo").modal("show")
        //console.log(correspondenceId)
        this.$store.dispatch('assignCorrId', correspondenceId)
      }

    }
  }
</script>

<style scoped>

</style>

