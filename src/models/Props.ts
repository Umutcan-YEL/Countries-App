import { CountriesModel, CountriesModelResult } from "./countries";

export type TableProps = {
  pageSize: number;
  data: CountriesModelResult | undefined;
  filteredData: CountriesModel[] | undefined;
  selectedRow: React.Key[] | undefined;
  setSelectedRow: React.Dispatch<React.SetStateAction<React.Key[]>>;
};

export type SearchProps = {
  data: CountriesModelResult | undefined;
  setFilteredData: React.Dispatch<
    React.SetStateAction<CountriesModel[] | undefined>
  >;
};
