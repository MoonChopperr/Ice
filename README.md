# ICE
For my capstone project during my time at app academy I decided on making a steam clone.
I put a lot of effort into the styling for it to look similar to Steam however there is still much more left to do (as per usual)

# Features
* Logging in
https://github.com/MoonChopperr/Ice/assets/146145323/7b93e4fe-3ce3-4937-933b-a50914cce3ff
* Games
https://github.com/MoonChopperr/Ice/assets/146145323/c807c1a2-96ae-479d-ad18-73c937fb1f71
* Cart (Checkout)
https://github.com/MoonChopperr/Ice/assets/146145323/0b8df7f4-75d9-4fef-a32f-66958e35079d
* Wishlist
https://github.com/MoonChopperr/Ice/assets/146145323/50a196b4-01b2-4404-bc12-f0fa737abf88
* Reviews
https://github.com/MoonChopperr/Ice/assets/146145323/353cca86-544a-4966-957f-b57e0553bf10
* Upvoting funny/helpful attributes on a review
![smallfeature](https://github.com/MoonChopperr/Ice/assets/146145323/99d9b98a-d5b1-48f5-84e9-22e336af655d)

# Hosted On
![Render](https://img.shields.io/badge/Render-333333?style=for-the-badge&logo=render&logoColor=white)

# Tech Stack
![JavaScript](https://img.shields.io/badge/JavaScript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/Python-3670A0?logo=python&logoColor=ffdd54)
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?logo=css3&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?logo=npm&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?logo=markdown&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-160078?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-%23232F3E.svg?logo=amazon-aws&logoColor=white)
![Amazon S3](https://img.shields.io/badge/Amazon_S3-569A31?logo=amazon-s3&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)
![Render](https://img.shields.io/badge/Render-333333?style=for-the-badge&logo=render&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-007ACC?logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-282C34?logo=sqlalchemy&logoColor=white)
![Adobe Photoshop](https://img.shields.io/badge/Adobe%20Photoshop-31A8FF?logo=adobe-photoshop&logoColor=white)

# Installation guide
## Clone the repo
## Install necessary dependencies
- run `pipenv install -r requirements.txt` in the root project folder
- run `npm install` in react-vite folder
## Other dependencies
- `npm i react-responsive-carousel`
- `npm i date-fns`
- `pip i email-validator`
- `pipenv install boto3`
## Create and populate .env file
- SECRET_KEY
- DATABASE_URL
- SCHEMA
- S3_BUCKET
- S3_KEY
- S3_SECRET
## Database
- run `pipenv flask db init`
## Migration
- run `pipenv run flask db upgrade`
## Seeders
- run `pipenv run flask seed all`
## Start up server
- run `pipenv run flask run` in root project folder
- run `npm run dev` in `react-vite` folder

# DEMO
## Login
## Games
## Wishlist
## Checkout
## Library
## Reviews
## Review rating

# API Documentation

## All endpoints that require authentication

All endpointss that require a current user to be logged in.
* Request: endpoints that require authentication
* Error Response: Require authentication
    * Status Code: 401
    * Headers:
        * Content-Type:application/json
    * Body:
        ```json
        {
            "message": "Authentication required"
        }
        ```

## All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Forbidden"
    }
    ```

# Users

## Get the Current user

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/users/<int:id>
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "wallet": 500
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log in a User

Logs in a current user with valid credentials and returns the current user's information.

* Require Authentication: false
* Request
    * Method: POST
    * URL: /api/auth/login
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret_password"
    }
    ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Log out a User
Logs out the current user
* Require Authentication: True
* Request
    * Method: GET
    * URL: /api/auth/logout
    * Body: None
* Successful Response
    * Status Code:200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
      "message": "User logged out"
    }
    ```


### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret_password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
      }
    }
    ```

### Get all Users

Returns the information about all users from the database when logged in

* Require Authentication: true
* Request
    * Method: GET
    * URL:/api/users
    * Body: None
* Successful Response when there is a logged in user
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
        {
        "users": [
            {
                "email": "demo@aa.io",
                "id": 1,
                "username": "Demo",
                "wallet": 400.0
            }
        ]
    }
    ```

## Games

### Get Games
Returns all games
* Require Authentication: false
* Request
    * Method: GET
    * URL:/api/game
    * Body: None
* Successful Response
    * Status Code:200
    * Headers:
        * Content-Type:application/json
    * Body:
    ```json
    {
        "games": [
            {
                "ESRB_rating": "T",
                "about": "Welcome to a new world! In Monster Hunter: World, the latest installment in the series, you can enjoy the ultimate hunting experience, using everything at your disposal to hunt monsters in a new world teeming with surprises and excitement.",
                "createdAt": "2024-04-03T22:30:18.333448",
                "developer": "CAPCOM Co., Ltd.",
                "franchise": "Monster Hunter",
                "genre": "Action",
                "id": 1,
                "images": "https://ice-capstone-bucket.s3.amazonaws.com/mhwheader.jpg",
                "owner_id": 4,
                "price": 29.99,
                "publisher": "CAPCOM Co., Ltd.",
                "release_date": "2018-08-08",
                "title": "Monster Hunter World",
                "updatedAt": "2024-04-03T22:30:18.333450"
            }
        ]
    }
    ```

### Get a Game by id

Returns a game specified by id

* Require Authentication: false
* Request
    * Method: GET
    * URL:/api/game/
    * Body: none
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "ESRB_rating": "T",
    "about": "Welcome to a new world! In Monster Hunter: World, the latest installment in the series, you can enjoy the ultimate hunting experience, using everything at your disposal to hunt monsters in a new world teeming with surprises and excitement.",
    "createdAt": "2024-04-03T22:30:18.333448",
    "developer": "CAPCOM Co., Ltd.",
    "franchise": "Monster Hunter",
    "genre": "Action",
    "id": 1,
    "images": "https://ice-capstone-bucket.s3.amazonaws.com/mhwheader.jpg",
    "owner_id": 4,
    "price": 29.99,
    "publisher": "CAPCOM Co., Ltd.",
    "release_date": "2018-08-08",
    "title": "Monster Hunter World",
    "updatedAt": "2024-04-03T22:30:18.333450"
    }
    ```

### Create a Game
Create a new game
* Require Authentication: true
* Request
    * Method: POST
    * URL: /api/game/create
    * Headers:
        * Content-Type: multipart/form-data
    * Body:
    ```json
    {
        "title": "BloodBorne PC",
        "release_date": "2025-02-27",
        "publisher": "Sony",
        "developer": "NEW STUDIO",
        "franchise": "BloodBorne",
        "price": 69.99,
        "genre": "action",
        "about": "The game we have been waiting for to come to pc",
        "ESRB_rating": "M",
        "image": "Image URL"
    }
    ```
* Error response: Body validation errors
    * Status Code: 400
    * Headers:
        * Content-Type:application/json
    * Body:
    ```json
    {
        "error": {
        "developer": [
            "This field is required."
        ],
        "genre": [
            "This field is required." ||  "Invalid genre, here is a list of valid genres to pick from! Action, Fighting, Visual Novel, Platformer, Open World, MOBA, Horror, Rhythm / Music, Roguelike / Roguelite, Adventure, Party / Mini-Games, Puzzle, Survival, Virtual Reality, Racing, RPG, Simulation, Sandbox, Free To Play, Sports, Strategy, Battle Royale, Metroidvania, MMORPG, Stealth, Casual"
        ],
        "image": [
            "This field is required."
        ],
        "publisher": [
            "This field is required."
        ],
        "release_date": [
            "This field is required." || "Release date cannot be in the past"
        ],
        "title": [
            "This field is required." || "Title must be less than 30 characters"
        ],
        "description": [
            "This field is required." || "Description must be less than 193 characters"
        ],
        "price": [
            "This field is required." || "Price cannot be less than $0.00" || "Price must be a number"
        ],
        "about":[
            "This field is required." || "Description must be less than 193 characters"
        ]

    }
    }
    ```


### Update a Game
Update an existing game if you are the owner of the game
* Require Authentication: True
* Require Authorization: True
* Request
    * Method: PUT
    * URL: /api/game/<int:id>
* Body:
```json
    {
        "title": "BloodBorne Remastered",
        "release_date": "2025-02-28",
        "publisher": "Microsoft",
        "developer": "BlueMoon",
        "franchise": "BloodBorne",
        "price": 69.99,
        "genre": "action",
        "about": "The game we have been waiting for to come to pc!",
        "ESRB_rating": "M",
        "image": "Image URL"
    }
```
* Successful Response
    * Status Code: 200
    * Headers:
        *Content-Type: application/json
    * Body:
    ```json
    {
        "title": "BloodBorne Remastered",
        "release_date": "2025-02-28",
        "publisher": "Microsoft",
        "developer": "BlueMoon",
        "franchise": "BloodBorne",
        "price": 69.99,
        "genre": "action",
        "about": "The game we have been waiting for to come to pc!",
        "ESRB_rating": "M",
        "image": "Image URL"
    }
    ```
* Error response: Game could not be found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "error": "Game could not be found"
    }
    ```
<!-- * Error response: Not owner of game
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
    *Body:
    ```json
    {
        "error": "You are not authorized to edit this game"
    }
    ``` -->
* Error response: Body validation errors
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    *Body:
    ```json
    {
         "error": {
            "developer": [
                "This field is required."
            ],
            "genre": [
                "This field is required." ||  "Invalid genre, here is a list of valid genres to pick from! Action, Fighting, Visual Novel, Platformer, Open World, MOBA, Horror, Rhythm / Music, Roguelike / Roguelite, Adventure, Party / Mini-Games, Puzzle, Survival, Virtual Reality, Racing, RPG, Simulation, Sandbox, Free To Play, Sports, Strategy, Battle Royale, Metroidvania, MMORPG, Stealth, Casual"
            ],
            "image": [
                "This field is required."
            ],
            "publisher": [
                "This field is required."
            ],
            "release_date": [
                "This field is required." || "Release date cannot be in the past"
            ],
            "title": [
                "This field is required." || "Title must be less than 30 characters"
            ],
            "description": [
                "This field is required." || "Description must be less than 193 characters"
            ],
            "price": [
                "This field is required." || "Price cannot be less than $0.00" || "Price must be a number"
            ],
            "about":[
                "This field is required." || "Description must be less than 193 characters"
            ]
        }
    }
    ```

### Delete a Game by id

Delete an existing game by id.
* Require Authentication: True
* Require Authorization: True
* request
    * Method: DELETE
    * URL: /api/game/<int:id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type:application/json
    *Body:
    ```json
    {
        "message": "Successfully deleted game"
    }
    ```
* Error response: Game not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
        * Body:
        ```json
        {
            "error": "Game could not be found"
        }
        ```

## Cart

### Get current user cart
* Require Authentication: True
<!-- * Require Authorization: True -->

* Request
    * Method: GET
    * URL: /api/cart/current
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
         "currentCart": [
        {
            "createdAt": "2024-04-04T23:07:52.471717",
            "game_id": 2,
            "id": 1,
            "quantity": 1,
            "updatedAt": "2024-04-04T23:07:52.471719",
            "user_id": 1
        }
    ]
    }
    ```
* Successful Response: Cart empty
    * Status Code: 200
    * Headers: Content-Type: application/json
    * Body:
    ```json
    {}
    ```

### Add a Game to cart
* Require Authentication: True
<!-- * Require Authorization: True -->
* Request
    * Method: POST
    * URL: /api/cart/create
    * Body: None
* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "game_id":1
    }
    ```
* Error Response: Game not found
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Can't add to cart"
    }
    ```

### Update quantity of a Game in cart
* Require Authentication: True
<!-- * Require Authorization: True -->
* Request
    * Method: PUT
    * URL: /api/cart/update/<int:id>
    * Body:
    ```json
    {
        "quantity": 3
    }
    ```
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "game_id":1,
        "quantity":3
    }
    ```
* Error Response: Cart item not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Cart item not found"
    }
    ```

### Delete a Game from cart
Delete an item in current users cart.

* Require Authentication: True
<!-- * Require Authorization: True -->
* Request
    * Method: DELETE
    * URL: /api/cart/delete/<int:id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Cart item deleted successfully"
    }
    ```
* Error Response: Cart item not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Cart item not found"
    }
    ```

### Clear all Games in cart
Clears the current users entire cart

* Require Authentication: True
* Request
    * Method: DELETE
    * URL: /api/cart/clear
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Cart cleared"
    }
    ```

## Wishlist

### Get current user Wishlist
Returns current user wishlist.
* Require Authentication: True
* Request
    * Method: GET
    * URL: /api/wishlist/current
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
            "currentWishlist": [
            {
                "createdAt": "2024-04-06T05:25:51.897060",
                "game_id": 1,
                "id": 1,
                "rank": 0,
                "updatedAt": "2024-04-06T05:25:51.897062",
                "user_id": 1
            }
        ]
    }
    ```

### Add a game to Wishlist
Add a game to current user wishlist
* Require Authentication: True
* Request
    * Method: POST
    * URL: /api/wishlist
    * Body:
    ```json
    {
        "game_id": 5
    }
    ```
* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "createdAt": "2024-04-08T18:56:15.697727",
        "game_id": 6,
        "id": 4,
        "rank": 0,
        "updatedAt": "2024-04-08T18:56:15.697731",
        "user_id": 1
    }
    ```
* Error Response: Game already exists in wishlist
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Game already in wishlist"
    }
    ```

* Error Response: Game does not exist
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Game doesn't exist"
    }
    ```

<!-- * Error Response: Wishlist does not exist
    * Status Code: 400
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Can't add to wishlist"
    }
    ``` -->

### Update game rank
A user can update the rank of a Game in their Wishlist
* Require Authentication: True

* Require Authorization: True

* Request
    * Method: PUT
    * URL: /api/wishlist/<int:wishlist_item_id>
    * Body:
    ```json
    {
        "game_id": 4,
        "rank":1
    }
    ```
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "createdAt": "2024-04-06T05:25:51.897060",
        "game_id": 4,
        "id": 1,
        "rank": 1,
        "updatedAt": "2024-04-08T19:03:02.933388",
        "user_id": 1
    }
    ```
* Error Response: Wishlist item not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Wishlist item not found"
    }
    ```

### Delete game from wishlist
Current user can delete a game from their Wishlist
* Require Authentication: True

* Require Authorization: True

* Request
    * Method: DELETE
    * URL: /api/wishlist/<int:wishlist_item_id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Wishlist item deleted"
    }
    ```
* Error Response: Wishlist item not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
       "message": "Wishlist item not found"
    }
    ```

## Reviews

### Get all reviews for a single game
Returns all reviews on a game's details page
* Require Authentication: False

* Require Authorization: False

* Request
    * Method: GET
    * URL: api/review/game/<int:game_id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        [
    {
        "createdAt": "Wed, 17 Apr 2024 23:43:44 GMT",
        "funny": 0,
        "game_id": 1,
        "helpful": 0,
        "id": 1,
        "rating": -1,
        "review": "The graphics are stunning, but the movement is so slow and boring.",
        "updatedAt": "Wed, 17 Apr 2024 23:43:44 GMT",
        "user_id": 2,
        "username": "Kaizer"
    },
        ]
    }
    ```
* Successful Response: No reviews
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
       "message": "No reviews"
    }
    ```

### Get all reviews from specific user
Returns all reviews from user
* Require Authentication: True

* Require Authorization: True

* Request
    * Method: GET
    * URL: api/review/user/<int:user_id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
       "reviews": [
        {
            "createdAt": "Wed, 17 Apr 2024 23:43:44 GMT",
            "funny": 0,
            "game_id": 1,
            "helpful": 0,
            "id": 1,
            "rating": -1,
            "review": "The graphics are stunning, but the movement is so slow and boring.",
            "updatedAt": "Wed, 17 Apr 2024 23:43:44 GMT",
            "user_id": 2
        }
       ]
    }
    ```
* Successful Response: No reviews
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
       "message": "No reviews"
    }
    ```

### Create a review
A logged in user can create a review on a game they own
* Require Authentication: True

* Request
    * Method: POST
    * URL: api/review/create
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "game_id": 1,
    "review": "test",
    "rating": 1
    }
    ```
* Error Response: Cannot review if you are the owner of the game
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
* Error Response: Game not found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
* Error Response: Already reviews a game once
    * Status Code: 403
    * Headers:
        * Content-Type: application/json

### Update a review
A user can update their existing review's description and rating
* Require Authentication: true

* Require Authorization: true
* Request
    * Method: UPDATE
    * URL: api/review/<int:review_id>
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "game_id": 1,
    "review": "edited",
    "rating": -1
    }
    ```
* Error Response: Review could not be found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "message": "Review could not be found"
    }
    ```

### Delete a review
A user can delete their own review
* Require Authentication: True

* Require Authorization: True
* Request
    * Method: UPDATE
    * URL: api/review/<int:review_id>
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "message": "Successfully deleted review"
    }
    ```
* Error Response: Review could not be found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "message": "Review could not be found"
    }
    ```
## Funny & Helpful on Reviews

### Increment helpful attribute
Upvote the helpful value on a review
* Require Authentication: True
* Request
    * Method: POST
    * URL: api/review/<int:id>/helpful
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "createdAt": "Wed, 17 Apr 2024 23:43:44 GMT",
    "funny": 1,
    "game_id": 3,
    "helpful": 4,
    "id": 14,
    "rating": -1,
    "review": "This game is a disappointment. I expected more from it.",
    "updatedAt": "Thu, 18 Apr 2024 22:57:02 GMT",
    "user_id": 5
    }
    ```
* Error Response: Review could not be found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "error": "Review could not be found"
    }
    ```
* Error Response: Cannot rate own review
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "error": "You cannot rate your own review"
    }
    ```

### Decrement helpful attribute
Downvote the helpful value on a review
* Require Authentication: True
* Request
    * Method: DELETE
    * URL: api/review/<int:id>/helpful
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "createdAt": "Wed, 17 Apr 2024 23:43:44 GMT",
    "funny": 1,
    "game_id": 3,
    "helpful": 3,
    "id": 14,
    "rating": -1,
    "review": "This game is a disappointment. I expected more from it.",
    "updatedAt": "Thu, 18 Apr 2024 22:57:02 GMT",
    "user_id": 5
    }
    ```
* Error Response: Review could not be found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "error": "Review could not be found"
    }
    ```
* Error Response: Cannot rate own review
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "error": "You cannot rate your own review"
    }
    ```

### Increment funny attribute
Upvote the funny value on a review
* Require Authentication: True
* Request
    * Method: POST
    * URL: api/review/<int:id>/funny
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "funny": 2
    }
    ```
* Error Response: Review could not be found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "error": "Review could not be found"
    }
    ```
* Error Response: Cannot rate own review
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "error": "You cannot rate your own review"
    }
    ```

### Decrement funny attribute
Downvote the funny value on a review
* Require Authentication: True
* Request
    * Method: DELETE
    * URL: api/review/<int:id>/funny
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "funny": 1
    }
    ```
* Error Response: Review could not be found
    * Status Code: 404
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "error": "Review could not be found"
    }
    ```
* Error Response: Cannot rate own review
    * Status Code: 403
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "error": "You cannot rate your own review"
    }
    ```
## Library
### Get library
Returns all games user purchased
* Require Authentication: True

* Request
    * Method: GET
    * URL: api/library/
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
      "library": []
    }
    ```
### Checkout cart
When a user checksout game(s) will be added to library
* Require Authentication: True

* Request
    * Method: POST
    * URL: api/library/checkout
    * Body: None
* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
    "message": "Cart checked out successfully"
    }
    ```
