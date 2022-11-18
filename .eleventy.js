const yaml = require("js-yaml")

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "src/_static": "static" });
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
      
    return {
      dir: {
        input: "src",
        output: "dist",
        layouts: "_layouts",
        data: "_data",
        htmlTemplateEngine: "liquid",
      },
    };
  };