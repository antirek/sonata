
const helper = require('./../manage/helper');

describe('helper', () => {
  it('check expired device config', (done) => {
    const mac = '00:BB:00:BB:00:BB';
    const result = helper.prepareMAC(mac);
    expect(result).toBe('00bb00bb00bb');
    done();
  });
  it('check expired device config', (done) => {
    const mac = '00AA00AA00AA';
    const result = helper.prepareMAC(mac);
    expect(result).toBe('00aa00aa00aa');
    done();
  });
  it('check expired device config', (done) => {
    const mac = '00AA 00FF 00AA';
    const result = helper.prepareMAC(mac);
    expect(result).toBe('00aa00ff00aa');
    done();
  });
});
