const fetchURL = 'https://jsonplaceholder.typicode.com/posts';

async function fetchPosts(url) {
  const response = await fetch(url);
  const body = await response.json();

  // Remember: "i know what i am doning" - Type Assertion
  return body;
}

async function showPost() {
  const posts = await fetchPosts(fetchURL);
  const post = posts[0];

  console.log('Post #' + post.id);
  console.log('Title: ' + post.title);
  console.log('Body: ' + post.body);
  // If the userId is 1, then display a note that it's an administrator
  console.log('Author: ' + (post.userId === 1 ? 'Administrator' : post.userId.toString()));
}

showPost();
