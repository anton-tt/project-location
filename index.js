/* задаём переменные для обращения к разным popup */
const page = document.querySelector('.page');
const popupEdit = page.querySelector('.popup_edit');
const popupAdd = page.querySelector('.popup_add');
const popupPhoto = page.querySelector('.popup_photo');
/* задаём функции с одним параметром, которые открывают - закрывают popup */ 
function openPopup(popupPlusClass) { 
  popupPlusClass.classList.add('popup_opened');
};
function closePopup(popupPlusClass) { 
  popupPlusClass.classList.remove('popup_opened');
};

/* задаём переменные для обращения к кнопкам edit и add в профиле*/
const profile = page.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonAdd = profile.querySelector('.profile__button-add');

/* задаём переменные, для обращения к значениям имя и профессия в профиле */ 
const profileUserName = profile.querySelector('.profile__user-name');
const profileUserProfession = profile.querySelector('.profile__user-profession');

/* задаём переменные, для обращения к форме и через неё к полям редактирования профиля */
const formUser = document.forms.user;
const userNameForm = formUser.elements.username;
const userProfForm = formUser.elements.userprof;

 /* задаём переменные, для обращения к форме и через неё к полям добавления карточки */
 const formLocation = document.forms.location;
 const locPlaceForm = formLocation.elements.locplace;
 const locLinkForm = formLocation.elements.loclink;

/* задаём переменные для обращения к кнопкам Сохранить-edit и Сохранить-add в popup*/
const popupButtonSaveEdit = popupEdit.querySelector('.popup__button-save_edit');  
const popupButtonSaveAdd = popupAdd.querySelector('.popup__button-save_add');

/* задаём переменные для обращения к "крестикам" в разных popup*/
const popupCloseButtonEdit = popupEdit.querySelector('.popup__close-button_edit');
const popupCloseButtonAdd = popupAdd.querySelector('.popup__close-button_add');
const popupCloseButtonPhoto = popupPhoto.querySelector('.popup__close-button_photo');

/* задаём функцию открытия popup-edit, её срабатывание при клике на кнопку edit в профиле 
и предачу в поля формы edit текущих значений из профиля */
function openPopupEdit() { 
  openPopup(popupEdit);
};
profileButtonEdit.addEventListener('click', function() { 
  userNameForm.value = profileUserName.textContent; 
  userProfForm.value = profileUserProfession.textContent;
  openPopupEdit();  
});

/* задаём функцию открытия popup-add и срабатывание при клике на кнопку add в профиле */
function openPopupAdd() { 
  openPopup(popupAdd);
};
profileButtonAdd.addEventListener('click', openPopupAdd);

/* задаём  функцию открытия popup-photo */
function openPopupPhoto() { 
  openPopup(popupPhoto);
};


/* задаём переменную для обращения к блоку, в который внесём карточки */
const elements = page.querySelector('.elements'); /* секция, в которой будем искать элементы */
const elementsCards = elements.querySelector('.elements__cards');
/* переменные для фото и подписи всплывающего окна с фотографией */
const popupImage = popupPhoto.querySelector('.popup__image');
const popupInscription = popupPhoto.querySelector('.popup__inscription');
/* переменные для формирования карточек */
const cardElementTemplate = page.querySelector('#card-element').content; 
const cardElement = cardElementTemplate.querySelector('.element');
const cardElementName = cardElement.querySelector('.element__card-name');
const cardElementImage = cardElement.querySelector('.element__card-photo');

/* функция с двумя параметрами - имя карточки и ссылка на фото, которая создаёт карточку */  
function createCard(parametrTitlePhoto, parametrImagePhoto) {
  cardElement.cloneNode(true);
  cardElementName.textContent = parametrTitlePhoto;  
  cardElementImage.src = parametrImagePhoto;   
  return cardElement.cloneNode(true);
  };

/* функция с параметром, которая берёт предыдущую функцию и добавляет карточку на страницу,а
через встроенные слушателей событий задаёт карточке дополнительные возможности */
function addCard(parametrCreate) {
  elementsCards.prepend(parametrCreate);
};

/* функция, которая меняет состояние лайка на противоположное */
function changeLike(parametrCardClass) {    
  parametrCardClass.classList.toggle('element__card-like_active');
};

/* функция, которая удаляет карточку */
function deleteCard(parametrCardClass) {    
  parametrCardClass.closest('.element').remove();
};

/* создаём начальные карточки, используя элементы массива как аргументы для функции, создающей карточку,
добавляем карточку на страницу и задаём ей доп.возможности через слушателей событий */
initialCards.forEach((item) => {
    const createCardBasis = createCard(item.name, item.link); 
    addCard(createCardBasis);   
    const cardLike = elements.querySelector('.element__card-like');
    cardLike.addEventListener('click', function() {
      changeLike(cardLike)
    });
    const cardTrash = elements.querySelector('.element__card-trash');
    cardTrash.addEventListener('click', function() {
      deleteCard(cardTrash)
    });
    const cardImage = elements.querySelector('.element__card-photo');
    cardImage.addEventListener('click', function() {
      popupInscription.textContent = item.name;
      popupImage.src = item.link;
      openPopupPhoto();
    });
  });
  

/* задаём функцию закрытия popup-edit */ 
function closePopupEdit() { 
  closePopup(popupEdit);
};

/* задаём функцию, которая заменит значения имени и профессии профиля данными из полей из формы edit */
function editInfoProfile() { 
  profileUserName.textContent = userNameForm.value;
  profileUserProfession.textContent = userProfForm.value;
};

/* задаём действие - при клике на крестик-edit закрывается popup-edit */ 
popupCloseButtonEdit.addEventListener('click', closePopupEdit);

/* задаём функцию, которая будет отправлять данные, введённые пользователем в форму edit, на сервер 
и передавать их в профиль, запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-edit */
function submitEditProfileForm(event) {
  event.preventDefault();
  editInfoProfile();
};
formUser.addEventListener('submit', function() {
  submitEditProfileForm();
});
popupButtonSaveEdit.addEventListener('click', function() {
  submitEditProfileForm();
});


/* задаём функцию закрытия popup-add и срабатывание при клике на крестик-add */  
function closePopupAdd() { 
  closePopup(popupAdd);
};
popupCloseButtonAdd.addEventListener('click', closePopupAdd);

/* задаём функцию, которая будет отправлять данные, введённые пользователем в форму add, на сервер и создавать 
новую карточку c доп.возможностями, запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-add */
function submitAddProfileForm(event) {
  event.preventDefault();
  const createCardNew = createCard(locPlaceForm.value, locLinkForm.value); 
  addCard(createCardNew);
  const cardLike = elements.querySelector('.element__card-like');
  cardLike.addEventListener('click', function() {
    changeLike(cardLike)
  });
  const cardTrash = elements.querySelector('.element__card-trash');
  cardTrash.addEventListener('click', function() {
    deleteCard(cardTrash)
  }); 
  const cardImage = elements.querySelector('.element__card-photo');
  cardImage.addEventListener('click', function() {
    popupInscription.textContent = locPlaceForm.value;
    popupImage.src = locLinkForm.value;
    openPopupPhoto();
  }); 
};

formLocation.addEventListener('submit', function() {
  submitAddProfileForm();
}); 
popupButtonSaveAdd.addEventListener('click', function() {
  submitAddProfileForm();  
});


/* задаём функцию закрытия popup-photo и срабатывание при клике на крестик-photo */ 
function closePopupPhoto() { 
  closePopup(popupPhoto);
};
popupCloseButtonPhoto.addEventListener('click', closePopupPhoto);