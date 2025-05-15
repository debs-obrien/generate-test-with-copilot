# Demo: Generating tests for Playwright Movies App

1. Make sure the MCP server is running. You can see a list of tools when clicking on the "Tools" icon (settings icon) in the Copilot sidebar.
  1. If you receive `Connection state: Error spawn npx ENOENT` ([filed upstream](https://github.com/microsoft/vscode-copilot-release/issues/9779)) make sure to fully shutdown VSCode and start it again.
2. Add the `.github/prompts/generate_test.prompt.md` file to the chat context
3. Paste the following code into Copilot using Agent mode and Claude 3.5
  ```md
  Generate a Playwright test for the following scenario:
  1. Navigate to https://debs-obrien.github.io/playwright-movies-app
  2. search for 'Garfield'
  3. verify the movie is in the list
  ```
