import React, { useMemo } from "react"
import { useQuery } from "@apollo/client";
import { GET_MISSIONS } from "../../queries/missions.gql";
import classes from './Missions.module.css'

export const Missions = () => {
    const  { data, loading } = useQuery(GET_MISSIONS, {
        variables: {
            limit: 3
        }
    });

    const shouldDisplayMissions = useMemo(() => {
        if (data?.missions?.length) {
            return data.missions.map(mission => {
                const shouldDisplayLinks = mission.links?.length ? mission.links.map(link => {
                    return <li key={`${mission.id}-${link}`}>
                        <a href={link}>{link}</a>
                    </li>
                }) : null;

                return <div key={mission.id} className={classes.mission}>
                    <h2>{mission.name}</h2>
                    {shouldDisplayLinks}
                </div>
            })
        }

        return <h2>There are no missions</h2>
    }, [data]);

    if (loading) {
        return <p>Loading...</p>
    }

    return shouldDisplayMissions;
}

export default Missions;