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
            Change Your Password
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
                  <label>Enter Old Password</label>
                  <input type="password" v-model="oldPassword" class="form-control" placeholder="Old Password" required>
                  <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                  </div>
                  <div class="form-group has-feedback">
                   <label>Enter New Password</label>
                  <input type="password" v-model="newPassword" class="form-control" placeholder="New password" required>
                  <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
                  </div>
                  <div class="row">
                    <div class="col-xs-8">

                    </div>
                    <!-- /.col -->
                    <div class="col-xs-4">
                      <button type="submit" @click.prevent="resetpassword" class="btn btn-primary btn-block btn-flat">Submit</button>
                    </div/>
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

        userId: this.$route.params.userId,
        oldPassword: '',
        newPassword: ''
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
      resetpassword(){

        const formData = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
          //id: this.userId
         
        }
        console.log('form data is', formData)
        this.$store.dispatch('resetUserPassword',{formData})
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
