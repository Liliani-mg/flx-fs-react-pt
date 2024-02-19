import React, { useState, useEffect } from "react";

// Contextos
import { useSearch } from "../contexts/SearchContext";
import { useModal } from "../contexts/ModalContext";

// Componentes de Ant Design
import { Table, Pagination, Tag, Button, message } from "antd";
import { Content } from "antd/es/layout/layout";

// Componentes personalizados
import ModalDeleteUser from "./ModalDeleteUser";
import UserForm from "./UserForm";

//  API
import { getUsers, deleteUser, updateUser, createUser } from "../services/api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { searchTerm, updateSearchTerm, filterStatus } = useSearch();
  const { openModal, closeModal, modalType, modalData } = useModal();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 9,
    total: 0,
  });

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
      width: 120,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "firstName",
      width: 120,
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastName",
      width: 120,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 60,
      render: (text, record) => (
        <Tag color={record.status === "active" ? "success" : "error"}>
          {record.status === "active" ? "Activo" : "Inactivo"}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      width: 60,
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Editar
          </Button>
          <Button type="link" onClick={() => showDeleteModal(record)}>
            Eliminar
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, filterStatus, pagination.current]);

  const fetchUsers = async () => {
    try {
      const limit = pagination.pageSize;
      const offset = (pagination.current - 1) * pagination.pageSize;
      const fetchedUsers = await getUsers(
        limit,
        offset,
        searchTerm,
        filterStatus
      );

      // Actualiza la lista de usuarios y la paginación
      setUsers(fetchedUsers.data);
      setPagination({ ...pagination, total: fetchedUsers.total });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setSelectedUser(record);
    openModal("edit", { user: record });
  };

  const showDeleteModal = (record) => {
    openModal("delete", { user: record });
  };

  const handleDeleteOk = async () => {
    try {
      await deleteUser(modalData?.user.id);
      fetchUsers();
    } catch (error) {
      console.error(`Error al eliminar usuario: ${error.message}`);
    } finally {
      closeModal();
    }
  };

  const handleDeleteCancel = () => {
    closeModal();
    setEditMode(false);
    setSelectedUser(null);
  };

  const handleUserFormOk = async (userData) => {
    try {
      await fetchUsers();

      setPagination({ ...pagination, current: 1 });
    } catch (error) {
      message.error(`Error al guardar usuario: ${error.message}`);
    } finally {
      closeModal();
      setEditMode(false);
      setSelectedUser(null);
    }
  };

  const filteredUsers = searchTerm
    ? users.filter((user) => {
        return (
          (user.name &&
            user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.lastname &&
            user.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      })
    : users;

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize: pageSize });
  };

  return (
    <Content style={{ margin: "0px 98px 98px 98px" }}>
      <Table columns={columns} dataSource={filteredUsers} pagination={false} />
      <Pagination
        style={{ marginTop: "16px", textAlign: "right" }}
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        size="default"
        onChange={handlePaginationChange}
        showLessItems
      />
      <ModalDeleteUser
        isVisible={modalType === "delete"}
        user={modalData?.user}
        onCancel={handleDeleteCancel}
        onOk={handleDeleteOk}
      />
      {modalType === "edit" && (
        <UserForm
          isVisible={modalType === "edit"}
          onCancel={handleDeleteCancel}
          onOk={handleUserFormOk}
          editMode={true}
          userData={modalData?.user}
        />
      )}
      {modalType === "add" && (
        <UserForm
          isVisible={modalType === "add"}
          onCancel={handleDeleteCancel}
          onOk={handleUserFormOk}
          editMode={false}
          onUpdateUsers={fetchUsers}
        />
      )}
    </Content>
  );
};

export default UsersList;
