export default async (req, res) => {
    const {query: {user, project}} = req 
    const raw = await fetch(`https://api.github.com/repos/${user}/${project}/commits?per_page=100`, {
        method: 'GET',
        headers: {
            'Authorization': 'token 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'
        }
    })
    const log = await raw.json()

    if(!log) {
        res.status(404).send({error: "Log not found!"})
    } else {
        res.status(200).send({result: log})
    }
}