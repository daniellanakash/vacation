import React, { useEffect } from "react";
import { useFetch } from "../hooks/fatch-hook";
import { AdminVacationComponent } from "../components/admin.vacation-component";
import { Redirect } from "react-router-dom";
import userService from "../services/user.service";
import { ModalAdmin } from "../components/ModalAdmin";

export const AdminPage = props => {
  const [modal, setModal] = React.useState(false);
  const [toGraphPage, setToAGraphPage] = React.useState(false);
  const [tologout, setTologout] = React.useState(false);
  const [data, loading, error, setData] = useFetch(
    `http://localhost:5000/api/vacations`
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      const results = await fetch(`http://localhost:5000/api/vacations`);
      const data = await results.json();
      if (data) {
        setData(data);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  if (!userService.isLoggedIn()) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return (
      <div className="spinner2">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only" />
        </div>
      </div>
    );
  }
  if (error) {
    return <div>error</div>;
  }

  if (toGraphPage) {
    return <Redirect to="/graph" />;
  }

  if (tologout) {
    return <Redirect to="/" />;
  }
  return (
    <div className="front">
      <div className="header">
        <div className="company">Administrator</div>
        <div>
          <button className="Logout" onClick={() => setTologout(true)}>
            Logout
          </button>
        </div>
      </div>
      <div>
        <button className="add" onClick={() => setModal(true)}>
          {" "}
          + Add vacation
        </button>
        <button className="graph" onClick={() => setToAGraphPage(true)}>
          {" "}
          Go to the graph
        </button>
      </div>
      <ModalAdmin visible={modal} setVisible={setModal} />
      {data.map(vacation => {
        return <AdminVacationComponent key={vacation.id} vacation={vacation} />;
      })}
    </div>
  );
};
