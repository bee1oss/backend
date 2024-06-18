import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";


import styles from "./Day.module.scss";
import { RSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemoveDay } from "../../redux/slices/days";

export const Day = ({
  id,
  day,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <RSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to delete ")) {
      dispatch(fetchRemoveDay(id));
    }
  };

  return (
    <tr>
      <td>{day}</td>
      <td>
      <div className={clsx(styles.root)}>
      {isEditable && (
        <div>
          <Link to={`/days/${id}/edit`}>
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
