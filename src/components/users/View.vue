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
                                  <th>Details</th>
                                  <th>Edit</th>
                                  <th>Status</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr >
                                  <td>{{ user.fullname }}</td>
                                  <td>{{ user.username }}</td>
                                  <td>{{ user.division }}</td>
                                  <td>{{ user.email }}</td>
                                  <td>{{ user.userRole }}</td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
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
                                  <th>Status</th>
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
  </div>
</template>

<script>
  import HeaderNav from '../header/HeaderNav.vue'
  import Sidebar from '../sidebar/Sidebar.vue'
  import Footer from '../footer/Footer.vue'
  import axios from 'axios'

  export default {
    components:{
      appHeaderNav:HeaderNav,
      appSidebar:Sidebar,
      appFooter:Footer
    },
    computed: {
      user() {

        return this.$store.getters.user

      }
    },
    created() {
      this.$store.dispatch('getUser')
      //this.$store.getters.user
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

