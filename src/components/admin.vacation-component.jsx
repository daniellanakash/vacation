import React from "react";
import { Card, Icon } from "antd";
import dayjs from "dayjs";
import "./vacation-component.css";
import { ModalEdit } from "../components/ModalEdit";

const { Meta } = Card;

export const AdminVacationComponent = props => {
  const { vacation } = props;
  const [modal, setModal] = React.useState(false);

  const handleDelete = id => async () => {
    const results = await fetch(`http://localhost:5000/api/vacations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
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
      actions={[
        <Icon type="edit" onClick={() => setModal(true)} />,
        <Icon type="delete" onClick={handleDelete(vacation.id)} />
      ]}
    >
      <ModalEdit visible={modal} setVisible={setModal} vacation={vacation} />
      <Meta title={vacation.destination} />
      <div>{vacation.description}</div>
      <div>{vacation.image}</div>
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
      <div>
        <b>Followes:</b>
        {vacation.followers}
      </div>
    </Card>
  );
};
