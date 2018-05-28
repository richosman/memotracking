<template>
	<div class="hold-transition login-page">
	<div class="login-box">
  <div class="login-logo">


  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
  <div class="logo-wrapper">
    <img class="img-logo" src = "/static/assets/img/ncalogo.PNG" />
  </div>
    <p class="login-box-msg">Sign in to start your session</p>

    <form @submit.prevent="onSubmit">
      <div class="form-group has-feedback">
        <input type="email"  id="email" v-model="email" class="form-control" placeholder="Email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" id="password" v-model="password" class="form-control" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Remember Me
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>



    <a href="#">I forgot my password</a><br>
  <!--  <a href="register.html" class="text-center">Register a new membership</a> -->

  </div>
  <!-- /.login-box-body -->
</div>

</div>
</template>


<script>

  export default {
    data(){
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit() {
        const formData = {
          email: this.email,
          password: this.password,
        }
        console.log(formData)
        this.$store.dispatch('login', formData)


      }
    }
  }

	$(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' /* optional */
    });
  });
</script>

<style scoped>
  .img-logo {
      height:150px;
      width:165px;
  }
  .logo-wrapper{
    text-align:center;
    margin-bottom:10px;
  }
</style>
