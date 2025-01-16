import React from "react";

interface DataPointsProps {
  data: DataPoint[];
}

export type DataPoint = {
  key: string;
  value: string;
};

const DataPoints = ({ data }: DataPointsProps) => {
  return (
    <>
      {data && data.length > 0 && (
        <dl className="dsn-data-points">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <dt>{item.value}</dt>
              <dd>{item.key}</dd>
            </React.Fragment>
          ))}
        </dl>
      )}
    </>
  );
};

export default DataPoints;
