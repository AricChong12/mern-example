import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//imports libs

// Component for a single table row (one employee record)
const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    {/* Name column */}
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.name}
    </td>
    {/* Position column */}
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.position}
    </td>
    {/* Level column */}
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.level}
    </td>
    {/* Action column (Edit + Delete) */}
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        {/* Navigate to edit page with record ID */}
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        {/* Delete button */}
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  // Stores list of records from database
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  // Fetch data when component loads
  useEffect(() => {
    async function getRecords() {
      // Call backend API
      const response = await fetch(`https://mern-example-backend.onrender.com/record/`);
      // Handle error
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
       // Convert response to JSON
      const records = await response.json();
      // Save data in state
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]); // runs again if number of records changes

  // This method will delete a record
  // DELETE record function
  async function deleteRecord(id) {
    await fetch(`https://mern-example-backend.onrender.com/record/${id}`, {
      method: "DELETE",
    });
    // Remove deleted item from UI immediately
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  // Convert array into table rows
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      {/* Page title */}
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      {/* Table container */}
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            {/* Table header */}
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Position
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Level
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            {/* Table body (dynamic data) */}
            <tbody className="[&amp;_tr:last-child]:border-0">
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/*

🎨 Tailwind CSS explanation (separately)

This project uses Tailwind CSS.

🧱 Table layout classes
border → adds border around table/container
rounded-lg → rounded corners
overflow-hidden → prevents content spilling out
w-full → table takes full width
text-sm → small text size
📊 Row styling
border-b → adds bottom border for each row
hover:bg-muted/50 → highlights row on hover
transition-colors → smooth hover animation
📦 Cell spacing
p-4 → padding inside each cell
align-middle → vertically centers content
🔘 Button & link styling
inline-flex → flexible inline layout
items-center → vertical center
justify-center → horizontal center
h-9 → fixed button height
px-3 → horizontal padding
rounded-md → rounded corners
border → button outline
hover:bg-slate-100 → hover effect
transition-colors → smooth hover animation


*/