const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/translate': {
                target: process.env.TRANSLATE_DOMAIN,
            },
        },
    },
    publicPath: './',
});
