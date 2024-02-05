import { useQuery, gql } from "@apollo/client";
import { Layout, Table } from "antd";
import { CountriesModelResult } from "./models/countries";
import { useEffect, useState } from "react";
import { HandleWidth } from "./utils/HandleWidth";
const { Header, Content } = Layout;
const GetCountries = gql`
  query Query {
    countries {
      name
      capital
      emojiU
      currency
      code
      languages {
        name
      }
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
    {
      title: "Language",
      dataIndex: "language",
    },
  ];

  if (loading) {
    return <h1>Loading</h1>;
  }

  const tableData = data?.countries.map((country, index) => {
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

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>abc</Header>
      <Content>
        {" "}
        <Table
          columns={columns}
          dataSource={tableData}
          tableLayout={"auto"}
          pagination={{ pageSize: pageSize, showSizeChanger: false }}
        />
      </Content>
    </Layout>
  );
}

export default App;
