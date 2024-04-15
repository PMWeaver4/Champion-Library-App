import { useState } from "react";
import MenuPopup from "../../Components/MenuPopup/MenuPopup";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";

// account page is synonymous with my pofile page

export default function MyAccount() {
  return (
    <main className="my-account-page">
      <PageTemplate pageTitle="My Account">
        <div className="my-account-body"></div>
      </PageTemplate>
    </main>
  );
}
