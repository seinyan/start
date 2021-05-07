export default function ({ app, store, redirect, route }) {

  const PUBLIC  = 'public';
  const PRIVATE = 'private'

  let auth = app.$cookies.get('auth');
  let user = app.$cookies.get('user');
  store.commit('SET_AUTH', auth);
  store.commit('SET_USER', user);
  if(auth){
    app.$axios.setToken(auth.accessToken, 'Bearer');
  }

  if (route.meta.length) {
    let meta  = route.meta[0]
    let roles = meta.roles
    let group = meta.group

    if (group === PUBLIC) {
      return
    }

    // if (!group) {
    //   return redirect('/login')
    // }

    if(store.state.auth) {
      if(roles.indexOf(store.state.user.role) === -1) {
        return redirect('/')
      }
    }
    else {
      return redirect('/login')
    }

  }

}
