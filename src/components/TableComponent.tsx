import { Table } from "antd";
import React from "react";
import { TableProps } from "../models/Props";

function TableComponent(props: TableProps) {
  const columns = [
    {
      title: "Flag",
      dataIndex: "flag",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Capital",
      dataIndex: "capital",
    },
    {
      title: "Currency",
      dataIndex: "currency",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
  ];

  let tableData;

  if (props.filteredData) {
    tableData = props.filteredData?.map((country, index) => {
      return {
        key: index,
        flag: (
          <img
            alt={country.code}
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code.toUpperCase()}.svg`}
            height={18}
          />
        ),
        name: country.name + " / " + country.code,
        capital: country.capital,
        currency: country.currency,
        language: country.languages[0]?.name,
      };
    });
  } else {
    tableData = props.data?.countries.map((country, index) => {
      return {
        key: index,
        flag: (
          <img
            alt={country.code}
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code.toUpperCase()}.svg`}
            height={18}
          />
        ),
        name: country.name + " / " + country.code,
        capital: country.capital,
        currency: country.currency,
        language: country.languages[0]?.name,
      };
    });
  }

  return (
    <Table
      rowSelection={{
        type: "radio",
        onChange: (selectedRow: React.Key[]) => {
          props.setSelectedRow(selectedRow);
        },
      }}
      rowClassName={(record) =>
        props.selectedRow?.includes(record.key) ? "seleceted-row" : ""
      }
      columns={columns}
      dataSource={tableData}
      tableLayout={"auto"}
      pagination={{ pageSize: props.pageSize, showSizeChanger: false }}
      size={
        props.pageSize < 10 ? "small" : props.pageSize < 12 ? "middle" : "large"
      }
    />
  );
}

export default TableComponent;
