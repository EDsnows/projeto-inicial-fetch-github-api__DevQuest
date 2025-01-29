import { baseUrl, repositoriesQuantiy } from "../variables.js"

async function getRepositories(userName){
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantiy}`)
    return await response.json()
};

export { getRepositories }