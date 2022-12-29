import { createTask } from './create-task';
import { saveTasksLocalStorage, removeTasksLocalStorage, changeTaskIdAfterDelete, getTaskHistory, setProject } from './storage';

/**
 * *********************************************************************
 * figure out how to enable focus out and submit event handlers to work together
 * without infinite loop with checkProjectNameValidity(project)
*/

const newProjectBtb = document.querySelector('.js-new-project');
// const getProjectNames = document.querySelectorAll('.project-name');
function checkProjectNameValidity(project) {
  if (!project.value) {
    // alert('Enter project name');
    newProjectBtb.disabled = true;
    // project.focus();
  } else {
    newProjectBtb.disabled = false;
    project.blur();
  }
}

const getProjectName = (project) => project.value;

export function checkEmptyProjectNames() {
  const projectNamesAll = document.querySelectorAll('.js-project-name');
  for (let i = 0; i < projectNamesAll.length; i += 1) {
    if (!projectNamesAll[i].value) {
      newProjectBtb.disabled = true;
    } else newProjectBtb.disabled = false;
  }
}

export function createProject() {
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
  saveButton.classList.add('js-save-project-button');
  deleteButton.classList.add('js-delete-project-button');
  saveButton.textContent = 'Save';
  deleteButton.textContent = 'X';
  deleteButton.type = 'button';
  projectInputForm.after(newProjectBtb);
  projectName.focus();
  projectInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkProjectNameValidity(projectName);
    if (!projectName.value) projectName.style.border = 'solid red 1px';
    else projectName.style.border = 'none';
    projectName.disabled = true;
    setProject(projectName.value);
    projectInputForm.blur();
  });
  deleteButton.addEventListener('click', (e) => {
    e.target.parentNode.remove();
    newProjectBtb.disabled = false;
  });

  projectInputForm.addEventListener('click', () => console.log(projectName.value));
  // projectName.addEventListener('focusout', () => {
  //   if (!projectName.value) projectName.style.border = 'solid red 1px';
  //   else projectName.style.border = 'none';
  // });
}
