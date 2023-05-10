// Implement your fetch method using XHR api, so you can make get, post, put, delete with it
const XHR = (url, cb) => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      cb(xhttp.response);
    }
  };
  xhttp.open('GET', url);
  xhttp.send();
};

function myFetch(url, cb, type, body, id) {
  const xhr = new XMLHttpRequest();
  if (type === 'get') {
    XHR(url, cb);
  } else if (type === 'post') {
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (
        xhr.readyState === XMLHttpRequest.DONE &&
        (xhr.status == 201 || xhr.status == 200)
      ) {
        console.log(response);
      } else {
        console.log('Error ' + xhr.status);
        console.log(response);
      }
    };
    const json = JSON.stringify(body);
    xhr.send(json);
  } else if (type === 'put') {
    let updatedData = {};
    for (let key in body) {
      updatedData[key] = body[key];
    }
    xhr.open('PUT', url + '/' + id, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function () {
      let response = JSON.parse(xhr.responseText);
      if (
        xhr.readyState == XMLHttpRequest.DONE &&
        (xhr.status == 201 || xhr.status == 200)
      ) {
        console.log(response);
      } else {
        console.error(response);
      }
    };
    const json = JSON.stringify(updatedData);
    xhr.send(json);
  } else if (type === 'delete') {
    xhr.open('DELETE', url, true);
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (
        xhr.readyState === XMLHttpRequest.DONE &&
        (xhr.status == 201 || xhr.status == 200)
      ) {
        console.log(response);
      } else {
        console.log('Error ' + xhr.status);
        console.log(response);
      }
    };
    xhr.send(null);
  }
}

myFetch(
  'https://jsonplaceholder.typicode.com/todos/1',
  (data) => {
    console.log(1, data);
  },
  'get'
);

myFetch(
  'https://jsonplaceholder.typicode.com/todos',
  (data) => {
    console.log(2, data);
  },
  'post',
  { userId: 1, title: 'clean room', completed: false }
);

myFetch(
  'https://jsonplaceholder.typicode.com/todos',
  (data) => {
    //console.log( data);
  },
  'put',
  {
    userId: 2,
    id: 8,
    title: 'hello task',
    completed: false,
  },
  5
);

myFetch('https://jsonplaceholder.typicode.com/todos/1', (data) => {}, 'delete');
