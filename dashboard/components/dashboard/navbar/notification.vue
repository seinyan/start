<template>
  <div class="user-notification">
    <div class="user-notification-header">
      <span class="user-notification-created_at">{{item.created_at}}</span>
      <span class="user-notification-close-btn" @click="setRead">
        <i class="far fa-times-circle"></i>
      </span>
    </div>
    <div class="user-notification-text">{{item.text}}</div>
  </div>
</template>

<script>
export default {
  name: "notification",
  props: {
    item: null,
  },
  methods: {
    async setRead() {
      let {data, status} = await this.$api.restPost('/currentuser/notifications/read/'+this.item.id)
      if(status === 200) {
        this.$store.state.notifications.splice(this.$store.state.notifications.indexOf(this.item), 1)
      }
      else {
        this.$notifycation.error()
      }
    },
  },
}
</script>

<style lang="scss">
@import "~assets/style/dashboard/variables.scss";

$border-color: $dashboard-navbar-text-color;

.user-notification {
  border: 1px solid $border-color;
  padding: 8px;
  margin-bottom: 8px;
  position: relative;
  border-radius: 5px;
}
.user-notification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-bottom: 1px solid $border-color;
}
.user-notification-created_at {
  font-size: 13px;
}
.user-notification-close-btn {
  cursor: pointer;
  color: $dashboard-navbar-text-color;
}
.user-notification-text {
  padding-top: 8px;
}

</style>
