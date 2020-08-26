import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import {HorizontalBar, Bubble} from 'react-chartjs-2';
import DataTable, { createTheme } from 'react-data-table-component';
import _ from "lodash"


const Covid = ({ countries,all,province }) => {

	const [datath,setdatath] = useState([])

	const [datafc,setdataall] = useState([])

	const [is_th,seIis_th] = useState(true)

	const [Errors,setErrors] = useState()

	const [dataprovince,setdataprovince] = useState('')

	const [iframeload,setiframeload] = useState(true);

	const toggle_country = () => {
		seIis_th(!is_th)
	}

	const [ew,setew] = useState('')

	useEffect(() => {
		countries.filter(s=>{
			s.country == "Thailand" ? setdatath(s) : setErrors('call_th_error')
		})
		setdataall(all);

		setdataprovince(province.Province)

		const modify = (o) => { return ([{province: o[0],value: o[1]}]) } 
		var objects = Object.entries(dataprovince).map((d,i) => {return d} );
	  
		/*var objects = _.flatMap(dataprovince, function(o) { return o; });
		console.log(objects)*/
		_.forEach(objects, modify);

		
  },[countries])

  console.log(ew)

	const data = {
	  labels: ['ชาย', 'หญิง'],
	  datasets: [
	    {
	      label: 'ผู้ติดในไทยเชื้อชาย / หญิง',
	      backgroundColor: [
	      	'rgba(54, 162, 235, 0.2)',
	      	'rgba(255,99,132,0.2)',

	      ],
	      borderColor: [
	      	'rgba(54, 162, 235, 0.4)',
	      	'rgba(255,99,132,0.4)',
	      ],
	      borderWidth: 1,
	      hoverBorderColor: 'rgb(0,88,101)',
	      data: [province.Gender.Male, province.Gender.Female]
	    }
	  ]
  };
  
  createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });
  

  const columns = [
    {
      name: 'จังหวัด',
      selector: '',
      center: true,
    },
    {
      name: 'จำนวน',
      selector: '',
      center: true,
    }
  ]

  //console.log(Object.keys(dataprovince)
  console.log(dataprovince)

	return(
		<div className="container mt-5 mb-5">	
			<h3 className="text-center mb-5"><i className="fa fa-mask"></i>Covid - 19</h3>
			<div className="row">
				<div className="col-lg-7">
					<div className="col-lg-12 mb-3 text-center">
						<h6 className="text-muted">ผู้ติดเชื้อ{is_th ? 'ในไทย':'ทั้งโลก'}</h6>
					</div>
					<div className="col-lg-12 mb-3 text-center">
						<button onClick={!is_th ? toggle_country : null} className={`mb-2 border-2 shadow-sm btn w-50 ${is_th ? 'active' :null}`}>ไทย</button>
						<button onClick={is_th ? toggle_country : null} className={`mb-2 border-2 shadow-sm btn w-50 ${!is_th ? 'active' :null}`}>ทั้งโลก</button>
					</div>
					<div className="row">
						{
							is_th ? 
              <>
									<div className="col-lg-12 mb-3">
										<div style={{ borderRadius: '10px' }} className="mb-0 card border-1 shadow-sm">
											<div className="card-body">
												<h6 className="text-center text-muted">ผู้ติดเชื้อสะสม <NumberFormat value={datath.cases} displayType={'text'} thousandSeparator={true} /> ราย <span className="text-success">(+{datath.todayCases})</span></h6>
															</div>
														</div>
													</div>
													<div className="col-lg-6 mb-3">
														<div style={{ borderRadius: '10px' }} className="mb-0 card border-1 shadow-sm">
															<div className="card-body">
																<h6 className="text-center text-muted">หายแล้ว <NumberFormat value={datath.recovered} displayType={'text'} thousandSeparator={true} /> ราย <span className="text-success">(+<NumberFormat value={datath.todayRecovered} displayType={'text'} thousandSeparator={true} />)</span></h6>
															</div>
														</div>
													</div>
													<div className="col-lg-6 mb-3">
														<div style={{ borderRadius: '10px' }} className="mb-0 card border-1 shadow-sm">
															<div className="card-body">
																<h6 className="text-center text-muted">รักษาตัว <NumberFormat value={ datath.active } displayType={'text'} thousandSeparator={true} /> ราย <span className="text-success">(+<NumberFormat value={datath.todayCases} displayType={'text'} thousandSeparator={true} />)</span></h6>
															</div>
														</div>
													</div>
													<div className="col-lg-12 mb-3">
														<div style={{ borderRadius: '10px' }} className="mb-0 card border-1 shadow-sm">
															<div className="card-body">
																<h6 className="text-center text-muted">เสียชีวิต <NumberFormat value={datath.deaths} displayType={'text'} thousandSeparator={true} /> ราย <span className="text-success">(+<NumberFormat value={datath.todayDeaths} displayType={'text'} thousandSeparator={true} />)</span></h6>
															</div>
														</div>
													</div>
									<div className="col-lg-12 mb-3 text-right">
										<small className="text-muted">อัพเดทข้อมูลล่าสุด : {moment(datafc.updated).format('ll')}</small>
									</div>
								</>
							:
								<>
									<div className="col-lg-12 mb-3">
										<div style={{ borderRadius: '10px' }} className="mb-0 card border-1 shadow-sm">
											<div className="card-body">
												<h6 className="text-center text-muted">ผู้ติดเชื้อสะสม <NumberFormat value={datafc.cases} displayType={'text'} thousandSeparator={true} /> ราย <span className="text-success">(+<NumberFormat value={datafc.todayCases} displayType={'text'} thousandSeparator={true} />)</span></h6>
															</div>
														</div>
													</div>
													<div className="col-lg-6 mb-3">
														<div style={{ borderRadius: '10px' }} className="mb-0 card border-1 shadow-sm">
															<div className="card-body">
																<h6 className="text-center text-muted">หายแล้ว <NumberFormat value={datafc.recovered} displayType={'text'} thousandSeparator={true} /> ราย <span className="text-success">(+<NumberFormat value={datafc.todayRecovered} displayType={'text'} thousandSeparator={true} />)</span></h6>
															</div>
														</div>
													</div>
													<div className="col-lg-6 mb-3">
														<div style={{ borderRadius: '10px' }} className="mb-0 card border-1 shadow-sm">
															<div className="card-body">
																<h6 className="text-center text-muted">รักษาตัว <NumberFormat value={datafc.active} displayType={'text'} thousandSeparator={true} /> ราย <span className="text-success">(+<NumberFormat value={datafc.todayCases} displayType={'text'} thousandSeparator={true} />)</span></h6>
															</div>
														</div>
													</div>
													<div className="col-lg-12 mb-3">
														<div style={{ borderRadius: '10px' }} className="mb-0 card border-1 shadow-sm">
															<div className="card-body">
																<h6 className="text-center text-muted">เสียชีวิต <NumberFormat value={datafc.deaths} displayType={'text'} thousandSeparator={true} /> ราย <span className="text-success">(+<NumberFormat value={datafc.todayDeaths} displayType={'text'} thousandSeparator={true} />)</span></h6>
															</div>
														</div>
													</div>
										<div className="col-lg-12 mb-3 text-right">
											<small className="text-muted">อัพเดทข้อมูลล่าสุด : {moment(datafc.updated).format('ll')}</small>
										</div>
                    </>
						}
					</div>
					<iframe style={{ border: '0px',width: '100%',height: '450px' }} src="https://covid19.th-stat.com/th/share/map"></iframe>
				</div>
				<div className="col-lg-5">
					<HorizontalBar
			          data={data}
			          width={400}
			          height={200}
			        />
			        <table className="table text-center mt-3 text-muted">
              <thead>
                  <tr>
                    <th scope="col">จังหวัด</th>
                    <th scope="col">ผู้ติดเชื้อ</th>
                  </tr>
              </thead>
              <tbody>
                  {
                    /*dataprovince != "" ?
                      dataprovince.map((p,i) => (
                        <tr key={i}>
                          <th>{p}</th>
                          <th>{p.value}</th>
                        </tr>
                      ))
                    : null*/
                }
              </tbody>
            </table>
            {/*<DataTable
              title="Covid"
              columns={columns}
              data={Object.keys(dataprovince)}
            />*/}
				</div>
				<div className="col-lg-6">
					
				</div>
			</div>
		</div>
	)
}

Covid.getInitialProps = async () => {
	const country_res = await fetch('https://corona.lmao.ninja/v2/countries');
	const country_data = await country_res.json();

	const all_res = await fetch('https://corona.lmao.ninja/v2/all')
	const all_data = await all_res.json();

	const Province_res = await fetch('https://covid19.th-stat.com/api/open/cases/sum')
	const Province_data = await Province_res.json();

	return { countries: country_data,all: all_data,province:Province_data }
}

export default Covid