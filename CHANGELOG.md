# Change Log

## v0.7.0 / 2026-11-17
### Added
- Web Worker support. `base32` is exposed on `self` when loaded with `importScripts`.

### Fixed
- Unpaired UTF-16 surrogates in string input were encoded incorrectly and consumed the following code unit. They are now encoded as U+FFFD, matching `TextEncoder`.
- Truncated, overlong, and other ill-formed UTF-8 sequences could be decoded into wrong characters instead of being rejected.
- Browsers with a `process` polyfill (e.g. BrowserFS) and Electron renderers were detected as Node.js and threw `global is not defined`.
- Encoding non-string input threw `ReferenceError` in environments without `ArrayBuffer`.

### Changed
- Decoding invalid UTF-8 now replaces ill-formed sequences with U+FFFD, matching `TextDecoder`, instead of throwing an error. Use `base32.decode.asBytes()` to get the raw bytes.

## v0.6.0 / 2026-10-26
### Added
- `casefold` option to accept lowercase input when decoding. #20
- support ESM #9
- GitHub Actions CI across Node.js 20, 22, and 24 against the packed npm artifact
- GitHub Actions publish workflow on release with npm trusted publishing and provenance
- `prepack` script to build distributions before `npm pack` / `npm publish`

### Changed
- Replace Travis CI with GitHub Actions
- Update README badges to GitHub Actions, npm, and jsDelivr
- Upgrade mocha, nyc and uglify-js to fix vulnerable dev dependencies

## v0.5.1 / 2021-03-22
### Fixed
- encode/devoce empty string

## v0.5.0 / 2018-04-05
### Changed
- Throw error object when invalid UTF8. #6
- Throw error when invalid base32 characters. #8

## v0.4.0 / 2017-08-16
### Fixed
- TypeScript bug. #4

## v0.3.0 / 2017-08-16
### Added
- TypeScript support.

## v0.2.0 / 2017-01-23
### Added
- AMD support.

### Fixed
- ArrayBuffer dosen't work in Webpack.

## v0.1.1 / 2015-03-15
### Added
- decode.asBytes method.
- support byte Array, Uint8Array and ArrayBuffer input.

## v0.1.0 / 2015-03-14
### Added
- create project.
