const yaml = require('js-yaml')

const FALLBACK_BASE_URL = 'https://hacs.xyz'

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy(
    { 
      'src/_static': 'static', 
      'src/images': 'images',
      '_redirects': '_redirects',
    }
  )

  eleventyConfig.addDataExtension('yaml', (contents) => ({
    ...yaml.load(contents),
    site_url: !process.env.CF_PAGES_BRANCH
      ? 'http://localhost:8080'
      : process.env.CF_PAGES_BRANCH === 'main' || !process.env.CF_PAGES_URL
      ? FALLBACK_BASE_URL
      : process.env.CF_PAGES_URL,
  }))

  eleventyConfig.addFilter("stripHtml", (value) => String(value.replace(/"/g, "'").replace(/<[^>]*>/g, " ")));
  eleventyConfig.addFilter("getFirstN", (value, target) => String(value).substring(0, target || value.length));

  eleventyConfig.addFilter("sortCollectionByOrder", (collection) => collection.sort((a, b) =>  (a.data.order || 99) - (b.data.order || 99)));
  eleventyConfig.addFilter("sortCollectionByTitle", (collection) => collection.sort((a, b) => (a.data.title || "").localeCompare(b.data.title || "")));

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
