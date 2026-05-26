// /register existe solo para mantener compatibilidad con links antiguos.
// Como el registro es automático al primer login con Google, lo redirigimos.

import { redirect } from "next/navigation";

export default function RegisterPage() {
  redirect("/login");
}
