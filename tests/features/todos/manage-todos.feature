@feature:todos
Feature: Gestión de Tareas (TodoMVC)
  Como usuario de la aplicación TodoMVC
  Quiero agregar, completar y filtrar tareas pendientes
  Para organizar mis actividades eficientemente

  @P0 @smoke @story:US-101 @automated
  Scenario: Agregar nuevas tareas a la lista
    Given que el usuario navega a la aplicacion TodoMVC
    When agrega la tarea "Aprender Playwright BDD con vitalets"
    And agrega la tarea "Aplicar principios SOLID y TEA"
    Then la lista debe mostrar 2 tareas
    And la tarea "Aprender Playwright BDD con vitalets" debe estar visible
    And el contador debe indicar "2 items left"

  @P1 @regression @story:US-101 @automated
  Scenario: Completar una tarea y filtrar completadas
    Given que el usuario navega a la aplicacion TodoMVC
    And agrega la tarea "Tarea pendiente 1"
    And agrega la tarea "Tarea pendiente 2"
    When marca como completada la tarea "Tarea pendiente 1"
    And filtra las tareas por "Active"
    Then la lista debe mostrar 1 tareas
    And el contador debe indicar "1 item left"
