export function setUpSearchBar() {
  const searchInput = document.querySelector('.js-search-bar');
  const searchButton = document.querySelector('.js-search-button');

  function search() {
    const searchText = searchInput.value.trim();

    if (searchText === '') {
      window.location.href = 'amazon.html';
    } else {
      window.location.href = `amazon.html?search=${encodeURIComponent(searchText)}`;
    }
  }

  searchButton.addEventListener('click', search);

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      search();
    }
  });
}
