# FancyTodo-server

**Sign up user**
----
  create new user

* **URL**

  /signup

* **Method:**

  `POST`

  * **Request Body:**
```javascript
  {
	"username" : "carol",
	"password" :"1234",
	"email" : "baru@gmail.com"
  }

```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ error : "Internal Server Error" }
    `{`
      `"message": "success add user !!",`
      `"id": 36,`
      `"username": "carol",`
      `"email": "baru@gmail.com",`
      `"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.`
    `}`
    
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

    `curl --location --request POST 'http://localhost:3000/signup'`



**Signin user**
----
  Login user

* **URL**

  /signin

* **Method:**

  `POST`

  * **Request Body:**
```javascript
  {
	"username" : "carol",
	"password" :"1234",
  }

```
* **Success Response:**

  * **Code:** 209 <br />
    **Content:** `{ error : "Internal Server Error" }
    `{`
      `"message": "login success !!",`
      `"id": 36,`
      `"username": "carol",`
      `"email": "baru@gmail.com",`
      `"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.`
    `}`
    
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

    `curl --location --request POST 'http://localhost:3000/signin'`


**Get the todos list**
----
  Returns all json data about todo .

* **URL**

  /todos

* **Method:**

  `GET`

* **Success Response:**

  * **Request Headers:**
  `{ access_token : YOUR_TOKEN }`

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

* **Request Headers:**
  `{ access_token : YOUR_TOKEN }`

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

* **Request Headers:**
  `{ access_token : YOUR_TOKEN }`

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

* **Request Headers:**
  `{ access_token : YOUR_TOKEN }`

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
  

**Get a holiday**
----
  get day or holyday base on current date.

* **URL**

  /api/holiday

* **Method:**

  `GET`
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
       {
          "day": "Saturday"
      }
    }
    ```


* **Sample Call:**

  ```javascript
   curl --location --request GET 'http://localhost:3000/api/holiday''
  ```

**Get quote**
----
  get random quote every day.

* **URL**

  /api/quote

* **Method:**

  `GET`
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        {
          "content": "All perceiving is also thinking, all reasoning is also intuition, all observation is also invention.",
          "author": "Rudolf Arnheim"
        }
    }
    ```

* **Sample Call:**

  ```javascript
   curl --location --request GET 'http://localhost:3000/api/quote''
  ```

  * **Sample Call:**

  ```javascript
   curl --location --request GET 'http://localhost:3000/api/holiday''
  ```

**Get image**
----
  get random image every day.

* **URL**

  /api/wallpaper

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      {
        "url": "https://images.unsplash.com/photo-1569176106333-acbfe0bacabb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNDY1NX0",
        "creator": "Stephen Walker"
      }
    }
    ```

* **Sample Call:**

  ```javascript
   curl --location --request GET 'http://localhost:3000/api/wallpaper''
  ```