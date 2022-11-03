/* скрываем предустановленные карточки мест */
const elementsHidden = document.querySelectorAll('.element_hidden');
elementsHidden.forEach((item) => {
  item.style.display = "none";
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
 {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

/* переменная и функции открытия - закрытия основы popup, которая далее будет "достроена" */
const popup = document.querySelector('.popup');
function openPopupBase() { 
  popup.classList.add('popup_opened');
};
function closePopup() { 
  popup.classList.remove('popup_opened');
};

/* задаём закрытие при клике по крестику окна popup */
const popupCloseButton = document.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', closePopup); 

/* переменная и функции открытия - закрытия общей части для окон edit и add */
const popupBox = document.querySelector('.popup__box');
function insertPopupBox() {
  popupBox.classList.add('popup__box_insert');
};
function deletePopupBox() {
  popupBox.classList.remove('popup__box_insert');
};

/* переменная и функции открытия - закрытия блока для попапа с фотографмей */
const popupCard = document.querySelector('.popup__card');
function insertPopupCard() {
  popupCard.classList.add('popup__card_insert');
};
function deletePopupCard() {
  popupCard.classList.remove('popup__card_insert');
};

/* функция, которая соберёт и откроет попап с фотографией */
function openPopupCard() {
  deletePopupBox();
  insertPopupCard();
  openPopupBase();
};

/* задаём переменную для обращения к блоку, в который внесём карточки */
const elementsCards = document.querySelector('.elements__cards');
/* переменные для фото и подписи всплывающего окна с фотографией */
const popupPhoto = document.querySelector('.popup__photo');
const popupInscription = document.querySelector('.popup__inscription');
/* объявляем функцию с параметрами, которая создаст начальные и новые карточки */
function addCard(parametrOne, parametrTwo) {
  const cardElementTemplate = document.querySelector('#card-element').content; 
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__card-name').textContent = parametrOne;  
  cardElement.querySelector('.element__card-photo').src = parametrTwo; 
  cardElement.querySelector('.element__card-photo').alt = 'Фотография Места';
  elementsCards.prepend(cardElement);
  /* задаём действия при клике на фото конкретной карточки */ 
  cardElement.querySelector('.element__card-photo').addEventListener('click', function() {
    /* передаём фото и подпись в соответствующие элементы попапа */
    popupInscription.textContent = parametrOne;
    popupPhoto.src = parametrTwo;
    popupPhoto.alt = 'Фотография Места';
    /* достраиваем и открываем попап */
    openPopupCard();
});
/* задаём действия при клике по значку лайка - меняется на противоположный от настоящего состояния */
cardElement.querySelector('.element__card-like').addEventListener('click', function() {
  cardElement.querySelector('.element__card-like').classList.toggle('element__card-like_active');
});
/* задаём действия при клике по значку корзинки - карточка удаляется */
cardElement.querySelector('.element__card-trash').addEventListener('click', function() {
  cardElement.querySelector('.element__card-trash').closest('.element').remove();
});
};

/* создаём начальные карточки, используя элементы массива как аргументы и функцию "сборки" карточки */
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

/* переменные и функции, которые будут в попап вставлять - удалять форму и кнопку "Редактирование профиля" */
const popupUser = document.querySelector('.popup__user');
const popupButtonEdit = document.querySelector('.popup__button-edit');
function insertPopupUser() {
  popupUser.classList.add('popup__user_insert');
  popupButtonEdit.classList.add('popup__button-edit_insert');
};
function deletePopupUser() {
  popupUser.classList.remove('popup__user_insert');
  popupButtonEdit.classList.remove('popup__button-edit_insert');
};

/* задаём переменную, через которую будем выводить заголовок всплывающих окон edit и add */
const popupTitleBox = document.querySelector('.popup__title-box');

/* переменные и функции, которые будут в попап вставлять - удалять форму с кнопкой "Добавить карточку" */
const popupLocation = document.querySelector('.popup__location'); 
const popupButtonAdd = document.querySelector('.popup__button-add');
function insertPopupLocation() {
  popupLocation.classList.add('popup__location_insert');
  popupButtonAdd.classList.add('popup__button-add_insert');
};
function deletePopupLocation() {
  popupLocation.classList.remove('popup__location_insert');
  popupButtonAdd.classList.remove('popup__button-add_insert');
};

/* задаём переменные, для обращения к форме и через неё к полям редактирования профиля */
const formUser = document.forms.user;
const userNameForm = formUser.elements.username;
const userProfForm = formUser.elements.userprof;

/* задаём переменные, для обращения к значениям имя и провессия в профиле */ 
const profileUserName = document.querySelector('.profile__user-name');
const profileUserProfession = document.querySelector('.profile__user-profession');

/* собираем функцию для кнопки Сохранить-edit, которая изменит имя и профессию в профиле и закроет окно */
function saveEdit() {
  profileUserName.textContent = userNameForm.value;
  profileUserProfession.textContent = userProfForm.value;
  closePopup();    
};

/* задаём функцию, которая будет отправлять данные на сервер */
function handleFormSubmit(event) {
  event.preventDefault();
};

/* функция, которая задаёт свойства и действия для окна Редактировать профиль */
function openPopupEdit() { 
  deletePopupCard(); /* удаляем блок-конкурента */
  insertPopupBox(); /* вставляем блок для edit и add*/
  deletePopupLocation(); /* убираем форму-конкурента */
  insertPopupUser(); /* встраиваем форму редактирования*/
  popupTitleBox.textContent = 'Редактировать профиль'; /* заголовок окна */
  openPopupBase(); /* открываем собранный popup */ 
  userNameForm.value = profileUserName.textContent; /* передаём в поля формы текущее имя и профессию пользователя */
  userProfForm.value = profileUserProfession.textContent; 
  popupButtonEdit.addEventListener('submit', handleFormSubmit); /* запускаем отправку данных из формы редактирования через слушателя событий*/
  popupButtonEdit.addEventListener('click', saveEdit); /* при клике на кнопку Сохранить - изменяем данные в профиле, закрываем окно */ 
};

/* при клике кнопки Редактировать профиль  запустится сформированная функция - окно редактирования откроется */ 
const profileButtonEdit = document.querySelector('.profile__button-edit');
profileButtonEdit.addEventListener('click', openPopupEdit); 

/* задаём переменные, для обращения к форме и через неё к полям добавления карточки */
const formLocation = document.forms.location;
const locPlaceForm = formLocation.elements.locplace;
const locLinkForm = formLocation.elements.loclink;

/* собираем функцию для кнопки Сохранить-add, которая создаст карточку и закроет окно */
function saveAdd() {
  addCard(locPlaceForm.value, locLinkForm.value); /* запускаем функцию, создающую новую карточку с аргументами "имя карточки" и "ссылка на картинку", взятыми из соотв. полей */
  closePopup();/* закрываем модальное окно */
}

/* функция, которая задаёт свойства и действия для окна Добавить карточку */
function openPopupAdd() {
deletePopupCard(); /* удаляем блок-конкурента */
insertPopupBox(); /* вставляем блок для edit и add*/
deletePopupUser(); /* убираем форму-конкурента */
insertPopupLocation(); /* встраиваем форму редактирования*/
popupTitleBox.textContent = 'Новое место'; /* заголовок окна */
locPlaceForm.value = 'Название места'; /* задаём неактивным полям формы постоянные значения */
locLinkForm.value = 'Ссылка на картинку'; 
openPopupBase(); /* открываем собранный popup */
popupButtonAdd.addEventListener('submit', handleFormSubmit); /* запускаем отправку данных из формы добавления */
popupButtonAdd.addEventListener('click', saveAdd); /* при клике на кнопку Сохранить - создаём новую карточку и закрываем окно */
};

/* при клике кнопки "с плюсом"  в профиле  запустится сформированная функция - окно добавления откроется */ 
const profileButtonAdd = document.querySelector('.profile__button-add');
profileButtonAdd.addEventListener('click', openPopupAdd);

/* создаём функцию, которая при нажатии кнопки enter сделает новую карточку? и передаём её на обработчиков событий соотв. полей формы */
function addCardEnter(parametrEnter) {
  if (parametrEnter.keyCode === 13)  {
    saveAdd(); 
  };
}
locPlaceForm.addEventListener('keyup', addCardEnter);
locLinkForm.addEventListener('keyup', addCardEnter);