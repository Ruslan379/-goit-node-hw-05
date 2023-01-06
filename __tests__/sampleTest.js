// const { italic } = require("colors");

const addTwoNumbers = (a, b) => {
    return a + b;
}

//! Test suite (Набор тестов)
describe('Additional service test', () => {
    //! Один Unit-Test
    it("Add two valid numbers", () => {
        const firstNumber = 1;
        const secondNumber = 1;
        const addTwoNumbersReult = addTwoNumbers(firstNumber, secondNumber);
        expect(addTwoNumbersReult).toEqual(firstNumber + secondNumber);
    })
});