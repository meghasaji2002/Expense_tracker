export const apiURL= 'http://localhost:5000';
export const fetchHeaders = {
    "Content-Type":"application/json",
    "Authorization":"Bearer " + sessionStorage.getItem('EXPENSE-TRACKER-TOKEN')
  };
  export const fetchHeadersMultipart = {
      "Authorization":"Bearer " + sessionStorage.getItem('EXPENSE-TRACKER-TOKEN')
    };