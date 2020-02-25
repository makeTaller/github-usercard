/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
console.log(axios.get('https://api.github.com/users/maketaller'));

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const container = document.querySelector('.cards');
const wholeContainer = document.querySelector('.container');
axios.get('https://api.github.com/users/maketaller')
  .then((resp) => {
    container.appendChild(githubCard(resp));
  });

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'https://api.github.com/users/Amber-Pittman',
  'https://api.github.com/users/nickdurbin',
  'https://api.github.com/users/leachcoding',
  'https://api.github.com/users/clifhodges13',
  'https://api.github.com/users/mnichols08'
];

const btn = document.createElement('button');
btn.textContent = 'Show My Followers';
btn.classList.add('show-more-btn');
wholeContainer.appendChild(btn);

btn.addEventListener('click', () => {
  followersArray.forEach((item) => {
    axios.get(item)
      .then((resp) => {
        container.appendChild(githubCard(resp));
      })
  })
  btn.style.display = 'none';
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function githubCard(obj) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = obj.data.avatar_url;
  card.appendChild(img);

  const info = document.createElement('div');
  info.classList.add('card-info');
  card.appendChild(info);

  const infoH3 = document.createElement('h3');
  infoH3.classList.add('name');
  infoH3.textContent = obj.data.name
  info.appendChild(infoH3);

  const user = document.createElement('p');
  user.classList.add('username');
  user.textContent = obj.data.login;
  info.appendChild(user);

  const location = document.createElement('p');
  location.textContent = obj.data.location;
  info.appendChild(location);

  const profile = document.createElement('p');
  profile.textContent = 'Profile:';
  info.appendChild(profile);

  const profileLink = document.createElement('a');
  profileLink.href = obj.data.html_url;
  profileLink.textContent = ` ${obj.data.html_url}`
  profile.appendChild(profileLink);

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${obj.data.followers}`;
  info.appendChild(followers);

  const following = document.createElement('p');
  following.textContent = `Following: ${obj.data.following}`;
  info.appendChild(following);

  const bio = document.createElement('p');
  bio.textContent = obj.data.bio;
  info.append(bio);


  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
