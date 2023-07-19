import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table"; // v1.12.0 and above (recommended)

const data = [
  {
    name: "John", // key "name" matches `accessorKey` in ColumnDef down below
    age: 30, // key "age" matches `accessorKey` in ColumnDef down below
  },
  {
    name: "Sara",
    age: 25,
  },
];

const MTable = () => {
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name", //simple accessorKey pointing to flat data
      },
      {
        header: "Age",
        accessorKey: "age", //simple accessorKey pointing to flat data
      },
    ],
    []
  );

  return <div>
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection //enable some features
      enableColumnOrdering
      enableGlobalFilter={false} //turn off a feature
    />
    
    
  </div>
};

export default MTable;
