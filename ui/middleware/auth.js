export default function ({ app, store, redirect, route }) {

  var auth   =  app.$cookies.get('auth');
  var user   =  app.$cookies.get('user');
  store.commit('SET_AUTH', auth);
  store.commit('SET_USER', user);
  if(auth){
    app.$axios.setToken(auth.accessToken, 'Bearer');
  }

  var roles = null;
  if(route.meta.length) {
    if (route.meta[0].roles) {
      roles = route.meta[0].roles;
    }
  }
  if(roles == undefined || roles==null) {
    return;
  }

  /* dashboard security */
  if(route.name.indexOf('my') !== -1) {
    if(!store.state.auth) {
      return redirect('/login')
    }

    // var roles = route.meta[0].roles
    // if(roles) {
    //   var user_role = store.state.user.role
    //   if(roles.indexOf(user_role) === -1) {
    //     return redirect('/dashboard')
    //   }
    // }

  }

}
