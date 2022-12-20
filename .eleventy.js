const yaml = require('js-yaml')
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
// If not already added from previous tip
const slugify = require("slugify");

const FALLBACK_BASE_URL = 'https://hacs.xyz'

;

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink({ level: [1, 2, 3], tabIndex: false, })
  }));

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

  eleventyConfig.addFilter("debug", (value) => console.dir(value))

  eleventyConfig.addFilter("stripHtml", (value) => String(value.replace(/"/g, "'").replace(/<[^>]*>/g, " ")));
  eleventyConfig.addFilter("getFirstN", (value, target) => String(value).substring(0, target || value.length));

  eleventyConfig.addFilter("sortCollectionByOrder", (collection) => collection.sort((a, b) =>  (a.data.order || 99) - (b.data.order || 99)));
  eleventyConfig.addFilter("sortCollectionByTitle", (collection) => collection.sort((a, b) => (a.data.title || "").localeCompare(b.data.title || "")));

  eleventyConfig.addFilter("simplifyCollection", (value) => JSON.stringify(value.map(entry => (
    {
      title: entry.data.title, 
      url: entry.url, 
      templateContent: entry.templateContent.length > 250 ? `${entry.templateContent.substring(0, 250)}...` :  entry.templateContent, 
      tags: entry.data.tags
    }
    ))))

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
