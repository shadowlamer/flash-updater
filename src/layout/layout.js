const $ = require('jquery');
const fs = require('fs');

require.extensions['.html'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

$('head').html(require("./head.html"));

try { //try to load branded hedader
    $('body').prepend(require("./branding/header.html"));
} catch (e) {
    $('body').prepend(require("./header.html"));
}

try { //try to load branded footer
    $('body').append(require("./branding/footer.html"));
} catch (e) {
    $('body').append(require("./footer.html"));
}
