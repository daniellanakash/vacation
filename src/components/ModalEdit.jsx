import React from "react";
import { Form, Input, Modal } from "antd";
import qs from "qs";

export class ModalEdit extends React.Component {
  constructor(props) {
    super(props);
    const { vacation } = this.props;

    this.state = {
      ModalText: "Content of the modal",
      confirmLoading: false,
      price: vacation.price,
      fromdate: vacation.fromdate,
      todate: vacation.todate,
      description: vacation.description,
      destination: vacation.destination,
      picture: "https://cdn.mos.cms.futurecdn.net/FUE7XiFApEqWZQ85wYcAfM.jpg"
    };
  }

  handleOk = id => async () => {
    const result = await fetch(`http://localhost:5000/api/vacations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: qs.stringify({
        price: this.state.price,
        fromdate: this.state.fromdate,
        todate: this.state.todate,
        description: this.state.description,
        destination: this.state.destination,
        picture: this.state.picture
      })
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
    const { vacation } = this.props;
    return (
      <div>
        <Modal
          title="New vacation"
          visible={this.props.visible}
          confirmLoading={confirmLoading}
          onOk={this.handleOk(vacation.id)}
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
                  value={this.state.fromdate}
                  onChange={this.handleChange("fromdate")}
                />
              </Form.Item>
              <Form.Item label="To date">
                <Input
                  type="date"
                  value={this.state.todate}
                  onChange={this.handleChange("todate")}
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
