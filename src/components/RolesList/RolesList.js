import React, { useEffect, useState } from "react";
import uuid from "uuid";
import RolesListItem from "../RolesListItem/RolesListItem";
import api from "../../api";
import "./RolesList.css";

const RolesList = ({ id }) => {
  const getRoles = `/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_APIKEY}`;
  const [roles, setRoles] = useState([]);

  useEffect(
    () => {
      api.get(getRoles).then(response => {
        const filter = obj => {
          if (obj.character !== "") {
            return obj;
          }
        };
        const filterRoles = response.data.cast.filter(filter);
        const roles = filterRoles.map(r => ({ ...r, uuid: uuid() }));
        setRoles(roles);
      });
    },
    //eslint-disable-next-line
    []
  );
  return (
    <div className="roles-list">
      <ul>
        {roles.map(role => (
          <RolesListItem role={role} key={role.uuid} />
        ))}
      </ul>
    </div>
  );
};

export default RolesList;
