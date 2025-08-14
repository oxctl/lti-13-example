# LTI 1.3 Example

This is a tiny LTI 1.3 tool that shows how a set of HTML/JS/CSS can be deployed as a LTI tool.

This tool uses an external service (Tool Support) to handle the underlying LTI launch and then retrieves the token created in the launch one it's running.

This repository is automatically by:\
[![Build and deploy to GitHub Pages](https://github.com/oxctl/lti-13-example/actions/workflows/pages.yml/badge.svg)](https://github.com/oxctl/lti-13-example/actions/workflows/pages.yml)\
It can be accessed at:\
https://oxctl.github.io/lti-13-example/

## Requirements

Best to use nvm to manage node.js/npm versions. This project has been tested with node.js v22.18.0 and npm v10.9.3.

To select the correct version of node.js run in the root of the project:
```bash
nvm use
````


## Developing

To get started developing with this project ensure you are using the correct version of node.js and then download all the dependencies:

```bash
npm i
```

Then you can start up the development webserver with:

```bash
npm start
```

You should then have the tool running on: https://localhost:3000 and any changes you make locally should be picked up automatically by your browser.

## Production

To build a production set of files for this project run:
```bash
npm run build
```
You will get a production optimised set of files in `/dist` that you can place on a webserver.

## Configuring

To configure this tool to appear in a VLE/LMS you need to setup the configuration in the VLE/LMS and then configure tool support with the new tool. Documentation on configuration for Canvas is included here. Before you start you need to know the URL of the tool support server.

### Automatic Configuration

This tool uses [lti-auto-configuration](https://github.com/oxctl/lti-auto-configuration) to manage its configuration in Tool Support and Canvas.

If you haven't configured `lti-auto-configuration` before then first you need to point it at your installations:

```bash
npx @oxctl/lti-auto-configuration init
```

To deploy this tool some additional values also need to be set, these can be added with:

```bash
npx @oxctl/lti-auto-configuration setup
```

- title_suffix - This is some text to append to the name of the tool, if it's a developer deployment it's helpful to add your name here to distinguish between multiple copies of the same tool. eg ` (matthew dev)`.
- lti_tool_url - The URL that the frontend will be served from. e.g. `https://localhost:3000` when in development.
- lti_registration_id - The ID that the tool is registered with in tool support. Needs to be unique. e.g. `matthew-dev`

The tool configuration can then be created in Canvas and Tool Support with:

```bash
npx @oxctl/lti-auto-configuration create
```

`lti-auto-configuration` also allows updating and deleting of the configuration, see the README for details.

## Change Log
On Friday 13 June 2025, this repository was relicensed from Apache 2 to MIT with the consent of all contributors.




