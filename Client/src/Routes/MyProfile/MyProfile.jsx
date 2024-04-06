import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

export default function Users() {
  return (
    <main className="my-profile-page">
      <PageTemplate pageTitle="My Profile">
        <div className="my-profile-body"></div>
      </PageTemplate>
    </main>
  );
}
