// import { createTask } from './create-task';
import {
  getTaskHistory,
  setProject,
  setProjectNames,
  getProjectNames,
} from './storage';

import { displayInbox } from './display-module';

const newTaskBtn = document.querySelector('.js-new-task-button');
let projectNames = getProjectNames();
const checkIfProjectExists = (newProject) => {
  const duplicates = [];
  if (projectNames) {
    projectNames.map((project) => {
      if (newProject === project) duplicates.push(project);
      return duplicates;
    });
  }
  return duplicates.length > 0;
};

export function checkEmptyProjectNames() {
  const projectNamesAll = document.querySelectorAll('.js-project-name');
  for (let i = 0; i < projectNamesAll.length; i += 1) {
    if (!projectNamesAll[i].value) return true;
  } return false;
}

function renderProjects() {
  const newProjectBtb = document.querySelector('.js-new-project');
  const projectHeader = document.querySelector('.project-header');
  const projects = document.querySelector('.js-sidebar__projects');
  const projectInputForm = document.createElement('form');
  const projectName = document.createElement('input');
  const saveButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  projects.appendChild(projectInputForm);
  projectInputForm.classList.add('js-project-form');
  projectInputForm.append(projectName, saveButton, deleteButton);
  projectName.classList.add('js-project-name');
  projectName.placeholder = 'Project Name';
  projectName.type = 'text';
  saveButton.classList.add('js-save-project-button');
  saveButton.textContent = 'Save';
  saveButton.type = 'submit';
  deleteButton.classList.add('js-delete-project-button');
  deleteButton.textContent = 'X';
  deleteButton.type = 'button';
  projectInputForm.after(newProjectBtb);
  return {
    projectHeader,
    projectInputForm,
    projectName,
    saveButton,
    deleteButton,
  };
}

export function createProject(project) {
  const {
    projectHeader,
    projectInputForm,
    projectName,
    deleteButton,
  } = renderProjects();
  projectName.value = project || '';
  projectName.type = projectName.value ? 'button' : 'text';
  projectInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!projectName.value) projectName.style.border = 'solid red 1px';
    else if (!checkIfProjectExists(projectName.value)) {
      projectName.style.border = 'none';
      projectName.style.width = '100%';
      projectName.type = 'button';
      projectHeader.textContent = projectName.value;
      newTaskBtn.style.display = 'block';
      projectNames.push(projectName.value);
      setProjectNames(projectNames);
      setProject(getTaskHistory(projectName.value), projectName.value);
      displayInbox(getTaskHistory(projectName.value));
      projectInputForm.blur();
    }
  });
  projectName.addEventListener('click', (event) => {
    if (checkIfProjectExists(projectName.value)) {
      projectHeader.textContent = projectName.value;
      newTaskBtn.style.display = 'block';
      displayInbox(getTaskHistory(event.target.value));
    }
  });
  // delete project and set the dom to default index tasks
  deleteButton.addEventListener('click', (e) => {
    e.target.parentNode.remove();
    window.localStorage.removeItem(projectName.value);
    // Remove and update deleted project from projectNames array
    projectNames = projectNames.filter((name) => name !== projectName.value);
    setProjectNames(projectNames);
    projectHeader.textContent = 'Inbox';
    newTaskBtn.style.display = 'block';
    displayInbox(getTaskHistory('Inbox'));
  });
}

export function displayProjects() {
  getProjectNames().map((project) => createProject(project));
}
