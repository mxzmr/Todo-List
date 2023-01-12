import { createTask, changeTaskStatus, selectAllTasksItems } from './create-task';
import { displayTaskPriority } from './taskModal';

export function displayInbox(project) {
  const taskSection = document.querySelector('.js-task-section');
  taskSection.replaceChildren();
  if (project) {
    project.map((task, id) => {
      createTask(task.project);
      const {
        taskContainer,
        taskInput,
        taskCheckBox,
        displayDueDate,
      } = selectAllTasksItems();
      taskInput[id].value = task['task-title'];
      displayDueDate[id].textContent = task['task-due-date'];
      taskCheckBox[id].checked = task['task-finished'];
      taskContainer[id].setAttribute('id', `${task['task-id']}`);
      taskInput[id].blur();
      displayTaskPriority(task['task-priority'], id);
      changeTaskStatus(task['task-finished'], id);
      return undefined;
    });
  }
}

export function getTodayTasks() {
  const todayDate = new Date().toISOString().slice(0, 10);
  const todayTasks = [];
  Object.entries(localStorage).map(([key, value]) => {
    const tasks = JSON.parse(value);
    return tasks.map((task) => {
      if (todayDate === task['task-due-date']) return todayTasks.push(task);
      return undefined;
    });
  });
  return todayTasks;
}

export function getNextWeekTasks() {
  const todayDate = new Date();
  const todayDateFormatted = new Date().toISOString().slice(0, 10);
  const nextWeek = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 7);
  const nextWeekFormatted = nextWeek.toISOString().slice(0, 10);
  const nextWeekTasks = [];
  Object.entries(localStorage).map(([key, value]) => {
    const tasks = JSON.parse(value);
    return tasks.map((task) => {
      if (
        task['task-due-date'] > todayDateFormatted
        && task['task-due-date'] <= nextWeekFormatted
      ) return nextWeekTasks.push(task);
      return undefined;
    });
  });
  return nextWeekTasks;
}
