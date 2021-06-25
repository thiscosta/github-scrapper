import { CalculationStrategy } from "./CalculationStrategy";

export class GByteFileSizeCalculator implements CalculationStrategy {

    calculate(size: number) {
        return size * 1024 * 1024 * 1024;
    }

}