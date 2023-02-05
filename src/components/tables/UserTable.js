import React, {useState} from "react";
import {useEffect} from "react";
import {Button, Table, Pagination} from "rsuite";
import "rsuite/dist/rsuite.min.css";
const {Column, HeaderCell, Cell} = Table;
const UserTable = ({data, role}) => {
  const limit = 2;
  const [page, setPage] = useState(1);
  const handlePage=()=>{
    setPage()
  }
  const dataPerPage = data?.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  return (
    <div className="w-auto">
      {role === "student" && (
        <div>
          <h1 className="text-2xl font-medium mb-3">Students:</h1>
          <Table
            // height={300}
            style={{width: "auto"}}
            data={dataPerPage}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column width={150}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={100}>
              <HeaderCell>Role</HeaderCell>
              <Cell dataKey="role" />
            </Column>
            <Column width={100}>
              <HeaderCell>Session</HeaderCell>
              <Cell dataKey="session" />
            </Column>

            <Column width={200}>
              <HeaderCell>Contact Number</HeaderCell>
              <Cell dataKey="contactNumber" />
            </Column>

            <Column width={300}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>
            <Column width={80} fixed="right">
              <HeaderCell>...</HeaderCell>

              <Cell style={{padding: "6px"}}>
                {(rowData) => (
                  <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                    Edit
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        </div>
      )}
      {role === "teacher" && (
        <div>
          <h1 className="text-2xl font-medium mb-3">Teachers:</h1>
          <Table
            // height={300}
            style={{width: "auto"}}
            data={dataPerPage}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column width={150}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={100}>
              <HeaderCell>Role</HeaderCell>
              <Cell dataKey="role" />
            </Column>
            <Column width={100}>
              <HeaderCell>Designation</HeaderCell>
              <Cell dataKey="designation" />
            </Column>

            <Column width={200}>
              <HeaderCell>Contact Number</HeaderCell>
              <Cell dataKey="contactNumber" />
            </Column>

            <Column width={300}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>
            <Column width={80} fixed="right">
              <HeaderCell>...</HeaderCell>

              <Cell style={{padding: "6px"}}>
                {(rowData) => (
                  <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                    Edit
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        </div>
      )}
      {role === "stuff" && (
        <div>
          <h1 className="text-2xl font-medium mb-3">Stuffs:</h1>
          <Table
            // height={300}
            style={{width: "auto"}}
            data={dataPerPage}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column width={150}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={100}>
              <HeaderCell>Role</HeaderCell>
              <Cell dataKey="role" />
            </Column>

            <Column width={200}>
              <HeaderCell>Contact Number</HeaderCell>
              <Cell dataKey="contactNumber" />
            </Column>

            <Column width={300}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>
            <Column width={80} fixed="right">
              <HeaderCell>...</HeaderCell>

              <Cell style={{padding: "6px"}}>
                {(rowData) => (
                  <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                    Edit
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        </div>
      )}
      <div className="w-11/12 mb-6">
        <Pagination prev next first last ellipsis boundaryLinks maxButtons={5} size="xs" layout={["total", "-", "limit", "|", "pager", "skip"]} total={dataPerPage?.length} limitOptions={[10, 30, 50]} limit={limit} activePage={page} onChangePage={setPage} />
      </div>
    </div>
  );
};

export default UserTable;
