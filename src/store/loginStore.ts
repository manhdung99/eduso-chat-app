import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    isLogin: false,
    currentUser: "",
    beforeUser: "",
    currentAvatar: "",
  }),
  getters: {},
  actions: {
    updateLoginStatus(status: boolean) {
      this.isLogin = status;
    },
    updateCurrentUser(user: string) {
      this.currentUser = user;
    },
    updateCurrentAvatar(avatar: string) {
      this.currentAvatar = avatar;
    },
    updateBeforeUser(user: string) {
      this.beforeUser = user;
    },
  },
});
