import React, { useEffect } from "react";
import { useFetch } from "../hooks/fatch-hook";
import { VacationComponent } from "../components/vacation-component";
import { Redirect } from "react-router-dom";
import userService from "../services/user.service";

const sortByFavorite = (v1, v2) => {
  if (v1.user_id && (v1.user_id === userService.user.id)) return -1;
  if (v2.user_id && (v2.user_id === userService.user.id)) return 1;
  return 0
  
};

export const VacationsPage = props => {
  const [tologout, setTologout] = React.useState(false);
  const [data, loading, error, setData] = useFetch(
    `http://localhost:5000/api/vacations/user/${userService.user.id}`
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      const results = await fetch(
        `http://localhost:5000/api/vacations/user/${userService.user.id}`
      );
      const data = await results.json();
      if (data) {
        setData(data);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  function setVacation(index, vacation) {
    data[index] = vacation;
    setData([...data]);
  }

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

  if (tologout) {
    return <Redirect to="/" />;
  }

  return (
    <div className="front">
      <div className="header">
        <div className="company">Nakash Tours</div>
        <div>
          <button className="Logout" onClick={() => setTologout(true)}>
            Logout
          </button>
        </div>
      </div>
      {data.sort(sortByFavorite).map(vacation => {
        return (
          <VacationComponent
            key={vacation.id}
            vacation={vacation}
            favorited={vacation.user_id === userService.user.id}
            setVacation={setVacation}
          />
        );
      })}
    </div>
  );
};
