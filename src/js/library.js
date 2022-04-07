import compiledTemplateLibrary from '../markup/header-library.hbs';
import { onHome } from './home';

const body = document.querySelector('body');

export default function onLibrary() {
  body.innerHTML = '';
  body.insertAdjacentHTML('beforeend', compiledTemplateLibrary());
}

body.addEventListener('click', onClickBtn);

function onClickBtn() {
  const refs = {
    logo: document.querySelector('#button__logo'),
    home: document.querySelector('#button__home'),
    library: document.querySelector('#button__library'),
  };
  if (event.target === refs.library) {
    onLibrary();
  }
  if (event.target === refs.home) {
    onHome();
  }
}
