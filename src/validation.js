import * as alerts from '../src/alerts.js';

export function validInput(input, minLength, maxLength) {
  let errors = [];

  if (input.length > maxLength || input.length < minLength) {
    errors.push(`Your input must be between ${minLength} and ${maxLength} characters!`);
  }

  if (!/^([a-zA-Z0-9 !,.?]+)$/.test(input)) {
    errors.push('Invalid character detected! Allowed characters: [a-z, 0-9, !,.?]');
  }

  if (!Array.isArray(errors) || !errors.length) {
    return true;
  }

  alerts.displayAlert('error', '', errors);
  return false;
}
