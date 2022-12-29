export const getTaskHistory = (projectName = 'inbox') => JSON.parse(localStorage.getItem(`${projectName}`)) || [];
const taskHistory = getTaskHistory();
export const setProject = (projectName) => localStorage.setItem(`${projectName}`, JSON.stringify(taskHistory));

export function
saveTasksLocalStorage(
  taskId = '',
  taskTitle = '',
  taskDescription = '',
  taskDueDate = '',
  taskPriority = '',
  taskFinished = false,
  projectName = 'inbox',
) {
  if (taskId) {
    taskHistory.splice(taskId, 1, {
      'task-title': taskTitle,
      'task-description': taskDescription,
      'task-due-date': taskDueDate,
      'task-priority': taskPriority,
      'task-finished': taskFinished,
    });
    console.log(taskHistory);
  } else {
    taskHistory.push({
      'task-title': taskTitle,
      'task-description': taskDescription,
      'task-due-date': taskDueDate,
      'task-priority': taskPriority,
      'task-finished': taskFinished,
    });
    console.log('getTaskHistory()');
  }
  setProject(projectName);
}

export function removeTasksLocalStorage(taskId, element, projectName = 'inbox') {
  if (taskId) {
    taskHistory.splice(taskId, 1);
    setProject(projectName);
  }
  element.remove();
}

export function changeTaskIdAfterDelete() {
  const tasks = document.querySelectorAll('.js-task-container');
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].setAttribute('id', `${i}`);
  }
}
