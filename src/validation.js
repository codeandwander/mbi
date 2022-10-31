import * as alerts from '../src/alerts.js';

export function validInput(input, minLength, maxLength) {
  let errors = [];

  if (input.length > maxLength || input.length < minLength) {
    errors.push(`Your input must be between ${minLength} and ${maxLength} characters!`);
  }

  if (!/[A-Za-z0-9]+!\.,/.test(testString)) {
    errors.push('Invalid character detected! Allowed characters: [a-z, 0-9, !,.]');
  }

  if (errors) {
    alerts.displayAlert(error, '', errors);
    return false;
  }

  return true;
}
