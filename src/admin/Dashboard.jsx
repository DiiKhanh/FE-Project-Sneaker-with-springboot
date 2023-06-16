import React from "react";
import { Container, Row } from "reactstrap";
import Chart from "./charts/Chart";
import LineChart from "./charts/LineChart";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <section>
      <Container>
        <div className="mt-5">
          <h4>Thống kê chi tiết</h4>
        </div>
        {/* <Row className="db">
          <div className="db-container">
            <div className="db-bg">
              <div className="db-card">
                <img
                  src="https://themewagon.github.io/purple-react/static/media/circle.953c9ca0.svg"
                  alt=""
                />
                <h4>Doanh số hàng tuần</h4>
                <h2>1000000</h2>
                <h6>Tăng 60%</h6>
              </div>
            </div>
          </div> */}
        {/* <div className="db-container">
            <div className="db-bg2">
              <div className="db-card">
                <img src="" alt="" />
                <h4>Đơn đặt hàng hàng tuần</h4>
                <h2></h2>
                <h6>Tăng 60%</h6>
              </div>
            </div>
          </div>
          <div className="db-container">
            <div className="db-bg3">
              <div className="db-card">
                <img src="" alt="" />
                <h4>Khách truy cập trực tuyến</h4>
                <h2></h2>
                <h6>Tăng 60%</h6>
              </div>
            </div>
          </div> */}
        {/* </Row> */}
        <Row style={{ marginLeft: "150px" }}>
          <Chart />
        </Row>
        <div className="chart">
          <LineChart />
        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
