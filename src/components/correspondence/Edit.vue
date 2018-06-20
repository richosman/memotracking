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
            Edit Correspondence

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

                  <div class="box-body">
                    <div class="form-group">
                      <label>To Whom Received</label>
                      <input type="text" id="toWhom" :value="correspondence.toWhom" class="form-control" >
                    </div>

                    <div class="form-group">
                      <label>Type of Correspondence</label>
                      <select class="form-control" id="typeOfCorrespondence" :value="correspondence.typeOfCorrespondence">

                        <option v-for="fetchedCorrType in fetchedCorrTypes" :value="fetchedCorrType.id" :selected="fetchedCorrType.id == correspondence.typeOfCorrespondence">{{ fetchedCorrType.typeOfCorrespondence }}</option>


                      </select>
                    </div>


                    <div class="form-group">
                      <label>Subject Matter</label>
                      <input type="text" id="subject" :value="correspondence.subject" class="form-control" placeholder="Enter ...">
                    </div>


                    <div class="form-group">
                      <label>Division/Company/Client</label>
                      <input type="text" id="fromWhere" :value="correspondence.fromWhere" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group">
                      <label>Date Received:</label>

                      <!--<datepicker v-model="dateReceived" name="dateReceived" :format="customFormatter"></datepicker>-->
                      <!--<datepicker id="dateReceived" :value="correspondence.dateReceived" name="dateReceived" :format="customFormatter"></datepicker>-->
                        <input type="text" id="dateReceived" :value="correspondence.dateReceived" class="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask disabled>

                      <!-- /.input group -->
                    </div>


                    <div class="form-group">
                      <label for="filesToUpload1">Attached Correspondence</label>

                      <input name="filesToUpload" id="filesToUpload1" type="file" multiple @change.prevent="memoFileUpload($event)" />
                      <p class="help-block">Scan and attach Correspondence here.</p>
                    </div>


                    <!-- /.box-body -->

                    <div class="box-footer">
                      <button type="submit" @click.prevent="UpdateCorrespondence" class="btn btn-primary">Update</button>
                    </div>
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
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../../router/index'
  import HeaderNav from '../header/HeaderNav.vue'
  import Sidebar from '../sidebar/Sidebar.vue'
  import Footer from '../footer/Footer.vue'
  import Datepicker from 'vuejs-datepicker';

  export default {
    data(){
      return {

        correspondenceId: this.$route.params.correspondenceId

      }
    },
    components:{
      appHeaderNav:HeaderNav,
      appSidebar:Sidebar,
      appFooter:Footer,
      Datepicker
    },
    computed: {
//      getMemoAttachment(){
//        this.attachment = this.$store.getters.memoAttachment
////        console.log('attachment', this.attachment)
//      },

      correspondence() {

        return this.$store.getters.fetchedCorr
      },
      fetchedCorrTypes () {

        return this.$store.getters.getAllCorrTypes

      }

    },
    created() {

      this.$store.dispatch('fetchCorrespondence', this.correspondenceId)

        this.$store.dispatch('getAllCorrTypes')

    },

    methods: {
      UpdateCorrespondence() {

        const formData = {
          toWhom: document.getElementById('toWhom').value,
          typeOfCorrespondence: document.getElementById('typeOfCorrespondence').value,
          subject: document.getElementById('subject').value,
          dateReceived: document.getElementById('dateReceived').value,
          fromWhere: document.getElementById('fromWhere').value,
          //id: this.correspondenceId
        }
        //console.log('send formDate', {formData, id: this.correspondenceId})
        this.$store.dispatch('editCorrespondence', {formData, id: this.correspondenceId})

      },
      customFormatter(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      },
//      memoFileUpload(event) {
//        this.$store.dispatch('processFile', event)
//      },

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

