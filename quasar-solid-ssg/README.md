# Quasar App (quasar-solid-ssg)

A Quasar Project for demonstrating the errors related to SSG (Static-Site-Generation) generation with some SoLiD libraries.

This project is based on quasar default template (from `npm init quasar`), with minimal changes to the following files:

- `package.json`: Dependencies
- `stores/session.ts`: Whole file
- `pages/IndexPage.vue`: Line 12-15

## Run the app

### Prepare dependency (Necessary for the Pinia issue)

This step is only necessarily to proceed to the Pinia issue (see below).

```bash
cd ../../  # If you are already inside the `quasar-solid-ssg` directory
git clone https://github.com/renyuneyun/solid-helper-vue.git
cd solid-helper-vue
git checkout dbg/ssg
```

### Build and run this app

```bash
npm install  # Install dependencies
quasar ssg generate --debug  # Do SSG
quasar ssg serve dist/ssg   # Start the web server for the generated static site
```

Note some errors will emerge at the second step.

## Problem description

### Pinia `_s` not found

If running the SSG built site, the following will appear in browser console:

```
TypeError: can't access property "_s", pinia is undefined
    useStore pinia.mjs:1705
    setup IndexPage.vue:15
    callWithErrorHandling runtime-core.esm-bundler.js:158
    setupStatefulComponent runtime-core.esm-bundler.js:7331
    setupComponent runtime-core.esm-bundler.js:7292
    mountComponent runtime-core.esm-bundler.js:5687
    hydrateNode runtime-core.esm-bundler.js:4691
    hydrateSubTree runtime-core.esm-bundler.js:5763
    componentUpdateFn runtime-core.esm-bundler.js:5783
    run reactivity.esm-bundler.js:178
    update runtime-core.esm-bundler.js:5902
    setupRenderEffect runtime-core.esm-bundler.js:5910
    mountComponent runtime-core.esm-bundler.js:5700
    hydrateNode runtime-core.esm-bundler.js:4691
    hydrateChildren runtime-core.esm-bundler.js:4853
    hydrateElement runtime-core.esm-bundler.js:4809
    hydrateNode runtime-core.esm-bundler.js:4672
    hydrateSubTree runtime-core.esm-bundler.js:5763
    componentUpdateFn runtime-core.esm-bundler.js:5783
    run reactivity.esm-bundler.js:178
    update runtime-core.esm-bundler.js:5902
    setupRenderEffect runtime-core.esm-bundler.js:5910
    mountComponent runtime-core.esm-bundler.js:5700
    hydrateNode runtime-core.esm-bundler.js:4691
    hydrateChildren runtime-core.esm-bundler.js:4853
    hydrateElement runtime-core.esm-bundler.js:4809
    hydrateNode runtime-core.esm-bundler.js:4672
    hydrateSubTree runtime-core.esm-bundler.js:5763
    componentUpdateFn runtime-core.esm-bundler.js:5783
    run reactivity.esm-bundler.js:178
    update runtime-core.esm-bundler.js:5902
    setupRenderEffect runtime-core.esm-bundler.js:5910
    mountComponent runtime-core.esm-bundler.js:5700
    hydrateNode runtime-core.esm-bundler.js:4691
    hydrateSubTree runtime-core.esm-bundler.js:5763
    componentUpdateFn runtime-core.esm-bundler.js:5783
    run reactivity.esm-bundler.js:178
    update runtime-core.esm-bundler.js:5902
    setupRenderEffect runtime-core.esm-bundler.js:5910
    mountComponent runtime-core.esm-bundler.js:5700
    hydrateNode runtime-core.esm-bundler.js:4691
    hydrateSubTree runtime-core.esm-bundler.js:5763
    componentUpdateFn runtime-core.esm-bundler.js:5783
    run reactivity.esm-bundler.js:178
    update runtime-core.esm-bundler.js:5902
    setupRenderEffect runtime-core.esm-bundler.js:5910
    mountComponent runtime-core.esm-bundler.js:5700
    hydrateNode runtime-core.esm-bundler.js:4691
    hydrateSubTree runtime-core.esm-bundler.js:5763
    componentUpdateFn runtime-core.esm-bundler.js:5783
    run reactivity.esm-bundler.js:178
    update runtime-core.esm-bundler.js:5902
    setupRenderEffect runtime-core.esm-bundler.js:5910
    mountComponent runtime-core.esm-bundler.js:5700
    hydrateNode runtime-core.esm-bundler.js:4691
    hydrateSubTree runtime-core.esm-bundler.js:5763
    componentUpdateFn runtime-core.esm-bundler.js:5783
    run reactivity.esm-bundler.js:178
    update runtime-core.esm-bundler.js:5902
    setupRenderEffect runtime-core.esm-bundler.js:5910
    mountComponent runtime-core.esm-bundler.js:5700
    hydrateNode runtime-core.esm-bundler.js:4691
    hydrate runtime-core.esm-bundler.js:4555
    mount runtime-core.esm-bundler.js:3853
    mount runtime-dom.esm-bundler.js:1486
    start client-entry.js:72
    promise callback*start client-entry.js:70
    promise callback* client-entry.js:79
runtime-core.esm-bundler.js:226:12
Hydration completed but contains mismatches. runtime-core.esm-bundler.js:4559:14
    hydrate runtime-core.esm-bundler.js:4559
    mount runtime-core.esm-bundler.js:3853
    mount runtime-dom.esm-bundler.js:1486
    start client-entry.js:72
    (异步：promise callback)
    start client-entry.js:70
    (异步：promise callback)
    <anonymous> client-entry.js:79
```

### Circular object

If removing `@inrupt/solid-client-authn-browser` from `packages.json`, SSG building will error out with circular object issue:

```
 App •  WAIT  • Generating Pages in progress...

 App • ⚠   Failed to pre-render: "/"  TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    --- property 'events' closes the circle
    at JSON.stringify (<anonymous>)
```

`@inrupt/solid-client-authn-browser` is a dependent of `solid-helper-vue`.

Werid thing is, if not using this custom version of `solid-helper-vue` (i.e. using `v0.2.0`), building will always stuck at this error. However, this custom version only changed `vue` and `pinia` as `peerDependencies`, and did not touch `@inrupt/solid-client-authn-browser`. I also attempted to update `@inrupt/solid-client-authn-browser` to `v2.0.0`, but it seems irrlevant.

See also https://github.com/freddy38510/quasar-app-extension-ssg/issues/375#issuecomment-1868378329
