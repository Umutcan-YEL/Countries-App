export type CountriesModel = {
  name: string;
  code: string;
  capital: String;
  emojiU: String;
  currency: String;
  languages: [{name:String}];
};

export type CountriesModelResult = {
  countries: Array<CountriesModel>;
};
