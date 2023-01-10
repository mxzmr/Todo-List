import {
  saveTasksLocalStorage,
  removeTasksLocalStorage,
  updateTaskId,
  getTaskHistory,
} from './storage';
import { showModal } from './taskModal';

export function selectAllTasksItems() {
  const taskContainer = document.querySelectorAll('.js-task-container');
  const taskInput = document.querySelectorAll('.js-task-input');
  const taskCheckBox = document.querySelectorAll('.js-task-checkbox');
  const displayDueDate = document.querySelectorAll('.display-task-due-date');
  const editTaskBtn = document.querySelectorAll('.js-edit-task-button');
  const taskText = document.querySelectorAll('.js-task-input');
  const taskForm = document.querySelectorAll('.js-task-form');
  return {
    taskContainer,
    taskInput,
    taskCheckBox,
    displayDueDate,
    editTaskBtn,
    taskText,
    taskForm,
  };
}

export function checkEmptyTasks() {
  const taskInput = document.querySelectorAll('.js-task-input');
  for (let i = 0; i < taskInput.length; i += 1) {
    if (!taskInput[i].value) return true;
  }
  return false;
}

function createTaskId(taskContainer) {
  if (getTaskHistory()) taskContainer.setAttribute('id', `${getTaskHistory().length}`);
  else taskContainer.setAttribute('id', '0');
}

export function changeTaskStatus(taskStatus, id) {
  const {
    taskContainer,
    taskInput,
    editTaskBtn,
  } = selectAllTasksItems();
  if (taskStatus) {
    taskContainer[id].style.opacity = '0.4';
    taskInput[id].disabled = true;
    editTaskBtn[id].disabled = true;
  } else {
    taskContainer[id].style.opacity = '1';
    taskInput[id].disabled = false;
    editTaskBtn[id].disabled = false;
  }
}

export function renderTask() {
  const taskSection = document.querySelector('.js-task-section');
  const taskContainer = document.createElement('div');
  const taskForm = document.createElement('form');
  const taskInput = document.createElement('input');
  const taskCheckBox = document.createElement('input');
  const displayDueDate = document.createElement('span');
  const displayPriority = document.createElement('span');
  const editTaskBtn = document.createElement('button');
  const deleteTaskBtn = document.createElement('button');
  taskSection.appendChild(taskContainer);
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
  return {
    taskContainer,
    taskInput,
    taskCheckBox,
    displayDueDate,
    editTaskBtn,
    deleteTaskBtn,
    taskForm,
  };
}

/* save new tasks to each project separately */
export function createTask(project) {
  const {
    taskContainer,
    taskInput,
    taskCheckBox,
    displayDueDate,
    editTaskBtn,
    deleteTaskBtn,
    taskForm,
  } = renderTask();
  createTaskId(taskContainer);
  function taskEventHandler(e) {
    e.preventDefault();
    if (taskInput.value) {
      // If task-due-date and task-priority are undefined, assign an empty string to them.
      const dueDate = getTaskHistory()[taskContainer.id] ? getTaskHistory()[taskContainer.id]['task-due-date'] : '';
      const priority = getTaskHistory()[taskContainer.id] ? getTaskHistory()[taskContainer.id]['task-priority'] : '';
      saveTasksLocalStorage({
        project,
        taskId: taskContainer.id,
        taskTitle: taskInput.value,
        taskDescription: '',
        taskDueDate: dueDate,
        taskPriority: priority,
        taskFinished: taskCheckBox.checked,
      });
      taskInput.blur();
    }
  }
  taskContainer.addEventListener('submit', (e) => taskEventHandler(e));
  taskForm.addEventListener('focusout', (e) => taskEventHandler(e));
  editTaskBtn.addEventListener('click', () => showModal(taskContainer.id));
  displayDueDate.addEventListener('click', () => showModal(taskContainer.id));
  deleteTaskBtn.addEventListener('click', () => {
    removeTasksLocalStorage(taskContainer.id, taskContainer);
    updateTaskId();
  });
  taskCheckBox.addEventListener('change', (e) => {
    taskEventHandler(e);
    changeTaskStatus(taskCheckBox.checked, taskContainer.id);
  });
}
