import { CalculationStrategy } from "./CalculationStrategy";

export class ByteFileSizeCalculator implements CalculationStrategy {

    calculate(size: number) {
        return size;
    }

}