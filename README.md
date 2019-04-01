# Parse Platform GitHub Pages

[![Join The Conversation](https://img.shields.io/discourse/https/community.parseplatform.org/topics.svg)](https://community.parseplatform.org/c/parse-server)
[![Backers on Open Collective](https://opencollective.com/parse-server/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/parse-server/sponsors/badge.svg)](#sponsors)
[![License][license-svg]][license-link]
[![Twitter Follow](https://img.shields.io/twitter/follow/ParsePlatform.svg?label=Follow%20us%20on%20Twitter&style=social)](https://twitter.com/intent/follow?screen_name=ParsePlatform)

## Setup

To run the site locally, you'll need Jekyll and the GitHub Pages gem. The GH Pages gem is required to provide your local site with a similar environment to prod. For example, the `site.github` param is [automatically provided by GitHub](https://help.github.com/articles/repository-metadata-on-github-pages/) in prod.

### Prerequesites

* Ruby 2.0.0 or higher
* Jekyll 3 or higher
* Bundler (`gem install bundler`)

### Running

```
bundle install
bundle exec jekyll serve
```

## Rendering logic

1. All metadata pulled in via Jekyll as json
2. Any repo with "SDK" in the title is ignored since they are already hardcoded into the page.
3. Projects then are sorted by keywords in their title:
	* Projects with "Facebook", or "Twitter" are put into the social section
	* Projects with "tutorial" are put into the tutorial section
	* Projects with "todo", "demo", "any", or a few of the one off apps are put into the sample app section
	* Everything else is put under the "other" section
4. Community projects are populated from a Parse app

[license-svg]: https://img.shields.io/badge/license-BSD-lightgrey.svg
[license-link]: LICENSE
