import '../pages/index.css';
import { renderNewCard, deleteCard, likeCard } from './card.js'
import { openPopup, closePopup } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'
import { getUserProfile, getCards, updateUserProfile, createCard, removeCard, updateAvatar } from './api.js'

// DOM узлы
const placesList = document.querySelector('.places__list');

// Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Элементы попапа изменения профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// Элементы попапа создания карточки
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardFormElement = newCardPopup.querySelector('.popup__form');
const placeInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const imageInput = newCardFormElement.querySelector('.popup__input_type_url');

// Элементы попапа с увеличенной фотографией места
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Элементы попапа подтверждения удаления
const confirmationPopup = document.querySelector('.popup_type_confirm');
const confirmationFormElement = confirmationPopup.querySelector('.popup__form');

// Элементы попапа изменения аватарки
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarUpdatePopup = document.querySelector('.popup_type_update-avatar');
const avatarUpdateFormElement = avatarUpdatePopup.querySelector('.popup__form');
const avatarUrlInput = avatarUpdatePopup.querySelector('.popup__input_type_url');

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


// Попап изменения профиля пользователя - открытие
function openEditProfilePopup() {
  openPopup(profilePopup);
  clearValidation(profileFormElement, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Попап изменения профиля пользователя - обработка сохранения формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, profileFormElement);
  updateUserProfile({
    name: nameInput.value,
    about: jobInput.value
  })
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    closePopup(profilePopup);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  })
  .finally(() => {
    renderSaving(false, profileFormElement);
  });
}

// Попап изменения аватара пользователя - открытие
function openAvatarEditPopup() {
  openPopup(avatarUpdatePopup);
  clearValidation(avatarUpdateFormElement, validationConfig);
}

// Попап изменения аватара пользователя - обработка сохранения формы
function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, avatarUpdateFormElement);
  const avatarUrl = avatarUrlInput.value;
  updateAvatar({avatar: avatarUrl})
  .then((result) => {
    avatarUpdateFormElement.reset();
    closePopup(avatarUpdatePopup);
    profileImage.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  })
  .finally(() => {
    renderSaving(false, avatarUpdateFormElement);
  });
}

// Попап создания новой карточки - открытие
function openNewCardPopup() {
  openPopup(newCardPopup);
  clearValidation(newCardFormElement, validationConfig);
}

// Попап создания новой карточки - обработка сохранения формы
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, newCardFormElement);
  createCard({
    name: placeInput.value,
    link: imageInput.value
  })
  .then((result) => {
    const newCardElement = renderNewCard(
      result, deleteCard, likeCard, zoomInImage, result.owner._id
    );
    placesList.prepend(newCardElement);
    newCardFormElement.reset();
    closePopup(newCardPopup);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  })
  .finally(() => {
    renderSaving(false, newCardFormElement);
  });
}

// Увеличение фотографии при клике
function zoomInImage(evt) {
  if (evt.target.classList.contains('card__image')) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imagePopup);
  }
}

// Обработка удаления карточки
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const popupElement = evt.target.closest('.popup');
  const cardId = popupElement.getAttribute('cardId');
  removeCard(cardId)
  .then(() => {
    closePopup(confirmationPopup);
    const cardElement = placesList.querySelector(`[id="${cardId}"]`);
    cardElement.remove();
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });
}

// Обработчики событий
profileEditButton.addEventListener('click', openEditProfilePopup);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardButton.addEventListener('click', openNewCardPopup);
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);
confirmationFormElement.addEventListener('submit', handleDeleteSubmit);
avatarEditButton.addEventListener('click', openAvatarEditPopup);
avatarUpdateFormElement.addEventListener('submit', handleAvatarEditSubmit);

// Загрузка профиля пользователя и карточек
Promise.all([getUserProfile(), getCards()])
  .then(([userData, cardsData]) => {
    renderProfile(userData);
    cardsData.forEach((card) => {
      const cardElement = renderNewCard(card, deleteCard, likeCard, zoomInImage, userData._id);
      placesList.append(cardElement);
    })
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });

// Отрисовка профиля пользователя
function renderProfile(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

// Включение валидации
enableValidation(validationConfig);

// Добавление плавности появления попапов
document.querySelectorAll('.popup').forEach((elem) => {
  elem.classList.add('popup_is-animated');
});

// Изменение текста кнопки в процессе сохранения данных из формы
function renderSaving(isSaving, formElement) {
  const formButton = formElement.querySelector('.button');
  formButton.textContent = isSaving ? 'Сохранение...' : 'Сохранить';
}
