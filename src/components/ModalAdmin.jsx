import React from "react";
import { Form, Input, Modal } from "antd";
import qs from "qs";

export class ModalAdmin extends React.Component {
  state = {
    ModalText: "Content of the modal",
    confirmLoading: false,
    price: "$",
    toDate: "",
    fromDate: "",
    description: "",
    destination: "",
    picture: "https://cdn.mos.cms.futurecdn.net/FUE7XiFApEqWZQ85wYcAfM.jpg"
  };

  handleOk = async () => {
    console.log(qs.stringify(this.state.inputs));
    const result = await fetch("http://localhost:5000/api/vacations", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: qs.stringify({
        price: this.state.price,
        toDate: this.state.toDate,
        fromDate: this.state.fromDate,
        description: this.state.description,
        destination: this.state.destination,
        picture: this.state.picture
      })
    });
    this.setState({
      price: " ",
      toDate: " ",
      fromDate: " ",
      description: " ",
      destination: " ",
      picture: " "
    });
    this.props.setVisible(false);
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleCancel = () => {
    this.props.setVisible(false);
  };

  render() {
    const { confirmLoading } = this.state;
    return (
      <div>
        <Modal
          title="New vacation"
          visible={this.props.visible}
          confirmLoading={confirmLoading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <Form>
              <Form.Item label="Destination">
                <Input
                  value={this.state.destination}
                  onChange={this.handleChange("destination")}
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input
                  value={this.state.description}
                  onChange={this.handleChange("description")}
                />
              </Form.Item>
              <Form.Item label="From date">
                <Input
                  type="date"
                  value={this.state.fromDate}
                  onChange={this.handleChange("fromDate")}
                />
              </Form.Item>
              <Form.Item label="To date">
                <Input
                  type="date"
                  value={this.state.toDate}
                  onChange={this.handleChange("toDate")}
                />
              </Form.Item>
              <Form.Item label="Price">
                <Input
                  value={this.state.price}
                  onChange={this.handleChange("price")}
                />
              </Form.Item>
              <Form.Item label="Pictrue">
                <Input
                  value={this.state.picture}
                  onChange={this.handleChange("picture")}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
