# a-A-capstone
My capstone project for mod 7 during my time at a/A

# user stories

## 1. Game
### Viewing a Game
- When I'm on `/app/:id` page:
    - Whether I am logged in or logged out, I want to be able to view the games' details

- A user should be able to see a list of games on the landing page `/app` but also see a search bar

### Creating a Game
- When I'm on the landing page `/app`
    - If I am a logged in user I want to see a button that can navigate me to a form to create a game on `/app/create`. *A 1:1 copy would actually have another page that you have to go through a lot of legal jargon to be able to upload and post a game and for study sake this action is streamlined

    - On form submission the user should be navigated to the `/app/:id` page which shows all the details of the game as well as any reviews if any

### Updating a Game
- As a User if I am the owner of a game I should see an update game button on the `/app/:id` page of my game
    - This should redirect me to the update a game form to update. `/app/update`

### Deleting a Game
- As a User if I am the owner of a game I should see a delete game button on the `/app/:id` page of my game
    - This should render a model that prompts the user if they are sure about deleting a game.
        - Upon Deletion the User should navigate back to `/app`

## 2. Cart/Checkout
### Viewing cart
- When I'm on `/app/cart` page:
    - I should be logged in to view my shopping cart on this page
    - I can then navigate to continue shopping or continue to make a payment

### Adding to cart
- When I'm on any game page `/app/:id` I should be able to see an `Add to Cart` button that will open a modal signaling i've added said item to my cart

### Updating cart
- When I'm on `/app/cart` page:
    - I should be able to see the items in my cart. Each item should have an `add` and `remove` button for doing said action on an item.
        - Clicking add will populate my cart with another copy of the product and update my est. total

### Deleting cart
- When I'm on `/app/cart` page:
    - I should be able to see the items in my cart. Each item should have an `add` and `remove` button for doing said action on an item.
        - Clicking remove will remove the item from my cart updating my est. total



<!-- ## 3. User Reviews
### Viewing reviews
- When I'm on `/app/:id` page:
    - Whether I am logged in or logged out, I want to be able to view reviews on the game's details page.
    - At the bottom of the games/:id page I should see a clickable text `Browse all # reviews` which will redirect me to a page with all the games' reviews at `/app/:id/reviews`

### Creating reviews
- When I'm on `/app/:id` page:
    - If the user is logged in and owns the game they should be able to see a module that will let them post a review for the game
        - If the user does not own the game then the user should not be able to post a review.

### Updating reviews
- When I'm on the `/app/:id` page:
    - If the user is logged in, owns the game, and has a review already then instead of create a review button it will render a `View your review` button.
        - Clicking the button will redirect to a new page `/app/reviews/:id`
            The user should see an `Edit Review` and `Delete` button
        - Clicking `Edit Review` will render a form to update your review on the same page.
            - User will be able to hit `Cancel` or `Save Changes`
                - Cancel will close and unrender the form
                - Save Changes will
                    - Trying to update with 0 description of a review will return a modal `Error your review cannot be empty.` with an ok and x button to close the modal
                    - On successful update the user will not be redirected anywhere except for the rendered module will go back to default and the updated review will be pending for anaylsis as well as showing our new updated review

### Deleting reviews
- When I'm on the `/app/:id` page:
    - If the user is logged in, owns the game, and has a review already then instead of create a review button it will render a `View your review` button.
        - Clicking the button will redirect to a new page `/app/reviews/:id`
            The user should see an `Edit Review` and `Delete` button
        - Clicking `Delete Review` will render a modal that asks `Delete Review? Are you sure you want to delete this review? This cannot be undone.` With an okay and cancel button.
            - On deletion confirmation the user is brought back to the `/app/:id` page. *would be user's all reviews -->

<!-- ## 4. User profile
### Viewing profile
- When I'm on `/app/profile/:id`
    - Whether I am logged in or logged out, I want to be able to view a user's profile page.
- When I am on most pages I should be able to click a dropdown button on my user on the nav bar that'll navigate me to my `/app/profile/:id` page or `/app/profile/:id/account`

### Creating a profile
- When I'm on `/app/profile/:id` there should be a button to edit my profile, this will redirect the user to `/app/profile/:id/edit`

### Updating a profile
- When I'm on `/app/profile/:id/edit`
    - I should be able to edit my profile if i'm logged in.

### Deleting a user
- When I'm on `/app/profile/:id/account`
    - I should be able to delete my account -->



# MVP's Feature list

## 1. Games
- Users can view games, logged in users can view, create, delete, and update games

## 2. Cart/Checkout
- Logged in users can checkout, view their cart of games, update their cart, and delete their cart

## 3. Wishlist
- Logged in users can view, mark, update, and delete their wishlisted games

## 4. Reviews
- Users can view reviews, logged in users can view, create, delete, and update reviews

## 5. Comments
- Logged in users can comment on reviews, edit and delete after.

# Bonus features

## 6. Profile
- A user after sign up can navigate to their profile where they can update and customize the look of their profile

## 7. Search
- Users can search games and view them



# Schema




# Questions
