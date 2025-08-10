// Dữ liệu mẫu phim
const movies = [
  {
    title: "Sự im lặng của bầy cừu",
    genre: ["Hành động", "Kinh dị"],
    img: "https://i.pinimg.com/736x/58/60/3d/58603dcfa57853b22b8b60b12d3b7dbc.jpg",
    desc: "Bộ phim nói về một đàn cừu sống trong một ngôi nhà rộng lớn cùng người chủ và chú chó chăn cừu",
    video: "https://www.youtube.com/embed/jaFkcu19HnE?si=rLAUNjkCypg7ClD4&rel=0",
  },
  {
    title: "Quá khứ của kẻ phản diện",
    genre: ["Hành động", "Hài hước"],
    img: "https://api.memechua.com/upload/memes/jack-5-cu-khoc-meme.jpg",
    desc: "Bộ phim nói về những người bạn với nhau, cùng nhau trải qua đắng cay ngọt bùi",
    video: "videos/video1.mp4",
  },
  {
    title: "Skibidi tolet",
    genre: ["Kinh dị"],
    img: "https://static.tvtropes.org/pmwiki/pub/images/skibidi_toilets.png",
    desc: "Bộ phim nói về một đàn cừu sống trong một ngôi nhà rộng lớn cùng người chủ và chú chó chăn cừu",
    video: "videos/video2.mp4",
  },
  {
    title: "Tình yêu fi5",
    genre: ["Tình cảm", "Hài hước"],
    img: "https://dbk.vn/uploads/ckfinder/images/tranh-anh/anh-free-fire-9.jpg",
    desc: "Bộ phim nói về tình cảm giữa những người chơi, họ gặp nhau trong game free fire và sau một thời gian họ nảy sinh tình cảm với nhau. Cứ như vậy họ trở thành một cặp",
    video: "https://disk.yandex.com/i/3U1wi8ALpFQY8g",
  },

];
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
    const matchGenre = !genreValue || movie.genre === genreValue;
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