
<template>
  <!-- /.col -->
  <div class="col-md-6">
    <div class="box box-primary box-solid">
      <div class="box-header with-border">
        <h3 class="box-title">Nature of Correspondence</h3>

        <!--    <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
            </div> -->
        <!-- /.box-tools -->
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <form class="form-inline">

          <div class="form-group mx-sm-3 mb-2">
            <input type="text" v-model="natureOfCorrespondence" class="form-control" placeholder="Nature of Correspondence">

          </div>
          <button type="submit" class="btn btn-success mb-2" @click.prevent="addCorrespondenceNature">Add</button>
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
                  <table id="example1" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Correspondence Nature</th>
                      <th>Edit</th>



                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="fetchedCorrNature in fetchedCorrNatures">
                      <td>{{ fetchedCorrNature.natureOfCorrespondence }}</td>
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
        natureOfCorrespondence: '',

      }
    },
    computed: {
      fetchedCorrNatures () {

        return this.$store.getters.getAllCorrNatures

      }

    },
    created() {
      this.$store.dispatch('getAllCorrNatures')

    },
    methods: {
      addCorrespondenceNature(){

        const formData = {
          natureOfCorrespondence: this.natureOfCorrespondence,

        }
        console.log(formData)
        this.$store.dispatch('addCorrNature',formData)
      }
    }

  }
</script>

<style scoped>


</style>
