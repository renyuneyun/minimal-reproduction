// Exactly the same code as in the `solid-helper-vue` library

import { defineStore } from 'pinia';
import { ISessionInfo, Session } from '@inrupt/solid-client-authn-browser';

/**
 * A Pinia store for storing Solid log-in sessions.
 * It uses `@inrupt/solid-client-authn-browser` internally, and the user should manage the authentication flow (e.g. callback).
 * It exposes session-related variables as states, and actions for session mangement.
 */
export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      /**
       * The Session object. Reactivity is lost. Useful mainly for its functions (e.g. `fetch()`)
       */
      session: new Session(),
      /**
       * An (reactive) ISessionInfo object.
       */
      info: undefined as ISessionInfo | undefined,
      /**
       * (Reactive) whether the session is logged-in or not
       */
      isLoggedIn: false,
      /**
       * (Reactive) The webid of the current user
       */
      webid: '',
    };
  },

  actions: {
    /**
     * Perform log-in
     * @param solidIdentityProvider IDP for performing log-in
     * @param redirectUrl The (absolute URL of) place to redirect to (to handle callback)
     * @param clientName The name of the application that request the log-in
     */
    async login(
      solidIdentityProvider: string,
      redirectUrl: string,
      clientName?: string
    ) {
      await this.session.login({
        oidcIssuer: solidIdentityProvider,
        clientName: clientName || 'Vue application',
        redirectUrl: redirectUrl,
      });
    },

    /**
     * Handles the redirect after log-in in the IDP.
     * Roughly resmbles the `session.handleIncomingRedirect()` call, but with explicit parameters.
     * @param redirectUrl The redirectUrl that this function call resembles. It can be undefined.
     * @param restorePreviousSession Whether to restore the previous sesison or not
     * @returns Session info if the function is invoked while the actual callback; or undefined
     */
    async handleRedirectAfterLogin(
      redirectUrl?: string,
      restorePreviousSession?: boolean
    ): Promise<ISessionInfo | undefined> {
      this.session.onLogin(() => {
        this.webid = this.session.info.webId!;
        this.isLoggedIn = true;
      });

      this.session.onLogout(() => {
        this.webid = '';
        this.isLoggedIn = false;
      });

      this.session.onSessionRestore(() => {
        this.webid = this.session.info.webId!;
        this.isLoggedIn = true;
      });

      this.session.onSessionExpiration(() => {
        this.webid = '';
        this.isLoggedIn = false;
      });

      const info = await this.session.handleIncomingRedirect({
        url: redirectUrl,
        restorePreviousSession: restorePreviousSession,
      });

      this.info = info;

      return info;
    },

    /**
     * Log-out
     */
    async logout() {
      if (this.isLoggedIn) {
        this.session.logout();
      }
    },
  },
});
