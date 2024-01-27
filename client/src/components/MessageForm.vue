<script setup lang="ts">
defineProps<{ finishedSending: string; canSendMessages: boolean }>();

import { reactive } from "vue";
const emit = defineEmits(["submit"]);

const getInitialFormData = () => ({
  sleep: 1,
  phones: "",
  message: "",
});

const messageForm = reactive(getInitialFormData());
const resetMessageForm = () => Object.assign(messageForm, getInitialFormData());

const sendMessage = () => {
  emit(
    "submit",
    messageForm.sleep,
    messageForm.phones.split("\n").map((phone: string) => phone.trim()),
    messageForm.message
  );
  resetMessageForm();
};
</script>
<template>
  <form @submit.prevent="sendMessage">
    <div class="relative isolate my-5 flex items-center pr-1">
      <label
        for="sleep"
        class="pl-2.5 pr-[calc(9/16*1rem)] block text-sm font-medium text-white"
      >
        Sleep as second
      </label>
      <input
        required
        :disabled="!canSendMessages"
        v-model="messageForm.sleep"
        type="number"
        name="sleep"
        id="sleep"
        placeholder="Enter sleep number as second"
        min="1"
        max="60"
        class="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
      />
      <div
        class="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15"
      ></div>
      <div
        class="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300"
      ></div>
    </div>
    <div class="relative isolate my-5 flex items-center pr-1">
      <label
        for="phones"
        class="pl-2.5 pr-[calc(9/16*1rem)] block text-sm font-medium text-white"
      >
        Phones
      </label>
      <textarea
        required
        :disabled="!canSendMessages"
        v-model="messageForm.phones"
        type="phones"
        name="phones"
        id="phones"
        placeholder="Enter phones number"
        class="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
      ></textarea>
      <div
        class="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15"
      ></div>
      <div
        class="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300"
      ></div>
    </div>

    <div class="relative isolate my-5 flex items-center pr-1">
      <label
        for="message"
        class="pl-2.5 pr-[calc(9/16*1rem)] block text-sm font-medium text-white"
      >
        Message
      </label>
      <textarea
        :disabled="!canSendMessages"
        v-model="messageForm.message"
        required
        name="message"
        id="message"
        placeholder="Your message"
        class="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
      ></textarea>

      <div
        class="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15"
      ></div>
      <div
        class="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300"
      ></div>
    </div>

    <button
      :disabled="!canSendMessages"
      type="submit"
      id="button"
      class="relative isolate flex-none rounded-lg py-1.5 text-[0.8125rem]/6 font-semibold text-white pl-2.5 pr-[calc(9/16*1rem)] w-full hover:bg-sky-400"
    >
      Send
      <div
        class="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15"
      ></div>
      <div
        class="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300"
      ></div>
    </button>
  </form>
  <div v-text="finishedSending" class="text-white"></div>
</template>
