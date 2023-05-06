<template>
  <div
    :class="currentUser == user ? 'flex-row-reverse float-right' : ''"
    class="flex"
  >
    <div
      :class="currentUser == user ? 'ml-4' : 'mr-4'"
      class="rounded-full overflow-hidden w-10 h-10"
    >
      <img
        :class="userBefore == user ? 'hidden' : ''"
        class="w-10 h-10 object-cover"
        :src="image"
        alt="avatar"
      />
    </div>
    <div
      v-if="message && !messageImage.length > 0"
      :class="currentUser == user ? 'bg-aqua' : ''"
      class="message-wrapper"
    >
      <p v-html="highLightMessage(message)"></p>
    </div>
    <div v-else-if="!message && messageImage.length > 0">
      <img
        v-for="(image, index) in messageImage"
        :key="index"
        class="w-60 rounded-md mb-2"
        :src="image"
        alt="image"
      />
    </div>
    <div v-else>
      <div class="bg-white rounded-md">
        <img
          v-for="(image, index) in messageImage"
          :key="index"
          class="w-60 mb-2"
          :src="image"
          alt="image"
        />
        <div class="message-wrapper image">
          <p v-html="highLightMessage(message)"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "UserMessage",

  props: {
    message: String,
    image: String,
    currentUser: String,
    user: String,
    userBefore: String,
    messageImage: Array,
  },
  setup(props) {
    const highLightMessage = (messageText) => {
      const regex = new RegExp(`@\\b${props.currentUser}\\b`, "g");
      return messageText.replace(regex, '<span class="highlight">$&</span>');
    };
    return { highLightMessage };
  },
});
</script>
<style>
.message-wrapper {
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 4px;
  max-width: 80%;
  overflow-wrap: break-word;
}
.message-wrapper.image {
  max-width: 240px;
}
.highlight {
  color: #05bfff;
}
</style>
