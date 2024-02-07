import { useQuery, gql } from "@apollo/client";
import { Col, Row, Layout } from "antd";
import { CountriesModelResult } from "./models/countries";
import { useEffect, useState } from "react";
import { HandleWidth } from "./utils/HandleResize";
import TableComponent from "./components/TableComponent";
import SearchBar from "./components/SearchBar";
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
  const [filteredData, setFilteredData] = useState(data?.countries);
  const [pageSize, setPageSize] = useState(HandleWidth);
  const [selectedRow, setSelectedRow] = useState<React.Key[]>([
    HandleWidth() < 10 ? HandleWidth() - 1 : 9,
  ]);

  useEffect(() => {
    onresize = () => {
      setPageSize(HandleWidth);
      setSelectedRow([HandleWidth() < 10 ? HandleWidth() - 1 : 9]);
    };
  }, []);
  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1> There is an error when fetching dat </h1>;
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <Row>
          <Col span={10}></Col>
          <Col span={8}>
            {" "}
            <SearchBar
              data={data}
              setFilteredData={setFilteredData}
              setSelectedRow={setSelectedRow}
            />{" "}
          </Col>
          <Col span={6}></Col>
        </Row>
      </Header>
      <Content>
        <TableComponent
          data={data}
          pageSize={pageSize}
          filteredData={filteredData}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      </Content>
    </Layout>
  );
}

export default App;
