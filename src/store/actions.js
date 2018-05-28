const actions = {
  login({commit, dispatch}, userData){
    axios.post('/MemoUsers/login', {
      email: userData.email,
      password: userData.password
    })
      .then(res => {
        console.log(res)
        // localStorage.setItem('token')

      })
      .catch(err => {
        console.log(err)
      })

  }
}

export default actions
