import {FC, useCallback, useEffect, useState} from "react";
import { statusesStore } from '../../store';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import "./index.scss";

function createData(name: string, status: string, id: string) {
  return { name, status, id };
}

const rows = [
  createData("Item 1", "Status 1", 'uniqueId12'),
  createData("Item 2", "Status 2", 'uniqueId23'),
  createData("Item 3", "Status 3", 'uniqueId34'),
];

const MainScreen: FC = (): JSX.Element => {

    const [ loadingIds, setLoadingIds ] = useState<{ [key: string]: boolean }>({});

    const [
        changeStatus,
        changeStatusResult,
    ] = statusesStore.api.useLazyChangeStatusQuery();

    const handleChangeStatus = useCallback((entryId: string) => {
        setLoadingIds(prevState => {
            return {
                ...prevState,
                [entryId]: true
            }
        });

        changeStatus({ entryId });
    }, [changeStatus]);

    useEffect(() => {
        const {isError, isSuccess, originalArgs, isFetching} = changeStatusResult;
        if (isFetching) {
            return;
        }
        if ((isSuccess || isError) && originalArgs) {
            setLoadingIds(prevState => {
                return {
                    ...prevState,
                    [originalArgs?.entryId]: false
                }
            });
        }
    }, [changeStatusResult]);

  return (
    <>
      <section className='page-wrapper'>
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="right" style={{ width: '200px' }}>
                        <>
                            {loadingIds[row.id] && (<>Loading...</>)}
                            {!loadingIds[row.id] && (
                                <Button
                                    variant="text"
                                    onClick={() => handleChangeStatus(row.id)
                                }>
                                    Change status
                                </Button>
                            )}
                        </>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </section>
    </>
  );
};

export default MainScreen;
