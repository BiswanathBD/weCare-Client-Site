import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Loader";

const EventDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(event);

  useEffect(() => {
    axiosInstance(`/event/${id}`)
      .then((data) => {
        setEvent(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [axiosInstance, id]);

  if (loading) return <Loader />;

  return <div>event details</div>;
};

export default EventDetails;
