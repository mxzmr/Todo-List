// import { compareAsc, format } from 'date-fns';
import './style.css';
import { createTask, checkEmptyTasks } from './create-task';
import { displayInbox, getNextWeekTasks, getTodayTasks } from './display-module';
import { getTaskHistory } from './storage';
import { createProject, checkEmptyProjectNames, displayProjects } from './projects';

const projectHeader = document.querySelector('.project-header');
const newTaskBtn = document.querySelector('.js-new-task-button');
const newProjectBtn = document.querySelector('.js-new-project');
const inbox = document.querySelector('.js-sidebar__inbox');
const todayFilter = document.querySelector('.js-sidebar__today');
const weeklyFilter = document.querySelector('.js-sidebar__seven-days');

inbox.addEventListener('click', () => {
  projectHeader.textContent = 'Inbox';
  newTaskBtn.style.display = 'block';
  displayInbox(getTaskHistory('Inbox'));
});
todayFilter.addEventListener('click', () => {
  displayInbox(getTodayTasks());
  projectHeader.textContent = 'Today';
  newTaskBtn.style.display = 'none';
});
weeklyFilter.addEventListener('click', () => {
  displayInbox(getNextWeekTasks());
  projectHeader.textContent = 'Next 7 Days';
  newTaskBtn.style.display = 'none';
});

newTaskBtn.addEventListener('click', () => {
  if (!checkEmptyTasks()) createTask(projectHeader.textContent);
});
newProjectBtn.addEventListener('click', () => {
  if (!checkEmptyProjectNames()) {
    createProject();
  }
});

displayInbox(getTaskHistory('Inbox'));
displayProjects();
