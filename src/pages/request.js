import axios from 'axios';

export function fetchData(year,config, callback, errorcallback){
    console.log(year)
    axios.get('http://localhost/REST-APIS/items/read?year='+year, config)
    .then(res => {
      //do something
      if(callback != null){
         callback(res);
      }
    })
    .catch(err => {
      // catch error
      if(errorcallback != null){
         errorcallback(err);
      }
    })
}

export function addData(id,config, callback, errorcallback){
  console.log(id)
  axios.post('http://localhost/REST-APIS/items/delete',{ id }, config)
  .then(res => {
    //do something
    if(callback != null){
       callback(res);
    }
  })
  .catch(err => {
    // catch error
    if(errorcallback != null){
       errorcallback(err);
    }
  })
}