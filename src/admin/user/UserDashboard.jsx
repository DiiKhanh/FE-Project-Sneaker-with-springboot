import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/UI/Loading";
import { toast } from "react-toastify";
import { allUsers } from "../../redux/slices/UserSlice";
import "./UserDashboard.css";
import ModalPopup from "../../components/UI/ModalPopup";
import { Button, Table } from "reactstrap";
import ExportCSV from "../../utils/ExportCSV";
import ReactPaginate from "react-paginate";
import EditUserModal from "./EditUserModal";
import BlockUserModal from "./BlockUserModal";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.currentUser);
  const users = useSelector((state) => state.user?.users);
  const totalPages = useSelector((state) => state.user?.totalPages);
  const [usersExport, setUsersExport] = useState([]);
  const newAll = usersExport?.map((obj) => {
    const newObj = { ...obj };
    delete newObj.password;
    return newObj;
  });
  const [searchUser, setSearchUser] = useState(null);
  const newUsers = users?.filter((item) => item.id !== user.id);

  const fetchAllUserToExport = async () => {
    const res = await axios.get(`http://localhost:8080/api/user/all-user`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    setUsersExport(res.data.data);
  };

  const fetchAllUser = async (page) => {
    const res = await axios.get(
      `http://localhost:8080/api/user/all?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    dispatch(allUsers(res.data));
  };
  useEffect(() => {
    fetchAllUser(0);
    fetchAllUserToExport();
  }, [dispatch]);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    const searchedValue = newUsers?.filter((item) =>
      item?.username?.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchUser(searchedValue);
  };

  const handlePageChange = (e) => {
    fetchAllUser(e.selected);
    setSearchUser(null);
  };

  return (
    <section className="manager-section">
      <Container>
        <div className="mt-3 manager">
          <div className="manager-user">
            <div>
              <i class="ri-user-line"></i>
            </div>
            <h4>Quản lý người dùng</h4>
          </div>
          <div className="search-user">
            <div className="search-box">
              <input
                type="text"
                placeholder="Tìm kiếm username"
                onChange={handleSearch}
              />

              <i className="ri-search-line"></i>
            </div>

            <div className="btn-file">
              <ExportCSV csvData={newAll} fileName={"all-user"} />
            </div>
          </div>
        </div>
        <Row>
          <div className="mt-5">
            {newUsers?.length === 0 ? (
              <h2 className="fs-4 text-center">
                Chưa có người dùng
                <Loading />
              </h2>
            ) : (
              <>
                <Table hover className="table bordered">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Username</th>
                      <th>E-Mail</th>
                      <th>Địa chỉ</th>
                      <th>Số điện thoại</th>
                      <th>Giới tính</th>
                      <th>Ngày sinh</th>
                      <th>Xóa</th>
                      <th>Sửa</th>
                      <th>Chặn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchUser
                      ? searchUser?.map((item, idx) => (
                          <Tr data={item} key={idx} idx={idx} />
                        ))
                      : newUsers?.map((item, idx) => (
                          <Tr data={item} key={idx} idx={idx} />
                        ))}
                  </tbody>
                </Table>
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  pageCount={totalPages}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName="pagination"
                  activeClassName="active"
                />
              </>
            )}
          </div>
        </Row>
      </Container>
    </section>
  );
};

const Tr = ({ data, idx }) => {
  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();
  const deleteUser = async () => {
    const res = await axios.delete(
      `http://localhost:8080/api/user/${data?.id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    dispatch(allUsers(res.data));
    toast.success("Xóa người dùng thành công!");
    setModal(!modal);
  };
  const toggle = () => setModal(!modal);

  const dataEdit = {
    email: data?.email,
    address: data?.address,
    phone: data?.phone,
  };
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);

  const [modalBlock, setModalBlock] = useState(false);
  const toggleBlock = () => setModalBlock(!modalBlock);
  return (
    <>
      <tr>
        <td>{data?.id}</td>
        <td>{data?.username}</td>
        <td>{data?.email}</td>
        <td>{data?.address}</td>
        <td>{data?.phone}</td>
        <td>{data?.gender}</td>
        <td>{data?.birth}</td>
        <td>
          <Button
            color="danger"
            onClick={toggle}
            className="ri-delete-bin-line"
          />
          {modal && (
            <ModalPopup
              delete={deleteUser}
              toggle={toggle}
              modal={modal}
              text="người dùng"
            />
          )}
        </td>
        <td>
          <Button
            color="warning"
            onClick={() => setModalEdit(true)}
            className="ri-edit-2-line"
          />
        </td>
        <td>
          <Button
            color="info"
            onClick={() => setModalBlock(true)}
            className="ri-user-unfollow-line"
          />
        </td>
      </tr>
      <EditUserModal
        toggle={toggleEdit}
        modal={modalEdit}
        setModal={setModalEdit}
        data={dataEdit}
        id={data?.id}
      />
      <BlockUserModal
        toggle={toggleBlock}
        modal={modalBlock}
        setModal={setModalBlock}
        text={data?.username}
      />
    </>
  );
};

export default UserDashboard;
