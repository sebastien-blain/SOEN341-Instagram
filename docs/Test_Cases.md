# Test Cases
Test are performed in the following website [MyPanda](https://www.mypanda.space/)

## Test 1: Login Test
__Description__: This test consist of creating an account and login in

__Input__:  
1. On the website enter a username
2. Enter a password
3. Click on the Login/Register button

__Expected Output__: The user should be located in the homepage after loading

__Results__:
- [ ] Passed
- [ ] Failed
- [ ] Not applicable

## Test 2: Upload Image
__Description__: This test consist of uploading an image

__Input__:  
1. On the website a user must first login
2. On the side bar, navigate to the `Upload`
3. Upload an image with description

__Expected Output__: After navigating to `Account`, the image should be displayed in a box

__Results__:
- [ ] Passed
- [ ] Failed
- [ ] Not applicable

## Test 3: Update Bio
__Description__: This test consist of updating a user biography

__Input__:  
1. On the website a user must first login
2. On the side bar, navigate to the `Account`
3. Type in the bio textfield a new bio

__Expected Output__: The bio of the user should be updated

__Results__:
- [ ] Passed
- [ ] Failed
- [ ] Not applicable

## Test 4: Search for a user
__Description__: This test consist of searching for a user

__Input__:  
1. On the website a user must first login
2. On the side bar, navigate to the `Search`
3. Type the first letter of the username you are looking for

__Expected Output__: The list should be updated with user starting with the letter entered

__Results__:
- [ ] Passed
- [ ] Failed
- [ ] Not applicable

## Test 5: Follow another user
__Description__: This test consist of following another user

__Input__:  
1. On the website a user must first login
2. On the side bar, navigate to the `Search`
3. Click on the username of any other user
4. When the user page loads click on the follow button

__Expected Output__: 
* The follow button should change to an unfollow button
* The number of followers should increment by one

__Results__:
- [ ] Passed
- [ ] Failed
- [ ] Not applicable

## Test 5: Comment on an image
__Description__: This test consist of commenting on an image

__Input__:  
1. On the website a user must first login
2. On the home page an image should display
3. If there's no image, upload an image
4. On the image box click on the comment icon
5. Enter a comment and post

__Expected Output__: When clicking on the show more button the new comment should be displayed

__Results__:
- [ ] Passed
- [ ] Failed
- [ ] Not applicable

## Test 6: Like an image
__Description__: This test consist of liking an image

__Input__:  
1. On the website a user must first login
2. On the home page an image should display
3. If there's no image, upload an image
4. On the image box click on the heart icon

__Expected Output__: 
* The like counter should have incremented by one
* The like icon should be red

__Results__:
- [ ] Passed
- [ ] Failed
- [ ] Not applicable

## Test 7: Logout
__Description__: This test consist of logging out

__Input__:  
1. On the website a user must first login
2. On the navigation bar, navigate to `Logout`

__Expected Output__: User should be back to the login page

__Results__:
- [ ] Passed
- [ ] Failed
- [ ] Not applicable
