const projectHeader = document.querySelector('.project-header');
export const getTaskHistory = (projectName = projectHeader.textContent) => JSON.parse(localStorage.getItem(`${projectName}`)) || [];
export const setProject = (projectName = projectHeader.textContent, taskHistory = getTaskHistory(projectName)) => localStorage.setItem(`${projectName}`, JSON.stringify(taskHistory));
export const sortLocalStorage = () => Object.keys(localStorage).sort();
export const getProjectNames = () => JSON.parse(localStorage.getItem('projects')) || [];
export const setProjectNames = (project) => localStorage.setItem('projects', JSON.stringify(project));
export const setTodayTasks = (tasks) => localStorage.setItem('Today', JSON.stringify(tasks));
export const setWeeklyTasks = (tasks) => localStorage.setItem('Weekly', JSON.stringify(tasks));

export function
saveTasksLocalStorage({
  projectName = '',
  taskId = '',
  taskTitle = '',
  taskDescription = '',
  taskDueDate = '',
  taskPriority = '',
  taskFinished = false,
}) {
  const taskHistory = getTaskHistory(projectName);
  if (taskId) {
    taskHistory.splice(taskId, 1, {
      project: projectName,
      'task-id': taskId,
      'task-title': taskTitle,
      'task-description': taskDescription,
      'task-due-date': taskDueDate,
      'task-priority': taskPriority,
      'task-finished': taskFinished,
    });
  } else {
    taskHistory.push({
      project: projectName,
      'task-id': taskId,
      'task-title': taskTitle,
      'task-description': taskDescription,
      'task-due-date': taskDueDate,
      'task-priority': taskPriority,
      'task-finished': taskFinished,
    });
  }
  setProject(projectName, taskHistory);
  sortLocalStorage();
}

export function removeTasksLocalStorage(projectName, taskId, element) {
  const taskHistory = getTaskHistory(projectName);
  if (taskId) {
    taskHistory.splice(taskId, 1);
    setProject(projectName, taskHistory);
  }
  element.remove();
}

export function updateTaskId(project) {
  const taskHistory = getTaskHistory(project);
  const tasks = document.querySelectorAll('.js-task-container');
  for (let i = 0; i < tasks.length; i += 1) {
    if (taskHistory) taskHistory[i]['task-id'] = `${i}`;
    tasks[i].setAttribute('id', `${i}`);
  }
  setProject(undefined, taskHistory);
}
