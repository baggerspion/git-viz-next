export default async function getLogs({ owner, repo }) {
    const github = require('octonode')
    const client = github.client(process.env.GH_TOKEN)
    const ghrepo = client.repo(`${owner}/${repo}`)

    var commits = new Array()
    var page = 0

    while(true) {
        var data = await ghrepo.commitsAsync({ 
            page: ++page,
            per_page: 100 
        })
        if(data[0].length == 0) {
            break
        } else {
            commits = commits.concat(data[0])
            if(data[0].length < 100) {
                break
            }
        }
    }

    return {
        'result': commits
    }
}