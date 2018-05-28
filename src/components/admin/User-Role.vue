<template>
  <div class="col-md-6">
    <div class="box box-primary box-solid">
      <div class="box-header with-border">
        <h3 class="box-title">User Role</h3>

        <!--    <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
            </div> -->
        <!-- /.box-tools -->
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <form class="form-inline">

          <div class="form-group mx-sm-3 mb-2">
            <input type="text" v-model="userRole" class="form-control" placeholder="User Role">

          </div>
          <button type="submit" @click.prevent="addUserRole" class="btn btn-success mb-2">Add</button>
        </form>
      </div>
      <!-- /.box-body -->

      <div class="box-header with-border">
        <h3 class="box-title"></h3>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <!-- Main content -->
        <section class="content">
          <div class="row">
            <div class="col-xs-12">

              <!-- /.box -->

              <div class="box">

                <!-- /.box-header -->
                <div class="box-body">
                  <table id="example2" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Role</th>
                      <th>Edit</th>



                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="fetchedUserRole in fetchedUserRoles">
                      <td>{{ fetchedUserRole.userRole }}</td>
                      <td>Edit</td>

                    </tr>

                    </tbody>

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
    </div>
    <!-- /.box -->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        userRole: '',

      }
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
      addUserRole(){

        const formData = {
          userRole: this.userRole,

        }
        console.log(formData)
        this.$store.dispatch('addUserRoleTypes',formData)
      }
    }

  }
</script>
<style>

</style>
