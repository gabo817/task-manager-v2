import { describe, it, expect } from "vitest";
import {
  esCorreoValido,
  contarTareasPendientes,
  calcularPorcentajeCompletadas,
} from "./validaciones";

describe("esCorreoValido", () => {
  it("acepta un correo con formato válido", () => {
    // Arrange
    const correo = "ana@ejemplo.com";
    // Act
    const resultado = esCorreoValido(correo);
    // Assert
    expect(resultado).toBe(true);
  });

  it("rechaza un correo sin arroba", () => {
    const correo = "ana-ejemplo.com";
    const resultado = esCorreoValido(correo);
    expect(resultado).toBe(false);
  });
});

describe("contarTareasPendientes", () => {
  it("cuenta solo las tareas no completadas", () => {
    const tareas = [
      { completada: true },
      { completada: false },
      { completada: false },
    ];
    expect(contarTareasPendientes(tareas)).toBe(2);
  });

  it("devuelve 0 cuando la lista está vacía", () => {
    expect(contarTareasPendientes([])).toBe(0);
  });
});

describe("calcularPorcentajeCompletadas", () => {
  it("debe devolver 0 si la lista de tareas está vacía", () => {
    const porcentaje = calcularPorcentajeCompletadas([]);

    expect(porcentaje).toBe(0);
  });

  it("calcula correctamente el porcentaje cuando hay tareas", () => {
    const tareas = [
      { id: 1, completada: true },
      { id: 2, completada: false },
    ];
    expect(calcularPorcentajeCompletadas(tareas)).toBe(50);
  });
});
