const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  if (query.length === 0) {
    searchResults.style.display = 'none'; // Hide dropdown if query is empty
    return;
  }

  fetch(`/autocomplete?query=${query}`)
    .then(response => response.json())
    .then(data => {
      searchResults.innerHTML = '';
      if (data.length > 0) {
        searchResults.style.display = 'block'; // Show dropdown if there are results
        data.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          searchResults.appendChild(li);
        });
      } else {
        searchResults.style.display = 'none'; // Hide dropdown if there are no results
      }
    })
    .catch(error => {
      console.error('Error fetching autocomplete data:', error);
    });
});

searchResults.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    searchInput.value = event.target.textContent;
    searchResults.style.display = 'none'; // Hide dropdown after selecting an item
  }
});