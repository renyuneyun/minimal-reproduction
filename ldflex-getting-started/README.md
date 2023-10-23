# ldflex-getting-started

## To reproduce

Run the following command, and see the error messages in the terminal.

```sh
npm install && npm run dev
```

## To change between the errors / attempts

Import is controlled in the beginning of `src/App.vue`.
Line 6 is for comunica query engine, while Line 7 is for rdflib. Both will error out, while they demonstrate different issues.