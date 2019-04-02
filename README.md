## Assignment2
# NodeJs PizzaCompany API

### Users
#### Create
localhost:3000/users, method: POST

Required data: firstName, lastName, email, password, address

Example
```bash
{
	"firstName": "Peter",
	"lastName": "Griffin",
	"email": "test3@test.com",
	"password": "123abc",
	"address": "Main street 23"
}
```
#### Check
Only logged in users

localhost:3000/users?email='userEmailAddress', method: GET

#### Edit
Only logged in users

localhost:3000/users, method: PUT

Required data: email

Optional data: firstName, lastName, password, address (at least one of them must be provided)

Example
```bash
{
	"firstName": "Peter",
	"lastName": "Griffin",
	"email": "test3@test.com",
	"password": "123abc",
	"address": "Main street 23"
}
```
#### Delete
Only logged in users
localhost:3000/users?email='userEmailAddress', method: DELETE

Required data: firstName, lastName, email, password, address

### Tokens
#### Create(login)
localhost:3000/tokens, method: POST

Required data: email, password

Example
```bash
{
	"email": "test3@test.com",
	"password": "123abc",
}
```
#### Check

Only logged in users

localhost:3000/tokens?id=tokenId, method: GET

Required data: email, password

#### Delete(log out)

Only logged in user

localhost:3000/tokens?id=tokeId, method: DELETE

### Menu

Only logged in users

localhost:3000/menu, method: GET

Required data: email
```bash
{
	"email": "test3@test.com"
}
```
### Shoppingcart
#### Add item
 Only logged in users
 
 localhost:3000/shoppingcart, method:POST
 
 Required data: email, pizza
 ```bash
{
	"email": "test3@test.com",
  "pizza": "1"
}
```
#### Check the shoppingcart
Only logged in users

localhost:3000/shoppingcart, method: GET
 Required data: email
 ```bash
{
	"email": "test3@test.com"
}
```

#### Clear the shoppingcart
Only logged in users

localhost:3000/shoppingcart, method: PUT

Requird data: email
 ```bash
{
	"email": "test3@test.com"
}
```

### Order
Only logged in users

localhost:3000/order, method: POST

Requird data: email
 ```bash
{
	"email": "test3@test.com"
}
```



 

