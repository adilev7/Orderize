# ORDERIZE

**A web application for managing orders and inventory.**

This project was made as a final project for a 7 month course on Full Stack Web Development.  
Through this project I will demonstrate my knowledge using **React.Js, Node.Js** and **MongoDB**.

- **Description**
  The system includes pages for managing products, users and orders.

- **User configuration**  
  The ability for a SuperUser (admin) to create new users and grant permissions to each user.
  Ability to join (sign up) for a new user.
  Login page, Log in to the system - Upon completion of the identification, a JWT token is issued which is sent to the client and inserted into the headers of each request from the client to the server.

- **Orders and products management**  
  Ability to view the orders list and the products list (existing inventory).
  An admin user can create, edit and delete products / orders (CRUD).

- **Validation**  
  Validation is done both on the client side and server side by JOI.
  In the development process I took into account simplicity and accessibility to the user and functionality in the connection between the various collections.

## INSTALLATION

Make sure none of the ports 3900 and 3000 in your localhost are used.

1. Open a CMD window and paste the following:

   ```
   git clone (https://github.com/adilev7/orders.git)
   ```

Optionaly download the zip file and extract it instead.

2. Open the main folder (orders-master) with your code editor.
3. Split CMD into two windows then type in one of them:  
   `cd BE`  
   `npm i`  
   `npm run watch`

4. In the other window of the CMD type:  
   `cd FE/orders`  
   `npm i`  
   `npm start`

## USAGE

• Sign in using the exisiting regular user:  
 Email: b@b.com  
 Password: 123456

As a regular user you can:

- View all the orders and products listed by the admin users, and get down to specifics of each order/product.
- Mark any order you want as starred and it will be saved as starred the next time you log in.

• Sign in using the existing admin user:  
 Email: a@a.com  
 Password: 123456

As an admin user you can also view every order/product and mark an order as starred like a regular user.
On top of that you can also: - Create, Update and Delete orders/products.

- Create a new user and give permissions as an admin user or as a regular user.
- Mark orders as important - this will be seen by every user regardless if admin or not.

• You can create your own regular user as well using the 'Sign up' page (only an admin user can create another admin user).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
