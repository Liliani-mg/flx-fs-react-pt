import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Modal, Form, Input, Select, Button, Col, Row, Divider } from "antd";
import { updateUser, createUser } from "../services/api";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Por favor, ingresa el nombre de usuario"),
  name: Yup.string()
    .required("Por favor, ingresa el nombre")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  lastname: Yup.string()
    .required("Por favor, ingresa el apellido")
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  status: Yup.string().required("Por favor, selecciona el estado"),
  email: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("Por favor, ingresa el correo electrónico"),
  age: Yup.number()
    .required("Por favor, ingresa la edad")
    .integer("La edad debe ser un número entero")
    .min(10, "La edad debe ser de al menos dos dígitos")
    .max(99, "La edad no debe exceder los dos dígitos"),
});

const UserForm = ({ isVisible, onCancel, onOk, editMode, userData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initializeForm() {
      form.resetFields();
      if (userData && editMode) {
        form.setFieldsValue(userData);
      }
    }

    if (form) {
      initializeForm();
    }
  }, [userData, editMode, form]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await validationSchema.validate(values, { abortEarly: false });

      if (editMode) {
        await updateUser(userData.id, values);
        // Cierra el modal después de actualizar el usuario
        onCancel();

        // Muestra la lista de usuarios
        onOk && onOk();
      } else {
        const newUser = { ...values, id: uuidv4() };
        await createUser(newUser);

        // Cierra el modal solo después de agregar un nuevo usuario
        onCancel();

        // Actualiza la lista de usuarios (si es necesario)
        onOk && onOk();
      }
    } catch (error) {
      console.error("Error submitting form:", error.errors);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateField = async (field, value) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
    } catch (error) {
      return Promise.reject(error.message);
    }
  };

  return (
    <Modal
      title={editMode ? "Editar usuario" : "Agregar usuario"}
      visible={isVisible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      footer={null}
      style={{ marginTop: 148 }}
    >
      <Divider style={{ marginLeft: -24, marginTop: 10, width: 520 }} />
      <Form form={form} layout="vertical" name="userForm">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Usuario"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  validator: async (_, value) => {
                    await handleValidateField("username", value);
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  validator: async (_, value) => {
                    await handleValidateField("email", value);
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nombre"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  validator: async (_, value) => {
                    await handleValidateField("name", value);
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              label="Apellido"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  validator: async (_, value) => {
                    await handleValidateField("lastname", value);
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Estado"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  validator: async (_, value) => {
                    await handleValidateField("status", value);
                  },
                },
              ]}
            >
              <Select placeholder="Seleccione un estado">
                <Option value="active">Activo</Option>
                <Option value="inactive">Inactivo</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              label="Edad"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  validator: async (_, value) => {
                    await handleValidateField("age", value);
                  },
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Divider
          style={{
            marginLeft: -24,
            marginTop: 18,
            marginBottom: 13,
            width: 520,
          }}
        />
        <Form.Item
          style={{ textAlign: "right", marginBottom: -5, marginRight: -5 }}
        >
          <Button type="primary" onClick={handleOk} loading={loading}>
            {editMode ? "Editar usuario" : "Agregar usuario"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
