// Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.
// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми.
// Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
import throttle from 'lodash.throttle';

const formData = {};
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

// Записуємо значення полей, зберігаємо значення в сторадж
function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Відпрака форми: зупиняємо поведінку за замовчуванням, очищаємо форму, очищаємо localStorage
function onFormSubmit(e) {
  e.preventDafault();
  e.target.reset();
  localStorage.removeItem('feedback-form-state');
}

populateTextarea();
// Перевіряємо сторадж і записуємо в форму, якщо там щось є
function populateTextarea() {
  let savedData = localStorage.getItem('feedback-form-state');
  if (!savedData) return console.log({});
  try {
    savedData = JSON.parse(savedData);
    Object.entries(savedData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  } catch (error) {
    console.log('Не розпарсилось');
  }
  console.log(savedData);
}
