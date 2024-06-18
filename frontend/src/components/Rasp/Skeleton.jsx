import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import styles from "./Rasp.module.scss";

export const RSkeleton = () => {
    return (
        <div className={styles.skeleton}>

            <Stack spacing={1}>
                <Skeleton variant="rectangular" width="100%" height={300}/>
                <div>
                    <div>
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                            style={{marginRight: 10}}
                        />
                    </div>
                </div>
            </Stack>
        </div>
    );
};
