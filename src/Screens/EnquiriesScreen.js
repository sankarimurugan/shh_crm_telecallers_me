import React, { useEffect, useState } from "react";
import EnquiriesList from "../Components/Enquiries/EnquiriesList";
import { useLazyLead_listQuery } from "../Data/Api/api";
import EmptyComp from "../Components/common/Empty/EmptyComp";
import PageLoad from "../Components/common/Loading/PageLoad";
import useUser from "../Data/Local/userDetail";

const EnquiriesScreen = () => {
  const [datalist, setDataLisst] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  console.log("telssuser", user);

  const telID = user?.telecaller?.id;

  // Api
  const [leadGetApi] = useLazyLead_listQuery();

  const leadListFun = () => {
    setLoading(true);
    leadGetApi(telID)
      .unwrap()
      .then((res) => {
        console.log("Res", res);
        const followledLeads = res?.data.filter(
          (lead) => lead.status === "Enquiry"
        );
        console.log("followledLeads", followledLeads);

        setDataLisst(followledLeads || []);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    leadListFun();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && <PageLoad />}
      {datalist?.length===0 && !loading ? (
        <EmptyComp text={"Enquiry Not Found"} />
      ) : (
        !loading && (
          <EnquiriesList
            data={datalist}
            leadListFun={leadListFun}
            setLoading={setLoading}
          />
        )
      )}
    </div>
  );
};

export default EnquiriesScreen;
