## Rendering logic

1. All metadata pulled in via Jekyll as json
2. Any repo with "SDK" in the title is ignored since they are already hardcoded into the page.
3. Any repo with the terms "tutorial", "any", "demo", or "todo" are rendered under the "tutorials/samples" section
4. Everything else is rendered under the "other" section
