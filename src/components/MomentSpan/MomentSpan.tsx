import moment from "moment";
import React from "react";
import { Timestamp } from "firebase/firestore";
type MomentSpanProps = {
  timeStamp: Timestamp;
};

const MomentSpan: React.FC<MomentSpanProps> = ({ timeStamp }) => {
  return (
    <span className="hidden lg:flex">
      updated at{" "}
      {timeStamp && moment(new Date(timeStamp.seconds * 1000)).fromNow()}
    </span>
  );
};
export default MomentSpan;
