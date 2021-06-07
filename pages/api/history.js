export default async (req, res) => {
    // Setup access to GitHub
    const github = require('octonode')
    const client = github.client(process.env.GH_TOKEN)

    // Grab the required query params from the request
    const {query: {owner, repo}} = req 
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

    if(!data) {
        res.status(404).send({error: "Log not found!"})
    } else {
        res.status(200).send({result: commits})
    }
}