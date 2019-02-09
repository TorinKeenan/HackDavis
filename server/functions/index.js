var fs      = require( 'fs' ) ;
// Read each file in the routes directory

// var loading_promise =  new Promise(function(resolve, reject) {
    functions = {};
    fs.readdirSync( __dirname ).forEach( function( helper_function ) {
      // Strip the .js suffix
      helper_function = helper_function.split( '.' )[ 0 ] ;
      // Ignore index (i.e. this file)
      if ( helper_function === 'index' ) return ;
      console.log( 'Loading helper_function ' + helper_function + '...' ) ;
      // Mount router
      //functions.use( '/' + route, require( './' + route + '.js' ) ) ;
      functions[helper_function.toString()] = function () {
          require('./'+helper_function+'.js');
      }
    }) ;
    module.exports = functions;
// });

// loading_promise.then(function(values){
//     console.log("In Export")
//     console.log(values)
//     module.exports = values;
// }) ;
