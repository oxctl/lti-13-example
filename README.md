# LTI 1.3 Example

This is a tiny LTI 1.3 tool that shows how a set of HTML/JS/CSS can be deployed as a LTI tool.

This tool uses an external service to handle the underlying LTI launch and then retrieves the token created in the launch one it's running.

## Requirements

To develop and run this you need:

- [node.js 18 / npm 9](https://nodejs.org)

You might want to use [nvm](https://github.com/nvm-sh/nvm) to download and manage node.js/npm versions. If you do use it then to select the correct version run `nvm use` in the root of the project.

## Developing

To get started developing with this project ensure you are using the correct version of node.js and then download all the dependencies:

```bash
npm i
```

Then you can start up the development webserver with:

```bash
npm run start
```
You should then have the tool running on: https://localhost:3000 and any changes you make locally should be picked up automatically by your browser.

## Production

To build a production set of files for this project run:
```bash
npm run build
```
You will get a production optimised set of files in `/dist` that you can place on a webserver.

## Configuring

To configure this tool to appear in a VLE/LMS you need to setup the configuration in the VLE/LMS and then configure tool suppport with the new tool. Documentation on configuration for Canvas is included here. Before you start you need to know the URL of the tool support server.

### Canvas

Create a new LTI Developer Key in your Canvas instance. And set the following values:

- Key Name: LTI 1.3 Example (human-readable name shown to administrators)
- Redirect URIs: https://<tool-support-server>/lti/login
- Method: Manual Entry
- Title: LTI 1.3 Example (human-readable name show to tool users)
- Description: Sample tools
- Target Link URI: https://localhost:3000/
- OpenID Connect Initiation Url: https://<tool-support-server>/lti/login_initation
- JWK Method: Public JWK URL
- Public JWK URL: https://<tools-support-server>/.well-know/jwks.json
- Additional Settings
  - Custom Data:
    ```
    canvas_user_prefers_high_contrast=$Canvas.user.prefersHighContrast
    com_instructure_brand_config_json_url=$com.instructure.brandConfigJSON.url
    ```
  - Privacy: Public
- Placements: Course Navigation

After saving the Developer Key make a note of the Client ID

### Tool Support

To get this tools to launch from a VLE you need to configure the tool server to pass the LTI launch through to your tool. The `registration-id` needs to be unique but otherwise it can be anything, the `client-id` needs to be the Client ID from the Developer Key and the provider details are specific to the type of Canvas instance (production / beta / test).

```http request
POST /admin/tools
Authorization: Basic {{base64}}
Content-Type: application/json

{
  "registrationId": "{{registration-id}}",
  "clientName": "LTI 1.3 Example",
  "clientId": "{{client-id}}",
  "authorizationGrantType": "implicit",
  "redirectUri": "{baseUrl}/lti/login",
  "scopes": [
    "openid"
  ],
  "providerDetails": {
    "authorizationUri": "https://sso.canvaslms.com/api/lti/authorize_redirect",
    "tokenUri": "https://sso.canvaslms.com/login/oauth2/token",
    "jwkSetUri": "https://sso.canvaslms.com/api/lti/security/jwks"
  }
}
```






