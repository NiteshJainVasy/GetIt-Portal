import React, { useEffect, useState } from "react";
import { Modal, ModalBody, Form } from "reactstrap";
import { Icon, Col, Button, RSelect } from "../../../components/Component";
import { useForm } from "react-hook-form";
import "../../../../src/style.css";
import Dropzone from "react-dropzone";

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

  const softwareData = [
    { label: "Unblocksite", value: "unblocksite" },
    { label: "Internet", value: "internet" },
    { label: "SystemRenewal", value: "system renewal" },
    { label: "Installation", value: "installation" },
    { label: "SoftwareUpdate ", value: "softwareUpdate" },
    { label: "Other", value: "other" },
  ];

  const hardwareData = [
    { label: "NewAssist", value: "newAssist" },
    { label: "AssistReplace", value: "assistReplace" },
    { label: "UpgradeAssist", value: "upgradeAssist" },
    { label: "SystemNotWorking", value: "systemNotWorking" },
    { label: "Other", value: "other" },
  ];

  const status = [
    { label: "Approve", value: "approve" },
    { label: "Reject", value: "reject" },
    { label: "Pending", value: "pending" },
    { label: "Cancel", value: "cancel" },
  ];
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  useEffect(() => {
    setSelectedType("Hardware");
  }, [selectedType]);
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
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                          {...register("Type", { required: "Type is required" })}
                          className="custom-control-input"
                          name="radioSize"
                          id="customRadio7"
                          value="Software"
                          checked={selectedType === "Software"}
                          onChange={handleTypeChange}
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
                          {...register("Type", { required: "Type is required" })}
                          className="custom-control-input"
                          name="radioSize"
                          id="customRadio8"
                          value="Hardware"
                          checked={selectedType === "Hardware"}
                          onChange={handleTypeChange}
                        />
                        <label className="custom-control-label" htmlFor="customRadio8">
                          Hardware
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.Type && <span className="error-message">{errors.Type.message}</span>}
                </div>
              </Col>

              {selectedType === "Software" && (
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
                        {...register("SoftwareType", { required: "SoftwareType is required" })}
                        value={{
                          value: formData.softwareType,
                          label: formData.softwareType,
                        }}
                        onChange={(e) => setFormData({ ...formData, softwareType: e.value })}
                      />
                      {errors.softwareType && <span className="invalid">{errors.softwareType.message}</span>}
                    </div>
                  </div>
                </Col>
              )}

              {selectedType === "Hardware" && (
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
                        {...register("SoftwareType", { required: "SoftwareType is required" })}
                        value={{
                          value: formData.hardwareType,
                          label: formData.hardwareType,
                        }}
                        onChange={(e) => setFormData({ ...formData, hardwareType: e.value })}
                      />
                      {errors.softwareType && <span className="invalid">{errors.softwareType.message}</span>}
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
                    type="text"
                    {...register("reportingHead", { required: "Reporting Manager is required" })}
                    value={formData.reportingHead}
                    onChange={(e) => setFormData({ ...formData, reportingHead: e.target.value })}
                    placeholder="Reporting Manager"
                  />
                  {errors.reportingHead && <span className="invalid">{errors.reportingHead.message}</span>}
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
                      {errors.status && <span className="error-message">{errors.status.message}</span>}
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
                    <Button color="primary" size="md" type="submit">
                      Save
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
