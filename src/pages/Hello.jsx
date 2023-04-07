import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const Hello = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4 grid-cols-4">
        <article className="p-2 bg-white border-l-4  text-red-700">
          <h2>Hello</h2>
        </article>

        <article className="p-2 bg-white border-l-4  text-red-700">
          <h2>Hello</h2>
        </article>

        <article className="p-2 bg-white border-l-4  text-red-700">
          <h2>Hello</h2>
        </article>

        <article className="p-2 bg-white border-l-4  text-red-700">
          <h2>Hello</h2>
        </article>
      </div>
    </DashboardLayout>
  );
};

export default Hello;
