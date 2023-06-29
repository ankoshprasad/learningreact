import React from "react";

export const years = ["2021", "2022", "2023"];

export const useDynamicYears = ({ startingYear, numberOfYears }) => {
  const [years, setYears] = React.useState(() => {
    const dynamicYears = [];
    for (let year = startingYear; year < startingYear + numberOfYears; year++) {
      dynamicYears.push(year);
    }
    return dynamicYears;
  });
  return years;
};
