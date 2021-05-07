import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'

Vue.use(Element, { locale })

import {
  Notification,
  MessageBox,
  Message,
  Button,
  Pagination,
  Select,
  Option,
  Table,
  TableColumn,
  Upload,
  Rate,
  Loading,
} from 'element-ui';

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

Vue.use(Pagination);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Upload);
Vue.use(Rate);


Vue.prototype.$msgbox  = MessageBox;
Vue.prototype.$alert   = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt  = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$notify  = Notification;




const OFFSET = 60
Vue.prototype.$notifycation = {
  success: function (message,title=null){
    Vue.prototype.$notify({
      title: title,
      message: message,
      type: 'success',
      offset: OFFSET,
      position: 'top-right'
    });
  },
  warning: function (message,title=null){
    Vue.prototype.$notify({
      title: title,
      message: message,
      type: 'warning',
      offset: OFFSET,
      position: 'top-right'
    });
  },
  info: function (message,title=null){
    Vue.prototype.$notify({
      title: title,
      message: message,
      type: 'info',
      offset: OFFSET,
      position: 'top-right'
    });
  },
  error: function (message='Ошибка',title=null){
    Vue.prototype.$notify({
      title: title,
      message: message,
      type: 'error',
      offset: OFFSET,
      position: 'top-right'
    });
  },
  created: function (message='Добавлено',title=null){
    Vue.prototype.$notify({
      title: title,
      message: message,
      type: 'success',
      offset: OFFSET,
      position: 'top-right'
    });
  },
  restore: function (message='restore',title=null){
    Vue.prototype.$notify({
      title: title,
      message: message,
      type: 'success',
      offset: OFFSET,
      position: 'top-right'
    });
  },
  updated: function (message='Обновлено',title=null){
    Vue.prototype.$notify({
      title: title,
      message: message,
      type: 'success',
      offset: OFFSET,
      position: 'top-right'
    });
  },
  deleted: function (message='Удалено',title=null){
    Vue.prototype.$notify({
      title: title,
      message: message,
      type: 'success',
      offset: OFFSET,
      position: 'top-right'
    });
  },
};
