expect = require('expect.js');
base32 = require('../src/base32.js');
require('./test.js');

delete require.cache[require.resolve('../src/base32.js')]
delete require.cache[require.resolve('./test.js')]

global.HI_BASE32_TEST = true;
require('../src/base32.js');
require('./test.js');


describe('toUtf8String', function() {
  it('should throw exception', function() {
    expect(function() {
      base32.toUtf8String([0xF8]);
    }).to.throwError();
    expect(function() {
      base32.toUtf8String([0xDF, 0x79]);
    }).to.throwError();
    expect(function() {
      base32.toUtf8String([0xED, 0xA0, 0x80]);
    }).to.throwError();
    expect(function() {
      base32.toUtf8String([0xF4, 0x90, 0x80, 0x80]);
    }).to.throwError();
  });
});
