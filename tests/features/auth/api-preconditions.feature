@feature:auth
Feature: Preparación de Estado con Estrategia TEA Network-First
  Como sistema de pruebas automatizadas
  Quiero preparar usuarios y tokens mediante API en milisegundos
  Para evitar la sobrecarga y lentitud de navegación UI en precondiciones

  @P1 @story:US-102 @automated @tea:network-first
  Scenario: Inicializar sesión de usuario autenticado vía API
    Given un usuario administrador creado vía servicio API
    When el usuario valida su token de sesión
    Then el token debe ser válido y quedar registrado en el ScenarioContext
