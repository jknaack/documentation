const yaml = require('js-yaml')

const FALLBACK_BASE_URL = 'https://hacs.xyz'

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/_static': 'static' })
  eleventyConfig.addDataExtension('yaml', (contents) => ({
    ...yaml.load(contents),
    site_url: !process.env.CF_PAGES_BRANCH
      ? 'http://localhost:8080/'
      : process.env.CF_PAGES_BRANCH === 'main' || !process.env.CF_PAGES_URL
      ? FALLBACK_BASE_URL
      : process.env.CF_PAGES_URL,
  }))

  return {
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts',
      data: '_data',
      htmlTemplateEngine: 'liquid',
    },
  }
}
