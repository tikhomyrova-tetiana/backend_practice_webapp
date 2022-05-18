# Plan

## Setup

1. copy templates + clone them + npm install
2. Create elephantSQL DB and adjust config.json
3. migrate + seed.
4. Run both templates and check everything is fine! Should be able to log in and sign up. - Done

## Starting

1. Create models for Space and story
2. set up constraints.
3. and set up relations (foreign keys + relations in models).
4. Create seeds + seed.
5. Create a test endpoint and try out with Postman or httpie.

--- Backend set up and running --- Done

## Feature 1:

1. Create an endpoint (GET = /spaces) => returns all spaces. (try it out).
2. Create a new page (Homepage). <div>Homepage</div>
   -- fetch the data --
3. Create a slice to keep the spaces
4. Write a thunk that fetches this data.
5. Have a reducer to store this data in the store
6. (CHECK THE DATA IS IN THE STORE).
7. Write a selector to get this data to my homepage. (console.log it!)
8. Create a "card" component to render spaces. should use backgroundColor and color from object.
9. Add link to details page.

# Feature 5 (my space page works):

Backend:

1. Write a POST - /space/:id/story that takes params from the body (name, content, imageUrl, spaceId) => creates a story. Test it with httpie
2. First without auth, add auth middleware and try again.

Frontend:

1. Make a button `Post cool story bro` that shows/hides something (eventually it will be the form).
2. Make the form (correct inputs, etc, with submit button)
3. submit button => onSubmit => eventually sends a POST.
4. Write a thunk that makes a POST to the backend to my endpoint. (try without auth)
5. Check the database! is it created?
6. get token from user slice and add to request (try with auth).
7. Display success message (steal from the login).
8. Add preview of the image
