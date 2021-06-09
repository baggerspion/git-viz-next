import GitViz from '../components/GitViz'

export default function Home({ commits }) {
    return (
        <GitViz logs={commits} />
    )
}

export async function getServerSideProps(context) {
    // Get the URL params
    const { owner, repo } = context.query

    // Connect to GH
    const { Octokit } = require("@octokit/rest")
    const { paginateRest, composePaginateRest } = require("@octokit/plugin-paginate-rest")
    const PagingOctokit = Octokit.plugin(paginateRest)
    const octokit = new PagingOctokit({
        auth: process.env.GH_TOKEN 
    })

    let commits = new Array()
    for await (const response of octokit.paginate.iterator(
        'GET /repos/{owner}/{repo}/commits', {
            owner,
            repo,
            per_page: 100
        })) {
            commits = commits.concat(response.data)
        }
        
    return {
        props: { commits }
    }
}