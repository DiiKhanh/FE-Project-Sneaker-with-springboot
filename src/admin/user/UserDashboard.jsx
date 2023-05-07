import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/UI/Loading";
import { toast } from "react-toastify";
import { allUsers } from "../../redux/slices/UserSlice";
const UserDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.currentUser);
  const users = useSelector((state) => state.user?.users);
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
  }, []);

  return (
    <section>
      <Container>
        <div className="mt-3">
          <h4>Quản lý người dùng</h4>
        </div>
        <Row>
          <div className="mt-5">
            {/* <table className="table bordered">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
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
                {users?.map((item, idx) => (
                  <Tr data={item} key={idx} />
                ))}
              </tbody>
            </table> */}
            {users.length === 0 ? (
              <h2 className="fs-4 text-center">
                Chưa có người dùng
                <Loading />
              </h2>
            ) : (
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Giới tính</th>
                    <th>Ngày sinh</th>
                    <th>Vai trò</th>
                    <th>Xóa</th>
                    <th>Sửa</th>
                    <th>Chặn</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item, idx) => (
                    <Tr data={item} key={idx} />
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

const Tr = ({ data }) => {
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
  };
  return (
    <tr>
      <td>{data?.username}</td>
      <td>{data?.email}</td>
      <td>{data?.address}</td>
      <td>{data?.phone}</td>
      <td>{data?.gender}</td>
      <td>{data?.birth}</td>
      <th>{data?.role}</th>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteUser}
          className="ri-delete-bin-line"
        ></motion.i>
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
