<script setup lang="ts">
import MessageForm from "./components/MessageForm.vue";
import IconGitHub from "./components/icons/IconGitHub.vue";
import IconX from "./components/icons/IconX.vue";
import { ref } from "vue";
import { io } from "socket.io-client";

// @ts-ignore
const socket = io(process.env.SOCKET_SERVER);
const loading = ref(false);
const phone = ref("");
const whatsappConnected = ref(false);
const qrCodeUrl = ref("");
const finishedSending = ref("");
const canSendMessages = ref(true);

socket.on("qr-ready", (url: string) => {
  qrCodeUrl.value = url;
  loading.value = false;
});

socket.on("whatsapp-connected", () => {
  whatsappConnected.value = true;
});

socket.on("finished-sending", (message) => {
  finishedSending.value = message;
});

socket.on("finished-sended", () => {
  canSendMessages.value = true;
  finishedSending.value = "";
});

const login = () => {
  if (loading.value) return;
  loading.value = true;
  socket.emit("login", phone.value);
};

const sendMessage = (sleep: number, phones: string[], message: string) => {
  if (!canSendMessages.value) return;

  socket.emit("message", sleep, phones, message);
  canSendMessages.value = false;
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem] clip-path"
      ></div>
    </div>

    <div class="w-full max-w-3xl px-6">
      <h1
        class="mt-14 font-display text-4xl/tight font-light text-white text-center sm:text-left"
      >
        Whatsapp marketing
        <span class="text-sky-300">For free</span>
      </h1>
      <p class="mt-4 text-lg/6 text-gray-300 text-center sm:text-left">
        Write your phone number and send messages to your customers
      </p>

      <form
        v-if="!qrCodeUrl && !whatsappConnected"
        @submit.prevent="login"
        id="form"
        class="relative isolate mt-8 flex items-center pr-1"
      >
        <label for="phone" class="sr-only">phone</label>
        <input
          :disabled="loading"
          v-model="phone"
          required
          type="phone"
          name="phone"
          id="phone"
          placeholder="Your phone number"
          class="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
        />
        <button
          :disabled="loading"
          id="button"
          class="relative isolate flex-none rounded-lg py-1.5 text-[0.8125rem]/6 font-semibold text-white pl-2.5 pr-[calc(9/16*1rem)]"
          type="submit"
        >
          Login
          <span>→</span>
        </button>

        <div
          v-if="loading"
          class="animate-spin w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <div
          class="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15"
        ></div>
        <div
          class="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300"
        ></div>
      </form>

      <div v-if="qrCodeUrl && !whatsappConnected" class="mt-10">
        <img :src="qrCodeUrl" alt="qr code" class="w-72 h-72" />
      </div>

      <MessageForm
        v-if="whatsappConnected"
        @submit="sendMessage"
        :canSendMessages="canSendMessages"
        :finishedSending="finishedSending"
      />

      <div class="flex justify-between mt-5">
        <p class="text-gray-500">
          Created by <span class="text-white">Michael Nabil</span>
        </p>

        <div class="flex justify-between">
          <a
            href="https://twitter.com/michaelnabil230"
            class="flex items-center gap-2 px-2 py-0.5 text-[0.8125rem]/6 font-medium"
          >
            <IconX class="h-6 w-6 mr-2" />
            <span class="text-white">X</span>
          </a>
          <a
            href="https://github.com/michaelnabil230"
            class="flex items-center gap-2 px-2 py-0.5 text-[0.8125rem]/6 font-medium"
          >
            <IconGitHub class="h-6 w-6" />
            <span class="text-white">GitHub</span>
          </a>
        </div>
      </div>
    </div>

    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        class="clip-path relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[50rem]"
      ></div>
    </div>
  </div>
</template>
