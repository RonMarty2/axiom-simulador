"use client";

import { useEffect, useState } from "react";
import type { ExamenConfig } from "@/lib/axiom/types";
import Cargando from "@/app/components/Cargando";

export default function AdminConfigPage() {
  const [config, setConfig] = useState<ExamenConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((d) => {
        setConfig(d.config);
        setLoading(false);
      });
  }, []);

  const handleUpdateArea = (areaIndex: number, field: string, value: string | number) => {
    if (!config) return;
    const newAreas = [...config.areas];
    newAreas[areaIndex] = { ...newAreas[areaIndex], [field]: value };
    setConfig({ ...config, areas: newAreas });
  };

  const handleSave = async () => {
    await fetch("/api/admin/config", {
      method: "PUT",
      body: JSON.stringify(config),
    });
    alert("Config guardado");
  };

  if (loading) return <Cargando />;
  if (!config) return <div>Error cargando config</div>;

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Configuración AXIOM</h1>

      <div style={{ marginBottom: "32px" }}>
        <label>
          Nombre del Examen:
          <input
            type="text"
            value={config.nombre}
            onChange={(e) => setConfig({ ...config, nombre: e.target.value })}
            style={{ display: "block", marginTop: "8px", padding: "8px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <label>
          Tiempo Total (minutos):
          <input
            type="number"
            value={config.tiempo_minutos}
            onChange={(e) =>
              setConfig({ ...config, tiempo_minutos: parseInt(e.target.value) })
            }
            style={{ display: "block", marginTop: "8px", padding: "8px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h2>Áreas del Examen</h2>
        {config.areas.map((area, i) => (
          <div
            key={area.nombre}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              marginBottom: "16px",
              borderRadius: "8px",
            }}
          >
            <label>
              Área:
              <input
                type="text"
                value={area.nombre}
                onChange={(e) =>
                  handleUpdateArea(i, "nombre", e.target.value)
                }
                style={{ display: "block", marginTop: "8px", padding: "8px" }}
              />
            </label>

            <label style={{ marginTop: "12px" }}>
              Cantidad de preguntas:
              <input
                type="number"
                value={area.cantidad}
                onChange={(e) =>
                  handleUpdateArea(i, "cantidad", parseInt(e.target.value))
                }
                style={{ display: "block", marginTop: "8px", padding: "8px" }}
              />
            </label>

            <label style={{ marginTop: "12px" }}>
              Ponderación (ej: 0.33):
              <input
                type="number"
                step="0.01"
                value={area.ponderacion}
                onChange={(e) =>
                  handleUpdateArea(i, "ponderacion", parseFloat(e.target.value))
                }
                style={{ display: "block", marginTop: "8px", padding: "8px" }}
              />
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        style={{
          padding: "12px 24px",
          background: "rgb(139, 92, 246)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Guardar Configuración
      </button>
    </div>
  );
}
