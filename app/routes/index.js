const invRoutes = require('./inv_routes');

module.exports = function(app, db){
    invRoutes(app, db);
}