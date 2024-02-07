import { Table } from "antd";
import React from "react";
import { CountriesModel, CountriesModelResult } from "../models/countries";

function TableComponent(props: {
  pageSize: number;
  data: CountriesModelResult | undefined;
  filteredData: CountriesModel[] | undefined;
  selectedRow: React.Key[] | undefined;
  setSelectedRow: React.Dispatch<React.SetStateAction<React.Key[]>>;
}) {
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
        onChange: (selectedRowKeys: React.Key[]) => {
          props.setSelectedRow(selectedRowKeys);
        },
      }}
      rowClassName={(record) =>
        props.selectedRow?.includes(record.key) ? "seleceted-row" : ""
      }
      columns={columns}
      dataSource={tableData}
      tableLayout={"auto"}
      pagination={{ pageSize: props.pageSize, showSizeChanger: false }}
    />
  );
}

export default TableComponent;
