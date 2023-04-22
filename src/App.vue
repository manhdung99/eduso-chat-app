<template>
  <LoginViewVue v-if="!isLogin" />
  <HomeChatVue v-else />
</template>
<script>
import { defineComponent } from "vue";
import HomeChatVue from "./views/HomeChat.vue";
import LoginViewVue from "./views/LoginView.vue";
import { useLoginStore } from "./store/loginStore";
import { storeToRefs } from "pinia";
export default defineComponent({
  setup() {
    const loginStore = useLoginStore();
    const { isLogin } = storeToRefs(loginStore);
    return { isLogin };
  },
  components: { HomeChatVue, LoginViewVue },
});
</script>
