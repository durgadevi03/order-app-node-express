ROOT FILE
----------
server.js

.env
----------
Configuration file

config.js
----------
Database Configuration - (MySql Database)

dbscripts
-----------
contains database schema(schema.sql)

MIDDLEWARES
---------------
* validation.js
    * Input field validations using 'express-validator'

* auth.js
    * For Authentication using jwt

* permit.js
    * For role based authorization 

API's 
--------------
* USERS
    * Login and Register a user - ADMIN/CUSTOMER  
* ORDERS 
    * PERMIT access - CUSTOMER 
    * Placing a new orders and fetching all orders
* PRODUCTS 
    * PERMIT access - ADMIN
    * To add/update/delete Products in database

