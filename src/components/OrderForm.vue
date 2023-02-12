<template>
  <div>
    <div @click="closeModal(false)" class="fixed z-40 inset-0 bg-black bg-opacity-60"></div>

    <div class="modal animate-fade-in">
      <h3 class="text-xl mb-5 font-semibold text-gray-900">Заказать звонок</h3>
      <form class="form">
        <div class="input-wrapper">
          <label for="name" class="input-label">
            Имя* <span v-if="validation.includes('name')" class="text-red-600 text-xs">Обязательно поле</span>
          </label>
          <input
              v-model="form.name"
              type="text"
              id="name"
              class="input"
              placeholder="Иван Иванов"
          >
        </div>

        <div class="input-wrapper">
          <label for="phone" class="input-label">
            Телефон* <span v-if="validation.includes('phone')" class="text-red-600 text-xs">Обязательно поле</span>
          </label>
          <input
              v-model="form.phone"
              v-mask="'+7 (###) ###-##-##'"
              type="text"
              id="phone"
              class="input"
              placeholder="+7 (___) ___-__-__"
          >
        </div>

        <div class="input-wrapper">
          <label for="email" class="input-label">
            Email* <span v-if="validation.includes('email')" class="text-red-600 text-xs">Обязательно поле</span>
          </label>
          <input
              v-model="form.email"
              type="text"
              id="email"
              class="input"
              placeholder="you@example.com"
          >
        </div>

        <div class="input-wrapper md:col-start-1 md:col-end-3 lg:col-start-4 lg:col-end-5">
          <label for="city" class="input-label">
            Город* <span v-if="validation.includes('city')" class="text-red-600 text-xs">Обязательно поле</span>
          </label>
          <select v-model="form.city" class="input" id="city">
            <option v-for="city in cities" :key="city.id" :value="city">{{ city.name }}</option>
          </select>
        </div>

        <button type="button"
                class="button mt-2 md:mt-0 md:col-start-3 md:col-end-4 lg:col-start-4 lg:col-end-5 bg-green-500 hover:bg-green-700"
                @click="sendForm">
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderForm",
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        city: {}
      },
      validation: []
    }
  },
  computed: {
    cities() {
      return this.$store.getters.getListOfCities;
    },
    selectedCityId() {
      return this.$store.getters.getSelectedCityId;
    },
    phoneFormat() {
      return this.form.phone.replace(/[^\d+]/g, '');
    }
  },
  created() {
    this.form.city = this.cities.find(city => city.id === this.selectedCityId);
  },
  methods: {
    closeModal(isFormSubmitted) {
      this.$emit('closeOrderForm', isFormSubmitted);
    },
    addToValidation(valueName) {
      const validationValue = this.validation.find(el => el === valueName);
      if (!validationValue) this.validation.push(valueName);
    },
    deleteFromValidation(valueName) {
      const index = this.validation.findIndex(el => el === valueName);
      if (index > -1) this.validation.splice(index, 1);
    },
    checkIsFormValid() {
      !this.form.name ? this.addToValidation('name') : this.deleteFromValidation('name');

      const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      !email.test(this.form.email)
          ? this.addToValidation('email')
          : this.deleteFromValidation('email');

      (this.phoneFormat.length < 12)
          ? this.addToValidation('phone')
          : this.deleteFromValidation('phone');

      return !this.validation.length;
    },
    async sendForm() {
      if (!this.checkIsFormValid()) return;

      const params = {
        name: this.form.name,
        phone: this.phoneFormat,
        email: this.form.email,
        'city_id': this.form.city.id
      }

      await this.$store.dispatch('sendFormToServer', params);
      this.closeModal(true);
    },
  }
}
</script>