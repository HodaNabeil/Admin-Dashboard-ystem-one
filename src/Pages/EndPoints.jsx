import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../Components/Input";

function EndPoints() {
  const [endpoint, setEndpoint] = useState([]);
  const [name, setName] = useState("");
  const [hashKey, setHashKey] = useState("");
  
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/EndPoints.json")
        .then((res) => {
          const data = res.data;
          setHashKey(data.HashKey);
          setEndpoint(data.Rows);
        })
        .catch((error) => console.error("Error fetching EndPoints:", error));
    };

    fetchData();

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axios
        .post("/EndPoints.json" , {
          HashKey: hashKey
        }) 
        .then((res) => {
          const data = res.data;
          if (data.HashKey !== hashKey) {
            setHashKey(data.HashKey);
            setEndpoint(data.Rows);
          }
        })
        .catch((error) => console.error("Error fetching EndPoints:", error));
    };

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [hashKey]); 

  const filter = endpoint.filter((item) => {
    return (
      (item.HostName && item.HostName.includes(name)) ||
      (item.IPv4 && item.IPv4.includes(name))
    );
  });
  
  

  return (
    <div className="  endpoints container">
    <Input name={name} setName={setName} />
      <div className="table-container">
        <table className=" content-table">
          <thead>
            <tr>
              <th>HostName</th>
              <th>Distro</th>
              <th>Release</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Version</th>
              <th>Serial</th>
              <th>UUID</th>
              <th>TimezoneName</th>
              <th>IPv4</th>
              <th>IPv6</th>
              <th>IPv4_subnet</th>
              <th>CPUManufacturer</th>
              <th>CPUBrand</th>
              <th>SrcIP</th>
              <th>SrcCountry</th>
              <th>SrcOrg</th>
              <th>SrcTimeZone</th>
              <th>DeviceRole</th>
            </tr>
          </thead>
          <tbody>
            {filter.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.HostName}</td>
                  <td>{item.Distro === null ? "null" : item.Distro}</td>
                  <td>{item.Release === null ? "null" : item.Release}</td>
                  <td>
                    {item.Manufacturer === null ? "null" : item.Manufacturer}
                  </td>
                  <td> {item.Model === null ? "null" : item.Model}</td>
                  <td>{item.Version === null ? "null" : item.Version}</td>
                  <td>{item.Serial === null ? "null" : item.Serial}</td>
                  <td>{item.UUID === null ? "null" : item.UUID}</td>
                  <td>
                    {item.TimezoneName === null ? "null" : item.TimezoneName}
                  </td>
                  <td>{item.IPv4 === null ? "null" : item.IPv4}</td>
                  <td>{item.IPv6 === null ? "null" : item.IPv6}</td>
                  <td>
                    {item.IPv4_subnet === null ? "null" : item.IPv4_subnet}
                  </td>
                  <td>
                    {item.CPUManufacturer === null
                      ? "null"
                      : item.CPUManufacturer}
                  </td>
                  <td>{item.CPUBrand === null ? "null" : item.CPUBrand}</td>
                  <td>{item.SrcIP === null ? "null" : item.SrcIP}</td>
                  <td>{item.SrcCountry === null ? "null" : item.SrcCountry}</td>
                  <td>{item.SrcOrg === null ? "null" : item.SrcOrg}</td>
                  <td>
                    {item.SrcTimeZone === null ? "null" : item.SrcTimeZone}
                  </td>
                  <td>{item.DeviceRole === null ? "null" : item.DeviceRole}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EndPoints;
