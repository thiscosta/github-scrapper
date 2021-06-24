import { ByteFileSizeCalculator } from "./ByteFileSizeCalculator";
import { CalculationStrategy } from "./CalculationStrategy";
import { GByteFileSizeCalculator } from "./GByteFileSizeCalculator";
import { KByteFileSizeCalculator } from "./KByteFileSizeCalculator";
import { MByteFileSizeCalculator } from "./MByteFileSizeCalculator";

export class CalculationStrategyBuilder {
    static build(unit: string): CalculationStrategy {
        const strategyByUnit = {
            'Bytes': new ByteFileSizeCalculator(),
            'KB': new KByteFileSizeCalculator(),
            'MB': new MByteFileSizeCalculator(),
            'GB': new GByteFileSizeCalculator()
        }
        return strategyByUnit[unit]
    }
}