<template>
  <nav class="navbar navbar-static-top">
    <!-- Sidebar toggle button-->
    <span class="main-title">NCA CORRESPONDENCE TRACKER</span>
    <div class="navbar-custom-menu ">
      <button type="button" class="logout" @click="onLogout">Logout</button>
      <ul class="nav navbar-nav ">
        <li>

        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {

  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
  .main-header .navbar{
    margin-left: 0 !important;
  }
  .main-title{
    color: white;
    font-size: 40px;
    margin-left: 420px;
  }
  .user-panel {
    padding: 16px 0 0 !important;

  }
  .logout{
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
    margin-top: 15px;
    margin-right: 40px;
    font-size: 20px;

  }
</style>
