export default function TableRow({ name, duration, data }) {  
    let days = new Map(data)
    let vis = new Array()

    for(let i = 0; i <= duration; i++) {
        if(days.has(i)) {
            vis.push(
                <div className="w-3 h-3 bg-gray-200 border"></div>
            )
        } else {
            vis.push(
                <div className="w-3 h-3 bg-white border"></div>
            )
        }
    }

    return (
        <tr>
            <td>{name}</td>
            <td>
                <div className="flex align-middle">
                    {vis}
                </div>    
            </td>            
        </tr>
    )
}