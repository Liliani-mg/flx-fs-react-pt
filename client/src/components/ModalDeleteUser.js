import React from "react";
import { Button, Modal, Divider } from "antd";

const ModalDeleteUser = ({ isVisible, user, onCancel, onOk }) => {
  const contentStyle = {
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: "10px",
    textAlign: "center",
    margin: "0px 10px 40px 10px",
  };

  return (
    <Modal
      title="Eliminar usuario"
      open={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="delete" type="primary" danger onClick={onOk}>
          Eliminar
        </Button>,
      ]}
      width={520}
      style={{ marginTop: 148 }}
    >
      <Divider style={{ marginLeft: -24, marginTop: 10, width: 520 }} />
      <p style={contentStyle}>
        ¿Está seguro que desea eliminar el usuario{" "}
        <span style={{ color: "red", textDecoration: "underline" }}>
          @{user?.name}
          {user?.lastname}
        </span>
        ?
      </p>
    </Modal>
  );
};

export default ModalDeleteUser;
