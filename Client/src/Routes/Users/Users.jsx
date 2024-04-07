import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function Users() {
  return (
    <main className="users-page">
      <PageTemplate pageTitle="Users">
        <div className="users-body"></div>
      </PageTemplate>
    </main>
  );
}
