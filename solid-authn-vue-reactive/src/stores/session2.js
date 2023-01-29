import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session2', () => {
  const session = reactive({
    info: {
      isLoggedIn: false,
      webId: "",
    }
  })

  function savePending(pendingSessionInfo) {
    const json = JSON.stringify(pendingSessionInfo)
    localStorage.setItem("pendingSessionInfo", json)
  }

  function getPending() {
    return JSON.parse(localStorage.getItem("pendingSessionInfo"))
  }

  async function login(solidIdentityProvider, redirectUrl) {
    const pendingSessionInfo = {
      isLoggedIn: true,
      webId: "some-webid",
    }
    savePending(pendingSessionInfo)
  }

  async function handleRedirectAfterLogin(redirectUrl) {
    setTimeout(() => {
      const pendingSessionInfo = getPending()
      if (pendingSessionInfo) {
        this.session.info.isLoggedIn = pendingSessionInfo.isLoggedIn
        this.session.info.webId = pendingSessionInfo.webId
      }
    }, 2000)
  }

  async function logout() {
    const pendingSessionInfo = {
      isLoggedIn: false,
      webId: "",
    }
    savePending(pendingSessionInfo)
  }

  return { session, login, handleRedirectAfterLogin, logout }
})
