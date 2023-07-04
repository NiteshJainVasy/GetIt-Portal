import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  Badge,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  RSelect,
 
} from "../../../components/Component";

const ViewRequest = ({ closeModal, modal, selectedId, selectedData, setSelectedData }) => {
  function getDotColor(status) {
    let dotColor = "";

    if (status === "Approve") {
      dotColor = "success";
    } else if (status === "Pending") {
      dotColor = "warning";
    } else if (status === "Cancel") {
      dotColor = "danger";
    } else if (status === "Reject") {
      dotColor = "danger";
    }

    return dotColor;
  }

  function getBadgeColor(status) {
    let badgeColor = "";

    if (status === "Approve") {
      badgeColor = "success";
    } else if (status === "Pending") {
      badgeColor = "warning";
    } else if (status === "Cancel") {
      badgeColor = "danger";
    } else if (status === "Reject") {
      badgeColor = "danger";
    }

    return badgeColor;
  }

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="md">
      <ModalBody>
        <a href="#cancel" className="close">
          {" "}
          <Icon name="cross-sm" onClick={() => closeModal()}></Icon>
        </a>
        <div className="nk-tnx-details mt-sm-3">
          <div className="nk-modal-head mb-3">
            <h5 className="title">Request Details</h5>
          </div>
          <Row className="gy-3">
            <Col lg={6}>
              <span className="sub-text">Request Id</span>
              <span className="caption-text">{selectedData?.id}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Status</span>
              <span className={`dot bg-${getDotColor(selectedData?.status)} d-sm-none`}></span>
              <Badge
                className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                color={getBadgeColor(selectedData?.status)}
              >
                {selectedData?.status}
              </Badge>
            </Col>

            <Col lg={6}>
              <span className="sub-text"> Title</span>
              <span className="caption-text">{selectedData?.title}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Type</span>
              <span className="caption-text">{selectedData?.type}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Priority</span>
              <span className="caption-text">{selectedData?.priority}</span>
            </Col>

            <Col lg={6}>
              <span className="sub-text">Type</span>
              <span className="caption-text">{selectedData?.type}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">Priority</span>
              <span className="caption-text">{selectedData?.priority}</span>
            </Col>

            <Col lg={6}>
              <span className="sub-text">CreatedAt</span>
              <span className="caption-text">{selectedData?.createdAt}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">CeatedBy</span>
              <span className="caption-text">{selectedData?.createdBy}</span>
            </Col>
            <Col lg={6}>
              <span className="sub-text">ReportingHead</span>
              <span className="caption-text">{selectedData?.reportingHead}</span>
            </Col>
          </Row>
        </div>
        <div className="d-flex justify-content-start mt-4">
    <Button color="secondary" onClick={() => {}}>
   Cancel
    </Button>
  </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewRequest;
