import TableRow from './TableRow'

function weeksBetween(startDate, newDate) {
    return Math.round((new Date(newDate) - new Date(startDate)) / (7 * 24 * 60 * 60 * 1000))
}

export default function GitViz({ logs }) {
    // Sort logs by date
    logs.sort(function(a, b) {
        return new Date(b['commit']['author']['date']) - new Date(a['commit']['author']['date'])
    }).reverse()

    const duration = weeksBetween(logs[0]['commit']['author']['date'], logs[logs.length - 1]['commit']['author']['date'])

    // Populate the author data
    const startDate = new Date(logs[0]['commit']['author']['date'])
    let authors = new Map()
    logs.forEach(log => {
        let week = weeksBetween(startDate, log['commit']['author']['date'])

        if(!authors.has(log['commit']['author']['name'])) {
            let dates = new Map()
            dates.set(week, 1)
            authors.set(log['commit']['author']['name'], dates)
        } else {
            let dates = authors.get(log['commit']['author']['name'])
            let count = 0
            if(dates.has(week)) {
                count = dates.get(week)
            }
            dates.set(week, count + 1)
            authors.set(log['commit']['author']['name'], dates)
        }
    })

    // Create an array of the keys that we can iterate over
    let keys = Array.from(authors.keys())

    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {keys.map(key => (
                    <TableRow key={key} name={key} duration={duration} data={authors.get(key)} />
                ))}
            </tbody>
        </table>
    )
}