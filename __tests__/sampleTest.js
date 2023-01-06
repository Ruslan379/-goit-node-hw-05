// const { italic } = require("colors");

const addTwoNumbers = (a, b) => {
    return a + b;
}

//! Test suite (Набор тестов)
describe('Additional service test', () => {
    //! Первый Unit-Test case
    it("1.Add two valid numbers", () => {
        const firstNumber = 1;
        const secondNumber = 1;
        const addTwoNumbersReult = addTwoNumbers(firstNumber, secondNumber);
        expect(addTwoNumbersReult).toEqual(firstNumber + secondNumber);
    });
    //! Второй Unit-Test case
    it("2.Add two valid numbers", () => {
        const firstNumber = -10;
        const secondNumber = 1;
        const addTwoNumbersReult = addTwoNumbers(firstNumber, secondNumber);
        expect(addTwoNumbersReult).toEqual(firstNumber + secondNumber);
    });
});