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
            Add a New Correspondence

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
                      <label>Received From</label>
                      <input type="text" v-model="toWhom" class="form-control" placeholder="Enter ...">
                    </div>

                    <div class="form-group">
                      <label>Nature of Correspondence</label>
                      <select class="form-control" v-model="natureOfCorrespondence">
                        <option v-for="fetchedCorrNature in fetchedCorrNatures" :value="fetchedCorrNature.natureOfCorrespondence">{{ fetchedCorrNature.natureOfCorrespondence }}</option>

                      </select>
                    </div>

                    <div class="form-group">
                      <label>Type of Correspondence</label>
                      <select class="form-control" v-model="typeOfCorrespondence">
                        <option v-for="fetchedCorrType in fetchedCorrTypes" :value="fetchedCorrType.id">{{ fetchedCorrType.typeOfCorrespondence }}</option>

                      </select>
                    </div>


                      <div class="form-group">
                        <label>Subject Matter</label>
                        <input type="text" v-model="subject" class="form-control" placeholder="Enter ...">
                      </div>


                        <div class="form-group">
                          <label>Division/Company/Client</label>
                          <input type="text" v-model="fromWhere" class="form-control" placeholder="Enter ...">
                        </div>
                    <!--<div class="form-group">-->
                      <!--<label>Date Received:</label>-->
                      <!--<datepicker v-model="dateReceived" name="dateReceived" :format="customFormatter"></datepicker>-->

                      <!--&lt;!&ndash;<div class="input-group">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="input-group-addon">&ndash;&gt;-->
                          <!--&lt;!&ndash;<i class="fa fa-calendar"></i>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;<input type="text" v-model="dateReceived" class="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask>&ndash;&gt;-->
                      <!--&lt;!&ndash;</div>&ndash;&gt;-->
                      <!--&lt;!&ndash; /.input group &ndash;&gt;-->
                    <!--</div>-->



                      <div class="form-group">
                      <label for="filesToUpload1">Attached Correspondence</label>

                        <input name="filesToUpload" id="filesToUpload1" type="file" multiple @change.prevent="memoFileUpload($event)" />
                      <p class="help-block">Scan and attach Correspondence here.</p>
                    </div>


                  <!-- /.box-body -->

                  <div class="box-footer">
                    <button type="submit" @click.prevent="AddCorrespondence" class="btn btn-primary">Submit</button>
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
  import Datepicker from 'vuejs-datepicker';
  import HeaderNav from '../header/HeaderNav.vue'
  import Sidebar from '../sidebar/Sidebar.vue'
  import Footer from '../footer/Footer.vue'
  import router from '../../router/index'
  export default {
    data(){
      return {
        toWhom: '',
        typeOfCorrespondence: '',
        natureOfCorrespondence: '',
        dateReceived: '',
        subject: '',
        fromWhere: '',
        //attachment: []

      }
    },
    components:{
      appHeaderNav:HeaderNav,
      appSidebar:Sidebar,
      appFooter:Footer,
      Datepicker
    },
    computed: {
      getMemoAttachment(){
        this.attachment = this.$store.getters.memoAttachment
      },
      fetchedCorrTypes () {

        return this.$store.getters.getAllCorrTypes

      },
      fetchedCorrNatures () {

        return this.$store.getters.getAllCorrNatures

      }
    },
    created() {
      this.$store.dispatch('getAllCorrTypes')

      this.$store.dispatch('getAllCorrNatures')

    },
    methods: {
      AddCorrespondence(){
        //var attach = this.getMemoAttachment
        var attach = this.$store.getters.memoAttachment
        //console.log(formData)

        const formData = {
          toWhom: this.toWhom,
          typeOfCorrespondence: this.typeOfCorrespondence,
          natureOfCorrespondence: this.natureOfCorrespondence,
          dateReceived: new Date(),
          subject: this.subject,
          fromWhere: this.fromWhere,
          currentUserAssignedId: localStorage.getItem('userId'),
          'attachment': attach
        }
        //console.log(' Date data', formData.dateReceived)
        this.$store.dispatch('addCorrespondence', formData)

      },
      memoFileUpload(event) {
        this.$store.dispatch('processFile', event)
      },
      customFormatter(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
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

