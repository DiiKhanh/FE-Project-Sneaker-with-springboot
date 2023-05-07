import React from "react";
import { Container, Row } from "reactstrap";
import Chart from "./charts/Chart";
import LineChart from "./charts/LineChart";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <section>
      <Container>
        <div className="mt-3">
          <h4>Dashboard</h4>
        </div>
        <Row>
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
