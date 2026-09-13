"use client";

import { useEffect, useState, ReactNode } from "react";
import Cargando from "../components/Cargando";

interface ProgresoData {
  total_simulaciones: number;
  nota_promedio: number;
  mejor_nota: number;
  peor_nota: number;
  ultimas_notas: number[];
  historial: Array<{
    id: string;
    fecha: string;
    nota: number;
    desglose: {
      matematicas: number;
      economicas: number;
      verbal: number;
    } | null;
  }>;
}

export default function ProgresoDashboardPage(): ReactNode {
  const [progreso, setProgreso] = useState<ProgresoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProgreso = async (): Promise<void> => {
      try {
        const response = await fetch("/api/axiom/progreso/estadisticas?usuario_id=demo-user");
        const data: ProgresoData = await response.json();
        setProgreso(data);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgreso();
  }, []);

  if (loading) {
    return <Cargando />;
  }

  if (!progreso) {
    return <div style={{ padding: "24px" }}>Error cargando progreso</div>;
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ marginBottom: "32px" }}>Mi Progreso</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "48px",
        }}
      >
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
            Total Simulaciones
          </div>
          <div style={{ fontSize: "36px", fontWeight: 700 }}>
            {progreso.total_simulaciones}
          </div>
        </div>
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
            Nota Promedio
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "rgb(139,92,246)",
            }}
          >
            {progreso.nota_promedio}
          </div>
        </div>
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
            Mejor Nota
          </div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--green)" }}>
            {progreso.mejor_nota}
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>
          Historial de Simulaciones
        </h2>
        <div style={{ background: "white", borderRadius: "8px", overflow: "hidden" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>
                  Fecha
                </th>
                <th style={{ padding: "12px", textAlign: "center", fontWeight: 600 }}>
                  Nota
                </th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>
                  Desglose
                </th>
              </tr>
            </thead>
            <tbody>
              {progreso.historial.map((sim) => (
                <tr
                  key={sim.id}
                  style={{ borderBottom: "1px solid #e5e7eb" }}
                >
                  <td style={{ padding: "12px" }}>
                    {new Date(sim.fecha).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: 600,
                      color: "rgb(139,92,246)",
                    }}
                  >
                    {sim.nota}
                  </td>
                  <td style={{ padding: "12px", fontSize: "12px", color: "#6b7280" }}>
                    {sim.desglose
                      ? `M: ${sim.desglose.matematicas}% | E: ${sim.desglose.economicas}% | V: ${sim.desglose.verbal}%`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {progreso.historial.length === 0 && (
            <div style={{ padding: "24px", textAlign: "center", color: "#6b7280" }}>
              Aún sin simulaciones. ¡Crea la primera!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
