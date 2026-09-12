import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import app from "../app";

describe("API de tareas", () => {
  let token;

  // Se ejecuta UNA SOLA VEZ antes de correr los tests de este bloque
  beforeAll(async () => {
    const loginRes = await request(app).post("/api/login").send({
      username: "admin@test.com",
      password: "123456",
    });

    // Validar que el login fue exitoso en las pruebas
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.token).toBeDefined();

    // 2. Guardar el token para usarlo en las siguientes pruebas
    token = loginRes.body.token;
  });

  it("crea una tarea nueva", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Escribir informe" });

    expect(res.status).toBe(201);
    expect(res.body.text).toBe("Escribir informe");
  });

  it("lista las tareas creadas", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("rechaza crear una tarea con titulo vacio", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ titulo: "" });

    expect(res.status).toBe(400);
  });
});
