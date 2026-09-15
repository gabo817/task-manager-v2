export function esCorreoValido(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

export function contarTareasPendientes(tareas) {
  return tareas.filter((t) => !t.completada).length;
}

export function calcularPorcentajeCompletadas(tareas = []) {
  if (!tareas || tareas.length === 0) return 0; // Guard clause
  
  const completadas = tareas.filter((t) => t.completada).length;
  return Math.round((completadas / tareas.length) * 100);
}