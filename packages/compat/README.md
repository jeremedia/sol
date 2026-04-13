# `@jeremedia/sol-compat`

This package is the explicit compatibility bridge for legacy Sol adopters.

Current scope:

- `dist/sol.css`: legacy stylesheet mirrored from the root build
- `dist/sol.min.css`: compressed legacy stylesheet mirrored from the root build
- `dist/sol.js`: legacy bundled JavaScript entrypoint mirrored from the root build
- source maps for the mirrored legacy CSS artifacts

This package does not redefine Sol behavior. It packages the existing v4 delivery surface intentionally while the modernization work moves new consumers onto `@jeremedia/sol-core` and optional adapters.

Commands:

- `yarn --cwd packages/compat build`
- `yarn --cwd packages/compat check:artifacts`
