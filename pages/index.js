import GitViz from '../components/GitViz'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Home() {
    const router = useRouter()
    const { project, user } = router.query
    const {data, error} = useSWR(`/api/history?project=${project}&user=${user}`)

    if(error) return <h1>Problem</h1>
    if(!data) return <p>Loading...</p>

    if(data) return (
        <GitViz logs={data['result']} />
    )
}