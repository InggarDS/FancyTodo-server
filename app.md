**Show list todo**
----
  Returns all json data about todo .

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

  none

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 4, title: "Task 1", description : "add feature in Task 1", status : "on Progress", due_date : "2020-04-12T00:00:00.000Z" } `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/todos",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```