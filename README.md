# QuickSheet

A word processor designed with students and cheatsheets in mind.

## Installation

View the [latest release](https://github.com/zackjh/quicksheet/releases/tag/v1.0.0) and download the file that is compatible with your operating system.

## Additional Notes for macOS Users

### TL;DR

Run the following command in your terminal after unzipping the downloaded file:

```
xattr -c <path/to/quicksheet.app>
```

`quicksheet.app` should open with no issue after this.

### The Full Explanation

Apple requires applications to be [code signed and notarized](https://www.electronforge.io/guides/code-signing/code-signing-macos) to run on a user's machine without disabling additional operating system security checks.

This is a security feature used to certify that an application was created by a trustworthy source.

However, code signing certificates for macOS apps can only be obtained through Apple by purchasing a membership to the [Apple Developer Program](https://developer.apple.com/programs/), which costs [99 USD](https://developer.apple.com/support/compare-memberships/).

As we are not currently members of the Apple Developer Program, we are unable to code sign and notarize our macOS distributables.

Hence, our macOS distributables get an extended attribute `com.apple.Quarantine` which triggers the message: `“quicksheet.app” is damaged and can’t be opened. You should move it to the Bin.` when trying to open `quicksheet.app`.

To bypass this, we run `xattr -c <path/to/quicksheet.app>` in the terminal to remove all extended attributes from `quicksheet.app`

- All credits to [this discussion](https://discussions.apple.com/thread/253714860?sortBy=best) for helping us discover this workaround

Alternatively, if you do not wish to bypass these security measures, you can run QuickSheet by cloning this repository and running the development server:

1. Run `git clone https://github.com/zackjh/quicksheet.git` to clone this repository
2. Run `cd quicksheet` to navigate to the correct working directory
3. Run `npm install` to install the dependencies
4. Run `npm start` to start the development server

## Developer Notes

### Setting Up Your Development Environment

1. Install VS Code extensions for [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), and [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

   - Add the following into your `settings.json` within VS Code (if they are not already there)

     ```json
     "files.associations": {
       "*.css": "tailwindcss" // Always open .css files in Tailwind CSS mode - see Tailwind VS Code extension page for more details
     },
     "editor.quickSuggestions": {
       "strings": "on" // Trigger completions when editing "string" content - see Tailwind VS Code extension page for more details
     },
     "editor.formatOnSave": true, // Format on save (highly recommended)
     "tailwindCSS.experimental.classRegex": ["class:\\s*?[\"'`]([^\"'`]*).*?,"], // Enables Tailwind IntelliSense inside TipTap objects
     "tailwindCSS.classAttributes": [".*Styles.*"] // Enables Tailwind IntelliSense inside variables containing 'Styles' in their name
     ```

2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server

### Development Practices to Adhere To

- Create branches when developing new features or making potentially breaking changes
  - Use descriptive branch names such as `bugfix-broken-link` or `feature-settings-page`
  - It is acceptable to commit to `main` when making minor or low-impact changes such as updating documentation
- Deal with all linting errors before committing
- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) when writing commit messages

### Other Notes

- Refer to `package.json` for `npm` scripts

### Useful Resources

- [React Docs](https://react.dev/learn)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Electron Forge Docs](https://www.electronforge.io/)
- [Electron Docs](https://www.electronjs.org/docs/latest)

## Guide to Packaging & Distributing the Application

### macOS

1. Run `npm run make --platform="darwin" --arch="arm64,x64"` to package and create the distributables
2. Navigate to `out/make/zip/darwin` and attach `quicksheet-darwin-arm64-x.x.x.zip` and `quicksheet-darwin-x64-x.x.x.zip` to the GitHub release

### Windows

0. Run `npm install` to ensure dependencies are installed
1. While on a windows system run `npm run make` to package and create the distributables
```perl
my-app/
├── out/
│   ├── make/
│   │   ├── squirrel.windows/
│   │   │   ├── MyApp Setup 1.0.0.exe
│   │   │   ├── RELEASES
│   │   │   ├── MyApp-1.0.0-full.nupkg
│   │   │   └── ... (other Squirrel-related files)
│   │   └── zip/
│   │       └── my-app-1.0.0-win32-x64.zip
```
3. Navigate to `out/make/squirrel.windows` and attach `quicksheet-x.x.x.Setup.exe` to the GitHub release or run `npm run publish`

### Linux

0. Run `npm install` to ensure dependencies are installed
1. Run `npm run make` to package and create the distributables
```perl
my-app/
├── src/
│   ├── index.js
│   └── ... (other source files)
├── package.json
├── out/
│   ├── make/
│   │   ├── deb/
│   │   │   └── my-app_1.0.0_amd64.deb
│   │   ├── rpm/
│   │   │   └── my-app-1.0.0.x86_64.rpm
│   │   ├── zip/
│   │   │   └── my-app-1.0.0-linux-x64.zip
│   │   └── ... (other possible formats)
```
3. Navigate to `out/make/deb` and attach `quicksheet-x.x.x.amd64.deb` to the GitHub release
4. Navigate to `out/make/rpm` and attach `quicksheet-x.x.x.x86_64.rpm` to the GitHub release
