export const chartDataTemplate = {};

for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 10) {
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    chartDataTemplate[time] = { name: time };
  }
}