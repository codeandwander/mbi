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
    if (window.innerWidth <= 991) {
      $('.character-selector-container-mobile').show();
      $('.character-selector-container').hide();
    } else {
      $('.character-selector-container-mobile').hide();
      $('.character-selector-container').show();
    }
  } else {
    $('.nav-login-btn').html('Sign In');
    $('.select-character').hide();
    $('.new-character-button').hide();
    $('.character-selector-container-mobile').hide();
    $('.character-selector-container').hide();
  }
}
