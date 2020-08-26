const fc = ({ datafc }) => {
  return (
    <>
      {/* <div className="col-lg-12 mb-3">
        <div
          style={{ borderRadius: "10px" }}
          className="mb-0 card border-1 shadow-sm"
        >
          <div className="card-body">
            <h6 className="text-center text-muted">
              ผู้ติดเชื้อสะสม{" "}
              <NumberFormat
                value={datafc.cases}
                displayType={"text"}
                thousandSeparator={true}
              />{" "}
              ราย{" "}
              <span className="text-success">
                (+
                <NumberFormat
                  value={datafc.todayCases}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                )
              </span>
            </h6>
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-3">
        <div
          style={{ borderRadius: "10px" }}
          className="mb-0 card border-1 shadow-sm"
        >
          <div className="card-body">
            <h6 className="text-center text-muted">
              หายแล้ว{" "}
              <NumberFormat
                value={datafc.recovered}
                displayType={"text"}
                thousandSeparator={true}
              />{" "}
              ราย{" "}
              <span className="text-success">
                (+
                <NumberFormat
                  value={datafc.todayRecovered}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                )
              </span>
            </h6>
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-3">
        <div
          style={{ borderRadius: "10px" }}
          className="mb-0 card border-1 shadow-sm"
        >
          <div className="card-body">
            <h6 className="text-center text-muted">
              รักษาตัว{" "}
              <NumberFormat
                value={datafc.active}
                displayType={"text"}
                thousandSeparator={true}
              />{" "}
              ราย{" "}
              <span className="text-success">
                (+
                <NumberFormat
                  value={datafc.todayCases}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                )
              </span>
            </h6>
          </div>
        </div>
      </div>
      <div className="col-lg-12 mb-3">
        <div
          style={{ borderRadius: "10px" }}
          className="mb-0 card border-1 shadow-sm"
        >
          <div className="card-body">
            <h6 className="text-center text-muted">
              เสียชีวิต{" "}
              <NumberFormat
                value={datafc.deaths}
                displayType={"text"}
                thousandSeparator={true}
              />{" "}
              ราย{" "}
              <span className="text-success">
                (+
                <NumberFormat
                  value={datafc.todayDeaths}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                )
              </span>
            </h6>
          </div>
        </div>
      </div>
      <div className="col-lg-12 mb-3 text-right">
        <small className="text-muted">
          อัพเดทข้อมูลล่าสุด : {moment(datafc.updated).format("ll")}
        </small>
      </div> */}
    </>
  );
};

export default fc;
