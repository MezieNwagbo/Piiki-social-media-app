import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  // useEffect(() => {
  //   // window.location.reload();
  // }, [pins]);

  // function refreshPage() {
  //   location.reload(false);
  // }

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);

        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);

        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return (
      <div>
        {/* {refreshPage()} */}
        <Spinner message="We are adding new ideas to your feed!" />;
      </div>
    );

  if (!pins?.length) return <h2>No pins available</h2>;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
