import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MoviesApiService from './fetch_api';
import movieInfo from '../templates/movie.hbs';

const cardsList = document.querySelector('.cards__list');
const backdrop = document.querySelector('.backdrop');
const closeModalButton = document.querySelector('.button-close');
const query = new MoviesApiService();

cardsList.addEventListener('click', event => {
  renderModal(event);
});

function closeModal(event) {
  backdrop.classList.add('is-hidden');
  closeModalButton.removeEventListener('click', closeModal);
  backdrop.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', event => closeModalEscape(event));
}

function closeModalBackdrop(event) {
  if (event.target.classList.value !== 'backdrop') {
    return;
  }
  closeModal();
}

function closeModalEscape(event) {
  if (event.key !== 'Escape') {
    return;
  }
  closeModal();
}

function openModal(event) {
  closeModalButton.addEventListener('click', closeModal);
  backdrop.addEventListener('click', event => closeModalBackdrop(event));
  document.addEventListener('keydown', event => closeModalEscape(event));
  backdrop.classList.remove('is-hidden');
}

const getApiData = async id => {
  try {
    const response = await query.getFilmDetails(id);
    if (response.status !== 200) {
      Notify.failure('Oops, an error occurred');
      return;
    }
    return response.data;
  } catch (error) {
    Notify.failure('Oops, an error occurred');
  }
};

const renderModal = async event => {
  const cardsId = event.target.closest('li');
  // console.dir(cardsId.id);
  const data = await getApiData(cardsId.id);
  if (data) {
    renderMovieCard(data);
    openModal(event);
  }
};

const renderMovieCard = data => {
  const movieCard = document.querySelector('.movie-card');
  const movie = handleMovieData(data);
  movieCard.innerHTML = movieInfo(movie);
};

function handleMovieData(data) {
  const {
    poster_path: poster,
    original_title,
    title,
    vote_average: vote,
    vote_count: votes,
    popularity,
    genres,
    overview,
  } = data;
  const genresList = Object.values(genres).flatMap(genre => genre.name);
  const movie = { title, original_title, vote, votes, popularity, overview };
  movie.poster = `https://image.tmdb.org/t/p/w500${poster}`;
  movie.genres = genresList.join(', ');
  return movie;
}
