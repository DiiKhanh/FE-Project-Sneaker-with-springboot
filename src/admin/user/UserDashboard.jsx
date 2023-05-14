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
import { Button } from "reactstrap";
const UserDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.currentUser);
  const users = useSelector((state) => state.user?.users);
  const [searchUser, setSearchUser] = useState(null);
  const newUsers = users?.filter((item) => item.id !== user.id);
  const fetchAllUser = async () => {
    const res = await axios.get("http://localhost:8080/api/user/all", {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    dispatch(allUsers(res.data.data));
  };
  useEffect(() => {
    fetchAllUser();
  }, [dispatch]);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    const searchedValue = newUsers?.filter((item) =>
      item?.username?.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchUser(searchedValue);
  };

  return (
    <section>
      <Container>
        <div className="mt-3 manager">
          <div className="manager-user">
            <div>
              <i class="ri-user-line"></i>
            </div>
            <h4>Quản lý người dùng</h4>
          </div>
          <div className="search__box search-user">
            <input
              type="text"
              placeholder="Tìm kiếm username"
              onChange={handleSearch}
            />
            <span>
              <i className="ri-search-line"></i>
            </span>
          </div>
        </div>
        <Row>
          <div className="mt-5">
            {newUsers.length === 0 ? (
              <h2 className="fs-4 text-center">
                Chưa có người dùng
                <Loading />
              </h2>
            ) : (
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Username</th>
                    <th>E-Mail</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Giới tính</th>
                    <th>Ngày sinh</th>
                    {/* <th>Vai trò</th> */}
                    <th>Xóa</th>
                    <th>Sửa</th>
                    <th>Chặn</th>
                  </tr>
                </thead>
                <tbody>
                  {searchUser
                    ? searchUser.map((item, idx) => (
                        <Tr data={item} key={idx} idx={idx} />
                      ))
                    : newUsers.map((item, idx) => (
                        <Tr data={item} key={idx} idx={idx} />
                      ))}
                </tbody>
              </table>
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
    dispatch(allUsers(res.data.data));
    toast.success("Xóa người dùng thành công!");
    setModal(!modal);
  };
  const toggle = () => setModal(!modal);
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{data?.username}</td>
      <td>{data?.email}</td>
      <td>{data?.address}</td>
      <td>{data?.phone}</td>
      <td>{data?.gender}</td>
      <td>{data?.birth}</td>
      {/* <th>{data?.role}</th> */}
      <td>
        {/* <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteUser}
          className="ri-delete-bin-line"
        ></motion.i> */}
        <Button
          color="danger"
          onClick={toggle}
          className="ri-delete-bin-line"
        ></Button>
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
        <motion.i
          whileTap={{ scale: 1.2 }}
          className="ri-edit-2-line"
          // onClick={editProduct}
        ></motion.i>
      </td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          className="ri-user-unfollow-line"
          // onClick={editProduct}
        ></motion.i>
      </td>
    </tr>
  );
};

export default UserDashboard;
