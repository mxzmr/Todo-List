/*
  add task priority indicator  or text to the task and refactor the code separate functions
  from inside create task function
  ********************************
 */

import {
  saveTasksLocalStorage,
  removeTasksLocalStorage,
  changeTaskIdAfterDelete,
  getTaskHistory,
} from './storage';
import { showModal } from './taskModal';

export function selectTaskItem() {
  const taskContainer = document.querySelectorAll('.js-task-container');
  const taskInput = document.querySelectorAll('.js-task-input');
  const taskCheckBox = document.querySelectorAll('.js-task-checkbox');
  const displayDueDate = document.querySelectorAll('.display-task-due-date');
  const editTaskBtn = document.querySelectorAll('.js-edit-task-button');
  const displayTaskDate = document.querySelectorAll('.display-task-due-date');
  const taskText = document.querySelectorAll('.js-task-input');
  return {
    taskContainer,
    taskInput,
    taskCheckBox,
    displayDueDate,
    editTaskBtn,
    displayTaskDate,
    taskText,
  };
}

function createTaskId(taskContainer) {
  if (getTaskHistory()) taskContainer.setAttribute('id', `${getTaskHistory().length}`);
  else taskContainer.setAttribute('id', '0');
}

export function changeTaskStatus(taskStatus, id) {
  // const taskContainer = document.querySelectorAll('.js-task-container');
  // const taskInput = document.querySelectorAll('.js-task-input');
  // const editTaskBtn = document.querySelectorAll('.js-edit-task-button');
  if (taskStatus) {
    selectTaskItem().taskContainer[id].style.opacity = '0.4';
    selectTaskItem().taskInput[id].disabled = true;
    selectTaskItem().editTaskBtn[id].disabled = true;
  } else {
    selectTaskItem().taskContainer[id].style.opacity = '1';
    selectTaskItem().taskInput[id].disabled = false;
    selectTaskItem().editTaskBtn[id].disabled = false;
  }
}

export function createTask(task, taskDescription, date, taskPriority) {
  const content = document.querySelector('#content');
  const addTaskBtn = document.querySelector('.js-new-task-button');
  const taskContainer = document.createElement('div');
  const taskForm = document.createElement('form');
  const taskInput = document.createElement('input');
  const taskCheckBox = document.createElement('input');
  const displayDueDate = document.createElement('span');
  const displayPriority = document.createElement('span');
  const editTaskBtn = document.createElement('button');
  const deleteTaskBtn = document.createElement('button');
  content.appendChild(taskContainer);
  taskContainer.after(addTaskBtn);
  taskContainer.classList.add('js-task-container');
  taskContainer.append(displayPriority, taskForm, displayDueDate, editTaskBtn, deleteTaskBtn);
  taskForm.classList.add('js-task-form');
  taskForm.append(taskInput, taskCheckBox);
  editTaskBtn.classList.add('js-edit-task-button');
  deleteTaskBtn.classList.add('js-delete-task-button');
  taskCheckBox.type = 'checkbox';
  taskCheckBox.classList.add('js-task-checkbox');
  taskInput.classList.add('js-task-input');
  taskInput.type = 'text';
  displayDueDate.classList.add('display-task-due-date');
  displayPriority.classList.add('display-task-priority');
  taskInput.before(taskCheckBox);
  taskInput.focus();
  createTaskId(taskContainer);
  function taskEventHandler(e) {
    e.preventDefault();
    saveTasksLocalStorage(
      taskContainer.id,
      taskInput.value,
      taskDescription,
      date,
      taskPriority,
      taskCheckBox.checked,
    );
    taskInput.blur();
  }
  taskContainer.addEventListener('submit', (e) => taskEventHandler(e));
  taskForm.addEventListener('focusout', (e) => taskEventHandler(e));
  editTaskBtn.addEventListener('click', () => showModal(taskContainer.id));
  deleteTaskBtn.addEventListener('click', () => {
    removeTasksLocalStorage(taskContainer.id, taskContainer);
    changeTaskIdAfterDelete();
  });
  taskCheckBox.addEventListener('change', () => {
    taskEventHandler();
    changeTaskStatus(taskCheckBox.checked, taskContainer.id);
    // console.log(e);
  });
}
