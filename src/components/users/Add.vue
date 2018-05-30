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
        <section class="content-header text-style">
          <h1>
            Add a New User

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
                <div>
                  <form>
                    <div class="form-group has-feedback">
                      <label>Full Name</label>
                      <input type="text" v-model="fullname" class="form-control" placeholder="Full name">
                      <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                      <label>Username</label>
                      <input type="text" v-model="username" class="form-control" placeholder="Username">
                      <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                      <label>Email</label>
                      <input type="email" v-model="email" class="form-control" placeholder="Email">
                      <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <div class="form-group">
                      <label>User Role</label>
                      <select class="form-control" v-model="userRole" >
                        <option v-for="fetchedUserRole in fetchedUserRoles" :value="fetchedUserRole.id">{{ fetchedUserRole.userRole }}</option>

                      </select>
                    </div>
                    <div class="form-group has-feedback">
                      <label>Password</label>
                      <input type="password" v-model="password" class="form-control" placeholder="Password">
                      <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                      <label>Confirm Password</label>
                      <input type="password" v-model="confirmPass" class="form-control" placeholder="Retype password">
                      <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
                    </div>
                    <div class="row">
                      <div class="col-xs-8">

                      </div>
                      <!-- /.col -->
                      <div class="col-xs-4">
                        <button type="submit" @click.prevent="addUser" class="btn btn-primary btn-block btn-flat">Submit</button>
                      </div>
                      <!-- /.col -->
                    </div>
                  </form>
                </div>
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
  </div>
</template>

<script>
  //import axios from 'axios'
  import HeaderNav from '../header/HeaderNav.vue'
  import Sidebar from '../sidebar/Sidebar.vue'
  import Footer from '../footer/Footer.vue'

  export default {
    data(){
      return {
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPass: '',
        division: 'finance',
        userRole: ''
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

      }

    },
    created() {
      this.$store.dispatch('getAllUserRoles')

    },
    methods: {
      addUser(){

        const formData = {
          fullname: this.fullname,
          username: this.username,
          email: this.email,
          password: this.password,
          division: this.division,
          userRole: this.userRole
        }
        console.log(formData)
        this.$store.dispatch('registerUser',formData)
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
    width: 50% !important;
    margin-left: 300px !important;
  }
  .text-style{
    text-align: center;
  }
</style>

