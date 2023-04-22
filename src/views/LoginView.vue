<template lang="">
  <form
    @submit.prevent="Login"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="username">
        Username
      </label>
      <input
        v-model="usernameInput"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Username"
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 font-bold mb-2" for="password">
        Password
      </label>
      <input
        v-model="passwordInput"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="********"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Sign In
      </button>
      <a
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
      >
        Forgot Password?
      </a>
    </div>
  </form>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useLoginStore } from "../store/loginStore";
const accounts = [
  {
    user: "manhdung99",
    password: "12345678",
    avatar: "https://i.ibb.co/bQSyvVB/439757.jpg",
  },
  {
    user: "manhdung1",
    password: "12345678",
    avatar: "https://i.ibb.co/KFK5jG0/6998190.jpg",
  },
  {
    user: "manhdung2",
    password: "12345678",
    avatar: "https://i.ibb.co/QJ7RqMr/20473600.jpg",
  },
  {
    user: "manhdung3",
    password: "12345678",
    avatar: "https://i.ibb.co/d6c80Yx/wp6208078.jpg",
  },
];

export default defineComponent({
  name: "LoginView",

  setup() {
    const loginStore = useLoginStore();
    const usernameInput = ref(null);
    const passwordInput = ref(null);

    const { updateLoginStatus, updateCurrentUser, updateCurrentAvatar } =
      loginStore;

    const CheckUserAndPassword = () => {
      let userInfo = accounts.find(
        (o) =>
          o.user == usernameInput.value && o.password == passwordInput.value
      );
      if (userInfo != null) {
        updateCurrentAvatar(userInfo.avatar);
      }
      return userInfo != null;
    };

    const Login = () => {
      if (CheckUserAndPassword()) {
        updateLoginStatus(true);
        updateCurrentUser(usernameInput.value);
      }
    };

    return {
      usernameInput,
      passwordInput,
      Login,
    };
  },
});
</script>
<style lang=""></style>
