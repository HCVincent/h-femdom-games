import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

type indexProps = {};

const DownloadPage: React.FC<indexProps> = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("query")); // Logs "search"
  return <div>{searchParams.get("query")}</div>;
};
export default DownloadPage;
