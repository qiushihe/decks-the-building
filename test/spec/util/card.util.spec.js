import { parseCardLine } from "/src/util/card.util";

describe("util / card.util", () => {
  describe("parseCardLine", () => {
    it("should parse card with name only", () => {
      const { name } = parseCardLine("Foe Reaper 4000");
      expect(name).to.eq("Foe Reaper 4000");
    });

    it("should parse card with quantity without suffix", () => {
      const { quantity, name } = parseCardLine("1 Foe Reaper 4000");
      expect(quantity).to.eq("1");
      expect(name).to.eq("Foe Reaper 4000");
    });

    it("should parse card with quantity with suffix", () => {
      const { quantity, name } = parseCardLine("2x Foe Reaper 4000");
      expect(quantity).to.eq("2");
      expect(name).to.eq("Foe Reaper 4000");
    });

    it("should parse card with quantity with space before suffix", () => {
      const { quantity, name } = parseCardLine("3 x Foe Reaper 4000");
      expect(quantity).to.eq("3");
      expect(name).to.eq("Foe Reaper 4000");
    });

    it("should parse card with set", () => {
      const { name, set } = parseCardLine("Foe Reaper 4000 (GVG)");
      expect(name).to.eq("Foe Reaper 4000");
      expect(set).to.eq("GVG");
    });

    it("should parse card with set and collector number", () => {
      const { name, set, collectorNumber } = parseCardLine(
        "Foe Reaper 4000 (GVG) 123"
      );
      expect(name).to.eq("Foe Reaper 4000");
      expect(set).to.eq("GVG");
      expect(collectorNumber).to.eq("123");
    });

    it("should parse card with quantity and set", () => {
      const { quantity, name, set } = parseCardLine("1 Foe Reaper 4000 (GVG)");
      expect(quantity).to.eq("1");
      expect(name).to.eq("Foe Reaper 4000");
      expect(set).to.eq("GVG");
    });

    it("should parse card with quantity, set and collector number", () => {
      const { quantity, name, set, collectorNumber } = parseCardLine(
        "2 - Foe Reaper 4000 (GVG) 123"
      );
      expect(quantity).to.eq("2");
      expect(name).to.eq("Foe Reaper 4000");
      expect(set).to.eq("GVG");
      expect(collectorNumber).to.eq("123");
    });
  });
});
