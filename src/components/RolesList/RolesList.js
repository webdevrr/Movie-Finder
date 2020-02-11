import React, { useEffect, useState } from "react";
import uuid from "uuid";
import RolesListItem from "../RolesListItem/RolesListItem";
import api from "../../api";
import "./RolesList.css";

const RolesList = ({ id }) => {
  const getRoles = `/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_APIKEY}`;
  const [rolesFull, setRolesFull] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isFull, setIsFull] = useState(false);
  const rolesRange = 7;
  useEffect(
    () => {
      api
        .get(getRoles)
        .then(response => {
          const filter = obj => {
            if (obj.character !== "") {
              return obj;
            }
          };
          const filterRoles = response.data.cast.filter(filter);
          const roles = filterRoles.map(r => ({ ...r, uuid: uuid() }));
          const range = roles.slice(0, rolesRange);
          setRolesFull(roles);
          setRoles(range);
        })
        .catch(err => console.log(err));
    },
    //eslint-disable-next-line
    []
  );
  const handleClick = () => {
    setRoles(rolesFull);
    setIsFull(true);
  };

  const renderMore = () => {
    if (roles.length < rolesRange || isFull === true) {
      return null;
    } else {
      return (
        <p onClick={handleClick} className="more">
          show full...
        </p>
      );
    }
  };
  return (
    <div className="roles-list">
      <ul>
        {roles.map(role => (
          <RolesListItem role={role} key={role.uuid} />
        ))}
      </ul>
      {renderMore()}
    </div>
  );
};

export default RolesList;
