import { useEffect, useState } from "react";

import _, { iteratee, result } from "lodash";
import { debounce } from "lodash";

import { fetchAllUser } from "../services/UserService";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import ReactPaginate from "react-paginate";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";

import ModalAddNew from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";

import { FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaFileImport } from "react-icons/fa";

import "../assets/style/tableUser.scss";
import { toast } from "react-toastify";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  // const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keyWord, setKeyWord] = useState("");
  const [dataExport, setDataExport] = useState([]);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUserFromModal = (user) => {
    const id = user.id;
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleDeleteUserFromModal = (user) => {
    const id = user.id;
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== id);
    setListUsers(cloneListUsers);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      // console.log(res);
      setListUsers(res.data);
      // setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (Event) => {
    getUsers(+Event.selected + 1);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 500);

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done(0);
    }
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Only accept csv file...");
        return;
      }

      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] === "email" &&
                rawCSV[0][1] === "first_name" &&
                rawCSV[0][2] === "last_name"
              ) {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                console.log(result);
                setListUsers(result);
              } else {
                toast.error("Wrong format header csv file");
                return;
              }
            } else {
              toast.error("Wrong format csv file");
              return;
            }
          } else {
            toast.error("Not found data on CSV file");
            return;
          }
        },
      });
    } else {
      toast.error("Not found file");
    }
  };

  return (
    <>
      <Container>
        <div className="add-new my-3">
          <span>
            <b>List Users:</b>
          </span>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <label htmlFor="import-csv">
              <FaFileImport className="icon-csv" />
            </label>
            <input
              type="file"
              name=""
              id="import-csv"
              hidden
              onChange={(event) => {
                handleImportCSV(event);
              }}
            />
            <CSVLink
              data={dataExport}
              filename={"users.csv"}
              asyncOnClick={true}
              onClick={getUsersExport}
            >
              <FaDownload className="icon-csv" />
            </CSVLink>
            <button
              onClick={() => setIsShowModalAddNew(true)}
              className="btn btn-primary d-flex justify-content-center align-items-center"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="my-3 w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search here..."
            // value={keyWord}
            onChange={handleSearch}
          />
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span>ID</span>
                  <span className="">
                    <i
                      onClick={() => {
                        handleSort("desc", "id");
                      }}
                      className="fa-solid fa-arrow-up"
                    ></i>
                    <i
                      onClick={() => {
                        handleSort("asc", "id");
                      }}
                      className="fa-solid fa-arrow-down"
                    ></i>
                  </span>
                </div>
              </th>
              <th>Email</th>
              <th>
                <div className="sort-header">
                  <span>First name</span>
                  <span className="">
                    <i
                      onClick={() => {
                        handleSort("desc", "first_name");
                      }}
                      className="fa-solid fa-arrow-up"
                    ></i>
                    <i
                      onClick={() => {
                        handleSort("asc", "first_name");
                      }}
                      className="fa-solid fa-arrow-down"
                    ></i>
                  </span>
                </div>
              </th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((item, index) => {
                return (
                  <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td className="text-center">
                      <FaRegEdit
                        className="me-3"
                        onClick={() => handleEditUser(item)}
                      />
                      <FaRegTrashAlt
                        onClick={() => {
                          handleDeleteUser(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />

        <ModalAddNew
          show={isShowModalAddNew}
          handleClose={handleClose}
          handleUpdateTable={handleUpdateTable}
        />

        <ModalEditUser
          show={isShowModalEdit}
          handleClose={handleClose}
          dataUserEdit={dataUserEdit}
          handleEditUserFromModal={handleEditUserFromModal}
        />

        <ModalConfirm
          show={isShowModalDelete}
          handleClose={handleClose}
          dataUserDelete={dataUserDelete}
          handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
      </Container>
    </>
  );
};
export default TableUsers;
