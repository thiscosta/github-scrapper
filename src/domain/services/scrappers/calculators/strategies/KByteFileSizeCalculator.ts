import { CalculationStrategy } from "./CalculationStrategy";

export class KByteFileSizeCalculator implements CalculationStrategy {

    calculate(size: number) {
        return size * 1024;
    }

}