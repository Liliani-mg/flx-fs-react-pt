import React from "react";
import {
  Input,
  Row,
  Col,
  Dropdown,
  Menu,
  Space,
  Breadcrumb,
  Button,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSearch } from "../contexts/SearchContext";
import { useModal } from "../contexts/ModalContext";

const { Search } = Input;

const menuProps = [
  {
    label: "Todos",
    value: null,
    key: 0,
  },
  {
    label: "Activo",
    value: "active",
    key: 1,
  },
  {
    label: "Inactivo",
    value: "inactive",
    key: 2,
  },
];

const Header = () => {
  const { updateSearchTerm } = useSearch();
  const { openModal } = useModal();
  const { updateFilterStatus } = useSearch();

  const handleFilterChange = (status) => {
    updateFilterStatus(status);
  };

  const handleSearch = (value) => {
    updateSearchTerm(value);
  };

  const handleAddUserClick = () => {
    openModal("add");
  };

  const menu = (
    <Menu>
      {menuProps.map((item) => (
        <Menu.Item
          key={item.key}
          onClick={() => handleFilterChange(item.value)}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <header style={{ margin: "1rem 0.1rem 2rem 6.1rem" }}>
      {/* Breadcrumb */}

      <Row gutter={[16, 16]}>
        <Col>
          <Breadcrumb
            separator="/"
            style={{ margin: "0.6rem 0.4rem 0.4rem 0.3rem" }}
          >
            <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
            <Breadcrumb.Item>Listado de Usuarios</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {/* Barra de búsqueda, filtro y botón agregar usuario */}

      <Row
        gutter={[16, 16]}
        align="middle"
        style={{ justifyContent: "flex-start", marginTop: "16px" }}
      >
        <Col span={6}>
          <Search
            placeholder="Buscar usuarios"
            onSearch={handleSearch}
            size="large"
            style={{
              width: 290,
              marginLeft: -40,
            }}
          />
        </Col>
        <Col span={6} align="left">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              style={{
                color: "#D9D9D9",
                borderColor: "#D9D9D9",
                height: "2.56rem",
                width: "68%",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <Space>
                Filtrar por estado
                <DownOutlined style={{ marginLeft: 68 }} />
              </Space>
            </Button>
          </Dropdown>
        </Col>
        <Col span={6}></Col>
        <Col span={6}>
          <Button
            type="primary"
            style={{ width: "44%", height: "2.56rem", marginRight: 16 }}
            onClick={handleAddUserClick}
          >
            Agregar Usuario
          </Button>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
