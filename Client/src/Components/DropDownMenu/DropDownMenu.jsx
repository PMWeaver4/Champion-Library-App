import { useState } from "react";

export default function DropDownMenu() {
  const [filter, setFilter] = useState("");

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">To: </label>
      <select name="dropdown" value={filter} onChange={handleChangeFilter}>
        <option value=""> Select User </option>
        <option value="name">Bianka E.</option>
        <option value="date">Paul W.</option>
        <option value="category">Trang C.</option>
      </select>
    </div>
  );
}
