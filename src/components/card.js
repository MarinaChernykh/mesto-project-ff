import { openPopup } from "./modal.js";
import { addLike, removeLike } from "./api.js";


// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Cозданиe карточки
export function renderNewCard(card, deleteCard, likeCard, zoomInImage, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const placeLikeElement = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.setAttribute('id', card._id);
  cardElement.querySelector('.card__title').textContent = card.name;

  if (isLikedByCurrentUser(card, userId)) {
    placeLikeElement.classList.add('card__like-button_is-active');
  };
  countLikes(cardElement, card);

  if (userId == card.owner._id) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', deleteCard);
  }

  placeLikeElement.addEventListener('click', likeCard);
  cardImage.addEventListener('click', zoomInImage);
  return cardElement;
}

// Удалениe карточки
export function deleteCard(evt) {
  const eventTarget = evt.target;
  const cardElement = eventTarget.closest('.card');
  const confPopup = document.querySelector('.popup_type_confirm');
  confPopup.setAttribute('cardId', cardElement.getAttribute('id'));
  openPopup(confPopup);
}

// Добавление/ удаление лайков
export function likeCard(evt) {
  const cardElement = evt.target.closest('.card');
  const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? removeLike : addLike;
  likeMethod(cardElement.getAttribute('id')) 
  .then((result) => { 
     countLikes(cardElement, result); 
     evt.target.classList.toggle('card__like-button_is-active'); 
})
.catch(err => console.log(`Ошибка ${err}`));
}

// Отрисовка кол-ва лайков у карточки
function countLikes(cardElement, cardData) {
  const likeCounter = cardElement.querySelector('.card__like-counter');
  likeCounter.textContent = cardData.likes.length;
}

// Проверка, ставил ли текущий пользователь лайк этой карточке
function isLikedByCurrentUser(card, userId) {
  return card.likes.some(like => like._id === userId)
}
