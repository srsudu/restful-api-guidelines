[![dependencies Status](https://david-dm.org/zalando-incubator/zally/status.svg?path=web-ui)](https://david-dm.org/zalando-incubator/zally?path=web-ui)

Zally WEB-UI
============

Zally Web-UI project provides a web user interface to lint your api specs.
Proudly built with NodeJS and React.

## Requirements

* NodeJS >= 7.6


## Install, build and run

```bash
cd web-ui
npm install
npm run build
npm start
```

## Configuration

The web-ui relies on [dotenv](https://github.com/motdotla/dotenv) NodeJS module to handle configuration.
Following the [The Twelve-Factor App](https://12factor.net/config) methodology.
Customization can be done by setting environment variables and/or by providing a `.env` file in the web-ui root directory.<br>

Below the full reference of "available" environment variables and their default values.

```
PORT=8442
LOG_LEVEL="debug"

SSL_ENABLED=false
SSL_KEY=""
SSL_CERT=""

ZALLY_API_URL=""

OAUTH_ENABLED=false
OAUTH_CLIENT_ID=""
OAUTH_AUTHORIZATION_URL=""
OAUTH_REDIRECT_URI=""
OAUTH_TOKENINFO_URL=""
OAUTH_SCOPES=""

DEV_PORT=8441
DEV_SSL_ENABLED=false
```

* **PORT**: HTTP(S) Server port
* **LOG_LEVEL**: Logging level (error|warn|info|verbose|debug|silly)

* **SSL_ENABLED**: Start the server with HTTPS 
* **SSL_KEY**: Fs path to SSL key file 
* **SSL_CERT**: Fs path to SSL cert file 

* **ZALLY_API_URL**: The URL pointing to Zally Api Server

* **OAUTH_ENABLED**: Enable client side OAuth2 implicit grant flow protection
* **OAUTH_CLIENT_ID**: OAuth2 client id assigned to your app
* **OAUTH_REDIRECT_URI**: The route that should handle the OAuth2 access token response
* **OAUTH_TOKENINFO_URL**: The url used to validate the access token and retrieve token information
* **OAUTH_SCOPES**: Comma separated list of scopes that the user should grant to the app

* **DEV_PORT**: HTTP(S) server port for the dev server (webpack-dev-server)
* **DEV_SSL_ENABLED**: start dev server with https

## Development

### Install, build and run

```
cd web-ui
npm install
npm run build
npm start
```

### Run in development mode

```
npm run dev
```

> This task starts the application server in development mode with **nodemon** and **webpack-dev-server** watching for changes.<br>
  The application server acts as a proxy to webpack-dev-server as the target.

### Build optimized client javascript bundle

Build webpack bundle minified and source-map file(s).

```
npm run build
```

### Build docker image

```
npm run docker:build
```

## Contributing

People interested contributing to the web-ui project can open issues and related pull requests. 

Before opening PRs, be sure the test are running by executing `npm test`.