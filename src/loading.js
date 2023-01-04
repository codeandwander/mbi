export function beginLoadingAnimation() {
  document.getElementById('loading-screen').style.display = 'flex';
  //document.getElementsByTagName('html')[0].style.visibility = 'visible';
}

export function endLoadingAnimation() {
  document.getElementById('loading-screen').style.display = 'none';
  //document.getElementsByTagName('html')[0].style.visibility = 'visible';
}
