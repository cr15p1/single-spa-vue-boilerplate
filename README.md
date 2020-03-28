# single-spa-vue

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

## reproduce

```sh
vue create single-spa-vue
cd single-spa-vue
```

### Setup single-spa

```sh
vue add single-spa
```

Add dependencys to the SystemJS import map in your `public/index.html`.

```html
<script type="systemjs-importmap">
  {
    "imports": {
      "app": "http://localhost:8080/js/app.js",
      "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.1.1/lib/system/single-spa.min.js"
    }
  }
</script>
<link
  rel="preload"
  href="https://cdn.jsdelivr.net/npm/single-spa@5.1.1/lib/system/single-spa.min.js"
  as="script"
  crossorigin="anonymous"
/>
<script src="https://cdn.jsdelivr.net/npm/import-map-overrides@1.12.0/dist/import-map-overrides.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.2.5/dist/system.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.2.5/dist/extras/amd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.2.5/dist/extras/named-exports.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.2.5/dist/extras/named-register.min.js"></script>
```

### Load your single-spa module

```html
<script>
  System.import("single-spa").then(singleSpa => {
    singleSpa.registerApplication(
      "app",
      () => System.import("app"),
      location => location.pathname.startsWith("/")
    );
    singleSpa.start();
  });
</script>
```

### optimization

Make sure that you have only one instance of your framework in the entire application. To do this, remove your framework and all main modules used by it.

```shell
yarn remove single-spa single-spa-vue vue.
```

Add the folowing entrys to your SystemJS imports.

```json
{
  "imports": {
    "single-spa-vue": "https://cdn.jsdelivr.net/npm/single-spa-vue@1.8.2/lib/single-spa-vue.min.js",
    "vue": "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"
  }
}
```

Remove `src/set-public-path.js` from your project and add the modules to your webpack externals.

```sh
rm src/set-public-path.js
```

```sh
yarn remove systemjs-webpack-interop
touch vue.confg.js
```

```js
module.exports = {
  configureWebpack: {
    externals: {
      vue: "vue",
      "single-spa": "single-spa",
      "single-spa-vue": "single-spa-vue"
    }
  }
};
```
