import React, { useEffect } from "react";
import baseUrl from "../components/baseUrl";
import Spinner from "../components/Spinner";

const CollectionPage = () => {
  const [fetchData, setFetchData] = React.useState([]);
  const handleCollections = async () => {
    const token = localStorage.getItem("jwtToken");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await baseUrl
      .get("/getCollection", { headers })
      .catch((err) => {
        console.log("Fetch api error");
      });

    if (response && response) {
      setFetchData(response.data);
    }
  };
  useEffect(() => {
    handleCollections();
  }, []);
  return (
    <div
      className={`${fetchData && fetchData.length > 1 ? " h-full" : "h-screen"
        }`}
    >
      <p className="text-white text-4xl">
        <b>Collections</b>
      </p>
      <div className=" mt-10 mb-10">
        {fetchData && fetchData ? (
          fetchData.map((items, id) => {
            const imageParser = JSON.parse(items.imageUrls);
            return (
              <div key={id}>
                <p className="text-white text-4xl mt-10 mb-10">{items.name}</p>
                <div className="gridFour">
                  {imageParser ? (
                    imageParser &&
                    imageParser.map((items, id) => {
                      return (
                        <div key={id}>
                          <img width={"300px"} src={items.url} alt="" />
                        </div>
                      );
                    })
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;