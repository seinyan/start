import qs from 'qs';

export default class UserService {
  constructor(ctx) {
    // ctx.$axios.defaults.withCredentials = true
    // ctx.$axios.defaults.credentials = true

    this.$axios = ctx.$axios
    this.$qs = qs; //ctx.$qs;
  }
  stringify(params){
    return this.$qs.stringify(params);
  }
  restGet(path, params) {
    return this.$axios.get(path, { params: params });
  }
  restPost(path, params) {
    params = this.stringify(params);
    return this.$axios.post(path, params);
  }
  restPut(path, params) {
    params = this.stringify(params);
    return this.$axios.put(path, params);
  }
  restDelete(path, params) {
    // params = this.stringify(params);
    return this.$axios.delete(path, { params: params })
  }

}
