import { useState } from "react";

const Watch = () => {
  const [date, setDate] = useState("");
  const getDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDate(date);

    // setDate()
  };
  return (
    <div>
      <input type="date" onChange={getDate} />
      <p>{date}</p>
    </div>
  );
};

export default Watch;
