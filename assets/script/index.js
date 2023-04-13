'use strict';

//Open Menu
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.addEventListener('click', function() {
    dropDownMenu.classList.toggle('start');
    const OPEN = dropDownMenu.classList.contains('start');

    toggleBtnIcon.classList = OPEN
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
})

// Utility Functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function create(element, parent = document) {
    return parent.createElement(element);
}

// Classes
class User {

    #id;
    #name;
    #userName;
    #email

    constructor (id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get userName(){
        return this.#userName;
    }

    get email(){
        return this.#email
    }

    getInfo() {
        return [
          this.#id,
          this.#name,
          this.#userName,
          this.#email,
        ]
    }
}


class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor (id, name, userName, email, pages, groups, canMonetize) {
      super(id, name, userName, email);
      this.#pages = pages;
      this.#groups = groups;
      this.#canMonetize = canMonetize;
    }

    get pages() {
        return this.#pages
    }

    get groups(){
        return this.#groups
    }

    get canMonetize() {
        return this.#canMonetize
    }

    getInfo() {
        return  `Pages: ${this.pages}\nGroups: ${this.groups}\nMonetized: ${this.canMonetize}\n`;
    }
}


// Variables
const text = select('textarea');
const postBtn = select('.post-btn');
const file = document.getElementById('file-read');
const div = select('.fb');
const me = new Subscriber
    ( 12345, 'Shiyu Li', 'Shiyu', 'shiyuli@email.com', 'FakeBook', 'MITT Student', true);
const avatarURL = 'url(../assets/img/self.jpg)';
const message = select('.message');
// Post Content
onEvent('click', postBtn, () => {
    if (isValid()) {
      createPost();
      clearForm();
    }
});

function isValid() {
    return (text.value.trim() !== '' || file.value !== '')
}

function clearForm() {
    text.value = '';
    file.value = ''; 
    message.innerText = '';
}
  
function createPost() {
    const newPost = newPostTemplate();
    const postContent = createPostContent();
    const newTime = getTime();
    postContent.append(newTime);
    newPost.append(postContent);
  
    newPost.classList.add('post');
    addPostToDiv(newPost);
}

function newPostTemplate() {
    const newPost = create('div');
    const today = new Date();
    let img = select('.pix').innerHTML;

    newPost.innerHTML = 
    `
    <div class='content-header'>
        ${img}
        <h2>${me.userName}</h2>
        <p>${today.toDateString()}</p>
    </div>
    `;
    return newPost
}

function createPostContent() {
    const postContent = create('div');
    const postText = create('p');
    const postImg = create('figure');
  
    getImgData(postImg);
    postContent.classList.add('content');
    postText.innerText = text.value.trim();
    postContent.append(postText, postImg);
  
    return postContent
}

function addPostToDiv(newPost) {
    div.prepend(newPost);
}

function getImgData(postImg) {
    const files = file.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        postImg.innerHTML = `<img src='${this.result}'>`;
      });    
    }
  }
  
function getTime() {
    const Time = create('div');
    let currentTime = new Date();
    let currentHours = currentTime.getHours().toString();
    let currentMinutes = currentTime.getMinutes().toString().padStart('2', 0)
    let ampm = currentHours >= 12 ? 'pm' : 'am';
    Time.innerHTML = 
    `<h4>${currentHours}: ${currentMinutes} ${ampm}</h4>`;
    return Time;
}
document.getElementById('file-read').onchange = function() {
    message.innerText = `${document.getElementById('file-read').files[0].name}`
}


// modal
const profile = select('.profile');
const detail = select('.detail');
const pic = select('.pic');
function getUserInfo() {
    profile.innerText = `#${me.id}\n${me.userName}\n${me.email}`;
}
function getUserDetail() {
    detail.innerText = `${me.getInfo()}`;
}
function menuToggle() {
    const toggleMenu = select('.menu');

    /*if (toggleMenu.style.visibility == 'hidden') {
        toggleMenu.style.visibility = 'visible';
    } else {
        toggleMenu.style.visibility = 'hidden';
    }*/
    toggleMenu.classList.toggle('active');
    getUserInfo();
    getUserDetail();
}