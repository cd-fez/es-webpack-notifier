var path = require('path');
var objectAssign = require('object-assign');
var os = require('os');
var notifier = require('node-notifier');

var DEFAULT_LOGO = path.join(__dirname, 'logo.png');

var WebpackNotifierPlugin = module.exports = function(options) {
    this.options = options || {};
    this.lastBuildSucceeded = false;
    this.isFirstBuild = true;
};

WebpackNotifierPlugin.prototype.compileMessage = function(stats) {

    if (this.isFirstBuild) {
        this.isFirstBuild = false;

        if (this.options.skipFirstNotification) {
            return;
        }
    }

    var errer;
    if (stats.hasErrors()) {
        errer = 'has Error';

    } else if (stats.hasWarnings() && !this.options.excludeWarnings) {
        errer = 'has Warnings';

    } else if (!this.lastBuildSucceeded || this.options.alwaysNotify) {
        this.lastBuildSucceeded = true;
        return 'Build successful';

    } else {
        return;
    }

    this.lastBuildSucceeded = false;

    return errer;

};

WebpackNotifierPlugin.prototype.compilationDone = function(stats) {
    var msg = this.compileMessage(stats);
    if (msg) {
        var contentImage = ('contentImage' in this.options) ?
            this.options.contentImage : DEFAULT_LOGO;

        notifier.notify(objectAssign({
            title: 'Webpack',
            message: msg,
            contentImage: contentImage,
            icon: (os.platform() === 'win32' || os.platform() === 'linux') ? contentImage : undefined
        }, this.options));
    }
};

WebpackNotifierPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', this.compilationDone.bind(this));
};
