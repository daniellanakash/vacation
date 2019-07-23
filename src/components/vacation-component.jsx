import React from "react";
import { Card, Switch } from "antd";
import "./vacation-component.css";
import dayjs from "dayjs";
import userService from "../services/user.service";
import qs from "qs";

const { Meta } = Card;

export const VacationComponent = props => {
  const [checked, setChecked] = React.useState(props.favorited);
  const { vacation } = props;

  const setFavorited = async checked => {
    console.log(vacation);
    if (checked) {
      fetch("http://localhost:5000/api/vacations/favorite", {
        method: "POST",
        body: qs.stringify({
          userId: userService.user.id,
          vacationId: vacation.id
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(() => {
        setChecked(true);
        vacation.favoriated = true;
        setTimeout(() => props.setVacation(vacation), 500);
      });
    } else {
      fetch("http://localhost:5000/api/vacations/favorite", {
        method: "DELETE",
        body: qs.stringify({
          userId: userService.user.id,
          vacationId: props.vacation.id
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(() => {
        setChecked(false);
        vacation.favoriated = false;
        setTimeout(() => props.setVacation(vacation), 500);
      });
    }
  };

  return (
    <Card
      hoverable
      style={{
        width: 300,
        height: 390,
        float: "left",
        fontSize: 17,
        marginTop: 20,
        marginLeft: 15
      }}
      cover={<img src={vacation.picture} />}
    >
      <Meta title={vacation.destination} />
      <div>{vacation.description}</div>
      <div>
        <b>From date:</b>
        {dayjs(vacation.fromdate).format("DD-MM-YYYY")}
      </div>
      <div>
        <b>To date:</b>
        {dayjs(vacation.todate).format("DD-MM-YYYY")}
      </div>
      <div>
        <b>Price:</b>
        {vacation.price}
      </div>
      <div className="toggle">
        <Switch checked={checked} onChange={setFavorited} type={"checkbox"} />
      </div>
    </Card>
  );
};
