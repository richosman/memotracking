<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="logo-wrapper ">
          <img class="img-logo img-circle" src = "/static/assets/img/ncalogo.PNG" />
          <!--<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">-->
        </div>

      </div>


      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">

        <li class="active treeview" v-if="getCurrentUserRole === 'Director'">
          <router-link to="/home" >
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
            <!--&lt;!&ndash;<span class="pull-right-container">&ndash;&gt;-->
              <!--<i class="fa fa-angle-left pull-right"></i>-->
            <!--</span>-->
          </router-link>

        </li>
        <li class="active treeview" v-if="getCurrentUserRole === 'Director'">
          <router-link to="/admin-home">
            <i class="glyphicon glyphicon-wrench"></i> <span>Admin Config</span>
            <!--&lt;!&ndash;<span class="pull-right-container">&ndash;&gt;-->
            <!--<i class="fa fa-angle-left pull-right"></i>-->
            <!--</span>-->
          </router-link>

        </li>
        <li class="treeview">
          <router-link to="/my-correspondence">
            <i class="fa fa-plus-square"></i>
            <span>My Correspondence</span>
            <!--<span class="pull-right-container">-->
            <!--<span class="label label-primary pull-right">4</span>-->
            <!--</span>-->
          </router-link>

        </li>
        <!--<li class="active treeview" v-if="getCurrentUserRole === 'Secretary'">-->
          <!--<router-link to="/add-correspondence">-->
            <!--<i class="fa fa-plus-square"></i>-->
            <!--<span>Add Correspondence</span>-->
            <!--&lt;!&ndash;<span class="pull-right-container">&ndash;&gt;-->
              <!--&lt;!&ndash;<span class="label label-primary pull-right">4</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
          <!--</router-link>-->

        <!--</li>-->

        <li class="active treeview" v-if="getCurrentUserRole === 'Director' || getCurrentUserRole === 'Secretary'">
          <router-link to="/add-correspondence">
            <i class="fa fa-plus-square"></i>
            <span>Add Correspondence</span>
            <!--<span class="pull-right-container">-->
            <!--<span class="label label-primary pull-right">4</span>-->
            <!--</span>-->
          </router-link>

        </li>
        <li class="active treeview">
          <router-link to="/view-correspondence">
            <i class="fa fa-eye"></i> <span>View Correspondence</span>
            <!--<span class="pull-right-container">-->
              <!--<small class="label pull-right bg-green">new</small>-->
            <!--</span>-->
          </router-link>
        </li>
        <li class="active treeview" v-if="getCurrentUserRole === 'Director'">
          <router-link to="/add-user">
            <i class="fa fa-user-plus"></i> <span>Add User</span>
            <!--<span class="pull-right-container">-->
              <!--<small class="label pull-right bg-green">new</small>-->
            <!--</span>-->
          </router-link>
        <!--</li>-->
        <li class="active treeview" v-if="getCurrentUserRole === 'Director'">
          <router-link to="/view-users">
            <i class="fa fa-users"></i> <span>View Users</span>
            <!--<span class="pull-right-container">-->
              <!--<small class="label pull-right bg-green">new</small>-->
            <!--</span>-->
          </router-link>
        </li>





      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
  import axios from 'axios'
  export default {
//    data (){
//
//      console.log('user is by ID', localStorage.getItem('userRole'))
//      return localStorage.getItem('userId')
//    },
    computed: {
      getCurrentUserRole(){
        return this.$store.getters.getCurrentUserRole
      }
    },
    created() {
      this.$store.dispatch('getAllUserRoles')
      this.$store.dispatch('getUserRole')
    }
  }
</script>

<style scoped>
  .img-logo {
    height:117px;
    width:132px;
  }
  .logo-wrapper{
    text-align:center;
    margin-bottom:10px;
  }
  .img-circle {
    border-radius: 10% !important;
  }
</style>
