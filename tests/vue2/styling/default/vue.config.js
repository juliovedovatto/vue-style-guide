module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: `
          @use "~@/assets/scss/abstracts/variables" as *;
          @use "~@/assets/scss/abstracts/mixins" as *;
          @use "~@/assets/scss/abstracts/functions" as *;
        `
      }
    }
  }
}
