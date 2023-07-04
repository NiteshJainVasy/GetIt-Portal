import React, { useContext, useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, Progress, DropdownItem, Badge } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  UserAvatar,
  PaginationComponent,
  PreviewAltCard,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  PreviewCard,
  ReactDataTable,
} from "../../../components/Component";
import { projectData } from "./ProjectData";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../../../utils/Utils";
import FormModal from "./FormModal";
import {
  fetchTicketTypes,
  getAllTicketType,
  createTicketType,
  ticketTypeSelector,
} from "../../../reducers/ticketType.reducer";
import { useDispatch, useSelector } from "react-redux";

const requestData = [
  {
    id: 1,
   
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
const TicketTypeList = () => {
  const dispatch = useDispatch();
  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [data, setData] = useState(projectData);

  const [formData, setFormData] = useState({
    type: "",
    subType: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: [],
    totalTask: 0,
    date: new Date(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const {
    ticketType: { fetchList },
  } = useSelector((state) => state);
  const [dynamicData, setDynamicData] = useState([]);

  useEffect(() => {
    dispatch(fetchTicketTypes({ searchValue: "", length: "10", start: "0", draw: "0" }));
  }, []);

  useEffect(() => {
    if (fetchList?.response) {
      setDynamicData(fetchList?.response.data);
    }
  }, [fetchList]);

  // function to reset the form
  const resetForm = () => {
    setFormData({
      type: "",
      subType: "",
    });
  };

  const closeModal = () => {
    setModal({ add: false });
    resetForm();
  };

  const closeEditModal = () => {
    setModal({ edit: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (sData) => {
    alert("Fdf");
    const { type, subType } = sData;
    dispatch(
      createTicketType({
        ...formData,
      })
    );

    resetForm();
    setModal({ add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarClass: item.avatarClass,
          title: title,
          subtitle: subtitle,
          desc: description,
          lead: editFormData.lead,
          tasks: tasks,
          totalTask: totalTask,
          deadline: new Date(`${editFormData.date}`), // Format ** mm/dd/yyyy
          team: editFormData.team,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setEditFormData({
          title: item.title,
          subtitle: item.subtitle,
          description: item.desc,
          lead: item.lead,
          team: item.team,
          tasks: item.tasks,
          totalTask: item.totalTask,
          date: item.deadline,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function to change the complete a project property
  const completeProject = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].deadline = setDeadline(0);
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

  // function to change the complete property of an item
  const selectorCompleteProject = () => {
    let newData;
    newData = data.map((item) => {
      if (item.checked === true) item.deadline = setDeadline(0);
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteProject = () => {
    let newData;
    newData = data.filter((item) => item.checked !== true);
    setData([...newData]);
  };

  // function to change the check property of selected item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestColumns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Type",
      selector: (row) => row.title,
      compact: true,

      cell: (row) => <span>{row.title} </span>,
    },
    {
      name: "subType",
      selector: (row) => row.title,
      compact: true,

      cell: (row) => <span>{row.title} </span>,
    },

    {
      name: "createdBy",
      selector: (row) => row.title,
      compact: true,

      cell: (row) => <span>{row.title} </span>,
    },
    {
      name: "created At ",
      selector: (row) => row.title,
      compact: true,

      cell: (row) => <span>{row.title} </span>,
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
                //className="ms-2"
                onClick={() => {
                  setModal(true);
                  setSelectedData(row);
                }}
              />
            )}
          </>
        );
      },
      //  sortable: true,
    },
  ];

  return (
    <React.Fragment>
      <Head title="TicketType List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>TicketType</BlockTitle>
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
                    <li className="nk-block-tools-opt" onClick={() => setModal({ add: true })}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>Add TicketType</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block></Block>

        <FormModal
          modal={modal.add}
          modalType="add"
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModal}
          onSubmit={onFormSubmit}
        />
        <FormModal
          modal={modal.edit}
          modalType="edit"
          formData={editFormData}
          setFormData={setEditFormData}
          closeModal={closeEditModal}
          onSubmit={onEditSubmit}
        />

        <Block size="lg">
          <PreviewCard>
            <ReactDataTable data={requestData} columns={requestColumns} pagination className="nk-tb-list" />
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default TicketTypeList;
