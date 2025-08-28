// Giới hạn phim mỗi trang
const pageSize = 12; 
let currentPage = 1;
let filteredMovies = movies;

// Hiển thị danh sách phim
function renderMovies() {
  const list = document.getElementById('movie-list');
  list.innerHTML = '';
// Đảm bảo grid 4 cột
  list.style.display = 'grid';
  list.style.gridTemplateColumns = 'repeat(4, 1fr)';
  list.style.gap = '28px';

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  filteredMovies.slice(start, end).forEach(movie => {
    const div = document.createElement('div');
    div.className = 'movie';
    div.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}" />
      <div class="movie-title">${movie.title}</div>
      <div class="movie-genre">${movie.genre}</div>
    `;
    // Chuyển hướng sang trang chi tiết phim
    div.onclick = () => {
      const movieIndex = movies.indexOf(movie);
      // Lưu dữ liệu phim vào localStorage để movie.html lấy ra
      localStorage.setItem('selectedMovie', JSON.stringify(movie));
      window.location.href = `movie.html?id=${movieIndex}`;
    };
    list.appendChild(div);
  });
  document.getElementById('page-info').textContent = `${currentPage} / ${Math.max(1, Math.ceil(filteredMovies.length / pageSize))}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === Math.ceil(filteredMovies.length / pageSize);
}

// Phân trang
document.getElementById('prev-page').onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderMovies();
  }
};
document.getElementById('next-page').onclick = () => {
  if (currentPage < Math.ceil(filteredMovies.length / pageSize)) {
    currentPage++;
    renderMovies();
  }
};

// Loading indicator
function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'flex' : 'none';
}

// Tìm kiếm và lọc thể loại
document.getElementById('search').oninput = function() {
  filterMovies();
};
document.getElementById('genre-filter').onchange = function() {
  filterMovies();
};

function filterMovies() {
  const searchValue = document.getElementById('search').value.toLowerCase();
  const genreValue = document.getElementById('genre-filter').value;
  filteredMovies = movies.filter(movie => {
    const matchTitle = movie.title.toLowerCase().includes(searchValue);
    const matchGenre = !genreValue || movie.genre.includes(genreValue);
    return matchTitle && matchGenre;
  });
  currentPage = 1;
  renderMovies();
}

// Khởi tạo
window.onload = function() {
  showLoading(true);
  setTimeout(() => {
    renderMovies();
    showLoading(false);
  }, 400); 
};