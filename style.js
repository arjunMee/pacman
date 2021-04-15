// fetch('https://jsonplaceholder.typicode.com/posts')
// .then(rep => rep.json())
// .then(pro => console.log(pro));

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    header: {
        'content-type': 'application/json',
    },
})

.then(rep => rep.json())
.then(pro => console.log(pro));




fetch('https://jsonplaceholder.typicode.com/posts/5', {
    method: 'PUT',
    
    body: JSON.stringify({
        userId: 1,
        id: 5,
        title: "hello task",
        completed: false,
        body: "loda lasan ppppp"
    }),
    headers: {
    "Content-type": "application/json"
    }
})

.then(rep => rep.json())
.then(pro => console.log(pro));


fetch('https://jsonplaceholder.typicode.com/posts/5', {
    method: 'PATCH',
    
    body: JSON.stringify({
        body: "loda lasan"
    }),
    headers: {
    "Content-type": "application/json"
    }
})

.then(rep => rep.json())
.then(pro => console.log(pro));

