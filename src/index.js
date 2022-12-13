import { compareAsc, format } from 'date-fns';
import createTask from './create-task';
import './style.css';
// import'./styles.css';
import { events, displayInbox } from './task-logic';
// import { displayInbox } from './tasks';
// import {
//   Projects, displayInbox,
// } from './tasks';

// newTodoList();
// displayInbox();
// Projects();
createTask();
displayInbox();
// events();
