# @landing-kit/next

Next.js wrapper for landing-kit: `LandingKit` component and the `landing-kit` dev/build CLI.

Depends on `@landing-kit/core`. See [landing-kit](https://github.com/enxtur/landing-kit) for docs.

## Custom styling

Place a `style.css` file in your project’s `public/` directory to apply your own design. The framework detects it automatically and injects `<link rel="stylesheet" href="/style.css" />` in the layout. Your CSS loads after the theme, so you can override variables and add custom styles without changing any code.
