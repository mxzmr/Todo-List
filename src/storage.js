import { setDate } from "date-fns";

export const getTaskHistory = (project = 'inbox') => JSON.parse(localStorage.getItem(`${project}-task`)) || [];
export const getTaskDateHistory = (project = 'inbox') => JSON.parse(localStorage.getItem(`${project}-task-date`)) || [];
const taskHistory = getTaskHistory();
const dueDateHistory = getTaskDateHistory();
const setTask = (project = 'inbox') => localStorage.setItem(`${project}-task`, JSON.stringify(taskHistory));
const setTaskDate = (project = 'inbox') => localStorage.setItem(`${project}-task-date`, JSON.stringify(dueDateHistory));

export function saveTasksLocalStorage(taskInput, taskDueDate, taskId) {
  if (taskId) {
    taskHistory.splice(taskId, 1, taskInput);
    dueDateHistory.splice(taskId, 1, taskDueDate);
  } else {
    taskHistory.push(taskInput);
    dueDateHistory.push(taskDueDate);
  }
  setTask();
  setTaskDate();
}
export function removeTasksLocalStorage(taskId, element) {
  if (taskId) {
    taskHistory.splice(taskId, 1);
    dueDateHistory.splice(taskId, 1);
    setTask();
    setTaskDate();
  }
  element.remove();
}

export function changeTaskIdAfterDelete() {
  const tasks = document.querySelectorAll('.js-task-container');
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].setAttribute('id', `${i}`);
  }
}
