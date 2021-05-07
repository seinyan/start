<template>
  <div class="sidebar-logo-container" :class="{'collapse': collapse}">
    <transition name="sidebarLogoFade">
      <nuxt-link v-if="collapse" key="collapse" class="sidebar-logo-link" :to="{name: 'index'}">
        <img src="/logo.png" class="sidebar-logo">
      </nuxt-link>
      <nuxt-link v-else key="expand" class="sidebar-logo-link" :to="{name: 'index'}">
        <img src="/logo.png" class="sidebar-logo">
        <h1 class="sidebar-title" style="padding-top: 5px;">{{$t('_ADMIN')}}</h1>
      </nuxt-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'sidebar-logo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  }
}
</script>
