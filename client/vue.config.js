module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': __dirname
            }
        },
        entry: {
            app: './main.js'
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    },

    css: {
        loaderOptions: {
            sass: {
                prependdata: `@import "@/assets/scss/abstract/mixins.scss";`
            }
        }
    },
    

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true
            }
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
};
