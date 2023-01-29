<script setup>
import { reactive } from 'vue';
/* import { useSessionStore } from '../stores/session'; // Will be problematic if using this one. */
import { useSessionStore } from '../stores/session2'; // This demonstrates that Pinia store works with nested objects.

const IDP = 'https://solidcommunity.net';
const REDIR = window.location.href;

const sessionStore = useSessionStore();

sessionStore.handleRedirectAfterLogin(REDIR);
</script>

<template>
    <div>
    <p v-if=sessionStore.session.info.isLoggedIn>
    <button type="button" @click="sessionStore.logout()">Log Out</button>
    Logged in as {{sessionStore.session.info.webId}}
    </p>
    <p v-else>
    <button type="button" @click="sessionStore.login(IDP, REDIR)">Log In</button>
    Not logged in
    </p>
    </div>
</template>

