const fs = require("fs");
const assert = require("assert");
const ChargingStationSource = require("./index");

describe("ChargingStationSource", function() {

  it("fetch data", (done) => {
    const source = new ChargingStationSource(null, () => {});
    assert.ok(source);

    // request tile in Herrenberg
    source.getTile(17, 68762, 45237, (err, response) => {
      assert.ok(response.length > 100);
      assert.ok(response);

      // request another tile
      // should come from the cache
      source.getTile(17, 68762, 45237, (err, response) => {
        assert.ok(response.length > 100);
        assert.ok(response);
        assert.ok(source.cache.has(source.cacheKey));
        done();
      })

    })
  });
});
