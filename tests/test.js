(function(base32) {
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
    'JA======',
    'JBSQ====',
    'JBSWY===',
    'JBSWY3A=',
    'JBSWY3DP',
    'JVQW4IDJOMQGI2LTORUW4Z3VNFZWQZLEFQQG433UEBXW43DZEBRHSIDINFZSA4TFMFZW63RMEBRHK5BAMJ4SA5DINFZSA43JNZTXK3DBOIQHAYLTONUW63RAMZZG63JAN52GQZLSEBQW42LNMFWHGLBAO5UGSY3IEBUXGIDBEBWHK43UEBXWMIDUNBSSA3LJNZSCYIDUNBQXIIDCPEQGCIDQMVZHGZLWMVZGC3TDMUQG6ZRAMRSWY2LHNB2CA2LOEB2GQZJAMNXW45DJNZ2WKZBAMFXGIIDJNZSGKZTBORUWOYLCNRSSAZ3FNZSXEYLUNFXW4IDPMYQGW3TPO5WGKZDHMUWCAZLYMNSWKZDTEB2GQZJAONUG64TUEB3GK2DFNVSW4Y3FEBXWMIDBNZ4SAY3BOJXGC3BAOBWGKYLTOVZGKLQ=',
    'IJQXGZJWGQQGS4ZAMEQGO4TPOVYCA33GEBZWS3LJNRQXEIDCNFXGC4TZFV2G6LLUMV4HIIDFNZRW6ZDJNZTSA43DNBSW2ZLTEB2GQYLUEBZGK4DSMVZWK3TUEBRGS3TBOJ4SAZDBORQSA2LOEBQW4ICBKNBUSSJAON2HE2LOM4QGM33SNVQXIIDCPEQHI4TBNZZWYYLUNFXGOIDJOQQGS3TUN4QGCIDSMFSGS6BNGY2CA4TFOBZGK43FNZ2GC5DJN5XC4==='
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
    '4S4K3ZUWQ4======',
    '4S4K3ZUWQ4YQ====',
    '4S4K3ZUWQ4YTE===',
    'MHB2SY3JN4======',
    '6CQJZDQ=',
    'IJQXGZJWGTTJRL7EXCAOPKFO4WP3VZUWXQ3DJZMARPSY7L7FRCL6LDNQ4WWZPZMFQPSL5BXIUGUOPJF24S5IZ2MAWLSYRNXIWOD6NFUZ46NIJ2FBVDT2JOXGS246NM4V'
  ];

  var base32NonUtf8Strs = [
    '7A======',
    '354Q====',
    '5WQIA===',
    '6SIIBAA='
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
            expect(base32.encode([72])).to.be('JA======');
            expect(base32.encode([72, 101])).to.be('JBSQ====');
            expect(base32.encode([72, 101, 108])).to.be('JBSWY===');
            expect(base32.encode([72, 101, 108, 108])).to.be('JBSWY3A=');
            expect(base32.encode([72, 101, 108, 108, 111])).to.be('JBSWY3DP');
          });
        });

        describe('Uint8Array', function() {
          it('should be successful', function() {
            expect(base32.encode(new Uint8Array([72, 101, 108, 108, 111]))).to.be('JBSWY3DP');
          });
        });

        describe('ArrayBuffer', function() {
          it('should be successful', function() {
            expect(base32.encode(new ArrayBuffer(1))).to.be('AA======');
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
      }
    });
  });
})(base32);
