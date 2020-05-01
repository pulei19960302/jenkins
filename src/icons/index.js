const requireAll = val => val.keys().map(val);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
