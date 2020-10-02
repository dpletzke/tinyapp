<div class="instructions">

## Goal

This four-day project will have you building a web app using Node. The app will allow users to shorten long URLs much like TinyURL.com and bit.ly do.

You will build an HTTP Server that handles requests from the browser (client). Along the way you'll get introduced to some more advanced JavaScript and Node concepts, and you'll also learn more about Express, a web framework which is very popular in the Node community.

## Functional Requirements

### Behavior Requirements

*   `GET /`

    *   <s>if user is logged in:
        *   (Minor) redirect to `/urls`
    *   if user is not logged in:
        *   (Minor) redirect to `/login`</s>
*   `GET /urls`

    *  <s> if user is logged in:
        *   returns HTML with:
        *   the site header (see Display Requirements above)
        *   a list (or table) of URLs the user has created, each list item containing:
            *   a short URL
            *   the short URL's matching long URL
            *   an edit button which makes a GET request to `/urls/:id`
            *   a delete button which makes a POST request to `/urls/:id/delete`</s>
            *   (Stretch) the date the short URL was created
            *   (Stretch) the number of times the short URL was visited
            *   (Stretch) the number number of unique visits for the short URL
        *   <s>(Minor) a link to "Create a New Short Link" which makes a GET request to `/urls/new`
    *   if user is not logged in:
        *   returns HTML with a relevant error message</s>
*   `GET /urls/new`

    *  <s> if user is logged in:
        *   returns HTML with:
        *   the site header (see Display Requirements above)
        *   a form which contains:
            *   a text input field for the original (long) URL
            *   a submit button which makes a POST request to `/urls`
    *   if user is not logged in:
        *   redirects to the `/login` page</s>
*   `GET /urls/:id`

    *   if user is logged in and owns the URL for the given ID:
        *   returns HTML with:
        *   <s>the site header (see Display Requirements above)
        *   the short URL (for the given ID)
        *   a form which contains:
            *   the corresponding long URL
            *   an update button which makes a POST request to `/urls/:id`</s>
        *   (Stretch) the date the short URL was created
        *   (Stretch) the number of times the short URL was visited
        *   (Stretch) the number of unique visits for the short URL
    *   if a URL for the given ID does not exist:
        *   <s>(Minor) returns HTML with a relevant error message
    *   if user is not logged in:
        *   returns HTML with a relevant error message
    *   if user is logged it but does not own the URL with the given ID:
        *   returns HTML with a relevant error message</s>
*   `GET /u/:id`

    *   <s>if URL for the given ID exists:
        *   redirects to the corresponding long URL</s>
    *   if URL for the given ID does not exist:
        *   (Minor) **returns HTML with a relevant error message**
*   `POST /urls`

    *   if user is logged in:
        *   <s>generates a short URL, saves it, and associates it with the user
        *   redirects to `/urls/:id`, where `:id` matches the ID of the newly saved URL</s>
    *   if user is not logged in:
        *   (Minor) **returns HTML with a relevant error message**
*   `POST /urls/:id`

    *   if user is logged in and owns the URL for the given ID:
        *   <s>updates the URL
        *   redirects to `/urls`</s>
    *   if user is not logged in:
        *   (Minor) **returns HTML with a relevant error message**
    *   if user is logged it but does not own the URL for the given ID:
        *   (Minor) **returns HTML with a relevant error message**
    *   `POST /urls/:id/delete`
    *   if user is logged in and owns the URL for the given ID:
        *   <s>deletes the URL
        *   redirects to `/urls`</s>
    *   if user is not logged in:
        *   (Minor) **returns HTML with a relevant error message**
    *   if user is logged it but does not own the URL for the given ID:
        *   (Minor) **returns HTML with a relevant error message**
*   `GET /login`

    *   if user is logged in:
        *   (Minor) **redirects to `/urls`**
    *   <s>if user is not logged in:
        *   returns HTML with:
        *   a form which contains:
            *   input fields for email and password
            *   submit button that makes a POST request to `/login`</s>
*   `GET /register`

    *   if user is logged in:
        *   (Minor) **redirects to `/urls`**
    *  <s> if user is not logged in:
        *   returns HTML with:
        *   a form which contains:
            *   input fields for email and password
            *   a register button that makes a POST request to `/register`</s>
*   `POST /login`

    * <s>  if email and password params match an existing user:
        *   sets a cookie
        *   redirects to `/urls`</s>
    *   if email and password params don't match an existing user:
        *   returns HTML with a relevant error message
*   `POST /register`

    *   <s>if email or password are empty:
        *   returns HTML with a relevant error message
    *   if email already exists:
        *   returns HTML with a relevant error message</s>
    *   otherwise:
        *  <s> creates a new user
        *   encrypts the new user's password with `bcrypt`
        *   sets a cookie
        *   redirects to `/urls`</s>
*   `POST /logout`

    *   <s>deletes cookie
    *   redirects to `/urls`</s>

</div>