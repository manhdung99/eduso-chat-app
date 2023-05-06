<template>
  <div class="home-chat-area">
    <div class="flex justify-between border border-gray-300 bg-white px-4 py-3">
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
        :userBefore="index > 0 ? messages[index - 1].user : ''"
        :messageImage="data.messageImage"
        :id="`message-${index}`"
      />
    </div>
    <form @submit.prevent="sendMessages">
      <div
        :class="previewImage.length > 0 ? 'has-image' : ''"
        class="type-message-wrapper"
      >
        <ul
          ref="mentionWrapperRef"
          :style="{ left: mentionWrapLeft + 'px' }"
          class="user-mention-wrapper"
          v-if="showSuggestions"
        >
          <li
            class="user-mention-item"
            v-for="(user, index) in filteredUsers"
            :key="index"
            @click="selectUser(user)"
          >
            <div>
              <img
                class="w-10 h-10 rounded-full object-cover"
                :src="user.image"
                alt=""
              />
            </div>
            <div>{{ user.username }}</div>
          </li>
        </ul>
        <input
          id="message-image"
          ref="fileImageInput"
          @input="uploadFile($event)"
          type="file"
          @click="handleClearImage"
          class="hidden"
        />
        <input
          @focus="setLastestMessage"
          v-model="inputMessage"
          class="type-message-input"
          placeholder="Nhập tin nhắn"
          @keyup="checkMention"
          ref="inputMessageRef"
        />
        <label
          for="message-image"
          class="absolute w-10 right-20 top-2 cursor-pointer"
        >
          <img :src="imageIcon" alt="" />
        </label>
        <button type="submit" class="absolute top-2 w-16 h-8 right-2 bg-aqua">
          Gửi
        </button>
        <div
          v-if="previewImage.length > 0"
          class="border-t border-b border-gray-300 px-4 py-3"
        >
          <p class="text-sm mb-2">
            <span class="bg-cyan-300 rounded-full px-2 py-1">{{
              previewImage.length
            }}</span>
            ảnh được chọn
          </p>
          <div
            v-for="(image, index) in previewImage"
            :key="index"
            class="relative inline-block mr-3"
          >
            <img
              class="w-24 h-24 rounded-md object-cover"
              :src="image"
              alt="preview-image"
            />
            <span
              @click="removePreviewImage(index)"
              class="absolute top-0.5 right-0 cursor-pointer"
            >
              <img class="" :src="closeIcon" alt="close-icon" />
            </span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import UserMessageVue from "@/components/UserMessage.vue";
import { computed, defineComponent, onMounted, ref } from "vue";
import minusIcon from "../assets/image/minus.svg";
import imageIcon from "../assets/image/image-icon.svg";
import closeIcon from "../assets/image/close.svg";
import { db, FieldValue } from "../firebaseConfig";
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
    const previewImage = ref([]);
    const fileImageInput = ref(null);
    const inputMessageRef = ref(null);
    const showSuggestions = ref(false);
    const mentionWrapperRef = ref(null);
    const mentionWrapLeft = ref(0);
    const { currentAvatar, currentUser } = storeToRefs(useLoginStore());
    const users = ref([
      {
        image: "https://i.ibb.co/QJ7RqMr/20473600.jpg",
        username: "manhdung99",
      },
      {
        image: "https://i.ibb.co/bQSyvVB/439757.jpg",
        username: "manhdung1",
      },
      {
        image: "	https://i.ibb.co/KFK5jG0/6998190.jpg",
        username: "manhdung2",
      },
    ]);

    // Add new message to Firestore
    const sendMessages = () => {
      if (previewImage.value.length > 0 || inputMessage.value != null) {
        let messageImage = [];
        if (previewImage.value.length > 0) {
          messageImage = previewImage.value.map(
            () => "https://i.ibb.co/bQSyvVB/439757.jpg"
          );
        }
        let data = {
          message: inputMessage.value,
          image: currentAvatar.value,
          user: currentUser.value,
          messageImage: messageImage,
        };
        db.collection("messages")
          .add({ ...data, createdAt: FieldValue.serverTimestamp() })
          .then(() => {
            inputMessage.value = null;
            imageMessage.value = null;
            previewImage.value = [];
          });
      }
    };
    // Get lastest message user read in DB
    const getLastestMessage = async () => {
      const res = await db
        .collection("lastMessage")
        .where("userSeen", "==", currentUser.value)
        .orderBy("createdAt", "desc")
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return null;
          } else {
            return snapshot.docs[0].data();
          }
        });
      return res;
    };
    //Set lastest Message
    const setLastestMessage = async () => {
      const currentlastMessage = messages.value[messages.value.length - 1];
      const dbLastMessage = await getLastestMessage();
      if (dbLastMessage != null) {
        if (
          currentlastMessage.createdAt.nanoseconds !=
            dbLastMessage.createdAt.nanoseconds ||
          currentlastMessage.createdAt.seconds !=
            dbLastMessage.createdAt.seconds
        ) {
          db.collection("lastMessage").add({
            ...currentlastMessage,
            userSeen: currentUser.value,
          });
        }
      } else {
        db.collection("lastMessage").add({
          ...currentlastMessage,
          userSeen: currentUser.value,
        });
      }
    };
    //Get message from DB
    const getMessage = async () => {
      db.collection("messages")
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          messages.value = [];
          snapshot.docs.map((doc) => {
            messages.value.push(doc.data());
          });
        });
    };
    //Scroll to lastest message user reader
    const scrollToLastestReadedMessage = async () => {
      const lastMessage = await getLastestMessage();
      if (lastMessage) {
        const index = messages.value.findIndex(
          (message) =>
            message.createdAt.seconds == lastMessage.createdAt.seconds &&
            message.createdAt.nanoseconds == lastMessage.createdAt.nanoseconds
        );
        const messageElement = document.querySelector(`#message-${index}`);
        messageElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    const uploadFile = (event) => {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        imageMessage.value = await theReader.result;
        previewImage.value.push(await theReader.result);
      };
      theReader.readAsDataURL(file);
    };
    // Remove image preview
    const removePreviewImage = (index) => {
      console.log(index, 1);
      previewImage.value.splice(index, 1);
    };
    // Clear before image when select new image
    const handleClearImage = () => {
      if (fileImageInput.value && fileImageInput.value.files.length > 0) {
        fileImageInput.value.value = null;
      }
    };
    // Check user mention and show popup
    const checkMention = () => {
      if (inputMessage.value.length > 0) {
        const mentionIndex = inputMessage.value.lastIndexOf("@");

        if (mentionIndex >= 0) {
          showSuggestions.value = true;
        } else {
          showSuggestions.value = false;
        }
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let text = ctx.measureText(inputMessage.value);
        mentionWrapLeft.value = 16 + text.width + 4 * inputMessage.value.length;
      }
    };
    // Filter user when type @
    const filteredUsers = computed(() => {
      const searchString = inputMessage.value.substring(
        inputMessage.value.lastIndexOf("@") + 1
      );
      return users.value.filter((user) =>
        user.username.toLowerCase().includes(searchString.toLowerCase())
      );
    });
    // Select user
    const selectUser = (user) => {
      showSuggestions.value = false;
      inputMessage.value =
        inputMessage.value.substring(0, inputMessage.value.lastIndexOf("@")) +
        `@${user.username} `;
      inputMessageRef.value.focus();
    };
    const onClickOutside = (e) => {
      if (mentionWrapperRef.value != null) {
        if (
          showSuggestions.value &&
          !mentionWrapperRef.value.contains(e.target)
        ) {
          showSuggestions.value = false;
        }
      }
    };
    document.addEventListener("click", onClickOutside);
    onMounted(getMessage);
    onMounted(scrollToLastestReadedMessage);
    onMounted(() => {
      users.value = users.value.filter(
        (user) => user.username != currentUser.value
      );
    });

    return {
      minusIcon,
      imageIcon,
      closeIcon,
      messages,
      inputMessage,
      listMessage,
      currentUser,
      imageMessage,
      previewImage,
      fileImageInput,
      handleClearImage,
      sendMessages,
      uploadFile,
      setLastestMessage,
      removePreviewImage,
      showSuggestions,
      checkMention,
      filteredUsers,
      selectUser,
      inputMessageRef,
      mentionWrapLeft,
      mentionWrapperRef,
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
<style scoped>
.home-chat-area {
  box-shadow: 0 2px 5px rgb(0 0 0/13%);
  width: 600px;
  margin: auto;
  /* max-height: 600px; */
  min-height: 600px;
  margin-top: 32px;
  position: relative;
  background: #a1a1a154;
  /* overflow: hidden; */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.list-message {
  overflow-y: scroll;
  max-height: 500px;
  padding-bottom: 21px;
  padding: 12px 16px 12px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #c3c3c3;
  border-left: 1px solid #c3c3c3;
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
  padding-right: 136px;
  border-bottom: 2px solid transparent;
}
.type-message-input:focus {
  border-bottom: 2px solid #13a6fb;
}
#my-svg:hover path {
  fill: red;
}
.type-message-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-right: 1px solid #c3c3c3;
  border-left: 1px solid #c3c3c3;
}
.type-message-wrapper.has-image {
  bottom: -160px;
}
.user-mention-wrapper {
  width: 250px;
  position: absolute;
  background: white;
  bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 5px;
}
.user-mention-item {
  padding: 8px 0;
  cursor: pointer;
  display: flex;
  padding-left: 8px;
  align-items: center;
  column-gap: 16px;
}
.user-mention-item:hover {
  background: #302e2e12;
}
@media screen and (max-width: 767px) {
  .home-chat-area {
    width: 100%;
  }

  .list-message {
    padding: 12px 4px;
    max-height: none;
    height: calc(100vh - 136px);
  }
  .message-wrapper {
    max-width: 50%;
  }
  .type-message-wrapper {
    position: fixed;
  }
}
</style>
