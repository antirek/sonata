
const helper = require('./../manage/helper');

describe('helper', () => {
  describe('mac prepare', () => {
    it('with :', (done) => {
      const mac = '00:BB:00:BB:00:BB';
      const result = helper.prepareMAC(mac);
      expect(result).toBe('00bb00bb00bb');
      done();
    });
    it('on upper case', (done) => {
      const mac = '00AA00AA00AA';
      const result = helper.prepareMAC(mac);
      expect(result).toBe('00aa00aa00aa');
      done();
    });
    it('with whitespaces', (done) => {
      const mac = '00AA 00FF 00AA';
      const result = helper.prepareMAC(mac);
      expect(result).toBe('00aa00ff00aa');
      done();
    });
  });

  describe('extract mac from filename', () => {
    const mac = '00aa00aa00aa';
    it('from cfg{mac}.xml', (done) => {
      const result = helper.getMacFromFile('cfg00AA00AA00AA.xml');
      expect(result).toBe(mac);
      done();
    });
    it('from Config{mac}.cfg', (done) => {
      const result = helper.getMacFromFile('Config00AA00AA00AA.xml');
      expect(result).toBe(mac);
      done();
    });
  });
});
