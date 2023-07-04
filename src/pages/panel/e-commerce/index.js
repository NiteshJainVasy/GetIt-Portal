import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, Row } from "../../../components/Component";
import RecentOrders from "../../../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../../../components/partials/default/top-products/TopProducts";
import AverageOrder from "../../../components/partials/e-commerce/average-order/AverageOrder";
import Customer from "../../../components/partials/e-commerce/customers/Customer";
import Orders from "../../../components/partials/e-commerce/orders/Orders";
import TotalSales from "../../../components/partials/e-commerce/total-sales/TotalSales";
import StoreStatistics from "../../../components/partials/default/StoreStatistics";
import TrafficSources from "../../../components/partials/e-commerce/traffic-sources/TrafficSources";
import StoreVisitors from "../../../components/partials/e-commerce/store-visitors/StoreVisitors";
import DataCard from "../../../components/partials/default/DataCard";
import { TrafficSourcesChart, Agents } from "../../../components/partials/charts/e-commerce/EcomCharts";
const Dashboard = () => {
  return (
    <React.Fragment>
      <Head title="Dashboard"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Dashboard</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col xxl="4">
              <Row className="g-gs">
                <Col xxl="12" md="3" sm="6">
                  <DataCard
                    title="Total Agents"
                    percentChange={"4.63"}
                    up={true}
                    icon={"users-fill"}
                    amount={"4"}
                    color={"bg-info"}
                  />
                </Col>
                <Col xxl="12" md="3" sm="6">
                  <DataCard
                    title="Total Categories"
                    percentChange={"4.63"}
                    up={true}
                    icon={"view-list-wd"}
                    amount={"48"}
                    color={"bg-warning"}
                  />
                </Col>

                <Col xxl="12" md="3" sm="6">
                  <DataCard
                    title="Open Tickets"
                    percentChange={"4.63"}
                    up={true}
                    icon={"ticket-alt-fill"}
                    amount={"59"}
                    color={"bg-success"}
                  />
                </Col>
                <Col xxl="12" md="3" sm="6">
                  <DataCard
                    title="Close Entries"
                    percentChange={"4.63"}
                    up={true}
                    icon={"cross-fill-c"}
                    amount={"145"}
                    color={"bg-danger"}
                  />
                </Col>
              </Row>
            </Col>
            <Col xxl="6" lg="6">
              <TrafficSources
                title="Entries by agents"
                attribute=""
                componentType={<Agents />}
                legendItems={[
                  { label: "Vishal Mevada", color: "#FF0000", data: 500 },
                  { label: "Anirudh Chavda", color: "#00FF00", data: 200 },
                  { label: "Other", color: "#0000FF", data: 200 },
                ]}
              />
            </Col>
            <Col xxl="6" lg="6">
              <TrafficSources
                title="Ticket by categories"
                attribute=""
                componentType={<TrafficSourcesChart />}
                legendItems={[
                  { label: "Organic Search", color: "#9cabff", data: "2505" },
                  { label: "Referrals", color: "#ffa9ce", data: "482" },
                  { label: "Social Media", color: "#b8acff", data: "859" },
                  { label: "Others", color: "#f9db7b", data: "138" },
                ]}
              />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Dashboard;
