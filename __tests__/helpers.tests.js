const { format_date, format_plural } = require('../utils/helpers');
// format date
test('checks format_date returns dates as MM/DD/YYYY', () => {
    const date = new Date('April 18, 2002 18:18');

    expect(format_date(date)).toBe('4/18/2002');
});

test('adds s to plural words when value is not 1', () => {
    expect(format_plural('word', 5)).toBe('words');
    expect(format_plural('word', 1)).toBe('word');
    expect(format_plural('word', 0)).toBe('words');
});