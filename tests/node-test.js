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

delete require.cache[require.resolve('../src/base32.js')];
delete require.cache[require.resolve('./test.js')];
base32 = null;
define = undefined;
HI_BASE32_NO_NODE_JS = undefined;
HI_BASE32_NO_COMMON_JS = undefined;

// browser with a process polyfill (e.g. BrowserFS)
window = global;
base32 = require('../src/base32.js');
require('./test.js');

delete require.cache[require.resolve('../src/base32.js')];
delete require.cache[require.resolve('./test.js')];
base32 = null;
window = undefined;

// Electron renderer
process.type = 'renderer';
base32 = require('../src/base32.js');
delete process.type;
require('./test.js');

delete require.cache[require.resolve('../src/base32.js')];
delete require.cache[require.resolve('./test.js')];
base32 = null;

// web worker
HI_BASE32_NO_WINDOW = true;
HI_BASE32_NO_NODE_JS = true;
HI_BASE32_NO_COMMON_JS = true;
window = global;
self = global;
require('../src/base32.js');
require('./test.js');

delete require.cache[require.resolve('../src/base32.js')];
delete require.cache[require.resolve('./test.js')];
HI_BASE32_NO_WINDOW = undefined;
HI_BASE32_NO_NODE_JS = undefined;
HI_BASE32_NO_COMMON_JS = undefined;
window = undefined;
self = undefined;

// environment detection in isolated contexts (no Node.js globals)
describe('environment detection', function () {
  var vm = require('vm');
  var fs = require('fs');
  var path = require('path');
  var source = fs.readFileSync(path.join(__dirname, '../src/base32.js'), 'utf8');

  function run(sandbox) {
    vm.runInContext(source, vm.createContext(sandbox));
    return sandbox.base32;
  }

  function check(base32) {
    expect(base32.encode('Hello')).to.be('JBSWY3DP');
    expect(base32.decode('JBSWY3DP')).to.be('Hello');
    expect(base32.encode('中文')).to.be('4S4K3ZUWQ4======');
  }

  it('should not treat a browser with a process polyfill as Node.js', function () {
    var sandbox = { process: { versions: { node: '18.0.0' }, env: {} } };
    sandbox.window = sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should not treat an Electron renderer as Node.js', function () {
    var sandbox = { process: { type: 'renderer', versions: { node: '20.0.0' } } };
    sandbox.window = sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should encode bytes without ArrayBuffer', function () {
    var base32 = require('../src/base32.js');
    var NativeArrayBuffer = global.ArrayBuffer;
    delete global.ArrayBuffer;
    try {
      expect(base32.encode([72, 101, 108, 108, 111])).to.be('JBSWY3DP');
    } finally {
      global.ArrayBuffer = NativeArrayBuffer;
    }
  });

  it('should expose to the global scope in a web worker', function () {
    var sandbox = {};
    sandbox.self = sandbox;
    check(run(sandbox));
  });
});
