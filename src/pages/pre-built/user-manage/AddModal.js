import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, Form } from "reactstrap";
import { Icon, Col, Button, RSelect } from "../../../components/Component";
import { useForm } from "react-hook-form";
import "../../../../src/style.css";
import Dropzone from "react-dropzone";
import { ticketType, getAllTicketType } from "../../../reducers/ticketType.reducer";

const TicketModule = ({
  title,
  modal,
  closeModal,
  onSubmit,
  formData,
  setFormData,
  filterStatus,
  files,
  setFiles,
  setSelectedType,
  selectedType,
  selectedId,
  setSelectedData,
  selectedData,
}) => {
  useEffect(() => {
    reset(formData);
  }, [formData]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const {
    ticketType: { ticketTypeList },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllTicketType());
  }, []);

  const priority = [
    { label: "Urgent", value: "Urgent" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];
  const handleDropChange = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const softwareData = ticketTypeList?.response.SW.map((item) => ({
    label: item.sub_type,
    value: item.id,
  }));

  const hardwareData = ticketTypeList?.response.HW.map((item) => ({
    label: item.sub_type,
    value: item.id,
  }));
  const status = [
    { label: "Approve", value: "approve" },
    { label: "Reject", value: "reject" },
    { label: "Pending", value: "pending" },
    { label: "Cancel", value: "cancel" },
  ];
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setFormData((prevData) => ({ ...prevData, type: e.target.value }));
  };

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="xl">
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            closeModal();
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">{title}</h5>
          <div className="mt-4">
            <Form className="row gy-4" onSubmit={handleSubmit(onSubmit)}>
              <Col md="12">
                <div className="form-group">
                  <label className="form-label">
                    <div>
                      Title
                      <span className="allLabels">*</span>
                    </div>
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter Title"
                  />
                  {errors.title && <span className="invalid">{errors.title.message}</span>}
                </div>
              </Col>

              <Col md="12">
                <div className="form-group">
                  <label className="form-label">
                    <div>
                      Description
                      <span className="allLabels">*</span>
                    </div>
                  </label>
                  <div className="form-control-wrap">
                    <textarea
                      className="no-resize form-control"
                      {...register("description", { required: "Description is required" })}
                      type="textarea"
                      id="default-textarea"
                      placeholder="Enter description"
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      value={formData.description}
                    />
                    {errors.description && <span className="invalid">{errors.description.message}</span>}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">
                    <div>
                      Priority
                      <span className="allLabels">*</span>
                    </div>
                  </label>
                  <div className="form-control-wrap">
                    <RSelect
                      options={priority}
                      {...register("priority", { required: "Priority is required" })}
                      value={{
                        value: formData.priority,
                        label: formData.priority,
                      }}
                      onChange={(e) => setFormData({ ...formData, priority: e.value })}
                    />
                    {errors.priority && <span className="error-message">{errors.priority.message}</span>}
                  </div>
                </div>
              </Col>

              <Col md="6">
                <div className="form-group">
                  <label className="form-label">
                    <div>
                      Type
                      <span className="allLabels">*</span>
                    </div>
                  </label>
                  <div className="g-4 align-center flex-wrap">
                    <div className="g">
                      <div className="custom-control custom-control-sm custom-radio">
                        <input
                          type="radio"
                          {...register("type", { required: "Type is required" })}
                          className="custom-control-input"
                          value="SW"
                          checked={formData.type === "SW"}
                          onChange={handleTypeChange}
                          id="customRadio7"
                        />
                        <label className="custom-control-label" htmlFor="customRadio7">
                          Software
                        </label>
                      </div>
                    </div>
                    <div className="g">
                      <div className="custom-control custom-control-sm custom-radio">
                        <input
                          type="radio"
                          {...register("type", { required: "Type is required" })}
                          className="custom-control-input"
                          value="HW"
                          checked={formData.type === "HW"}
                          onChange={handleTypeChange}
                          id="customRadio8"
                        />
                        <label className="custom-control-label" htmlFor="customRadio8">
                          Hardware
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.type && <span className="error-message">{errors.type.message}</span>}
                </div>
              </Col>

              {selectedType === "SW" && (
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">
                      <div>
                        Software Type
                        <span className="allLabels">*</span>
                      </div>
                    </label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={softwareData}
                        {...register("subType", { required: "Software Type is required" })}
                        value={softwareData.find((option) => option.value === formData.subType)}
                        onChange={(e) => setFormData({ ...formData, subType: e.value })}
                      />
                      {errors.subType && <span className="error-message ">{errors.subType.message}</span>}
                    </div>
                  </div>
                </Col>
              )}

              {selectedType === "HW" && (
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">
                      <div>
                        Hardware Type
                        <span className="allLabels">*</span>
                      </div>
                    </label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={hardwareData}
                        {...register("subType", { required: "Hardware Type is required" })}
                        value={hardwareData.find((option) => option.value === formData.subType)}
                        onChange={(e) => setFormData({ ...formData, subType: e.value })}
                      />
                      {errors.subType && <span className="error-message ">{errors.subType.message}</span>}
                    </div>
                  </div>
                </Col>
              )}

              <Col md="6">
                <div className="form-group">
                  <label className="form-label">
                    <div>
                      Reporting Manager
                      <span className="allLabels">*</span>
                    </div>
                  </label>
                  <input
                    className="form-control"
                    disabled={true}
                    type="text"
                    {...register("reportingHead", { required: "Reporting Manager is required" })}
                    value={formData.reportingManager}
                    onChange={(e) => setFormData({ ...formData, reportingManager: e.target.value })}
                    placeholder="Reporting Manager"
                  />
                  {errors.reportingManager && <span className="invalid">{errors.reportingManager.message}</span>}
                </div>
              </Col>

              {title === "Update Ticket" && (
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">
                      <div>
                        Status
                        <span className="allLabels">*</span>
                      </div>
                    </label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={status}
                        {...register("status", { required: "Status is required" })}
                        value={{
                          value: formData.status,
                          label: formData.status,
                        }}
                        onChange={(e) => setFormData({ ...formData, status: e.value })}
                      />
                      {/* {errors.status && <span className="error-message">{errors.status.message}</span>} */}
                    </div>
                  </div>
                </Col>
              )}
              <Col md="6">
                <label className="form-label">Attachment</label>
                <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} multiple accept="image/*, video/*" />
                        {files.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">
                              <b>Drag and drop files</b>
                            </span>
                          </div>
                        )}
                        {files.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            {file.type.startsWith("image/") && (
                              <div className="dz-image">
                                <img src={file.preview} alt="preview" />
                              </div>
                            )}
                            {file.type.startsWith("video/") && (
                              <div className="dz-video">
                                <video controls>
                                  <source src={file.preview} type={file.type} />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Col>

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit" onClick={onSubmit}>
                      {title === "Add Ticket" ? "Save" : "Update"}
                    </Button>
                  </li>
                  <li>
                    <a
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        closeModal();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </a>
                  </li>
                </ul>
              </Col>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default TicketModule;


