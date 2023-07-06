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

export function fetchDataLoad(config, callback, errorcallback){
  axios.get('http://localhost/REST-APIS/items/read', config)
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

export function addPostData(dataValue,config, callback, errorcallback){
  console.log(dataValue)
  axios.post('http://localhost/REST-APIS/items/create',dataValue, config)
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

export function editPostData(dataValue,config, callback, errorcallback){
  console.log(dataValue)
  axios.post('http://localhost/REST-APIS/items/update',dataValue, config)
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