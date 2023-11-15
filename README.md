# Little Open Library

Free little libraries are those boxes outside peoples' houses that operate on a take-one-leave-one model. They always have weird books. This is that, but with the Open Library API. They've got a search API that allows you to search inside books but when a book says the inside is searchable, that's not always true.

To do:

- strip out html tags from description
- error handling for request
- styling (color palette, mqs, icons for inside, other info)
- change isbn id to the olid ?
- add types
- same number of items each page, not filtering  (filtering before reuqesting)
- make sure bookdetails can reload without going back to search page
cover edition is from the search request, detail;s request is going to OL normal ID, not nesc the one that has the cover
- update react router to be a remix version https://remix.run/blog/remixing-react-router
