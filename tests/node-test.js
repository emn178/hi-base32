// Node.js env
expect = require('expect.js');
base32 = require('../src/base32.js');
require('./test.js');

delete require.cache[require.resolve('../src/base32.js')];
delete require.cache[require.resolve('./test.js')];
base32 = null;

// Webpack browser env
HI_BASE32_NO_NODE_JS = true;
window = global;
base32 = require('../src/base32.js');
require('./test.js');

delete require.cache[require.resolve('../src/base32.js')];
delete require.cache[require.resolve('./test.js')];
base32 = null;

// browser env
HI_BASE32_NO_NODE_JS = true;
HI_BASE32_NO_COMMON_JS = true;
window = global;
require('../src/base32.js');
require('./test.js');

delete require.cache[require.resolve('../src/base32.js')];
delete require.cache[require.resolve('./test.js')];
base32 = null;

// browser AMD
HI_BASE32_NO_NODE_JS = true;
HI_BASE32_NO_COMMON_JS = true;
window = global;
define = function(func) {
  base32 = func();
  require('./test.js');
};
define.amd = true;

require('../src/base32.js');
