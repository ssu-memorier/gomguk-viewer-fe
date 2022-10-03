const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/translate': {
                target: 'https://zd6lygxeki.execute-api.ap-northeast-2.amazonaws.com/memorial-papago/',
            },
        },
    },
    publicPath: './',
});
