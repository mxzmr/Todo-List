import { compareAsc, format } from 'date-fns';
import './style.css';
import { createTask, changeTaskStatus, selectTaskItem } from './create-task';
import { editTask, displayTaskPriority } from './taskModal';
import { getTaskHistory } from './storage';
import { createProject, checkEmptyProjectNames } from './projects';

const newTaskBtn = document.querySelector('.js-new-task-button');
const newProjectBtb = document.querySelector('.js-new-project');
const inbox = document.querySelector('.sidebar__inbox');
const today = document.querySelector('.sidebar__today');
const nextWeekTasks = document.querySelector('.sidebar__seven-days');

function getTodayTasks() {
  const todayDate = new Date().toISOString().slice(0, 10);
  const todayTasks = [];
  // console.log(getTaskHistory('inbox')[0]['task-due-date']);
  for (let i = 0; i < getTaskHistory().length; i += 1) {
    if (todayDate === getTaskHistory('inbox')[i]['task-due-date']) todayTasks.push(getTaskHistory('inbox')[i]);
  }
  console.log(todayTasks);
}

function displayInbox(taskHistory) {
  if (taskHistory) {
    // eslint-disable-next-line array-callback-return
    taskHistory.map((task, id) => {
      createTask(task['task-title'], task['task-description'], task['task-due-date'], task['task-priority'], task['task-finished']);
      selectTaskItem().taskInput[id].value = task['task-title'];
      selectTaskItem().displayDueDate[id].textContent = task['task-due-date'];
      selectTaskItem().taskCheckBox[id].checked = task['task-finished'];
      selectTaskItem().taskContainer[id].setAttribute('id', `${id}`);
      selectTaskItem().taskInput[id].blur();
      displayTaskPriority(task['task-priority'], id);
      changeTaskStatus(task['task-finished'], id);
    });
    editTask();
  }
}displayInbox(getTaskHistory());
// inbox.addEventListener('click', displayTasks);
// nextWeekTasks.addEventListener('click', displayTasks);
today.addEventListener('click', () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const displayTodayTasks = [];
  // console.log(getTaskHistory('inbox')[0]['task-due-date']);
  for (let i = 0; i < getTaskHistory().length; i += 1) {
    if (todayDate === getTaskHistory('inbox')[i]['task-due-date']) displayTodayTasks.push(getTaskHistory('inbox')[i]);
  }
  console.log(displayTodayTasks);
});
newTaskBtn.addEventListener('click', createTask);
newProjectBtb.addEventListener('click', () => {
  createProject();
  checkEmptyProjectNames();
});
