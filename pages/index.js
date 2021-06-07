import GitViz from '../components/GitViz'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Home() {
    const router = useRouter()
    const { owner, repo } = router.query

    if(owner && repo) {
        const {data, error} = useSWR(`/api/history?owner=${owner}&repo=${repo}`)

        if(error) return <h1>Problem</h1>
        if(!data) return <p>Loading... (this might take some time)</p>

        if(data) return (
            <GitViz logs={data['result']} />
        )
    } else {
        return (
            <>
            <p>You must specify 'project' and 'user' parameters in the URL.</p>
            <p>e.g. <Link href="https://https://git-viz-next.vercel.app/?user=vercel&project=next.js"><a>https://giz-viz-next.vercel.app/?user=vercel&project=next.js</a></Link></p>
            </>
        )
    }
}