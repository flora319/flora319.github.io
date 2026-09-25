# Flora Xuan · Personal Portfolio

**Author:** Flora Xuan

This repository is based on https://github.com/varadbhogayata/varadbhogayata.github.io.

**Live site:** https://flora319.github.io

I'm a Computer Engineering student at the University of Toronto (minor in Artificial Intelligence Engineering).
This site introduces my experience, projects, skills, education, and places I have travelled.

## Features

- **Soft colour palette:** slate blue and sage with rose-red accents, defined once as CSS variables
- **Dark mode:** a toggle that remembers your choice and follows your system setting on a first visit
- **Projects from a JavaScript array:** Load More, filters by area (AI / ML, Software, Hardware & Embedded),
  live search, clickable skill tags, and expandable details
- **Places Travelled:** click a destination card to move the embedded Google map there
- **Mobile friendly and accessible:** responsive layout, keyboard focus outlines,
  WCAG AA colour contrast in both themes, respects "reduce motion"

## Built with

HTML, CSS, JavaScript, [Materialize](https://materializecss.com/), [Typed.js](https://mattboldt.com/demos/typed-js/),
Font Awesome, and GitHub Pages.

## Project structure

```
index.html                  page content
assets/css/style.css        main styles and colour palette
assets/css/enhancements.css tags, search, highlights, footer, mobile layout
assets/css/dark-mode.css    dark mode
assets/js/projects.js       project data, Load More, filters, search
assets/js/places.js         travel map switcher
assets/js/theme-toggle.js   dark mode toggle
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## License

MIT (see [LICENSE](./LICENSE)), inherited from the original template.
