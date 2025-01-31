import { user } from "./user.js"

const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(){
        // informações pessoais do usuário
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrado'}</p><br>
                                                <p>👥 Seguidores: ${user.followers}</p>
                                                <p>👥 seguindo: ${user.following}</p>
                                            </div>
                                    </div>`;
        
        // repositórios do usuário
        let repositoriesItens = '';
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`);

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`;
        };

        // eventos do usuário
        const filteredEventList = user.events.filter(event => event.type === 'PushEvent' || event.type === 'CreateEvent' );

        console.log(filteredEventList)
        let listEventItens = '';
        filteredEventList.forEach(event => {
            const typeEvent = event.type;
            const nameRepository = event.repo.name;

            if(typeEvent === 'CreateEvent'){
                return listEventItens += `<li> <span class="name-repository">${nameRepository}</span> - Sem mensagem de commit</li>`
            };

            if(typeEvent === 'PushEvent'){
                const lastCommitNumber = event.payload.commits.length - 1;

                return listEventItens += `<li> <span class="name-repository">${nameRepository}</span> - ${event.payload.commits[lastCommitNumber].message}</li>`;
            };
        });

        this.userProfile.innerHTML += `<div class="event">
                                            <ul>${listEventItens}</ul>
                                        </div>`
    },
    renderNotFound(){
        this.userProfile.innerHTML = '<h3>Usurário não encontrado</h3>'
    }
}

export { screen }