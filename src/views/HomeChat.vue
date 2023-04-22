<template>
  <div class="home-chat-area">
    <div
      class="flex justify-between border-b border-gray-300 bg-white px-4 py-3"
    >
      <p>Đoạn chat cho TEST FOR UNIT 7</p>
      <img class="cursor-pointer" :src="minusIcon" alt="" />
    </div>
    <div ref="listMessage" class="list-message">
      <UserMessageVue
        v-for="(data, index) in messages"
        :key="index"
        :image="data.image"
        :message="data.message"
        :user="data.user"
        :currentUser="currentUser"
        :userBefore="index > 1 ? messages[index - 1].user : ''"
        :messageImage="data.messageImage"
      />
    </div>
    <form @submit.prevent="sendMessages">
      <div
        class="absolute bottom-0 left-0 w-full border-t border-gray-300 bg-white"
      >
        <input
          id="message-image"
          @input="uploadFile($event)"
          type="file"
          @change="handleFileUpload"
          class="hidden"
        />
        <input v-model="inputMessage" class="type-message-input" />
        <label
          for="message-image"
          class="absolute w-10 right-20 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <img :src="imageIcon" alt="" />
        </label>
        <button
          type="submit"
          class="absolute top-1/2 -translate-y-1/2 w-16 h-8 right-2 bg-aqua"
        >
          Gửi
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import UserMessageVue from "@/components/UserMessage.vue";
import { defineComponent, onMounted, ref } from "vue";
import minusIcon from "../assets/image/minus.svg";
import imageIcon from "../assets/image/image-icon.svg";
import { database, ref as firebaseRef, push, onValue } from "../firebaseConfig";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../store/loginStore";
// import firebase from "firebase/app";
import "firebase/database";
export default defineComponent({
  name: "HomeChat",
  setup() {
    const messages = ref([]);
    const inputMessage = ref(null);
    const imageMessage = ref(null);
    const listMessage = ref(null);
    const { currentAvatar, currentUser } = storeToRefs(useLoginStore());
    const sendMessages = () => {
      let messageImage = "";
      if (imageMessage.value) {
        messageImage = "https://i.ibb.co/bQSyvVB/439757.jpg";
      }
      let data = {
        message: inputMessage.value,
        image: currentAvatar.value,
        user: currentUser.value,
        messageImage: messageImage,
      };
      if (imageMessage.value != null || imageMessage.value != null) {
        push(firebaseRef(database, "messages"), data);
        inputMessage.value = "";
      }
    };

    const getMessage = () => {
      onValue(firebaseRef(database, "messages"), (data) => {
        messages.value = [];
        data.forEach((d) => {
          messages.value.push(d.val());
        });
      });
    };

    const uploadFile = (event) => {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        imageMessage.value = await theReader.result;
      };
      theReader.readAsDataURL(file);
    };

    onMounted(getMessage);
    return {
      minusIcon,
      imageIcon,
      messages,
      inputMessage,
      listMessage,
      sendMessages,
      currentUser,
      imageMessage,
      uploadFile,
    };
  },
  components: {
    UserMessageVue,
  },
  watch: {
    messages: function () {
      // Scroll to the bottom of the chat window when new messages are added
      this.$nextTick(() => {
        this.listMessage.scrollTop = this.listMessage.scrollHeight;
      });
    },
  },
});
</script>
<style>
.home-chat-area {
  box-shadow: 0 2px 5px rgb(0 0 0/13%);
  border-radius: 0.5rem;
  width: 600px;
  margin: auto;
  max-height: 600px;
  min-height: 600px;
  margin-top: 32px;
  position: relative;
  background: #a1a1a154;
  overflow: hidden;
  border: 1px solid #c3c3c3;
}
.list-message {
  overflow-y: scroll;
  max-height: 500px;
  padding-bottom: 21px;
  padding: 12px 16px 12px;
  display: flex;
  flex-direction: column;
}
.list-message::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.list-message::-webkit-scrollbar-thumb {
  background: #d6d2d254;
  border-radius: 10px;
}
.list-message::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #f2f2f254;
  border-radius: 10px;
}
.type-message-input {
  width: 100%;
  height: 48px;
  outline: none;
  border-radius: 4px;
  padding-left: 16px;
}
.type-message-input:focus {
  border-bottom: 2px solid #13a6fb;
}
#my-svg:hover path {
  fill: red;
}
</style>
