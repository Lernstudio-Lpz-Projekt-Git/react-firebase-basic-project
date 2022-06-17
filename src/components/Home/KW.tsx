import { useState } from "react";
import moment, { now } from 'moment';

const KW = () => {
  const [getKW, setKW] = useState(0);
  const nD = new Date(now());

  setKW(() => moment(nD).week());

  return (
    <>
      <div className="kw">{getKW}</div>
    </>
  );
};

export default KW;
