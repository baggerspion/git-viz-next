import TableRow from './TableRow'

function daysIntoYear(dateStr) {
    let date = new Date(dateStr)
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000
}

function daysIntoPeriod(startDate, newDate) {
    const d1 = new Date(startDate)
    const d2 = new Date(newDate)

    return daysIntoYear(d2) - daysIntoYear(d1)
}

export default function GitViz({ logs }) {
    // Sort logs by date
    logs.sort(function(a, b) {
        return new Date(b['commit']['author']['date']) - new Date(a['commit']['author']['date'])
    }).reverse()

    const duration = daysIntoPeriod(logs[0]['commit']['author']['date'], logs[logs.length - 1]['commit']['author']['date'])

    // Populate the author data
    const startDate = new Date(logs[0]['commit']['author']['date'])
    let authors = new Map()
    logs.forEach(log => {
        let day = daysIntoPeriod(startDate, log['commit']['author']['date'])

        if(!authors.has(log['commit']['author']['name'])) {
            let dates = new Map()
            dates.set(day, 1)
            authors.set(log['commit']['author']['name'], dates)
        } else {
            let dates = authors.get(log['commit']['author']['name'])
            let count = 0
            if(dates.has(day)) {
                count = dates.get(day)
            }
            dates.set(day, count + 1)
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