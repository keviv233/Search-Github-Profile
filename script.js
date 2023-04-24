// variables for appending html dynamically through api
const profilePic = document.querySelector('.profile img')
const pName = document.querySelector('.name')
const bio = document.querySelector('.bio')
const followers = document.querySelector('.followers span')
const following = document.querySelector('.following span')
const repos = document.querySelector('.repos span')
const resentRepo = document.querySelectorAll('.repo')
const profile = document.querySelector('.profile')

// other variables
const search = document.querySelector('.search')
const profileInfo = document.querySelector('.profile-info')
const errMsg = document.querySelector('.err-msg')
const initialMsg = document.querySelector('.initial')


// functions =================================================================================================

let user;
function getUser(username) {
    let api = 'https://api.github.com/users/' + username;
    axios(api)
        .then(res => {
            user = res;
            initialMsg.style = `display: none`

            // removing error message
            try {
                profile.classList.remove('error')
                profileInfo.style = `display: flex;`
                profilePic.style = `display: block;`
                errMsg.style = `display: none`
            } catch (err) {
                console.log(err)
            }

            // appending user info
            pName.innerHTML = user.data.name;
            bio.innerHTML = user.data.bio;
            followers.innerHTML = user.data.followers;
            following.innerHTML = user.data.following;
            repos.innerHTML = user.data.public_repos;
            profilePic.src = `${user.data.avatar_url}`

        })
        .catch(err => {
            console.log(err)
            initialMsg.style = `display: none`

            // showing error message
            profile.classList.add('error')
            profileInfo.style = `display: none;`
            profilePic.style = `display: none;`
            errMsg.style = `display: block`

        })
}

// to get the repositries
function getRepos(username) {
    let api = 'https://api.github.com/users/' + username + '/repos';
    axios(api)
        .then((res) => {
            console.log(res)
            for (let i = 0; i < resentRepo.length; i++) {
                resentRepo[i].innerHTML = res.data[i].name;
                resentRepo[i].href = res.data[i].html_url;
                console.log(res.data[i].html_url) 
            }
        })
        .catch((err) => {
            console.log(err)
        })
}



// ===========================================================================================================


// here we are showing the profile that how would if look initially
profileInfo.style = `display: none`
profilePic.style = `display: none`
initialMsg.style = `display: block; text-align: center;`

search.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        getUser(search.value)
        getRepos(search.value)
        search.value = '';
    }
})

