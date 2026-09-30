import MathText from "./MathText";

// Afirmaciones numeradas de una pregunta de clave de combinación (Medicina).
// No renderiza nada si la pregunta es de alternativas normales, así que se puede
// poner debajo de cada enunciado sin preguntar el tipo.
export default function Afirmaciones({ lista }: { lista?: string[] }) {
  if (!lista?.length) return null;
  return (
    <ol className="mt-3 space-y-2" style={{ listStyle: "none", padding: 0 }}>
      {lista.map((texto, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="font-bold" style={{ minWidth: "1.25rem" }}>{i + 1}.</span>
          <span className="min-w-0 flex-1">
            <MathText>{texto}</MathText>
          </span>
        </li>
      ))}
    </ol>
  );
}
