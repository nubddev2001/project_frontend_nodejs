import NumberFormat from "react-number-format";

const th = ({ datath }) => {
	console.log(datath)
	return(
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
                          value={datath.cases}
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        ราย{" "}
                        <span className="text-success">
                          (+{datath.todayCases})
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
                          value={datath.recovered}
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        ราย{" "}
                        <span className="text-success">
                          (+
                          <NumberFormat
                            value={datath.todayRecovered}
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
                          value={datath.active}
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        ราย{" "}
                        <span className="text-success">
                          (+
                          <NumberFormat
                            value={datath.todayCases}
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
                          value={datath.deaths}
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        ราย{" "}
                        <span className="text-success">
                          (+
                          <NumberFormat
                            value={datath.todayDeaths}
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
                    อัพเดทข้อมูลล่าสุด : {moment(datath.updated).format("ll")}
                  </small>
                </div> */}
              </>
	)
}

 th