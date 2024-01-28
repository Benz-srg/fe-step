import ButtonCustom from "@/components/form/ButtonCustom";
import { Paper } from "@mui/material";
import React from "react";

type Props = {
  handleNextState: (data: any, state: number) => void;
  state: number;
};

const Formnavigation = ({ handleNextState, state }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#000",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        p: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: state == 1 ? "flex-end" : "space-between",
          alignItems: "center",
        }}
      >
        {state > 1 ? (
          <ButtonCustom
            type="button"
            title="ย้อนกลับ"
            background="white"
            hoverbg="#dfdfdf"
            // onClick={handlePrevState}
          />
        ) : (
          ""
        )}
        <ButtonCustom type="button" title="ถัดไป" />
      </div>
    </Paper>
  );
};

export default Formnavigation;
