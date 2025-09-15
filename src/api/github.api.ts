import axios from "axios";

console.log(import.meta.env.VITE_GITHUB_TOKEN)

export const githubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: { 
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
    }
});
