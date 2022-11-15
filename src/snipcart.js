export function getUserEmail() {
  let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

  return userSignedIn ? Snipcart.store.getState().customer.email : '';
}

// Toggle UI elements based on user auth status
export function toggleUiElements() {
  let userSignedIn = Snipcart.store.getState().customer.status === 'SignedIn';

  if (userSignedIn) {
    $('.nav-login-btn').html('Profile');
    $('.select-character').show();
    $('.new-character-button').show();
    $('.character-selector-mobile-controls').show();
    $('.character-selector-container').show();
  } else {
    $('.nav-login-btn').html('Sign In');
    $('.select-character').hide();
    $('.new-character-button').hide();
    $('.character-selector-mobile-controls').hide();
    $('.character-selector-container').hide();
  }
}
