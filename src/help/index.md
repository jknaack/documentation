---
layout: base
no_sidebar: true
eleventyExcludeFromCollections: true
help_entries:
    - title: "Browse the documentation"
      description: "Learn more using the [documentation on this site](/)."
    - title: "Stay up to date"
      description: "Find out what's new with this project over at [GitHub](https://github.com/hacs)."
    - title: "Want to submit a Bug?"
      description: "Issues should be posed on [GitHub](https://github.com/hacs/integration/issues)"
    - title: "Discord"
      description: "For questions, you can join the [discord server](/discord), issues do still belong on GitHub."
    - title: "FAQ"
      description: "[Frequently asked questions](/faq)"
---

{% for entry in help_entries %}
## {{entry.title}}
{{entry.description}}
{% endfor %}