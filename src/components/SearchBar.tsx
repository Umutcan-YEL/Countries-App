import { AutoComplete } from "antd";
import { CountriesModel, CountriesModelResult } from "../models/countries";

function SearchBar(props: {
  data: CountriesModelResult | undefined;
  setFilteredData: React.Dispatch<
    React.SetStateAction<CountriesModel[] | undefined>
  >;
  setSelectedRow: React.Dispatch<React.SetStateAction<React.Key[]>>;
}) {
  const CountrysName = props.data?.countries.map((country) => {
    return { value: country.name };
  });

  const clearFilter = () => {
    props.setFilteredData(undefined);
  };

  const Search = (value: string) => {
    const firstLetter = value?.charAt(0).toUpperCase();

    const remainingLetters = value?.slice(1);
    const filter = props.data?.countries.filter((country) => {
      return country.name.startsWith(firstLetter + remainingLetters);
    });

    props.setFilteredData(filter);
  };

  return (
    <AutoComplete
      style={{ width: 200 }}
      options={CountrysName}
      onSelect={Search}
      placeholder="Search for Country"
      filterOption={true}
      allowClear={true}
      onClear={clearFilter}
      onChange={Search}
    />
  );
}

export default SearchBar;
