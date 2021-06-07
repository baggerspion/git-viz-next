import GitViz from '../components/GitViz'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Home() {
    const router = useRouter()
    const { owner, repo } = router.query

    if(owner && repo) {
        const {data, error} = useSWR(`/api/history?owner=${owner}&repo=${repo}`)

        if(error) return <h1>Problem: {error}</h1>
        if(!data) return <p>Loading... (this might take some time)</p>

        if(data) return (
            <GitViz logs={data['result']} />
        )
    } else {
        return (
            <>
            <p>You must specify 'owner' and 'repo' parameters in the URL.</p>
            </>
        )
    }
}