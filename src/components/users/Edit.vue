<template>

    <div class="wrapper">

      <header class="main-header">


        <app-header-nav></app-header-nav>

      </header>
      <!-- Left side column. contains the logo and sidebar -->

      <app-sidebar></app-sidebar>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header text-style">
          <h1>
            Edit User Information
          </h1>

        </section>

        <!-- Main content -->
        <section class="content">

          <!-- Default box -->
          <div class="box">

            <div class="box-body">
              <div class="box box-primary">

                <!-- /.box-header -->
                <!-- form start -->

                <form role="form" enctype="multipart/form-data">
                  <div class="form-group has-feedback">
                    <label>Full Name</label>
                    <input type="text" id="fullname" :value="userDetails.fullname" class="form-control" placeholder="Full name">
                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                  </div>
                  <div class="form-group has-feedback">
                    <label>Username</label>
                    <input type="text" id="username" :value="userDetails.username" class="form-control" placeholder="Username">
                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                  </div>
                  <div class="form-group has-feedback">
                    <label>Email</label>
                    <input type="email" id="email" :value="userDetails.email" class="form-control" placeholder="Email">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                  </div>
                  <div class="form-group has-feedback">
                    <label>Division</label>
                    <input type="text" id="division" :value="userDetails.division" class="form-control" placeholder="division">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                  </div>
                  <div class="form-group">
                    <label>User Role</label>
                    <select class="form-control" id="userRole" :value="userDetails.userRole">
                      <option v-for="fetchedUserRole in fetchedUserRoles" :value="fetchedUserRole.id" :selected="fetchedUserRole.id == userDetails.userRole">{{ fetchedUserRole.userRole }}</option>

                    </select>
                  </div>
                  <!--<div class="form-group has-feedback">-->
                  <!--<input type="password" v-model="password" class="form-control" placeholder="Password">-->
                  <!--<span class="glyphicon glyphicon-lock form-control-feedback"></span>-->
                  <!--</div>-->
                  <!--<div class="form-group has-feedback">-->
                  <!--<input type="password" v-model="confirmPass" class="form-control" placeholder="Retype password">-->
                  <!--<span class="glyphicon glyphicon-log-in form-control-feedback"></span>-->
                  <!--</div>-->
                  <div class="row">
                    <div class="col-xs-8">

                    </div>
                    <!-- /.col -->
                    <div class="col-xs-4">
                      <button type="submit" @click.prevent="edituser" class="btn btn-primary btn-block btn-flat">Submit</button>
                    </div>
                    <!-- /.col -->
                  </div>
                </form>

              </div>
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


</template>

<script>
  import axios from 'axios'
  import router from '../../router/index'
  import HeaderNav from '../header/HeaderNav.vue'
  import Sidebar from '../sidebar/Sidebar.vue'
  import Footer from '../footer/Footer.vue'

  export default {
    data(){
      return {

        userId: this.$route.params.userId

      }
    },
    components:{
      appHeaderNav:HeaderNav,
      appSidebar:Sidebar,
      appFooter:Footer
    },

    computed: {
      fetchedUserRoles () {

        return this.$store.getters.getAllUserRoles

      },
      userDetails () {

        return this.$store.getters.fetchedUserDetails
      }

    },
    created() {
      this.$store.dispatch('getAllUserRoles')
      this.$store.dispatch('getUserEditInfo', this.userId)

    },
    methods: {
      edituser(){

        const formData = {
          fullname: document.getElementById('fullname').value,
          username: document.getElementById('username').value,
          email: document.getElementById('email').value,
          division: document.getElementById('division').value,
          userRole: document.getElementById('userRole').value

        }
        console.log('form data is', formData)
        this.$store.dispatch('editUserDetailsInfo',{formData, id: this.userId})
      }
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
  .box.box-primary{
    width: 60% !important;
    margin-left: 240px !important;
  }
  .text-style{
    text-align: center;
  }
</style>

