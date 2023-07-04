import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Icon, Button, Col, RSelect } from "../../../components/Component";
import { teamList } from "./ProjectData";
import { Modal, ModalBody, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { getAllTicketType, createTicketType } from "../../../reducers/ticketType.reducer";
import { useDispatch, useSelector } from "react-redux";

const FormModal = ({ modal, closeModal, onSubmit, formData, setFormData, modalType }) => {
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
  const softwareData = [
    { label: "Software", value: "SW" },
    { label: "Hardware", value: "HW" },
  ];

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="md">
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
          <h5 className="title">
            {modalType === "add" && "Add TicketType"} {modalType === "edit" && "Update TicketType"}
          </h5>
          <div className="mt-4">
            <Form className="row gy-4" onSubmit={handleSubmit(onSubmit)}>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <RSelect
                    {...register("type", { required: " Type is required" })}
                    options={softwareData}
                    // value={formData.team}
                    onChange={(e) => setFormData({ ...formData, type: e.value })}
                  />
                  {errors.type && <span className="error-message">{errors.type.message}</span>}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">SubType</label>
                  <input
                    type="text"
                    {...register("subType", { required: "SubType is required" })}
                    // value={formData.title}
                    placeholder="Enter SubType"
                    onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
                    className="form-control"
                  />
                  {errors.subType && <span className="invalid">{errors.subType.message}</span>}
                </div>
              </Col>

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      {modalType === "add" && "Add TicketType"} {modalType === "edit" && "Update TicketType"}
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={(ev) => {
                        ev.preventDefault();
                        closeModal();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </Button>
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
export default FormModal;
