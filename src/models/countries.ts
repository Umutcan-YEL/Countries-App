export type CountriesModel = {
  name: String;
  code: String;
  capital: String;
  emojiU: String;
  currency: String;
};

export type CountriesModelResult = {
  countries: Array<CountriesModel>;
};
