export const getCurrentDateTime = () => {
  const currentDate = new Date();
  const currentDateTime = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  return currentDateTime;
};

export const getCurrentDateInYYYYMMDD = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate;
};

export const getCurrentTime = () => {
  const currentDate = new Date();
  const currentTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
  return currentTime;
};

export const timeStampToDate = (timeStamp) =>{
  
  if(timeStamp){
    timeStamp =  timeStamp * 1
    const dateStamp =  new Date(timeStamp);
    const dd = String(dateStamp.getDate()).padStart(2, '0');
    const mm = String(dateStamp.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = dateStamp.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
  else{
    return 'Unable to format Timestamp';
  }
 
}

export const googleDriveFileTimestampToData = (timeStamp) =>{

  if(timeStamp){
    const dateStamp =  new Date(timeStamp);
    const dd = String(dateStamp.getDate()).padStart(2, '0');
    const mm = String(dateStamp.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = dateStamp.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
  else{
    return 'Unable to format Timestamp';
  }
}

export const timestampToDateTimeString = (timeStamp) =>{

  if(timeStamp){
    const dateStamp =  new Date(timeStamp);
    return dateStamp.toISOString().replace(/[^0-9]/g, "").slice(0, -3)
  }
  else{
    return 'Unable to format Timestamp';
  }
}