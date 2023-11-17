import React from "react";

type ParamsType = {
  params: {
    serverId: string;
  };
};
const ServerIdPage = async ({ params }: ParamsType) => {
  return <div>{params.serverId}</div>;
};

export default ServerIdPage;
