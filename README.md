FCC-Build a Voting App
=========================

Login and users add and updates is up.
Added basics of polls and pages


Will use angular, bootstrap, mongoDB, and either chart.js or d3.js for final product

TODO:
* Focus on converting everything from pug to angular
* Finish poll-form for new poll and edit poll
* Finish new poll setup and send
* Finish edit poll setup and send
  * Decide if edit resets all answers
* Add comment saving and loading
* Add ability for the user that created the comment to edit or delete the comment
* Comment versioning so users can see previous versions of a comment
* Account information page
  * Ability to de-register an account
    * Keep id but remove everything else and set a status of inactive
    * Will require changes to the login process
* Ability to see and manage your polls
* Ability to search polls
* Refactor everything to not be in a single server.js file
* Need to review the OAuth2 stuff to understand what it is doing
* Find other things that need to be done