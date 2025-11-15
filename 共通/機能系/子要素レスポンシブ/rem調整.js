function adjustLayout() {
  const video = document.querySelector('.movie_content');
  const featureMovie = document.querySelector('.feature_movie');
  const main = document.querySelector('.main');

  if (!video || !featureMovie || !main) return;

  const videoWidth = video.getBoundingClientRect().width;
  const containerWidth = featureMovie.getBoundingClientRect().width;

  if (videoWidth < containerWidth) {
    main.style.width = `${videoWidth}px`;
    const newFontSize = (10 * (videoWidth / 1400)).toFixed(2);
    document.documentElement.style.fontSize = `${newFontSize}px`;
  } else {
    main.style.width = '';
    document.documentElement.style.fontSize = '';
  }
}

window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);
