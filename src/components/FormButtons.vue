<template>
  <div class="md:flex items-center px-7 py-4">
    <button
        v-for="button in buttonsConfig"
        :key="button.id"
        class="button"
        :class="button.specialClasses"
        @click="openOrderForm(button.cityId)">
      {{ button.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FormButtons',
  data() {
    return {
      buttonsConfig: [
        {
          id: 1,
          text: 'Заказать в Москву',
          cityId: 1,
          specialClasses: 'mb-2 md:mr-4 md:mb-0 bg-blue-500 hover:bg-blue-700'
        },
        {
          id: 2,
          text: 'Заказать в Санкт-Петербург',
          cityId: 2,
          specialClasses: 'bg-emerald-600 hover:bg-emerald-700'
        }
      ]
    }
  },
  methods: {
    openOrderForm(cityId) {
      this.$store.dispatch('setCityId', cityId);
      this.$emit('openOrderForm');
    }
  }
}
</script>