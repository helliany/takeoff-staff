import React, {useEffect, useState} from "react";
import {Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {deleteContact, getContacts} from "../../redux/contactsReducer";
import Contact from "./Contact/Contact";
import {ReactComponent as ArrowUpIcon} from "../../assets/images/up-arrow-icon.svg";
import {ReactComponent as ArrowDownIcon} from "../../assets/images/down-arrow-icon.svg";
import {ReactComponent as SearchIcon} from "../../assets/images/magnifier-icon.svg";
import classes from "./ContactsPage.module.scss";
import ContactModal from "./ContactModal/ContactModal";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const ContactsPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const contacts = useSelector((state) => state.contacts.contacts)
  const dispatch = useDispatch();

  const [contactsData, setContactsData] = useState(contacts);
  const [searchedValue, setSearchedValue] = useState('');
  const [ascSorting, setAscSorting] = useState(false);
  const [descSorting, setDescSorting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(getContacts());
        setIsError(false);
      } catch(err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setIsError(false);
    };
  }, [dispatch]);

  useEffect(() => {
    setContactsData(contacts);
  }, [contacts]);

  const handleAscSort = () => {
    setContactsData([...contactsData].sort((a, b) => b.name.localeCompare(a.name)));
    setAscSorting(true);
    setDescSorting(false);
  }

  const handleDescSort = () => {
    setContactsData([...contactsData].sort((a, b) => a.name.localeCompare(b.name)));
    setDescSorting(true);
    setAscSorting(false);
  }

  const handleSearch = (e) => {
    const value = e.target.value;

    if (value !== '') {
      const filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(value.toLowerCase());
      });

      setContactsData(filteredContacts);
    } else {
      setContactsData(contacts);
    }

    setSearchedValue(value);
  }

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  }

  return (
    <Box p={4} className={classes.wrapper}>
      {isAuth && isLoading && !isError && <Loader />}
      {isAuth && !isLoading && isError && <Error />}
      {isAuth && !isLoading && !isError && (
        <>
          <Box mb={2}>
            <TextField className={classes.input} fullWidth label="Search" variant="outlined" onChange={handleSearch} value={searchedValue} />
          </Box>
          <Box mb={2}>
            <ContactModal />
          </Box>
          {contactsData.length !== 0 ? (
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                {contactsData && (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Grid container wrap="nowrap" alignItems="center" spacing={1}>
                            <Grid item>Name</Grid>
                            <Grid item>
                              <IconButton size="small" onClick={handleDescSort} className={descSorting ? classes.active : ''}>
                                <ArrowDownIcon width={10} />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton size="small" onClick={handleAscSort} className={ascSorting ? classes.active : ''}>
                                <ArrowUpIcon width={10} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contactsData.map((contact) => {
                        return (
                          <TableRow key={contact.id}>
                            <Contact id={contact.id} user={contact} onDelete={() => handleDelete(contact.id)} />
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </>
                )}
              </Table>
            </TableContainer>
          ) : (
            <Grid container justifyContent="center" direction="column" alignItems="center" className={classes.search}>
              <Box mb={4}>Nothing Found:(</Box>
              <SearchIcon width={200} height={200} />
            </Grid>
          )}
        </>
      )}
      {!isAuth && <Navigate replace to="/login" />}
    </Box>
  )
}

export default ContactsPage;

