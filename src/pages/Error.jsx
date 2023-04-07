import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <DashboardLayout>
      <h1 className="text-center">
        Page does not exists.{" "}
        <Link className="text-blue-500" to="/">
          Go to Home
        </Link>
      </h1>
    </DashboardLayout>
  );
};

export default Error;
