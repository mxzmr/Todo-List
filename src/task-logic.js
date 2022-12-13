import createTask from './create-task';
import { saveTasksLocalStorage, removeTasksLocalStorage, changeTaskIdAfterDelete, getTaskHistory } from './storage';

export function events() {
  // const newTaskBtn = document.querySelector('.js-new-task-button');
  // function createEvents() {
  //   const newTaskForm = createTask();
  //   const taskInput = newTaskForm.taskText;
  //   const taskDueDate = newTaskForm.dueDate;
  //   const task = newTaskForm.taskContainer;
  //   const deleteBtn = newTaskForm.deleteTaskBtn;
  //   // const checkBox = newTaskForm.taskCheckBox;
  //   function createTaskEventHandler(e) {
  //     e.preventDefault(() => newTaskForm.submit());
  //     saveTasksLocalStorage(taskInput.value, taskDueDate.value, task.id);
  //     createIdForTasks(task, getTaskHistory().length);
  //     taskInput.blur();
  //   }
  //   task.addEventListener('submit', (e) => {
  //     createTaskEventHandler(e);
  //   });
  //   newTaskForm.taskForm.addEventListener('focusout', (e) => {
  //     createTaskEventHandler(e);
  //   });
  //   deleteBtn.addEventListener('click', () => {
  //     removeTasksLocalStorage(task.id, task);
  //     changeTaskIdAfterDelete();
  //   });
  //   task.addEventListener('change', (e) => {
  //     if (e.target.checked) {
  //       task.style.opacity = '0.4';
  //       taskInput.readOnly = true;
  //       taskDueDate.readOnly = true;
  //     } else {
  //       task.style.opacity = '1';
  //       taskInput.readOnly = false;
  //       taskDueDate.readOnly = false;
  //     }
  //   });
  // }
  // newTaskBtn.addEventListener('click', () => {
  //   createEvents();
  // });
  // return { createEvents };
}

export function displayInbox() {
  const tasks = createTask();
  if (getTaskHistory()) {
    // eslint-disable-next-line array-callback-return
    getTaskHistory().map((ele, i) => {
      const newTaskForm = createTask().appendTask();
      tasks.taskText.value = ele;
      tasks.dueDate.value = JSON.parse(localStorage.getItem('due-date'))[i];
      tasks.taskContainer.setAttribute('id', `${i}`);
      // events().createEvents();
    });
    // tasks.appendTaskBtn();
  }
}
