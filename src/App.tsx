import { useQuery, gql } from "@apollo/client";
import { Layout, List, Col, Row, Table } from "antd";
import { CountriesTable } from "./models/Table";
import { CountriesModelResult } from "./models/countries";
import { useEffect, useState } from "react";
import { HandleWidth } from "./utils/HandleWidth";
const { Header, Footer, Content } = Layout;
const GetCountries = gql`
  query Query {
    countries {
      name
      capital
      emojiU
      currency
      code
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery<CountriesModelResult>(GetCountries);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setPageSize(HandleWidth);
  }, []);

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
  ];

  if (loading) {
    return <h1>Loading</h1>;
  }

  const tableData = data?.countries.map((country, index) => {
    return {
      key: index,
      flag: "icon",
      name: country.name + " / " + country.code,
      capital: country.capital,
      currency: country.currency,
    };
  });

  console.log(data);
  return (
    <Layout style={{ height: "100vh" }}>
      <Header>abc</Header>
      <Content>
        {" "}
        <Table
          columns={columns}
          dataSource={tableData}
          tableLayout={"auto"}
          pagination={{ pageSize: pageSize }}
        />
      </Content>
    </Layout>
  );
}

export default App;
