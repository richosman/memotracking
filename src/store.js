import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router/index'
import alertify from 'alertifyjs'

Vue.use(Vuex)
Vue.use(alertify)

export default new Vuex.Store({
  state: {
    tokenId: null,
    userId: null,
    user: null,
    //userlist: []
    memoList: [],
    tfile_names: [],
    uploadedFiles: {},
    fetchedCorrespondence: null,
    fetchedCorrDetails: null,
    corrTypes: null,
    userRole: null,
    assignCorrId: null
    //showDetailModal: false
  },
  mutations: {
    authUser (state, userData) {
      state.tokenId = userData.tokenId
      state.userId = userData.userId
    },
    storeUser(state, user){
      state.user = user
    },
    storeMemos(state, memoList){
      state.memoList = memoList
    },

    storeMemoAttachment(state, attachment){
      state.uploadedFiles = attachment
    },
    clearAuthUser(state){
      state.tokenId = null
      state.userId = null
    },
    storeFetchedCorrespondence(state, fetchedCorrespondence){
      state.fetchedCorrespondence = fetchedCorrespondence
    },
    storeFetchedCorrDetails(state, fetchedCorrespondence){
      state.fetchedCorrDetails = fetchedCorrespondence
    },
    storeCorrTypes(state, corrTypes){
      state.corrTypes = corrTypes
    },
    storeUserRoles(state, userRole){
      state.userRole = userRole
    },
    storeAssignCorrId(state, assignCorrId){
      state.assignCorrId = assignCorrId
    }

    // changeShowDetailModal(state){
    //   state.showDetailModal = true
    // }
  },
  actions: {

    login ({commit, dispatch, state}, authData){
      axios.post('/MemoUsers/login', authData)
        .then(res => {

          commit('authUser', {
            tokenId: res.data.id,
            userId: res.data.userId
          })
          var expirationTIme = 1800000;
          let currentUserTokenId = res.data.id;
          let currentUserId = res.data.userId;
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expirationTIme)
          console.log('Token is :', currentUserTokenId)
          localStorage.setItem('token', currentUserTokenId)
            localStorage.setItem('userId', currentUserId)
          localStorage.setItem('expirationDate', expirationDate)

          dispatch('setLogoutTimer', expirationTIme)
          router.push('/my-correspondence')
        })
        .catch(error => {

          router.push('/')
        })



    },
    autoLogin ({commit, dispatch}) {
      dispatch('getAllCorrTypes')
      dispatch('getUser')
      dispatch('getAllUserRoles')

      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        tokenId: token,
        userId: userId
      })
    },
    logout({commit, state}){
      axios.post('/MemoUsers/logout?access_token=' + state.tokenId)
        .then(res => {
          commit('clearAuthUser')
          localStorage.removeItem('expirationDate')
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          router.push('/')
        })
        .catch(error =>{
          console.log(error)
        })

    },

    setLogoutTimer({commit}, expirationTIme){
      setTimeout( () => {

        commit('clearAuthUser')
        router.push('/')
      }, expirationTIme)

    },
    processFile({commit, dispatch, state}, event) {
      //reset the file input
      this.tfile_names = [];
      //$('#schedule_btn').attr('disabled', "disabled");
      //$('#schedule_btn').html( "Please Wait. Uploading files..." );
//        $('#schedule_btn').html('Please Wait. Uploading files...');
      var allfiles = {};
      var formData = new FormData();
      allfiles = event.target.files;
      //console.log('all files to upload ='+allfiles)
      for (var i = 0; i < allfiles.length ; i++){
        this.tfile_names.push(allfiles[i].name);
        formData.append('filesToUpload',allfiles[i]);
      }
      this.dispatch('uploadFiles', formData)
      //this.uploadFiles(formData);
      state.tfile_names = [];
    },

    uploadFiles({commit, state}, files){
      var utoken = state.tokenId;

      console.log(files);
      axios.post('/containers/memo-file-uploads/upload?access_token='+utoken, files)
        .then(response=>{
          //console.log(response);
          for (var i = 0; i < response.data.result.files.filesToUpload.length ; i++){
            state.tfile_names = {
              name: response.data.result.files.filesToUpload[i].name,
              originalFilename: response.data.result.files.filesToUpload[i].originalFilename,
              size: response.data.result.files.filesToUpload[i].size
            }

            state.uploadedFiles.push(state.tfile_names)

            //console.log('uploadedFiles', state.uploadedFiles )
          }
          commit('storeMemoAttachment', state.uploadedFiles)
          // state.tfile_names = state.uploadedFiles;

          //alertify.success('Upload successful')

          // $('#schedule_btn').removeAttr('disabled');
          // $('#schedule_btn').html( "Schedule it" );
       // },

        })
        .catch(error => {
          //alertify.error('Upload failed')
        })
    },

    registerUser ({commit},userData) {
      axios.post('/MemoUsers/', userData)
        .then(res => {
          //console.log(res)
          router.push('/view-users')
        })
        .catch(error=> {
          console.log(error)

        })
    },
    getUser ({commit, state}) {

      if(!localStorage.getItem('token')){
        return
      }
      state.tokenId = localStorage.getItem('token')
      state.userId = localStorage.getItem('userId')
      let token = state.tokenId
      let userId = state.userId

      axios.get('/MemoUsers/'+userId+'?access_token='+token)

        .then(res => {
          const data = res.data
          console.log('data', data)

          commit('storeUser', data)

        })
        .catch(error => console.log(error))
    },
    getAllUsers({commit, state}) {
      axios.get('/MemoUsers/?access_token='+ state.tokenId)
        .then(res => {
          console.log('all users are', res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCorrespondence({commit, state}, correspondenceData){
      axios.post('/AddMemos?access_token=' + state.tokenId, correspondenceData)
        .then(res => {
          console.log(res)
          const corrData = {
            correspondenceId: res.data.id,
            fromUserId: res.data.fromWhere,
            toUserId: localStorage.getItem('userId'),
            dateReceived: res.data.dateReceived

          }
          //console.log('Assignment', corrData)
          axios.post('/corrAssignments?access_token=' + state.tokenId, corrData)
            .then(res => {
              console.log(res)
            })
            .catch(error => {
              console.log(error)
            })
          router.push('/view-correspondence')
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllCorrespondence({commit, state}){
      axios.get('/AddMemos?access_token=' + state.tokenId)

        .then(res => {
          const memos = res.data
          commit('storeMemos', memos)
        })
        .catch(error=> {
          console.log(error)

        })
    },
    fetchCorrespondence({commit, state}, correspondenceId) {
      axios.get('/AddMemos/' + correspondenceId + '?access_token=' + state.tokenId)
        .then(res => {

          const fetchedCorrespondence = res.data
          commit('storeFetchedCorrespondence',  fetchedCorrespondence)

        })
        .catch(error =>{
          console.log(error)
        })
    },

    fetchCorrDetails({commit, state}, correspondenceId) {

      axios.get('/AddMemos/' + correspondenceId + '?access_token=' + state.tokenId)
        .then(res => {
          const fetchedCorrespondence = res.data

          commit('storeFetchedCorrDetails',  fetchedCorrespondence)

          setTimeout(
            function(){
              $("#showCorrDetails").modal('show')
            }, 1000);
        })
        .catch(error =>{
          console.log(error)
        })
    },
    editCorrespondence({commit, state}, editFormData) {
      const corrId = editFormData.id
      axios.put('/AddMemos/' + corrId + '?access_token=' + state.tokenId, editFormData.formData)
        .then(res => {
          router.push('/view-correspondence')
        })
        .catch(error => {
          console.log(error)
        })

    },
    addCorrType({commit, state}, formData) {
      axios.post('/corrTypes?access_token=' + state.tokenId, formData)
        .then(res => {
          console.log(res)
          this.dispatch('getAllCorrTypes')

        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllCorrTypes({commit, state}){
      axios.get('/corrTypes?access_token=' + state.tokenId)
        .then(res => {
          console.log(res)
          const corrTypes = res.data
          //console.log('Memos', corrTypes)
          commit('storeCorrTypes', corrTypes)
        })
        .catch(error=> {
          console.log(error)

        })
    },
    addUserRoleTypes({commit, state}, formData) {
      axios.post('/userRoles?access_token=' + state.tokenId, formData)
        .then(res => {
          console.log(res)
          this.dispatch('getAllUserRoles')

        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllUserRoles({commit, state}){
      axios.get('/userRoles?access_token=' + state.tokenId)
        .then(res => {
          console.log(res)
          const userRoles = res.data

          commit('storeUserRoles', userRoles)
        })
        .catch(error=> {
          console.log(error)

        })
    },
    assignCorrId({commit}, correspondenceId){
      commit('storeAssignCorrId', correspondenceId)
      //console.log('assign corr Id', correspondenceId)
    },
    assignCorrTo({commit, state}, formData){

      const corrId = formData.correspondenceId
      console.log('corr', corrId)

      axios.get('/corrAssignments?access_token=' + state.tokenId )
        .then(res => {

          console.log('update assigned correspondence', res.data)
          var getAllAssignedCorr = res.data
          var filteredCorr = getAllAssignedCorr.filter(function(AssignedCorr){
            return AssignedCorr.correspondenceId === corrId;

          }).filter(function(filteredDate){
            return filteredDate.dateAssigned === null
          })
          var dateAssigned = new Date()
          var dateDiff = moment(dateAssigned).diff(moment(filteredCorr[0].dateReceived), 'days')

          var updateAssignedCorr = {
            dateAssigned: dateAssigned,
            duration: dateDiff

          }
          console.log('duration', dateDiff)
          axios.patch('/corrAssignments/' + filteredCorr[0].id + '?access_token=' + state.tokenId, updateAssignedCorr)
            .then(res => {
              axios.post('/corrAssignments?access_token=' + state.tokenId, formData)
                .then(res => {
                  console.log(res)
                })
                .catch(error => {
                  console.log(error)
                })
              console.log(res)
            })

            .catch(error =>{
              console.log(error)
            })
          console.log('filtered Corr', filteredCorr)

        })
        .catch(error =>{
          console.log(error)
        })

    }
  },
  getters: {
    user(state) {
      return state.user
    },
    memos(state) {
      return state.memoList
    },
    memoAttachment(state){
      return state.uploadedFiles
    },
    fetchedCorr(state){
      return state.fetchedCorrespondence
    },
    fetchedCorrDetails(state){
      return state.fetchedCorrDetails
    },
    getAllCorrTypes(state){
      return state.corrTypes
    },
    getAllUserRoles(state){
      return state.userRole
    },
    getAssignCorrId(state){
      return state.assignCorrId
    }


  }
})
