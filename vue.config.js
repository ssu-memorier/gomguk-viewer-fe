const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: './',
    chainWebpack: (config) => {
        config.plugins.delete('pwa');
        config.plugins.delete('workbox');
    },
});
