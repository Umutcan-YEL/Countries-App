export type CountriesModel = {
  name: String;
  code: string;
  capital: String;
  emojiU: String;
  currency: String;
  languages: [{name:String}];
};

export type CountriesModelResult = {
  countries: Array<CountriesModel>;
};
