# Setting up

1. Install Node.js
2. Install Next.js with `npx create-next-app@latest`
   - install with default settings
3. Install dependencies with `npm i`
4. Install Material UI with `npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material @mui/x-date-pickers @mui/x-data-grid`
5. Install Moment.js (datetime formatter) `npm install moment`
6. Install Material UI and Next.js integration with `npm install @mui/material-nextjs @emotion/cache`
7. Install RxJS with `npm install rxjs`

## For VS Code

1. Download extension `Prettier ESLint`
2. Run `npm i -D prettier@latest eslint@latest prettier-eslint@latest @typescript-eslint/parser@latest typescript@latest`
3. Open command palette with `CTRL + SIFT + P` or `CMD + SHIFT + P`, type `Preferences: Open Workspace Settings (JSON)`
4. Put this settings into the settings file

```
{
  "editor.defaultFormatter": "rvest.vs-code-prettier-eslint",
  "editor.formatOnType": false, // required
  "editor.formatOnPaste": true, // optional
  "editor.formatOnSave": true, // optional
  "editor.formatOnSaveMode": "file", // required to format on save
  "files.autoSave": "onFocusChange", // optional but recommended
  "vs-code-prettier-eslint.prettierLast": false // set as "true" to run 'prettier' last not first
}
```

5. Restart VS Code
