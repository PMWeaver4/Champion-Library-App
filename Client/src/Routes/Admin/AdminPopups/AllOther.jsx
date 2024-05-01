// import { NavLink } from "react-router-dom";
// import PageTemplate from "../../Components/PageTemplate/PageTemplate";
// import OtherTile from "../../Components/ItemTIles/OtherTile";
// import { useEffect, useState } from "react";
// import config from "../../config.json";
// import { getToken } from "../../localStorage";

// export default function AllOther({ pageTitle }) {
//   // fetch items
//   const [otherItems, setOtherItems] = useState([]);
//   const [items, setItems] = useState([]);

//   async function getAllItems() {
//     const response = await fetch(config.backend_url + "item/all", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });
//     const itemData = await response.json(); // the response is directly an array of items
//     if (response.status !== 200) {
//       console.error("Failed to fetch items");
//       return;
//     }
//     setItems(itemData);
//     setOtherItems(itemData.Results.filter((item) => item.itemType === "other"));
//   }

//   useEffect(() => {
//     getAllItems();
//   }, []);

//   return (
//     <main className="all-others-page">
//       <PageTemplate pageTitle="OTHER">
//         <div className="all-others-body">
//           <div className="view-all-headers">
//             <NavLink className="back-btn-home" to="/home">
//               <i className="fa-solid fa-arrow-left"></i>
//             </NavLink>
//             <h1>OTHER</h1>
//           </div>
//           <div className="view-all-grid">
//             {otherItems.map((other) => (
//               <OtherTile key={other._id} other={other} />
//             ))}
//           </div>
//         </div>
//       </PageTemplate>
//     </main>
//   );
// }
export default function AllOther(){
  return (
      <div>
          All Items
      </div>
  );
}