---
layout: publishers
title: "GitHub Action"

validators:
    - title: "Brands"
      description: |
        _Only applies to integrations._

        This checks that the repository are added to [https://github.com/home-assistant/brands](https://github.com/home-assistant/brands)
---


{% for validator in validators %}
## {{validator.title}}

{{validator.description}}
{% endfor %}