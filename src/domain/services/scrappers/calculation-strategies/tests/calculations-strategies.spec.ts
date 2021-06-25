import { CalculationStrategyBuilder } from "../CalculationStrategyBuilder";

describe('[Calculation strategies]', () => {

    it('should return the right size for bytes calculation', () => {
        expect(CalculationStrategyBuilder.build('Bytes').calculate(100)).toBe(100);
    });

    it('should return the right size for kbytes calculation', () => {
        expect(CalculationStrategyBuilder.build('KB').calculate(2565)).toBe(2626560);
    });

    it('should return the right size for mbytes calculation', () => {
        expect(CalculationStrategyBuilder.build('MB').calculate(300)).toBe(314572800);
    });

    it('should return the right size for gbytes calculation', () => {
        expect(CalculationStrategyBuilder.build('GB').calculate(1)).toBe(1073741824);
    });

});