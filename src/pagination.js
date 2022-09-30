// Get the item count
var blackHairList;
var blondeHairList;
var brownHairList;
var numberOfItems;
var numberPerPage = 9;
var indexOfSelectedItem;
window.currentPage = 1;
window.numberOfPages;

function getElements() {
  blackHairList = document.querySelectorAll('.hair-collection-wrapper.black .hair-style-container');

  // eslint-disable-next-line prettier/prettier
  blondeHairList = document.querySelectorAll(
    '.hair-collection-wrapper.blonde .hair-style-container'
  );

  brownHairList = document.querySelectorAll('.hair-collection-wrapper.brown .hair-style-container');

  numberOfItems = blackHairList.length;
  window.numberOfPages = Math.ceil(numberOfItems / numberPerPage);
}

function getPageOfSelectedItem() {
  blackHairList.forEach((item, index) => {
    if (item.querySelector('input[name="hair-style"]').checked) {
      indexOfSelectedItem = index;
    }
  });

  window.currentPage = Math.ceil(indexOfSelectedItem / 9);
}

export function buildPage(currPage) {
  getElements();
  // Used to determine if pagination buttons are selecting currentPage
  currPage ? '' : getPageOfSelectedItem();

  const trimStart = (window.currentPage - 1) * numberPerPage;
  const trimEnd = trimStart + numberPerPage;

  var blackElems = Array.prototype.slice.call(blackHairList, trimStart, trimEnd);
  var blondeElems = Array.prototype.slice.call(blondeHairList, trimStart, trimEnd);
  var brownElems = Array.prototype.slice.call(brownHairList, trimStart, trimEnd);

  function showElements(array) {
    [].forEach.call(array, function (item) {
      item.style.display = 'block';
    });
  }

  function hideElements(array) {
    [].forEach.call(array, function (item) {
      item.style.display = 'none';
    });
  }

  // hide all
  hideElements(blackHairList);
  hideElements(blondeHairList);
  hideElements(brownHairList);
  showElements(blackElems);
  showElements(blondeElems);
  showElements(brownElems);
}
