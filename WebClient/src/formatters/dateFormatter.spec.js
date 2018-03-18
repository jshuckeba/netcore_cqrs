import * as formatters from './dateFormatter';

describe('dateFormatter', () => {
    it('should format date', () => {
        const dateToFormat = new Date("03/13/2016 13:00:00");
        const expectedResult = "3/13/2016  1:00 PM";
        const result = formatters.dateFormatter(dateToFormat);
        expect(result).toEqual(expectedResult);
    });
});