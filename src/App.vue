<template>
  <div>
    <form-buttons @openOrderForm="openOrderForm"/>
    <order-form v-if="isOrderModalOpen" @closeOrderForm="closeOrderForm"/>
    <popup-form v-if="isPopupOpen" @closePopup="closePopup"/>
  </div>
</template>

<script>
import FormButtons from '@/components/FormButtons';
import OrderForm from '@/components/OrderForm';
import PopupForm from "@/components/PopupForm";
export default {
  name: 'App',
  components: {
    FormButtons,
    OrderForm,
    PopupForm
  },
  data() {
    return {
      isOrderModalOpen: false,
      isPopupOpen: false
    }
  },
  methods: {
    openOrderForm() {
      this.isOrderModalOpen = true;
    },
    closeOrderForm(isFormSubmitted) {
      this.isOrderModalOpen = false;
      if (isFormSubmitted) this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    }
  }
}
</script>
