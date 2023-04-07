import React from "react";
import Helmet from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta
        name="description"
        content="ElectroSmart a new Store in the market that allow users to buy the latest smart product with an excellent price !"
      />
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
