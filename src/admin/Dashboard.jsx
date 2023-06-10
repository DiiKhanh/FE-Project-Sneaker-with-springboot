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
