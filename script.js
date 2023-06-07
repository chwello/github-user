const search = document.querySelector(".search-bar");
const container = document.querySelector(".container-one");

async function getGithubProfile(searchInput) {
    const userProfileURL = `https://api.github.com/users/${searchInput}`;
    const userReposURL = `https://api.github.com/users/${searchInput}/repos`;
  
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(userProfileURL),
      fetch(userReposURL)
    ]);
  
    const profileData = await profileResponse.json();
    const reposData = await reposResponse.json();
  
    const combinedData = {
      profile: profileData,
      repos: reposData
    };
  
    return combinedData;
}
  

search.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    getGithubProfile((search.value).trim())
      .then(({profile, repos}) => {
        container.classList.remove("hidden");
        container.innerHTML = `
        <div class="profile-picture">
        <img class="user-picture" src="${profile.avatar_url}">
      </div>
    
      <div class="user-info">
        <div class="name">${profile.login}</div>
        <div class="short-description">
          ${profile.bio}
        </div>
    
        <div class="social-stats">
          <div> ${profile.followers} followers</div>
          <div class="following"> ${profile.following} following</div>
          <div class="repos"> ${profile.public_repos} repos</div>
        </div> 
    
        <div class="user-project">
          ${repos.map(repo => {
            return `
            <div style=" background-color: rgb(37, 3, 68);
            height: 15px;
            display: inline-block;
            padding: 3px 3px;
            border-radius: 3px;
            margin-right: 5px;
            margin-bottom: 5px;
            ">${repo.name}</div>
            
            `
          }).join('')}
        </div>
      </div>


        `;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
