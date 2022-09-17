import type { StylesConfig } from 'react-select';

export type SelectOption = {
  label: string;
  value: number;
};

export const customSelectStyles: StylesConfig<SelectOption, false> = {
  container: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  input: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    height: 46,
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  control: (provided) => ({
    ...provided,
    border: 0,
  }),
  menu: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  }),
};

export const customSelectStylesMulti: StylesConfig<SelectOption, true> = {
  container: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  input: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  control: (provided) => ({
    ...provided,
    border: 0,
  }),
};
