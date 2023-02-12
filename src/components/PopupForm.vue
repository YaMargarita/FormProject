<template>
  <div>
    <div @click="closePopup" class="fixed z-40 inset-0 bg-black bg-opacity-60"></div>

    <div v-html="popupTemplate" id="test" class="modal animate-fade-in" ref="popup"></div>
  </div>
</template>

<script>
export default {
  name: "PopupForm",
  computed: {
    popupTemplate() {
      return this.$store.getters.getPopupTemplate;
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup');
    }
  }
}
</script>