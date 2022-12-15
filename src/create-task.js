import {
  saveTasksLocalStorage,
  removeTasksLocalStorage,
  changeTaskIdAfterDelete,
  getTaskHistory,
} from './storage';

export default function createTask(task, date) {
  const content = document.querySelector('#content');
  const addTaskBtn = document.querySelector('.js-new-task-button');
  const taskForm = document.createElement('form');
  const taskText = document.createElement('input');
  const taskCheckBox = document.createElement('input');
  const dueDate = document.createElement('input');
  const deleteTaskBtn = document.createElement('button');
  const taskContainer = document.createElement('div');
  content.appendChild(taskContainer);
  taskContainer.after(addTaskBtn);
  taskContainer.classList.add('js-task-container');
  taskContainer.append(taskForm, deleteTaskBtn);
  taskForm.classList.add('js-task-form');
  taskForm.append(taskText, dueDate, taskCheckBox);
  deleteTaskBtn.classList.add('js-delete-task-button');
  deleteTaskBtn.textContent = 'X';
  taskCheckBox.type = 'checkbox';
  taskCheckBox.classList.add('js-task-checkbox');
  dueDate.type = 'date';
  dueDate.classList.add('js-task-date');
  dueDate.value = date;
  taskText.classList.add('js-task-input');
  taskText.type = 'text';
  taskText.value = getTaskHistory() ? task || '' : '';
  taskText.before(taskCheckBox);
  if (!taskText.value) taskText.focus();

  // setting up an id for each task. if it's the first task id is 0
  if (getTaskHistory()) taskContainer.setAttribute('id', `${getTaskHistory().length}`);
  else taskContainer.setAttribute('id', '0');
  function createTaskEventHandler() {
    saveTasksLocalStorage(taskText.value, dueDate.value, taskContainer.id);
    taskText.blur();
  }
  taskContainer.addEventListener('submit', (e) => {
    e.preventDefault(() => taskForm.submit());
    createTaskEventHandler();
  });
  taskForm.addEventListener('focusout', (e) => {
    e.preventDefault(() => taskForm.submit());
    createTaskEventHandler();
  });
  deleteTaskBtn.addEventListener('click', () => {
    removeTasksLocalStorage(taskContainer.id, taskContainer);
    changeTaskIdAfterDelete();
  });
  taskContainer.addEventListener('change', (e) => {
    e.preventDefault(() => taskForm.submit());
    if (e.target.checked) {
      taskContainer.style.opacity = '0.4';
      taskText.readOnly = true;
      dueDate.readOnly = true;
    } else {
      taskContainer.style.opacity = '1';
      taskText.readOnly = false;
      dueDate.readOnly = false;
    }
  });
}
