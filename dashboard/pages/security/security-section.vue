<template>
  <div class="security-section">
    <div class="security-section-block app-shadow">
      <div class="security-section-header flex-j-a-column-center">
        <h1 v-if="type === 'login'" >Авторизация</h1>
        <h1 v-if="type === 'register'" >Регистрация</h1>
        <h1 v-if="type === 'restore'" >Забыли пароль ?</h1>
      </div>
      <div class="security-section-body">
        <div v-if="error" class="security-section-error-msg">{{error}}</div>
        <div v-if="msg" class="security-section-msg">{{msg}}</div>
        <slot v-else></slot>
      </div>
      <div class="security-section-footer">
        <nuxt-link v-if="type === 'login'" :to="{ name: 'register' }">Регистрация</nuxt-link>
        <nuxt-link v-if="type === 'login'" :to="{ name: 'restore' }">Забыли пароль ?</nuxt-link>
        <nuxt-link v-if="type === 'register'"  :to="{ name: 'login' }">Уже зарегистрированы? Войти</nuxt-link>
        <nuxt-link v-if="type === 'restore'"  :to="{ name: 'login' }">Вспомнил ? Войти</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "security-section",
  props: {
    type: null, // login register restore
    msg: null,
    error: null,
    msg_type: null, // error success
  },
}
</script>

<style lang="scss">
@import "assets/style/var";

.security-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 8px;
}
.security-section-block {
  padding: 8px 8px;
  width: 100%;
  max-width: 350px;
}
.security-section-body {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.security-section-header {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.security-section-footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  a, a:hover {
    width: 100%;
    color: #222222;
  }
}
.security-section-msg {
  text-align: center;
  font-weight: 600;
}
.security-section-error-msg {
  color: $app-color-danger;
  padding: 5px;
}

</style>
