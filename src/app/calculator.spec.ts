import { Calculator } from "./calculator";


describe('Test for calculator', () => {

    it('#multiply should return a nine', () => {
        //AAA
        //Arrange
        //Act
        //Assert


        //Arrange
        const calculator = new Calculator();
        //Act
        const rta = calculator.multiply(3,3);
        //Assert
        expect(rta).toEqual(9);

    });
});