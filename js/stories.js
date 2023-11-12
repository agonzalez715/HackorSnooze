"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

// Modify putStoriesOnPage to display both all stories and favorited stories
function putStoriesOnPage() {
  $allStoriesList.empty();
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

// Create a new function to display favorited stories
function putFavoriteStoriesOnPage() {
  const $favoriteStoriesList = $("#favorite-stories-list");
  $favoriteStoriesList.empty();
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $favoriteStoriesList.append($story);
  }
  $favoriteStoriesList.show();
}

async function submitStory(evt) {
  evt.preventDefault(); // Prevent the default form submission behavior

  // Get the data from the form fields using the IDs from your form
  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();
  const username = currentUser.username; // Assuming you have a currentUser object available

  // Call the addStory method and add the new story to the list
  const story = await storyList.addStory(currentUser, {
    title,
    author,
    url
  });

  // Update the story list on the page with the new story
  putStoriesOnPage();

  // Clear the form fields and hide the form after submission
  $("#story-form")[0].reset();
  $("#story-form").addClass('hidden');
}

// Attach the submitStory function as an event handler to the story submission form
$('#story-form').on('submit', submitStory);
