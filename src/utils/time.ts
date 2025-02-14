export function timeToMinutes(time: string): number {
    const parts = time.split(":");
    const hours = parseInt(parts[0], 10);
    const mins = parseInt(parts[1], 10);
    return hours * 60 + mins;
  } // HH:MM to a int