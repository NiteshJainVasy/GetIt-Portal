import React, { useState } from "react";
import { Card, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { Icon } from "../../../Component";


const TrafficSources = ({title, attribute, componentType,legendItems  }) => {
  const [data, setData] = useState("7");
  return (
    <Card className="card-full overflow-hidden">
      <div className="nk-ecwg nk-ecwg4 h-100">
        <div className="card-inner flex-grow-1">
          <div className="card-title-group mb-4">
            <div className="card-title">
              <h6 className="title">{title}</h6>
            </div>
            <div className="card-tools">
              <UncontrolledDropdown>
                <DropdownToggle
                  tag="a"
                  href="#toggle"
                  onClick={(ev) => ev.preventDefault()}
                  className="dropdown-toggle btn btn-icon btn-trigger"
                >
                  <Icon name="more-h" />
                </DropdownToggle>
                <DropdownMenu end className="dropdown-menu-sm">
                  <ul className="link-list-opt no-bdr">
                    <li className={data === "7" ? "active" : ""}>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("7");
                        }}
                      >
                        <span>7 Days</span>
                      </DropdownItem>
                    </li>
                    <li className={data === "15" ? "active" : ""}>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("15");
                        }}
                      >
                        <span>15 days</span>
                      </DropdownItem>
                    </li>
                    <li className={data === "30" ? "active" : ""}>
                      <DropdownItem
                        tag="a"
                        href="#dropdown"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setData("30");
                        }}
                      >
                        <span>30 days</span>
                      </DropdownItem>
                    </li>
                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="data-group">
            <div className="nk-ecwg4-ck">
              {componentType}
            </div>
            <ul className="nk-ecwg4-legends">
              {legendItems.map((item, index) => (
                <li key={index}>
                  <div className="title">
                    <span className="dot dot-lg sq" style={{ background: item.color }}></span>
                    <span>{item.label}</span>
                  </div>
                  <div className="amount amount-xs">{item.data}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
     
      </div>
    </Card>
  );
};

export default TrafficSources;
