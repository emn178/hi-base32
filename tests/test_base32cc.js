const base32 = require('../src/base32cc.js');
const sha256 = require('js-sha256');
const expect = require('expect.js');

(function() {
  var strs = [
    'H',
    'He',
    'Hel',
    'Hell',
    'Hello',
    'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.',
    'Base64 is a group of similar binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation.'
  ];

  var base32Strs = [
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ];

  var utf8Str = [
    '中文',
    '中文1',
    '中文12',
    'aécio',
    '𠜎',
    'Base64是一種基於64個可列印字元來表示二進制資料的表示方法'
  ];

  var base32Utf8Strs = [
    '',
    '',
    '',
    '',
    '',
    ''
  ];

  var base32NonUtf8Strs = [
    '',
    '',
    '',
    ''
  ];

  var base32Invalid8Strs = [
    '1 DDDDDD'
  ];

  describe('base32', function() {
    describe('encode', function() {
      describe('ascii', function() {
        it('should be successful', function() {
          for(var i = 0;i < strs.length;++i) {
            expect(base32.encode(strs[i], true)).to.be(base32Strs[i]);
          }
        });
      });

      describe('UTF8', function() {
        it('should be successful', function() {
          for(var i = 0;i < utf8Str.length;++i) {
            expect(base32.encode(utf8Str[i])).to.be(base32Utf8Strs[i]);
          }
        });
      });

      describe('Array', function() {
        describe('Array', function() {
          it('should be successful', function() {
            expect(base32.encode([72])).to.be('');
            expect(base32.encode([72, 101])).to.be('');
            expect(base32.encode([72, 101, 108])).to.be('');
            expect(base32.encode([72, 101, 108, 108])).to.be('');
            expect(base32.encode([72, 101, 108, 108, 111])).to.be('');
          });
        });

        describe('Uint8Array', function() {
          it('should be successful', function() {
            expect(base32.encode(new Uint8Array([72, 101, 108, 108, 111]))).to.be('');
          });
        });

        describe('ArrayBuffer', function() {
          it('should be successful', function() {
            expect(base32.encode(new ArrayBuffer(1))).to.be('');
          });
        });
      });
    });

    describe('decode', function() {
      describe('ascii', function() {
        it('should be successful', function() {
          for(var i = 0;i < strs.length;++i) {
            expect(base32.decode(base32Strs[i])).to.be(strs[i]);
            expect(base32.decode(base32Strs[i], true)).to.be(strs[i]);
          }
        });
      });

      describe('UTF8', function() {
        it('should be successful', function() {
          for(var i = 0;i < utf8Str.length;++i) {
            expect(base32.decode(base32Utf8Strs[i])).to.be(utf8Str[i]);
          }
        });
      });

      if (typeof HI_BASE32_NO_NODE_JS !== 'undefined') {
        context('when non-UTF8 as UTF8', function () {
          for (var i = 0; i < base32NonUtf8Strs.length; ++i) {
            (function (i) {
              it('should throw exception', function () {
                expect(function () {
                  base32.decode(base32NonUtf8Strs[i]);
                }).to.throwError();
              });
            })(i);
          }
        });

        context('when invalid string', function () {
          for (var i = 0; i < base32Invalid8Strs.length; ++i) {
            (function (i) {
              it('should throw exception', function () {
                expect(function () {
                  base32.decode(base32Invalid8Strs[i], true);
                }).to.throwError();
              });
              it('should throw exception', function () {
                expect(function () {
                  base32.decode.asBytes(base32Invalid8Strs[i]);
                }).to.throwError();
              });
            })(i);
          }
        });
      }
    });
  });
})();
