export const MAX_ALLOWED_VALUE = 10;

export default class Model {
    validate(input) {
        console.log(input <= MAX_ALLOWED_VALUE, input > 0, input);
        // This would normally be checked by HTML input attributes, but for the sake of testing.
        if(!(input <= MAX_ALLOWED_VALUE && input > 0))
            throw new Error('Wrong input.');
    }

    sumbit(data) {
        // Submit code etc
    }
}