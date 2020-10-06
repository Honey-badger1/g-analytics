export default class GitService{
    _apiBase = 'https://api.github.com';

     getResource=async(url)=> {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + 
                `, received ${res.status}`);
        }
        return await res.json();
    }



     getUser=async(userName,repoName)=> {
        return await this.getResource(`/repos/${userName}/${repoName}/commits`);
    } 
    getCommitInfo=async(userName,repoName,shaName)=> {
        return await this.getResource(`/repos/${userName}/${repoName}/commits/${shaName}`);
    } 
   
   

    
}