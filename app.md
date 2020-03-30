**Get the todos list**
----
  Returns all json data about todo .

* **URL**

  /todos

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 4, title: "Task 1", description : "add feature in Task 1", status : "on Progress", due_date : "2020-04-12T00:00:00.000Z" } `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

    `curl --location --request GET 'http://localhost:3000/todos'`


**Create todo**
----
  Create todo data.

* **URL**

  /todos

* **Method:**

  `POST`
  
* **Request Body:**
```javascript
   {
	"title" : "task 8",
	"description" : "test post",
	"status" : "on progress",
	"due_date" : "12 dec 2020"
   }
```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    {
     
     "msg": "sucessfully added",
      "todos": {
        "id": 11,
        "title": "task 9",
        "description": "test post",
        "status": "on progress",
        "due_date": "2020-12-11T17:00:00.000Z",
        "updatedAt": "2020-03-30T14:54:21.738Z",
        "createdAt": "2020-03-30T14:54:21.738Z"
    }

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

  ```javascript
  curl --location --request POST 'http://localhost:3000/todos' \
    --header 'Content-Type: application/json' \
    --data-raw '{

	    "title" : "task 9",
	    "description" : "test post",
	    "status" : "on progress",
	    "due_date" : "12 dec 2020"
    }'

  ```

**Update a todo**
----
  update a todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        "msg": "sucessfully update",
        "todos": {
            "id": 1,
            "title": "Task update 1",
            "description": "test update",
            "status": "on progress",
            "due_date": "2020-04-09T17:00:00.000Z",
            "createdAt": "2020-03-30T05:56:34.100Z",
            "updatedAt": "2020-03-30T10:35:33.102Z"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "data not found" }`


* **Sample Call:**

  ```javascript
   curl --location --request PUT 'http://localhost:3000/todos/4' \
    --header 'Content-Type: application/json' \
    --data-raw '  {
        "title" : "Task update 1",
        "description":"test update",
        "status":"on progress",
        "due_date":"10 apr 2020"
    }'
  ```

**Delete a todo**
----
  update a todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        "msg": "sucessfully delete",
        "todos": {
            "id": 1,
            "title": "Task update 1",
            "description": "test update",
            "status": "on progress",
            "due_date": "2020-04-09T17:00:00.000Z",
            "createdAt": "2020-03-30T05:56:34.100Z",
            "updatedAt": "2020-03-30T10:35:33.102Z"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "data not found" }`


* **Sample Call:**

  ```javascript
    curl --location --request DELETE 'http://localhost:3000/todos/1'
  ```
  