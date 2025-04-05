const Province = require('../province.js');
const sampleProvinceData = require('../data.js');


describe('province', function () {
  it('shortfall', function () {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).toEqual(5);
  });

  it('profit', function () {
    const asia = new Province(sampleProvinceData());
    expect(asia.profit).toEqual(230);
  });
});