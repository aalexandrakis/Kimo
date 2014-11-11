module.exports = function(app) {
    var signIn = require('./signIn');
    var signUp = require('./signUp');
    var myAccount = require('./myAccount');
    var index = require('./index');
    var signOut = require('./signOut');
    var info = require('./info');
    var test = require('./test');

    app.use('/signIn', signIn);
    app.use('/signUp', signUp);
    app.use('/myAccount', myAccount);
    app.use('/index', index);
    app.use('/signOut', signOut);
    app.use('/info', info);
    app.use('/test', test);
}