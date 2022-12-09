function inboxList() {
  const content = document.querySelector('#content');
  const newTaskBtn = document.createElement('button');
  const getTaskHistory = () => JSON.parse(localStorage.getItem('text'));
  const appendTaskBtn = () => {
    if (content.querySelector('.new-task-button') === null) {
      content.appendChild(newTaskBtn);
      newTaskBtn.textContent = '+ New Task';
      newTaskBtn.classList.add('new-task-button');
    }
  };
  if (!getTaskHistory()) appendTaskBtn();
  function createTask() {
    const newTaskForm = document.createElement('form');
    const taskText = document.createElement('input');
    const taskCheckBox = document.createElement('input');
    const dueDate = document.createElement('input');
    const deleteTaskBtn = document.createElement('button');
    const taskContainer = document.createElement('div');
    content.appendChild(taskContainer);
    taskContainer.classList.add('task-container');
    taskContainer.append(newTaskForm, deleteTaskBtn);
    newTaskForm.classList.add('new-task-form');
    newTaskForm.append(newTaskBtn, dueDate, taskCheckBox);
    newTaskForm.replaceChild(taskText, newTaskBtn);
    deleteTaskBtn.classList.add('delete-task-button');
    deleteTaskBtn.textContent = 'X';
    deleteTaskBtn.type = 'button';
    taskCheckBox.type = 'checkbox';
    dueDate.type = 'date';
    dueDate.classList.add('due-date');
    taskText.classList.add('task-input');
    taskText.type = 'text';
    taskText.before(taskCheckBox);
    // dueDate.after(deleteTaskBtn);
    function createIdForTasks() {
      if (!taskContainer.id && getTaskHistory()) taskContainer.setAttribute('id', `${getTaskHistory().length - 1}`);
      else if (!taskContainer.id && !getTaskHistory())taskContainer.setAttribute('id', '0');
      if (content.querySelector('.new-task-button') === null) appendTaskBtn();
    }
    function saveTasksLocalStorage(id) {
      const taskHistory = JSON.parse(localStorage.getItem('text')) || [];
      const dueDateHistory = JSON.parse(localStorage.getItem('due-date')) || [];
      if (id) {
        taskHistory.splice(id, 1, taskText.value);
        dueDateHistory.splice(id, 1, dueDate.value);
      } else {
        taskHistory.push(taskText.value);
        dueDateHistory.push(dueDate.value);
      }
      localStorage.setItem('text', JSON.stringify(taskHistory));
      localStorage.setItem('due-date', JSON.stringify(dueDateHistory));
    }
    function removeTasksLocalStorage(id) {
      const taskHistory = JSON.parse(localStorage.getItem('text')) || [];
      const dueDateHistory = JSON.parse(localStorage.getItem('due-date')) || [];
      if (id) {
        taskHistory.splice(id, 1);
        dueDateHistory.splice(id, 1);
        localStorage.setItem('text', JSON.stringify(taskHistory));
        localStorage.setItem('due-date', JSON.stringify(dueDateHistory));
      }
      content.removeChild(taskContainer);
      appendTaskBtn();
    }
    deleteTaskBtn.addEventListener('click', () => {
      removeTasksLocalStorage(taskContainer.id);
      const getDivElements = content.querySelectorAll('div');
      for (let i = 0; i < getDivElements.length; i += 1) {
        getDivElements[i].setAttribute('id', `${i}`);
      }
    });
    newTaskForm.addEventListener('focusout', (e) => {
      e.preventDefault(() => newTaskForm.submit());
      if (taskText.value) {
        saveTasksLocalStorage(taskContainer.id);
        createIdForTasks();
      }
    });
    newTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveTasksLocalStorage(taskContainer.id);
      createIdForTasks();
      taskText.blur();
      dueDate.blur();
    });
    return {
      taskText, dueDate, newTaskForm, taskContainer,
    };
  }
  newTaskBtn.addEventListener('click', createTask);
  return { createTask, getTaskHistory, appendTaskBtn };
}

export function Projects() {
  const projects = document.querySelector('.projects');
  const newProjectBtn = document.createElement('button');
  projects.appendChild(newProjectBtn);
  newProjectBtn.classList.add('new-project');
  newProjectBtn.textContent = 'New Project';
  function createProject() {
    const inputText = document.createElement('input');
    const div = document.createElement('div');
    const newProjectForm = document.createElement('form');
    const p = document.createElement('li');
    const para = document.createElement('p');
    inputText.type = 'text';
    projects.appendChild(div);
    div.appendChild(newProjectForm);
    newProjectForm.appendChild(newProjectBtn);
    newProjectForm.replaceChild(inputText, newProjectBtn);
    // inputText.addEventListener('focus', () => console.log('test'))
    newProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      p.textContent = inputText.value;
      newProjectForm.appendChild(para);
      newProjectForm.replaceChild(p, inputText);
      projects.appendChild(newProjectBtn);
    });
  }
  newProjectBtn.addEventListener('click', createProject);
  return { createProject };
}

export function clearContent() {

}

export function displayInbox() {
  const tasks = inboxList();
  if (tasks.getTaskHistory()) {
    // eslint-disable-next-line array-callback-return
    tasks.getTaskHistory().map((ele, i) => {
      const displayTask = tasks.createTask();
      displayTask.taskText.value = ele;
      displayTask.dueDate.value = JSON.parse(localStorage.getItem('due-date'))[i];
      displayTask.taskContainer.setAttribute('id', `${i}`);
    });
    tasks.appendTaskBtn();
  }
}
