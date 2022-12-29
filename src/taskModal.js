import { saveTasksLocalStorage, getTaskHistory } from './storage';

const taskModal = document.querySelector('.task-modal');
const taskTitle = document.querySelector('.task-title');
const taskDescription = document.querySelector('.task-description');
const taskDueDate = document.querySelector('#task-date');
const closeModal = document.querySelector('.modal-close');
const saveModalBtn = document.querySelector('.task-submit');
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

// check why moving the two const outside this function throws an error ****************************
function updateTask() {
  const displayTaskDate = document.querySelectorAll('.display-task-due-date');
  const taskText = document.querySelectorAll('.js-task-input');
  taskText[taskModal.id].value = taskTitle.value;
  displayTaskDate[taskModal.id].textContent = taskDueDate.value;
  displayTaskPriority(getTaskPriority(), taskModal.id);
}

export function editTask() {
  saveModalBtn.addEventListener('click', (e) => {
    const taskCheckBox = document.querySelectorAll('.js-task-checkbox');
    // console.log(TaskCheckBox);
    e.preventDefault();
    saveTasksLocalStorage(
      taskModal.id,
      taskTitle.value,
      taskDescription.value,
      taskDueDate.value,
      getTaskPriority(),
      taskCheckBox[taskModal.id].checked,
    );
    taskModal.close();
    updateTask();
  });
  closeModal.addEventListener('click', () => taskModal.close());
}

export function showModal(id) {
  taskModal.showModal();
  taskModal.setAttribute('id', `${id}`);
  taskTitle.value = getTaskHistory()[id]['task-title'];
  taskDescription.value = getTaskHistory()[id]['task-description'];
  taskDueDate.value = getTaskHistory()[id]['task-due-date'];
  if (taskPriorityLow.value === getTaskHistory()[id]['task-priority']) {
    taskPriorityLow.checked = true;
  } else taskPriorityLow.checked = false;
  if (taskPriorityMedium.value === getTaskHistory()[id]['task-priority']) {
    taskPriorityMedium.checked = true;
  } else taskPriorityMedium.checked = false;
  if (taskPriorityHigh.value === getTaskHistory()[id]['task-priority']) {
    taskPriorityHigh.checked = true;
  } else taskPriorityHigh.checked = false;
}
