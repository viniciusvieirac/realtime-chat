
export function formatarHorarioISO8601(createdAt: string | undefined) {
  if (!createdAt) return "";

  const dateObject = new Date(createdAt);
  if (isNaN(dateObject.getTime())) {
    return "";
  }

  const horas = dateObject.getHours();
  const minutos = dateObject.getMinutes();
  const horarioFormatado = `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}`;
  return horarioFormatado;
}