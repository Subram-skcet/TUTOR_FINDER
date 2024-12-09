export const convertTo12Hour = (time24) => {
    let [hours, minutes] = time24.split(':'); 
  
    hours = parseInt(hours);
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12; 
  
    const time12 = `${hours}:${minutes} ${ampm}`;
    return time12;
  }