export function saveTasksLocalStorage(taskInput, taskDueDate, taskId) {
  const taskHistory = JSON.parse(localStorage.getItem('text')) || [];
  const dueDateHistory = JSON.parse(localStorage.getItem('due-date')) || [];
  if (taskId) {
    taskHistory.splice(taskId, 1, taskInput);
    dueDateHistory.splice(taskId, 1, taskDueDate);
  } else {
    taskHistory.push(taskInput);
    dueDateHistory.push(taskDueDate);
  }
  localStorage.setItem('text', JSON.stringify(taskHistory));
  localStorage.setItem('due-date', JSON.stringify(dueDateHistory));
}
export function removeTasksLocalStorage(taskId, element) {
  const taskHistory = JSON.parse(localStorage.getItem('text')) || [];
  const dueDateHistory = JSON.parse(localStorage.getItem('due-date')) || [];
  // const content = document.querySelector('#content');
  if (taskId) {
    taskHistory.splice(taskId, 1);
    dueDateHistory.splice(taskId, 1);
    localStorage.setItem('text', JSON.stringify(taskHistory));
    localStorage.setItem('due-date', JSON.stringify(dueDateHistory));
    element.remove();
  }
  // change remaining task id's after deletion
}

export function changeTaskIdAfterDelete() {
  const content = document.getElementById('content');
  const getDivElements = content.querySelectorAll('div');
  for (let i = 0; i < getDivElements.length; i += 1) {
    getDivElements[i].setAttribute('id', `${i}`);
  }
}
export const getTaskHistory = () => JSON.parse(localStorage.getItem('text'));
