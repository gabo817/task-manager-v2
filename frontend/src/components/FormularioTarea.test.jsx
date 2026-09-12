import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskInput from "./TaskInput";

describe("FormularioTarea", () => {
  it("llama a onAddTask con el texto escrito por el usuario", async () => {
    // Arrange
    const handleAddTask = vi.fn();
    render(<TaskInput onAddTask={handleAddTask} />);
    const usuario = userEvent.setup();

    // Act
    const input = screen.getByLabelText("Nueva tarea");
    await usuario.type(input, "Comprar pan");
    await usuario.click(screen.getByText("Añadir tarea"));

    // Assert
    expect(handleAddTask).toHaveBeenCalledWith("Comprar pan");
  });

  it("no llama a onAgregar si el campo está vacío", async () => {
    const handleAddTask = vi.fn();
    render(<TaskInput onAddTask={handleAddTask} />);
    const usuario = userEvent.setup();

    await usuario.click(screen.getByText("Añadir tarea"));

    expect(handleAddTask).not.toHaveBeenCalled();
  });
});
