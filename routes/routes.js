module.exports = function(app) {
    var signIn = require('./signIn');
    var signUp = require('./signUp');
    var myAccount = require('./myAccount');
    var index = require('./index');
    var signOut = require('./signOut');
    var info = require('./info');
    var viewDraws = require('./viewDraws');
    var viewOldBets = require('./viewOldBets');
    var forgotPassword = require('./forgotPassword');
    var playNow = require('./playNow');



    app.use('/signIn', signIn);
    app.use('/signUp', signUp);
    app.use('/myAccount', myAccount);
    app.use('/index', index);
    app.use('/signOut', signOut);
    app.use('/info', info);
    app.use('/viewDraws', viewDraws);
    app.use('/viewOldBets', viewOldBets);
    app.use('/forgotPassword', forgotPassword);
    app.use('/playNow', playNow);



    //tests && examples
    var test = require('./test');
    var promise = require('../public/examples/promise');
    var callback = require('../public/examples/callback');
    var nested_chained_promises = require('../public/examples/nested_chained_promises');

    app.use('/test', test);
    app.use('/test/:params', test);
    app.use('/promise', promise);
    app.use('/promise/:userName/:userEmail', promise);
    app.use('/callback', callback);
    app.use('/callback/:userName/:userEmail', callback);
    app.use('/nested_chained_promises', nested_chained_promises);

}