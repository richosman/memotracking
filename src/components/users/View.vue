<template xmlns="http://www.w3.org/1999/html">
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
            View Users

          </h1>

        </section>

        <!-- Main content -->
        <section class="content">

          <!-- Default box -->
          <div class="box">

            <div class="box-body">
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
                                  <th>Full Name</th>
                                  <th>Username</th>
                                  <th>Division</th>
                                  <th>Email</th>
                                  <th>Role</th>
                                  <th>Edit</th>
                                  <th>Details</th>
                                  <th>Change Password</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="user in users">
                                  <td>{{ user.fullname }}</td>
                                  <td>{{ user.username }}</td>
                                  <td>{{ user.division }}</td>
                                  <td>{{ user.email }}</td>
                                  <td>
                                    <div v-for="getUserType in getUserTypes" >
                                <span v-if="user.userRole == getUserType.id">

                                    {{ getUserType.userRole }}
                                </span>
                                    </div>

                                  </td>
                                  <td>
                                    <router-link
                                      tag="button"
                                      :to="{ name: 'EditUser', params: { userId: user.id } }"
                                      class="btn btn-primary">Edit</router-link>
                                    </td>
                                  <td>
                                    <button

                                    @click="getUserDetails(user.id)"
                                    class="btn btn-primary">Details</button></td>

                                  <td>

                                    <router-link
                                      tag="button"
                                      :to="{ name: 'UserPasswordReset', params: { userId: user.id } }"
                                      class="btn btn-danger">Reset</router-link> 
                                  </td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr>
                                  <th>Full Name</th>
                                  <th>Username</th>
                                  <th>Division</th>
                                  <th>Email</th>
                                  <th>Role</th>
                                  <th>Details</th>
                                  <th>Edit</th>
                                  <th>Change Password</th>
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
              <!-- /.content -->
            </div>
            <!-- /.box-body -->


          </div>
          <!-- /.box -->

        </section>


        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->

      <app-footer></app-footer>


    </div>

    <app-view-details></app-view-details>

  </div>
</template>

<script>
  import HeaderNav from '../header/HeaderNav.vue'
  import Sidebar from '../sidebar/Sidebar.vue'
  import Footer from '../footer/Footer.vue'
  import axios from 'axios'
  import  ViewDetails from './ViewDetails.vue'


  export default {
    components:{
      appHeaderNav:HeaderNav,
      appSidebar:Sidebar,
      appFooter:Footer,
      appViewDetails:ViewDetails,

    },
    computed: {
      users() {

        return this.$store.getters.getAllUsers
      },
      getUserTypes(){
        //console.log('corr types', this.$store.getters.getAllCorrTypes)
        return this.$store.getters.getAllUserRoles
      }
    },
    created() {
      this.$store.dispatch('getUser')
      this.$store.dispatch('getAllUsers')
      this.$store.dispatch('getAllUserRoles')
      //this.$store.getters.user
    },
    methods: {
      getUserDetails(userId) {
        this.$store.dispatch('getUserInfo', userId)
      },
//      getUserEdit(userId){
//        this.$store.dispatch('getUserEditInfo', userId)
//      }
    }
  }
</script>

<style scoped>
  .img-logo {
    height:100px;
    width:115px;
  }
  .logo-wrapper{
    text-align:left;
    margin-bottom:10px;
  }
</style>

