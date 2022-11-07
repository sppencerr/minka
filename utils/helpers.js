module.exports = {
    // make dates actually readable :D
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    // pluralize words when pluralization is needed
    format_plural: (word, count) => {
        if (count === 1) {
            return `${word}`;
        } else {
            return `${word}s`;
        }
    }
}