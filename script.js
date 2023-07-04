const newBtn = document.getElementById('newBookmark');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

const addDialog = document.getElementById('addDialog');
const deleteDialog = document.getElementById('deleteDialog');
const bookmarksContainer = document.getElementById('bookmarks');

// check if address is correct
function validateLink(link) {
  if (!link.includes('.')) return;
  if (link.slice(0, 12) === 'https://www.') return link;
  if (link.slice(0, 3) === 'www') return 'https://' + link;
  if (link.slice(0, 1) === '.') return 'https://www' + link;
  return 'https://www.' + link;
};

// flash red border on incorrect input
function flashIncorrectInput(input) {
  input.style.boxShadow = '0 0 0 2px red';
  setTimeout(() => {
    input.style.boxShadow = '';
  }, 500);
}

// create a bookmark
function createBookmark() {
  const title = document.getElementById('title').value;
  const address = validateLink(document.getElementById('address').value);
  const favicon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${address}`;

  let incorrectInput = false;
  if (!address) {
    flashIncorrectInput(document.getElementById('address'));
    incorrectInput = true;
  };
  if (!title) {
    flashIncorrectInput(document.getElementById('title'));
    incorrectInput = true;
  }
  if (incorrectInput) return;
  const bookmark = document.createElement('section');
  bookmark.classList = 'bookmarks__item';
  bookmark.innerHTML = 
  `<button class="bookmarks__item--close" onclick="removeBookmark(this)">
    <i class="fa-regular fa-circle-xmark"></i>
  </button>
  <img class="bookmarks__item--favicon" src="${favicon}" alt="icon">
  <a href="${address}" target="_blank">
    <p class="bookmarks__item--text">${title}</p>
  </a>`;
  bookmarksContainer.appendChild(bookmark);
  cancelBookmark();
};

// enter listener
function enterListener(e) {
  if (e.key === 'Enter') createBookmark()
}

// show new bookmark dialog
function newBookmark() {
  addDialog.showModal();
  window.addEventListener('keydown', enterListener)
};

// hide new bookmark dialog
function cancelBookmark() {
  addDialog.close();
  window.removeEventListener('keydown', enterListener);
};

// show delete bookmark dialog
let selectedBookmark;
function removeBookmark(closeBtn) {
  deleteDialog.showModal()
  selectedBookmark = closeBtn.parentElement;
};

// delete selected bookmark
function confirmDelete() {
  selectedBookmark.remove();
  deleteDialog.close();
};

// hide delete bookmark dialog
function cancelDelete() {
  deleteDialog.close();
  selectedBookmark = null;
}

// event listeners
newBtn.addEventListener('click', newBookmark);
addBtn.addEventListener('click', createBookmark);
cancelBtn.addEventListener('click', cancelBookmark);
noBtn.addEventListener('click', cancelDelete);
yesBtn.addEventListener('click', confirmDelete);