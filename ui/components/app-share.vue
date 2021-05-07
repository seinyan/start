<template>
  <div>
    <div
      v-if="false"
      class="ya-share2"
      data-curtain
      data-shape="round"
      data-limit="0"
      data-more-button-type="short"
      data-services="messenger,vkontakte,facebook,odnoklassniki,telegram,twitter,viber,whatsapp,moimir"/>


    <div
      v-if="false"
      class="ya-share2"
      data-curtain
      data-shape="round"
      data-limit="3"
      data-services="messenger,vkontakte,facebook,odnoklassniki,telegram,twitter,viber,whatsapp,moimir"/>

<!--    whiteblack blackwhite normal -->
<!--    https://yandex.ru/dev/share/doc/dg/add.html-->
    <div
      class="ya-share2"
      data-curtain
      data-shape="round"
      data-color-scheme="blackwhite"
      data-lang="ru"
      data-services="messenger,vkontakte,facebook,odnoklassniki,telegram,twitter,viber,whatsapp,moimir"/>


    <script src="https://yastatic.net/share2/share.js"></script>

  </div>
</template>

<script>
export default {
  name: "app-share"
}
</script>

<style scoped>

</style>
