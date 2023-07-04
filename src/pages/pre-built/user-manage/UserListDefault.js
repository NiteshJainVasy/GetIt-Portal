import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
  PreviewAltCard,
  PreviewCard,
  ReactDataTable,
} from "../../../components/Component";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { filterStatus, userData } from "./UserData";
import { findUpper } from "../../../utils/Utils";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import EditModal from "./EditModal";
import TicketModule from "./AddModal";
import ViewRequest from "./ViewAllRequest";
import { Row } from "reactstrap";
import { getAllTickets, createTickets } from "../../../reducers/ticketRequest.reducer";

const requestData = [
  {
    id: 1,
    // avatarBg: "purple",
    title: "Test 1",
    type: "Software",
    priority: "Urgent",

    createdAt: "1 Jun 2023",
    createdBy: "2 Jun 2023",
    completedBy: "Anirudh",
    timestamp: "10:00 AM",
    status: "Pending",
    reportingHead: "Janam Soni",

    approval: "L1",
  },
  {
    id: 2,
    title: "Test 2",
    type: "Hardware",
    priority: "High",

    createdAt: "2 Jun 2023",
    createdBy: "3 Jun 2023",
    completedBy: "Anirudh ",
    timestamp: "11:00 AM",
    status: "Approve",
    reportingHead: "Janam Soni",
    approval: "L2",
  },
  {
    id: 3,
    title: "Test 3",
    type: "Software",
    priority: "Medium",

    createdAt: "3 Jun 2023",
    createdBy: "4 Jun 2023",
    completedBy: "Vishal",
    timestamp: "12:00 PM",
    status: "Reject",
    reportingHead: "Janam Soni",
    approval: "L1",
  },
  {
    id: 4,
    title: "Test 4",
    type: "Hardware",
    priority: "Low",

    createdAt: "4 Jun 2023",
    createdBy: "5 Jun 2023",
    completedBy: "Vishal",
    timestamp: "1:00 PM",
    status: "Pending",
    reportingHead: "Janam Soni",
    approval: "L2",
  },
];

const UserListDefaultPage = () => {
  const { contextData } = useContext(UserContext);
  const dispatch = useDispatch();
  const [data, setData] = contextData;

  const [sm, updateSm] = useState(false);
  const [onSearchText] = useState("");

  const [modal, setModal] = useState(false);
  const [editId, setEditedId] = useState();
  const [searchStr, setSearchStr] = useState(requestData);
  const [files, setFiles] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    type: "HW",
    reportingManager: "Janam Soni",
    status: "pending",
    subType: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  // unselects the data on mount
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setData([...newData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name

  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = userData.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...userData]);
    }
  }, [onSearchText, setData]);

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "",
      type: "",
      reportingHead: "Janam Soni",
      file: "",
      //status: "",
      softwareType: "",
      hardwareType: "",
    });
    setFiles([]);
    setSelectedType("");
  };

  const closeModal = () => {
    setModal(false);
    resetForm();
    setModalOpen(false);
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const {
      title,
      description,
      priority,
      type,
      reportingManager,

      subType,
    } = submitData;

    alert("onFormSubmitonFormSubmit");
    debugger;

    dispatch(
      createTickets({
        ticketId: 0,
        createdBy: "nitesh",
        status: formData.status,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        type: formData.type,
        reportingManager: formData.reportingManager,
        subType: formData.subType,
      })
    );
    resetForm();
    setModal(false);
  };

  const suspendUser = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Suspend";
    setData([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteUser = () => {
    let newData;
    newData = data.filter((item) => item.checked !== true);
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorSuspendUser = () => {
    let newData;
    newData = data.map((item) => {
      if (item.checked === true) item.status = "Suspend";
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const datapreview = (id) => {
    setSelectedId(id);
    setModalOpen(true);
    const selectedRequest = requestData.find((request) => request.id === id);

    setSelectedData(selectedRequest);
  };

  const requestColumns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      minWidth: "70px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      compact: true,

      cell: (row) => <span>{row.title} </span>,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      minWidth: "140px",
      cell: (row) => <span>{row.type}</span>,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
      cell: (row) => <span>{row.priority}</span>,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,

      minWidth: "140px",
      cell: (row) => <span>{row.createdAt}</span>,
      hide: "md",
    },

    {
      name: "Created By",
      selector: (row) => row.createdBy,
      sortable: true,
      minWidth: "140px",
      cell: (row) => <span>{row.createdBy}</span>,
      hide: "lg",
    },

    {
      name: "Completed By",
      selector: (row) => row.completedBy,
      sortable: true,
      cell: (row) => <span>{row.completedBy}</span>,
      hide: "lg",
      minWidth: "140px",
    },

    {
      name: "Reporting Head",
      selector: (row) => row.reportingHead,
      sortable: true,
      cell: (row) => <span>{row.reportingHead}</span>,
      hide: "lg",
      minWidth: "150px",
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      hide: "lg",
      minWidth: "140px",

      cell: (row) => {
        let statusClass = "";
        let statusText = "";

        if (row.status === "Active") {
          statusClass = "success";
          statusText = "Active";
        } else if (row.status === "Pending") {
          statusClass = "warning";
          statusText = "Pending";
        } else if (row.status === "Approve") {
          statusClass = "success";
          statusText = "Approve ";
        } else if (row.status === "Reject") {
          statusClass = "danger";
          statusText = "Reject";
        } else if (row.status === "Cancel") {
          statusClass = "danger";
          statusText = "Cancel";
        }
        return (
          <div>
            <span>{row.approval}</span>,<span className={`tb-status ms-1 text-${statusClass}`}>{statusText}</span>
          </div>
        );
      },
    },

    {
      name: "Action",
      selector: (row) => row.id,
      cell: (row) => {
        return (
          <>
            <Icon name="eye" onClick={() => datapreview(row.id)} className="me-2" />
            {row.status === "Pending" && (
              <Icon
                name="edit"
                className="ms-2"
                onClick={() => {
                  setModal(true);
                  setSelectedData(row);
                }}
              />
            )}
          </>
        );
      },
      sortable: true,
    },
  ];
  return (
    <React.Fragment>
      <Head title="User List - Default"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Ticket Lists
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          setModal(true), setSelectedData(undefined);
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Ticket</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <ViewRequest
          closeModal={closeModal}
          modal={modalOpen}
          selectedId={selectedId}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />

        <TicketModule
          title={selectedData ? "Update Ticket" : "Add Ticket"}
          modal={modal}
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModal}
          onSubmit={onFormSubmit}
          filterStatus={filterStatus}
          files={files}
          setFiles={setFiles}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          selectedId={selectedId}
          setSelectedData={setSelectedData}
          selectedData={selectedData}
        />

        <Block size="lg">
          <PreviewCard>
            <ReactDataTable
              data={requestData}
              columns={requestColumns}
              pagination
              filterButtonShow
              className="nk-tb-list"
            />
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default UserListDefaultPage;
