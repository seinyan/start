<template>
  <div class="user-agent">
    <span>{{item.platform}}</span>
    <span>{{item.browser}}</span>
<!--    <span>{{item.device}}</span>-->
    <span class="user-agent-ip">IP: {{item.ip}}</span>
<!--    "platform": "Linux",-->
<!--    "browser": "Chrome",-->
<!--    "device": "WebKit",-->
<!--    "ip": "127.0.0.1"-->
<!--    -->
<!--    <pre>{{item}}</pre>-->

  </div>
</template>

<script>
export default {
  name: "user-agent",
  props: {
    item: {
      type: Object,
      default: function () {
        return {

        }
      }
    }
  }
}
</script>

<style lang="scss">

.user-agent {
  font-size: 13px;
}
.user-agent-ip {
  display: block;
}

</style>
