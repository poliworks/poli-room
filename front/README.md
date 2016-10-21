# POLI-ROOM Front - PCS3623

## To use

### Node

Simple server to serve the static files. Necessary for cross domain loading in Chrome.

```sh
npm install
node server.js
```

And visit <http://localhost:3000/>.

## Changing the port

You can change the port number by setting the `$PORT` environment variable before invoking any of the scripts above, e.g.,

```sh
PORT=3001 node server.js
```
