# Sol

<br>

<a href="https://www.moma.org/collection/works/35205"><img src="https://www.moma.org/d/p/sa/maximum/cri_000000291104.jpg" height="480" /></a>

<br>

> The form itself is of very limited importance; it becomes the grammar for the total work. In fact it is best that the basic unit be deliberately uninteresting so that it may more easily become an intrinsic part of the entire work. Using complex basic forms only disrupts the unity of the whole. Using a simple form repeatedly narrows the field of the work and concentrates the intensity to the arrangement of the form. This arrangement becomes the end while the form becomes the means.
>
> [Sol LeWitt](https://www.moma.org/artists/3528), [_Paragraphs on Conceptual Art_](https://www.moma.org/documents/moma_catalogue_1971_300297572.pdf#page=171)

<br>

**Sol** is a front-end (JS/CSS) library, developed by MoMA’s Digital Product team for use across the organization’s various products. It takes an “atomic” approach of providing simple utility functions and classes which incorporate the basic design paradigms for MoMA’s brand, (mostly) agnostic of their specific usage.

<br>

## Documentation

Classes and available modules are documented on the [Wiki](https://github.com/MuseumofModernArt/sol/wiki). You can see an example of how to include in your site in the `example` folder, and for more examples of how to use various classes and components check `sol-101`.

## Modernization Fork

This fork is being modernized in-place from the `v4.2.0` release line.

- `legacy/v4` preserves the last coherent released build for parity and regression checks.
- `modernization/main` is the active branch for the modern architecture.
- `packages/core` now owns the canonical token source, generated artifacts, bundled fonts, and the first standalone core stylesheet.
- `docs/modernization/roadmap.md` describes the migration phases and repository plan.
- `docs/modernization/architecture.md` captures the target package layout and design constraints.
- `docs/modernization/parity-checklist.md` lists the behaviors that must survive the rewrite.

## Development

1. To install, make sure you have homebrew installed, and then run this install Dart Sass<br>
`yarn install-sass`

2. To build for development, run the first command. Or if you want to build and watch, use the second command<br>
`yarn run build-dev` or `yarn run watch`

3. To make build for distribution, run the following. This builds the legacy distribution and the generated core package artifacts.
`yarn run build`

To regenerate or verify the full core package artifacts, run `yarn run build:core` or `yarn run check:core`.

To regenerate or verify the canonical token artifacts only, run `yarn run build:tokens` or `yarn run check:tokens`.

To link with `moma-go`, in the project folder, run `yarn link`.
In `moma-go`, run `yarn link sol`. This creates a [symlink](https://classic.yarnpkg.com/en/docs/cli/link/) to your local version.

## Releases

Create releases from a clean branch checkout. The release script now commits the built artifacts on the active branch, creates an annotated tag on that same commit, and can push the branch and tag to `origin`.

Run `yarn release 1.0.0`, replacing `1.0.0` with the exact semantic version you want to publish. Pre-releases should be passed explicitly, for example `yarn release 5.0.0-beta.1`.

Useful flags:

- `--dry-run` prints the release plan without mutating the branch.
- `--skip-tests` skips Jest before the release build.
- `--no-push` keeps the release commit and tag local.

Once the artifact files have been generated and the tag has been created, draft the GitHub release from that tag.

More on semantic versioning [here](https://classic.yarnpkg.com/en/docs/dependency-versions#toc-semantic-versioning).

## Usage

You should just get `dist/sol.css` or `dist/sol.min.css`. Fonts are also provided in the `dist` folder.

To add to your package manager, such as yarn, do `yarn add github:MuseumofModernArt/sol`. If you would like to lock to a specific version, append `#v1.0.0` to the end. More on all this [here](http://thecodebarbarian.com/github-is-my-favorite-private-npm-registry.html).

To update your version of the MoMA Style to the latest release, `yarn upgrade sol`. To update to a specific version, run `yarn upgrade sol#[version]`.
