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
    users: [],
    //userlist: []
    memoList: [],
    tfile_names: {},
    corrLogData: {},
    correspondenceAssignLogs: [],
    uploadedFiles: [],
    fetchedCorrespondence: null,
    fetchedCorrDetails: null,
    corrTypes: null,
    corrNatures: null,
    userRole: null,
    assignCorrId: null,
    userInfoDetails: null,
    toUser: {},
    myAssignedMemos: null,
    //fromName: null,
    assignedLogs: null,
    currentUserRole: null,
    fromUserEmail:null,
    selectedCorr:null

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
    storeAllUsers(state, users){
      state.users = users
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
    storeCorrNatures(state, corrNatures){
      state.corrNatures = corrNatures
    },
    storeUserRoles(state, userRole){
      state.userRole = userRole
    },
    storeAssignCorrId(state, assignCorrId){
      state.assignCorrId = assignCorrId
    },
    storeUserInfo(state, userInfo){
      state.userInfoDetails = userInfo
    },
    storeToUser(state, toUser){
      state.toUser = toUser
    },
    storeMyMemos(state, myAssignedMemos){
      state.myAssignedMemos = myAssignedMemos
    },
    // storeFromName(state, fromName){
    //   state.fromName = fromName
    // },
    storeAssignedLogs(state, assignedLogs){
      state.assignedLogs = assignedLogs
    },
    storeCurrentUserRole(state, currentUserRole){
      state.currentUserRole = currentUserRole
    },
    storeFromUserEmail(state, fromUserEmail){
      state.fromUserEmail = fromUserEmail
    },
    storeSelectedCorr(state, selectedCorr){
      state.selectedCorr = selectedCorr
    }

    // changeShowDetailModal(state){
    //   state.showDetailModal = true
    // }
  },
  actions: {

    login ({commit, dispatch, state}, authData){
      axios.post('/MemoUsers/login', authData)
        .then(res => {
          //console.log('logged in user', res)
          commit('authUser', {
            tokenId: res.data.id,
            userId: res.data.userId
          })
          var expirationTIme = 1800000;
          let currentUserTokenId = res.data.id;
          let currentUserId = res.data.userId;


          const now = new Date()
          const expirationDate = new Date(now.getTime() + expirationTIme)
          //console.log('Token is :', currentUserTokenId)
          localStorage.setItem('token', currentUserTokenId)
            localStorage.setItem('userId', currentUserId)
          localStorage.setItem('expirationDate', expirationDate)

          dispatch('setLogoutTimer', expirationTIme)

          router.push('/my-correspondence')
          //dispatch('getUserRole', currentUserId)

          // axios.get('/MemoUsers/' + currentUserId + '?access_token='+token)
          //
          //   .then(res => {
          //     const userRole = res.data.userRole
          //     console.log('Current User Role is ', data)
          //     localStorage.setItem('userRole', userRole)
          //
          //     router.push('/my-correspondence')
          //     //commit('storeUser', data)
          //
          //   })
          //   .catch(error => console.log(error))


        })
        .catch(error => {
          // this.$notify.error({
          //   title: 'Error',
          //   message: 'Login Failed! Check Details and Try Again'
          // });
          swal("Oops!", "Login Failed! Username or password incorrect", "error");

          // Notification.error('Login Failed! Check Details and Try Again')
          // router.push('/')

        })



    },
    resetUserPassword({commit, state}, form){
      
      // if (password == retypePassword) {
        axios.post('/MemoUsers/change-password?access_token='+ state.tokenId, 
        {
          oldPassword: form.formData.oldPassword, 
          newPassword: form.formData.newPassword
        })
        .then(res => {
          console.log('password changed data', res.data)
          if(res.data == '' || res.status == 204 || statusText == 'No Content'){
            swal("Success", "Password Changed Successfully", "success");
            router.push('/view-users')
          }
          
        })
        .catch(error => {
          console.log('error',error.response.data.error.message)
          const errmsg= error.response.data.error.message
          swal(
            "Oops! Error Occured", 
            errmsg , 
            "error");
          router.push('/user-password-reset')
        })
      // } else {
      //   router.push('/user-password-reset')
      // }
      //axios.patch('/MemoUsers/' + userId + '?access_token=' + state.tokenId, editFormData.formData)
       
    },
    getUserRole({commit, state}) {
      let currentUserId = localStorage.getItem('userId')
      let token = localStorage.getItem('token')
      axios.get('/MemoUsers/' + currentUserId + '?access_token='+token)

        .then(res => {

          const userRole = res.data.userRole
          axios.get('/userRoles/' +userRole+ '?access_token=' + state.tokenId)
            .then(res1 => {
              //console.log(res1)
              const CurrentUserRole = res1.data.userRole
              console.log('Current User Role is ', CurrentUserRole)

              localStorage.setItem('userRole', CurrentUserRole)
              commit('storeCurrentUserRole', CurrentUserRole)
            })
            .catch(error1=> {
              console.log(error1)

            })

          //router.push('/my-correspondence')
             //commit('storeUser', data)

        })
        .catch(error => console.log(error))
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
          localStorage.removeItem('userRole')
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
          var tempFiles = []
          for (var i = 0; i < response.data.result.files.filesToUpload.length ; i++){
            state.tfile_names = {
              name: response.data.result.files.filesToUpload[i].name,
              originalFilename: response.data.result.files.filesToUpload[i].originalFilename,
              size: response.data.result.files.filesToUpload[i].size
            }

            tempFiles.push(state.tfile_names)

            //console.log('tfilenames', state.tfile_names )
          }
          commit('storeMemoAttachment', tempFiles)
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
          //console.log('data', data)

          commit('storeUser', data)

        })
        .catch(error => console.log(error))
    },
    getUserInfo ({commit, state}, userId) {

      axios.get('/MemoUsers/'+userId+'?access_token=' + state.tokenId)

        .then(res => {
          const data = res.data
          //console.log('data', data)

          commit('storeUserInfo', data)
          setTimeout(
            function(){
              $("#showUserDetails").modal('show')
            }, 1000);

        })
        .catch(error => console.log(error))
    },
    getUserEditInfo ({commit, state}, userId) {

      axios.get('/MemoUsers/'+userId+'?access_token=' + state.tokenId)

        .then(res => {
          const data = res.data
          //console.log('data', data)

          commit('storeUserInfo', data)
          setTimeout(
            function(){
              $("#showUserEdit").modal('show')
            }, 500);

        })
        .catch(error => console.log(error))
    },
    getAllUsers({commit, state}) {
      axios.get('/MemoUsers/?access_token='+ state.tokenId)
        .then(res => {
          commit('storeAllUsers', res.data)
          //console.log('all users are', res)
        })
        .catch(error => {
          console.log(error)
        })
    },

    addCorrespondence({commit, state}, correspondenceData){
      axios.post('/AddMemos?access_token=' + state.tokenId, correspondenceData)
        .then(res => {
          //console.log(res)
          const corrData = {
            correspondenceId: res.data.id,
            fromUserId: localStorage.getItem('userId'),
            toUserId: localStorage.getItem('userId'),
            dateReceived: res.data.dateReceived,
            dateAssigned: '',
            duration: '',
            comments: ''

          }
          //console.log('Assignment', corrData)
          axios.post('/assignCorrs?access_token=' + state.tokenId, corrData)
            .then(res => {
              //console.log(res)
            })
            .catch(error => {
              console.log(error)
            })
          router.push('/my-correspondence')
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllCorrespondence({commit, state}){
     // axios.get('/AddMemos?access_token=' + state.tokenId)

      const userRole = localStorage.getItem('userRole')
      if (userRole === "Director") {
        axios.get('/AddMemos?access_token=' + state.tokenId)
        //axios.get('/AddMemos?filter={"where":{"natureOfCorrespondence":"Non-Confidential" }}')
          .then(res => {
            const memos = res.data
            commit('storeMemos', memos)
          })
          .catch(error=> {
            console.log(error)

          })
      }
      else
        axios.get('/AddMemos?filter={"where":{"natureOfCorrespondence":"Non-Confidential" }}')
          .then(res => {
            const memos = res.data
            commit('storeMemos', memos)
          })
          .catch(error=> {
            console.log(error)

          })



    },
    getMyCorrespondence({commit, state}) {
      axios.get('/AddMemos?filter={"where":{"status":"Active" }}')
      //axios.get('/AddMemos?filter={"where":{"natureOfCorrespondence":"Non-Confidential" }}')
        .then(res => {
          var myUserId = state.userId

          var myAssignedMemo = res.data
          var myFilteredMemo = myAssignedMemo.filter(function (AssignedMemo) {
            return AssignedMemo.currentUserAssignedId === myUserId;

          })
          commit('storeMyMemos', myFilteredMemo)
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

      console.log('corrId', correspondenceId)

      axios.get('/AddMemos/' + correspondenceId + '?access_token=' + state.tokenId)
        .then(res => {
          const fetchedCorrespondence = res.data
          console.log("corr details are ", fetchedCorrespondence)
          commit('storeFetchedCorrDetails',  fetchedCorrespondence)

          setTimeout(
            function(){
              $("#showCorrDetails").modal('show')
            }, 2000);
        })
        .catch(error =>{
          console.log(error)
        })
    },
    editCorrespondence({commit, state}, editFormData) {
      const corrId = editFormData.id
      axios.put('/AddMemos/' + corrId + '?access_token=' + state.tokenId, editFormData.formData)
        .then(res => {
          router.push('/my-correspondence')
        })
        .catch(error => {
          console.log(error)
        })

    },
    editUserDetailsInfo({commit, state}, editFormData){
      const userId = editFormData.id
      axios.put('/MemoUsers/' + userId + '?access_token=' + state.tokenId, editFormData.formData)
        .then(res => {

          router.push('/view-users')
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCorrType({commit, state}, formData) {
      axios.post('/corrTypes?access_token=' + state.tokenId, formData)
        .then(res => {
          //console.log(res)
          this.dispatch('getAllCorrTypes')

        })
        .catch(error => {
          console.log(error)
        })
    },
    addCorrNature({commit, state}, formData) {
      axios.post('/corrNatures?access_token=' + state.tokenId, formData)
        .then(res => {
          //console.log(res)
          this.dispatch('getAllCorrNatures')

        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllCorrTypes({commit, state}){
      axios.get('/corrTypes?access_token=' + state.tokenId)
        .then(res => {
          //console.log(res)
          const corrTypes = res.data
          //console.log('Memos', corrTypes)
          commit('storeCorrTypes', corrTypes)
        })
        .catch(error=> {
          console.log(error)

        })
    },
    getAllCorrNatures({commit, state}){
      axios.get('/corrNatures?access_token=' + state.tokenId)
        .then(res => {
          //console.log(res)
          const corrNatures = res.data
          //console.log('Memos', corrTypes)
          commit('storeCorrNatures', corrNatures)
        })
        .catch(error=> {
          console.log(error)

        })
    },
    addUserRoleTypes({commit, state}, formData) {
      axios.post('/userRoles?access_token=' + state.tokenId, formData)
        .then(res => {
          //console.log(res)
          this.dispatch('getAllUserRoles')

        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllUserRoles({commit, state}){
      axios.get('/userRoles?access_token=' + state.tokenId)
        .then(res => {
          //console.log(res)
          const userRoles = res.data

          commit('storeUserRoles', userRoles)
        })
        .catch(error=> {
          console.log(error)

        })
    },
    getUserAssignedFrom({commit, state}, correspondenceId){
      axios.get('/assignCorrs?access_token=' + state.tokenId)
        .then(res => {

          //console.log('update assigned correspondence', res.data)
          var getAllAssignedCorr = res.data
          var filteredCorr = getAllAssignedCorr.filter(function (AssignedCorr) {
            return AssignedCorr.correspondenceId === correspondenceId;

          }).filter(function (filteredDate) {
            return filteredDate.dateAssigned === ''
          })
          var fromUserId = filteredCorr[0].fromUserId

          axios.get('/MemoUsers/'+fromUserId+'?access_token=' + state.tokenId)
            .then(res => {
              var fromUserEmail = res.data
              commit('storeFromUserEmail', fromUserEmail)
              console.log('confidential from User email is ', fromUserEmail)
            })
            .catch(error => {
              console.log(error)
            })


        })
        .catch(error => {
          console.log(error)
        })

    },
    assignCorrId({commit, dispatch}, correspondenceId){
      commit('storeAssignCorrId', correspondenceId)
      //console.log('assign corr Id', correspondenceId)
    },
    assignCorrTo({commit, state, dispatch}, formData) {

      const corrId = formData.correspondenceId
      //console.log('corr', corrId)

      axios.get('/assignCorrs?access_token=' + state.tokenId)
        .then(res => {

          console.log('update assigned correspondence', res.data)
          var getAllAssignedCorr = res.data
          var filteredCorr = getAllAssignedCorr.filter(function (AssignedCorr) {
            return AssignedCorr.correspondenceId === corrId;

          }).filter(function (filteredDate) {
            return filteredDate.dateAssigned === ''
          })
          var dateAssigned = new Date()
          var dateDiff = moment(dateAssigned).diff(moment(filteredCorr[0].dateReceived), 'days')

          var updateAssignedCorr = {
            dateAssigned: dateAssigned,
            duration: dateDiff

          }
          //console.log('formdata', formData)
          axios.patch('/assignCorrs/' + filteredCorr[0].id + '?access_token=' + state.tokenId, updateAssignedCorr)
            .then(res => {
              //console.log('before notify')
              // Notification.success({
              //   title: 'Success',
              //   message: 'Successful'
              // })
              axios.post('/assignCorrs?access_token=' + state.tokenId, formData)
                .then(res => {

                  var currentUserAssignedId = formData.toUserId
                  axios.patch('/AddMemos/'+ corrId + '?access_token=' + state.tokenId, {'currentUserAssignedId': currentUserAssignedId})
                    .then(res => {

                     // dispatch('getAllCorrespondence')
                      dispatch('getMyCorrespondence')
                      console.log('current user assign success' , res)

                    }).catch(error=>{
                      console.log('current user assign error', error)
                  })

                  // const toUserId = res.data.toUserId
                  // axios.get('/MemoUsers/'+toUserId+'?access_token=' + state.tokenId)
                  //   .then(res => {
                  //     var toUserName = res.data
                  //     console.log('User Name', toUserName)
                  //     //dispatch('')
                  //     commit('storeToUser', toUserName)
                  //   })
                  //   .catch(error => {
                  //     console.log(error)
                  //   })
                  //dispatch('getUser', res.data.toUserId)
                  // commit('storeToUserId', res.data.toUserId)
                  //console.log(res)
                })
                .catch(error => {
                  console.log(error)
                })
              //console.log(res)
            })

            .catch(error => {
              console.log(error)
            })
          //console.log('filtered Corr', filteredCorr)

        })
        .catch(error => {
          console.log(error)
        })

    },
    toUserAssigned({commit, state}, correspondenceId){
      axios.get('/assignCorrs?access_token=' + state.tokenId )
        .then(res => {


          var allAssignedCorr = res.data
          var filteredCorr = allAssignedCorr.filter(function (AssignedCorr) {
            return AssignedCorr.correspondenceId === correspondenceId;

          }).filter(function (filteredDate) {
            return filteredDate.dateAssigned === ''
          })
          console.log('assigned correspondence', filteredCorr)
          var toUserId = filteredCorr[0].toUserId
          var dateOfAssignment = filteredCorr[0].dateReceived
          var duration = filteredCorr[0].duration
          axios.get('/MemoUsers/'+toUserId+'?access_token=' + state.tokenId)
            .then(res => {
              var toUserName = res.data.fullname

              //dispatch('')
              var toUserInfo = {
                toUserName: toUserName,
                dateOfAssignment: dateOfAssignment,
                duration: duration
              }
              //console.log('User Name', toUserInfo)
              commit('storeToUser', toUserInfo)
            })
            .catch(error => {
              console.log(error)
            })



          var assignCorrLogs = res.data
          var filteredCorrLogs = assignCorrLogs.filter(function (CorrLogs) {

            return CorrLogs.correspondenceId === correspondenceId;

          })
          commit('storeAssignedLogs', filteredCorrLogs)
          console.log('filtered Corr Logs', filteredCorrLogs)

          //commit('storeAssignedLogs', tempLogs)
          //console.log('assignedlogs', tempLogs )
        })
        .catch(error => {
          console.log(error)
        })
      //console.log('correspondence Id', correspondenceId)
    },
    statusChange({dispatch, state}, formData){
      const corrId = formData.correspondenceId
      const corrStatus = formData.status
      //console.log("status is ", formData.status)
      axios.patch('/AddMemos/' + corrId + '?access_token=' + state.tokenId, {'status': corrStatus})
        .then(res => {
          //console.log("Status changed Successfully", res)
          dispatch('getMyCorrespondence')
        })
        .catch(error => {
          console.log("Status not changed", error)
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
      //console.log('uploaded files', state.uploadedFiles)
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
    getAllCorrNatures(state){
      return state.corrNatures
    },
    getAllUserRoles(state){
      return state.userRole
    },
    getAssignCorrId(state){
      return state.assignCorrId
    },
    getAllUsers(state) {
      //console.log('User Emails', state.users.email)
      return state.users
    },
    fetchedUserDetails(state){
      return state.userInfoDetails
    },
    assignedCorrUser(state){
      //console.log('assignment detail object', state.toUser)
      return state.toUser
    },
    getAllAssignedLogs(state){
      return state.assignedLogs
    },
    getMyMemos(state) {
      return state.myAssignedMemos
    },
    getCurrentUserRole(state){
      return state.currentUserRole
    },
    getFromUserEmail(state){
      return state.fromUserEmail
    },
    getSelectedCorr(state){
      return state.selectedCorr
    }


  }
})
