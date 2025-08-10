window.onload = function() {
  const movie = JSON.parse(localStorage.getItem('selectedMovie'));
  if (!movie) {
    document.getElementById('movie-detail').innerHTML = "<p>Không tìm thấy phim!</p>";
    document.getElementById('movie-player').style.display = "none";
    return;
  }
  document.getElementById('detail-img').src = movie.img;
  document.getElementById('detail-title').textContent = movie.title;
  document.getElementById('detail-genre').textContent = "Thể loại: " + movie.genre.join(', ');
  document.getElementById('detail-desc').textContent = movie.desc;

  const showBtn = document.getElementById('show-video-btn');
  const videoContainer = document.getElementById('video-container');

  showBtn.onclick = function() {
    const url = movie.video;

    // Nếu là mp4 trực tiếp
    if (url && url.endsWith('.mp4')) {
      videoContainer.innerHTML = `
        <video width="560" height="315" controls>
          <source src="${url}" type="video/mp4">
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      `;
      videoContainer.style.display = "block";
      showBtn.style.display = "none";
      return;
    }

    // Nếu không phải mp4
    videoContainer.innerHTML = "<p>Không có video</p>";
    videoContainer.style.display = "block";
    showBtn.style.display = "none";
  };
};