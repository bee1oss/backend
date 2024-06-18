import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";


import styles from "./Group.module.scss";
import { RSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemoveGroup } from "../../redux/slices/groups";

export const Group = ({
  id,
  group,
  kurs,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <RSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to delete ")) {
      dispatch(fetchRemoveGroup(id));
    }
  };

  return (
    <tr>
      <td>{group}</td>
      <td>{kurs}</td>
      
      <td>
      <div className={clsx(styles.root)}>
      {isEditable && (
        <div>
          <Link to={`/groups/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
        </div>
      </td>
    </tr>
  );
};
