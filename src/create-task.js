import { saveTasksLocalStorage, removeTasksLocalStorage, changeTaskIdAfterDelete, getTaskHistory } from './storage';

export default function createTask() {
  const content = document.querySelector('#content');
  const addTaskBtn = document.querySelector('.js-new-task-button');
  const taskForm = document.createElement('form');
  const taskText = document.createElement('input');
  const taskCheckBox = document.createElement('input');
  const dueDate = document.createElement('input');
  const deleteTaskBtn = document.createElement('button');
  const taskContainer = document.createElement('div');
  const blackLine = document.createElement('div');
  function appendTask() {
    content.appendChild(taskContainer);
    taskContainer.after(addTaskBtn);
    taskContainer.classList.add('js-task-container');
    taskContainer.append(taskForm, deleteTaskBtn);
    taskForm.classList.add('js-task-form');
    taskForm.append(taskText, dueDate, taskCheckBox);
    blackLine.classList.add('line');
    deleteTaskBtn.classList.add('js-delete-task-button');
    deleteTaskBtn.textContent = 'X';
    deleteTaskBtn.type = 'button';
    taskCheckBox.type = 'checkbox';
    taskCheckBox.classList.add('js-task-checkbox');
    dueDate.type = 'date';
    dueDate.classList.add('js-task-date');
    taskText.classList.add('js-task-input');
    taskText.type = 'text';
    taskText.before(taskCheckBox);
    taskText.focus();
  }

  function createIdForTasks(element, id) {
    if (!element.id) element.setAttribute('id', `${id - 1}`);
    if (id === null) element.setAttribute('id', '0');
  }

  function createTaskEventHandler() {
    // e.preventDefault(() => taskForm.submit());
    saveTasksLocalStorage(taskText.value, dueDate.value, taskContainer.id);
    createIdForTasks(taskContainer, getTaskHistory().length);
    taskText.blur();
  }
  addTaskBtn.addEventListener('click', () => {
    appendTask();
    createTaskEventHandler();
  });

  taskContainer.addEventListener('submit', (e) => {
    e.preventDefault(() => taskForm.submit());
    createTaskEventHandler(e);
  });
  taskForm.addEventListener('focusout', (e) => {
    e.preventDefault(() => taskForm.submit());
    createTaskEventHandler(e);
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
  return {
    content,
    taskContainer,
    taskForm,
    taskText,
    dueDate,
    deleteTaskBtn,
    taskCheckBox,
    appendTask,
  };
}

// export function ChangeTaskStatus(e) {
//   // const task = createTask;
//   // e.target.id.style.backgroundColor = "red";
//   console.log(e)
// }
