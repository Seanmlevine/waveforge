'use strict'; // http://www.w3schools.com/js/js_strict.asp

module.exports = {

    // Autodesk Forge configuration

    // this this callback URL when creating your client ID and secret
    callbackURL: process.env.FORGE_CALLBACK_URL || 'http://localhost:3000/api/forge/oauth/callback',

    // set enviroment variables or hard-code here
    credentials: {
        client_id: process.env.FORGE_CLIENT_ID || 'HgGw9y3UC9kYqKj5EmBYz13Asz2apYVH',
        client_secret: process.env.FORGE_CLIENT_SECRET || 'hlimgnBJPydMu6AB',
    },

    // Required scopes for your application on server-side
    scopeInternal: ['data:read', 'data:write', 'data:create', 'data:search'],
    // Required scope of the token sent to the client
    scopePublic: ['viewables:read'],
};