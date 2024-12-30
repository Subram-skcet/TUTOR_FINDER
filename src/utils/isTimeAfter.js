export function isTimeAfter(time1, time2) {
    const today = new Date().toISOString().slice(0, 10);
    const date1 = new Date(`${today}T${time1}`);
    const date2 = new Date(`${today}T${time2}`);
  
    return date1 > date2; // Compare if time1 is after time2
  }