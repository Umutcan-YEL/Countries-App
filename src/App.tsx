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
  const [selectedRow, setSelectedRow] = useState<React.Key[]>([]);

  const filteredDataLength = filteredData?.length;

  useEffect(() => {
    if (filteredDataLength < 9 && filteredDataLength > 0) {
      const lastIndex = filteredDataLength - 1;
      setSelectedRow([lastIndex]);
    } else if (filteredDataLength >= 9) {
      setSelectedRow([9]);
    } else if (filteredDataLength == data?.countries.length) {
      setSelectedRow([]);
    }
    onresize = () => {
      setPageSize(HandleWidth);
    };
  }, [filteredDataLength]);

  if (loading) {
    return (
      <div className="center">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center">
        <h1> There is an error when fetching data </h1>
      </div>
    );
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <Row>
          <Col xs={3} md={10}></Col>
          <Col span={8}>
            {" "}
            <SearchBar data={data} setFilteredData={setFilteredData} />{" "}
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
