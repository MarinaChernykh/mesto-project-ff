// Открытие попапа
export function openPopup(popup) {
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_is-animated')
  popup.classList.add('popup_is-opened');
}

// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupByEsc);
}

// Закрытие попапа по клику на крестик или оверлей
function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')){
    closePopup(evt.currentTarget);
  }
}

// Закрытие попапа при нажатии Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}
