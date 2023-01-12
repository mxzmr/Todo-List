import { saveTasksLocalStorage, getTaskHistory } from './storage';

const taskModal = document.querySelector('.task-modal');
const projectName = document.querySelector('.modal-project-name');
const taskTitle = document.querySelector('.task-title');
const taskDescription = document.querySelector('.task-description');
const taskDueDate = document.querySelector('#task-date');
const closeModal = document.querySelector('.modal-close');
const taskPriorityLow = document.getElementById('priority-low');
const taskPriorityMedium = document.getElementById('priority-medium');
const taskPriorityHigh = document.getElementById('priority-high');
const taskPriority = document.querySelectorAll('input[name="priority"]');

export function getTaskPriority() {
  let checkedPriority;
  for (let i = 0; i < taskPriority.length; i += 1) {
    if (taskPriority[i].checked) {
      checkedPriority = taskPriority[i].value;
      taskPriority[i].checked = true;
      break;
    }
  }
  return checkedPriority;
}

export function displayTaskPriority(priority, id) {
  const taskContainer = document.querySelectorAll('.js-task-container');
  if (priority === 'low') taskContainer[id].style.borderLeft = 'solid green 4px';
  if (priority === 'medium') taskContainer[id].style.borderLeft = 'solid orange 4px';
  if (priority === 'high') taskContainer[id].style.borderLeft = 'solid red 4px';
}

export function updateTask(project, id) {
  const displayTaskDate = document.querySelectorAll('.display-task-due-date');
  const taskText = document.querySelectorAll('.js-task-input');
  const container = document.querySelectorAll('.js-task-container');
  for (let i = 0; i < container.length; i += 1) {
    if (container[i].id === id && container[i].dataset.project === project) {
      taskText[i].value = getTaskHistory(project)[id]['task-title'];
      displayTaskDate[i].textContent = getTaskHistory(project)[id]['task-due-date'];
      displayTaskPriority(getTaskPriority(project), i);
      return;
    }
  }
}

function createEventListenersForModal(project) {
  taskModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskCheckBox = document.querySelectorAll('.js-task-checkbox');
    saveTasksLocalStorage({
      projectName: project,
      taskId: taskModal.id,
      taskTitle: taskTitle.value,
      taskDescription: taskDescription.value,
      taskDueDate: taskDueDate.value,
      taskPriority: getTaskPriority(),
      taskFinished: taskCheckBox[taskModal.id].checked,
    });
    updateTask(project, taskModal.id);
    taskModal.close();
  }, { once: true });
  closeModal.addEventListener('click', () => taskModal.close());
}

export function showModal(project, id) {
  const taskHistory = getTaskHistory(project);
  taskModal.showModal();
  taskModal.setAttribute('id', `${id}`);
  if (getTaskHistory(project)[id]) {
    projectName.textContent = project;
    taskTitle.value = taskHistory[id]['task-title'];
    taskDescription.value = taskHistory[id]['task-description'];
    taskDueDate.value = taskHistory[id]['task-due-date'];
    if (taskPriorityLow.value === taskHistory[id]['task-priority']) {
      taskPriorityLow.checked = true;
    } else taskPriorityLow.checked = false;
    if (taskPriorityMedium.value === taskHistory[id]['task-priority']) {
      taskPriorityMedium.checked = true;
    } else taskPriorityMedium.checked = false;
    if (taskPriorityHigh.value === taskHistory[id]['task-priority']) {
      taskPriorityHigh.checked = true;
    } else taskPriorityHigh.checked = false;
  } else {
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskPriorityLow.checked = false;
    taskPriorityMedium.checked = false;
    taskPriorityHigh.checked = false;
  }
  createEventListenersForModal(project);
}
