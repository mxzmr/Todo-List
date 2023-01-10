import { createTask, changeTaskStatus, selectAllTasksItems } from './create-task';
import { editTaskModal, displayTaskPriority } from './taskModal';
import { updateTaskId } from './storage';

const projectHeader = document.querySelector('.project-header');

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
      // taskContainer[id].setAttribute('id', `${task['task-id']}`);
      taskInput[id].blur();
      displayTaskPriority(task['task-priority'], id);
      changeTaskStatus(task['task-finished'], id);
      return undefined;
    });
    // Filters don't need to change task id
    if (projectHeader.textContent !== 'Today' && projectHeader.textContent !== 'Next 7 Days') updateTaskId();
    editTaskModal();
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
  // setTodayTasks(todayTasks);
  return todayTasks;
}

export function getNextWeekTasks() {
  // const getWeeklyTasks = localStorage.getItem('Weekly');
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
  // console.log(getWeeklyTasks);
  // if (!selectAllTasksItems().taskInput.value) setWeeklyTasks(nextWeekTasks);
  return nextWeekTasks;
}

function findTaskInStorage() {
  // find this specific task in the local storage by using the project name and task id
  // then splice the old task with the new task
}
