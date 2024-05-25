document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const submitBtn = document.getElementById('github-form').querySelector('input[type="submit"]');
    const search = document.getElementById("search");
   
    

    form.addEventListener('submit', (e) => {
        e.preventDefault();    
        const searchText = search.value;
            nameSearch(searchText); 
        })
        
        function nameSearch (searchText) { //function nameSearch(searchText)
            fetch(`https://api.github.com/search/users?q=${searchText}`, {
                method: 'GET',
                headers:{
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                
            })
            .then(resp => resp.json())
            .then(data => {
                const userList = document.getElementById('user-list');
                let itemsObj = JSON.stringify(data.items);
                userList.append(itemsObj);
                userList.addEventListener('click', (e) => {
                    e.preventDefault();
                    searchRepo();

                }
                    
                )
                function searchRepo() {
                    fetch(`https://api.github.com/users/${searchText}/repos`, {
                        method: 'GET',
                        headers:{
                            'Accept': 'application/vnd.github.v3+json',
                            'Content-Type': 'application/json'
                        }, 
                    })
                    .then(response => response.json())
                    .then(repoData => {
                        const repoList = document.getElementById('repos-list');
                        let reposObj = JSON.stringify(repoData)
                        repoList.append(reposObj);
                        
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    
 
});


