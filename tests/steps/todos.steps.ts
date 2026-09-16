import { Given, When, Then } from '../fixtures';

Given('que el usuario navega a la aplicacion TodoMVC', async ({ todoApp }) => {
  await todoApp.navigate();
});

When('agrega la tarea {string}', async ({ todoApp }, taskName: string) => {
  await todoApp.addTodo(taskName);
});

When('marca como completada la tarea {string}', async ({ todoApp }, taskName: string) => {
  await todoApp.toggleTodo(taskName);
});

When('filtra las tareas por {string}', async ({ todoApp }, filterName: 'All' | 'Active' | 'Completed') => {
  await todoApp.filterBy(filterName);
});

Then('la lista debe mostrar {int} tareas', async ({ todoApp }, count: number) => {
  await todoApp.expectTodoCount(count);
});

Then('la tarea {string} debe estar visible', async ({ todoApp }, taskName: string) => {
  await todoApp.expectTodoVisible(taskName);
});

Then('el contador debe indicar {string}', async ({ todoApp }, expectedText: string) => {
  await todoApp.expectItemsLeft(expectedText);
});
