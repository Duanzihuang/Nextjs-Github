module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  },
  exportPathMap: async defaultMap => {
    return {
      ...defaultMap,
      '/repos/2':{page:'/repos',query:{page:2}},
      '/repos/3':{page:'/repos',query:{page:3}}
    }
  }
}
