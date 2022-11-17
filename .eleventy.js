

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "src/_static": "static" });
      
    return {
      dir: {
        input: "src",
        output: "dist",
        layouts: "_layouts",
        htmlTemplateEngine: "liquid",
      },
    };
  };