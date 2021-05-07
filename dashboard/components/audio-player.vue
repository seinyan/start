<template>
  <div v-if="src">
    <audio style="width: 100%" class="app-audio-player" ref="player" controls>
      <source :src="src" type="audio/ogg">
      <source :src="src" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
  export default {
    name: "audio-player",
    props: {
      src: null
    },
    watch: {
      src: function () {
        // this.$refs.player.load();
      }
    },
  }
</script>

<style lang="scss">

  .app-audio-player {
    background-color: #dddddd;
    height: 25px;
    border-radius: 0;
    margin: 0;
    padding: 0;
  }

  audio::-webkit-media-controls-panel {
    background-color: #dddddd;
    border-radius: 0;
    height: 25px;
  }

  audio::-webkit-media-controls-mute-button{
    /*background-color: blue;*/
  }

  audio::-webkit-media-controls-play-button{

  }

  audio::-webkit-media-controls-timeline-container{

  }

  audio::-webkit-media-controls-current-time-display{

  }

  audio::-webkit-media-controls-time-remaining-display{

  }

  audio::-webkit-media-controls-timeline{

  }

  audio::-webkit-media-controls-volume-slider-container{

  }

  audio::-webkit-media-controls-volume-slider{

  }

  audio::-webkit-media-controls-seek-back-button{

  }

  audio::-webkit-media-controls-seek-forward-button{

  }

  audio::-webkit-media-controls-fullscreen-button{

  }

  audio::-webkit-media-controls-rewind-button{

  }

  audio::-webkit-media-controls-return-to-realtime-button{

  }

  audio::-webkit-media-controls-toggle-closed-captions-button{

  }

</style>
