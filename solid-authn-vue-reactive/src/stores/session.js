import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { Session } from '@inrupt/solid-client-authn-browser';

export const useSessionStore = defineStore('session', () => {
  const session = reactive(new Session())

  async function login(solidIdentityProvider, redirectUrl) {
    await this.session.login({
      oidcIssuer: solidIdentityProvider,
      clientName: "Inrupt tutorial client app",
      redirectUrl: redirectUrl
    });
  }

  async function handleRedirectAfterLogin(redirectUrl) {
    await this.session.handleIncomingRedirect({
      url: redirectUrl,
      restorePreviousSession: true,
    });
  }

  async function logout() {
    if (this.isLoggedIn) {
      this.session.logout();
    }
  }

  return { session, login, handleRedirectAfterLogin, logout }
})
