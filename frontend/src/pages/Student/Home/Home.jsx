import React, { Fragment } from "react";
import Message from "../../../components/home/Message";
import Statistics from "../../../components/Home/Statistics";
import Info from "../../../components/home/Info";
import ApprovedUsers from "../../../components/home/ApprovedUsers";
import { useWhoami } from "../../../queries/authQueries";
import { useHomeStats } from "../../../queries/accountQueries";

const Home = () => {
  const { data: me } = useWhoami();
  const {
    data: stats,
    refetch: refetchStats,
    isLoading: statsLoading,
    isRefetching: statsRefetching,
  } = useHomeStats();

  return (
    <Fragment>
      <Message fName={me?.user?.firstName} refetch={() => refetchStats()} />
      <Statistics
        bp={{
          sys: stats?.Mediadesign[0]?.title,
        }}
        hr={stats?.PhotoProduction[0]?.title}
        tp={stats?.VideoProduction[0]?.title}
        isLoading={statsLoading || statsRefetching}
      />
      <Info
        meds={stats?.Prescriptions}
        isLoading={statsLoading || statsRefetching}
      />
      <ApprovedUsers
        user={me?.user}
        approvedUsers={
          stats
            ? [
              {
                firstName:"",
                lastName: "",
                status:"PENDING",
                      
              }
                // ...stats?.Tutors?.map((tutor) => {
                //   return {
                //     firstName: tutor?.tutor?.firstName,
                //     lastName: tutor?.tutor?.lastName,
                //     status: tutor?.status,
                //   };
                // }),
              ]
            : [{
              firstName:"",
              lastName: "",
              status:"PENDING",
                    
            }]
        }
        isLoading={statsLoading || statsRefetching}
      />
    </Fragment>
  );
};

export default Home;
