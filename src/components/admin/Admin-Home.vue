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
          <div class="row">

           <app-type-correspondence></app-type-correspondence>

           <app-user-role></app-user-role>
          </div>
          <!-- /.row -->

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
  import TypeCorrespondence from './Type-Correspondence.vue'
  import UserRole from './User-Role.vue'
  export default {
    components:{
      appHeaderNav:HeaderNav,
      appSidebar:Sidebar,
      appFooter:Footer,
      appTypeCorrespondence:TypeCorrespondence,
      appUserRole:UserRole
    }
  }
</script>

<style>
</style>

