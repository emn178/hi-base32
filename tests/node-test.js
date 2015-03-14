expect = require('expect.js');
base32 = require('../src/base32.js');
require('./test.js');

delete require.cache[require.resolve('../src/base32.js')]
delete require.cache[require.resolve('./test.js')]

global.HI_BASE32_TEST = true;
require('../src/base32.js');
require('./test.js');
