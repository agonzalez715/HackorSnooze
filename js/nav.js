"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// Show story submission form on click

function navShowSubmitStory(evt) {
  console.debug("navShowSubmitStory",evt);
  hidePageComponents();
  //assuming the story form has a class hidden that you toggle to show/hide it
  $(`#story-form`).removeClass(`hidden`);
}

// we also need to add an event listener for this function to handle the click event
$('#nav-submit-story').on('click', navShowSubmitStory);

// Example event listener for switching to favorited stories
$('#nav-favorites').on('click', function (evt) {
  evt.preventDefault();
  hidePageComponents();
  putFavoriteStoriesOnPage(); // Display favorited stories
});
