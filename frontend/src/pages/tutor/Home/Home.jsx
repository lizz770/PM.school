import React, { Fragment } from "react";
import Message from "../../../components/home/Message";
import StatisticsTutor from "../../../components/home/StatisticsTutor";
import Info from "../../../components/home/Info";
import ApprovedUsers from "../../../components/home/ApprovedUsers";
import { useWhoami } from "../../../queries/authQueries";
import { useHomeStats } from "../../../queries/accountQueries";
import LoadingSpinnerSquare from "../../../components/loadingSpinnerSquare";

const Home = () => {
  const { data: me } = useWhoami();
  const {
    data: stats,
    isLoading: statsLoading,
    isRefetching: statsRefetching,
    refetch: statsRefetch,
  } = useHomeStats();
  return (
    <Fragment>
      <Message fName={me?.user?.firstName} refetch={() => statsRefetch()} />
      {statsLoading || statsRefetching ? (
        <div style={{ marginTop: "2rem" }}>
          <LoadingSpinnerSquare size={45} h={240} />
        </div>
      ) : (
        <StatisticsTutor
          students={stats?.Students}
          prescriptions={stats?.Prescriptions}
        />
      )}
      <Info
        meds={stats?.Prescriptions}
        isLoading={statsLoading || statsRefetching}
      />
      <ApprovedUsers
        user={me?.user}
        approvedUsers={
          stats
            ? [
                ...stats?.Students?.map((student) => {
                  return {
                    firstName: student?.student?.firstName,
                    lastName: student?.student?.lastName,
                    status: student?.status,
                  };
                }),
              ]
            : []
        }
        isLoading={statsLoading || statsRefetching}
      />
    </Fragment>
  );
};

export default Home;
