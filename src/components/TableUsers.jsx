import { useEffect, useState } from "react";

import _, { iteratee } from "lodash";
import { debounce } from "lodash";

import { fetchAllUser } from "../services/UserService";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import ReactPaginate from "react-paginate";

import ModalAddNew from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";

import { FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import "../scss/tableUser.scss";

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
  }, 2000);

  return (
    <>
      <Container>
        <div className="add-new my-3">
          <span>
            <b>List Users:</b>
          </span>
          <button
            onClick={() => setIsShowModalAddNew(true)}
            className="btn btn-primary d-flex justify-content-center align-items-center"
          >
            <FaPlus />
          </button>
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
