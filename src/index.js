import { compareAsc, format } from 'date-fns';
import './style.css';
// import'./styles.css';
import createTask from './create-task';
import { getTaskHistory, getTaskDateHistory } from './storage';

const newTaskBtn = document.querySelector('.js-new-task-button');
newTaskBtn.addEventListener('click', () => {
  createTask();
});

(function displayInbox() {
  const taskDateHistory = getTaskDateHistory();
  if (getTaskHistory()) {
    // const getTaskDate = (i) => JSON.parse(localStorage.getItem('due-date'))[i];
    // eslint-disable-next-line array-callback-return
    getTaskHistory().map((ele, i) => {
      createTask(ele, taskDateHistory[i]);
      const taskContainer = document.querySelectorAll('.js-task-container');
      taskContainer[i].setAttribute('id', `${i}`);
    });
  }
}());

// function ui() {
//   const navBar = document.querySelector('nav');
//   const overlay = document.querySelector('.overlay');
//   const navIcon = document.querySelector('.menu-icon');

//   navIcon.addEventListener('click', () => {
//     navBar.classList.toggle('open');
//     console.log('test');
//   });

//   overlay.addEventListener('click', () => {
//     navBar.classList.remove('open');
//   })
// }
// ui();
