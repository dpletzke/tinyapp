# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

<!-- !["screenshot description"](#)
!["screenshot description"](#) -->

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.

### TODO

*   `GET /urls`
    *   if user is logged in:
        *   returns HTML with:
        *   a list (or table) of URLs the user has created, each list item containing:
            *   (Stretch) the date the short URL was created
            *   (Stretch) the number of times the short URL was visited
            *   (Stretch) the number number of unique visits for the short URL
*   `GET /urls/:id`

    *   if user is logged in and owns the URL for the given ID:
        *   returns HTML with:
        *   (Stretch) the date the short URL was created
        *   (Stretch) the number of times the short URL was visited
        *   (Stretch) the number of unique visits for the short URL
*   `GET /u/:id`
    *   if URL for the given ID does not exist:
        *   (Minor) returns HTML with a relevant error message
*   `POST /urls`
    *   if user is not logged in:
        *   (Minor) returns HTML with a relevant error message
*   `POST /urls/:id`

    *   if user is not logged in:
        *   (Minor) **returns HTML with a relevant error message**
    *   if user is logged it but does not own the URL for the given ID:
        *   (Minor) **returns HTML with a relevant error message**
*   `POST /urls/:id/delete`
    *   if user is not logged in:
        *   (Minor) **returns HTML with a relevant error message**
    *   if user is logged it but does not own the URL for the given ID:
        *   (Minor) **returns HTML with a relevant error message**
*   `GET /login`
    *   if user is logged in:
        *   (Minor) **redirects to `/urls`**
*   `GET /register`
    *   if user is logged in:
        *   (Minor) **redirects to `/urls`**