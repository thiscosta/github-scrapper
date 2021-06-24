import { CalculationStrategy } from "./CalculationStrategy";

export class MByteFileSizeCalculator implements CalculationStrategy {

    calculate(size: number) {
        return size * 1024 * 1024;
    }

}