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
                            <th>Download</th>
                            <th>Details</th>
                            <th>Date Assigned</th>
                            <th>Assign</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr >
                            <td> osman </td>
                            <td>memo</td>
                            <td>request for funds</td>
                            <td> Finance</td>
                            <td> 23/03/1986</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                          </tr>
                          </tbody>

                          <tfoot>
                          <tr>
                            <th>To Whom Received</th>
                            <th>Type of Correspondence</th>
                            <th>Subject Matter</th>
                            <th>From</th>
                            <th>Date Received</th>
                            <th>Download</th>
                            <th>Details</th>
                            <th>Date Assigned</th>
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
    created() {
      // console.log('corr types', this.$store.getters.getAllCorrTypes)

      this.$store.dispatch('getAllCorrTypes')
      this.$store.dispatch('getUser')
      this.$store.dispatch('getAllUserRoles')


    }

 //   computed: {
//      memos () {
//
//        return this.$store.getters.memos
//
//      }
//    },
//    created() {
//      this.$store.dispatch('getCorrespondence')
//      //this.$store.getters.user
//    }
  }
</script>

<style>
</style>

