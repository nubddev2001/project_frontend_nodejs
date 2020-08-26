import Head from 'next/head'
import { useState,useEffect } from 'react'
import io from 'socket.io-client'
import axios from "axios"
import fetch from "isomorphic-fetch"
import {NotificationManager} from 'react-notifications';
import moment from 'moment'
import DataTable, { createTheme } from 'react-data-table-component';

const Result = (props) => {

	const useSocket = (url) => {
	  const [socket, setSocket] = useState(null)

	  useEffect(() => {
	    const socketIo = io(url)

	    setSocket(socketIo)

	    function cleanup() {
	      socketIo.disconnect()
	    }
	    return cleanup
	  }, [])

	  return socket
	}
		
	//console.log(props.status)

  const [status,setStatus] = useState(props.status)
  const [users,setUser] = useState(props.users)
  const [userfilter,setUserfilter] = useState(props.users);
  const [editmode,setEditmode] = useState(false);
  const [search,setSearch] = useState('');
  const [userSearch,setUserSearch] = useState([])


  const socket = useSocket('https://nubdev-backend-nodejs.herokuapp.com/')

	useEffect(() => {
	    if (socket) {
	        socket.on('last_check', (res) => {
		      	setUser(res)
		      	setUserfilter(res)
		      	NotificationManager.success('ผลการตรวจ', 'บันทึกข้อมูลสำเร็จ');
		    })
		    socket.on('status',(res) => {
		    	if(res === "on"){
		    		NotificationManager.success('ระบบ', 'เปิดระบบแล้ว')
		    		setStatus(true);
		    	}else{
		    		NotificationManager.error('ระบบ', 'ปิดระบบแล้ว')
		    		setStatus(false);
		    	}
		    })
	    }
	  }, [socket])


  const Change = () => {
  	
  	console.log(editmode)
  	try {
  		axios.post("https://nubdev-backend-nodejs.herokuapp.com/status")
	  	.then((res) => {
	  		
	  	}).catch((err) => {
	  		console.log("AXIOS ERROR: ", err);
	  	})
  	} catch {
  		console.log("Axios Error")
  	}
  }

//   const remove = (id) => {
//   	axios.post("http://localhost:8080/history/delete",{id:id})
//   	.then((res) => {
//   		if(res.status == "success"){*/
//   			NotificationManager.success('ลบข้อมูลสำเร็จ', 'ผลการตรวจ');
//   			const result = users.filter(u => u.his_id !== id)
//   			setUser(result)
//   			console.log(res)
//   		}
//   	}).catch((err) => {

//   	})
//   }

  const columns = [
    {
      name: 'รหัสประจำตัว',
      selector: 'code',
	  center: true,
	  sortable: true,
    },
    {
      name: 'รูปประจำตัว',
      selector: 'image',
	  center: true,
	  sortable: true,
	  cell: row => <img width="80" style={{ borderRadius: '5%' }} src={row.image} />,
	}
	,
    {
      name: 'ชื่อ - สกุล',
      selector: 'name',
	  center: true,
	  sortable: true,
	},
    {
      name: 'เวลาที่ตรวจ',
      selector: 'reg_time',
	  center: true,
	  sortable: true,
	  cell: row => moment(row.reg_time).format('lll')
	},
    {
      name: 'อุณหภูมิ',
      selector: 'temperature',
	  center: true,
	  sortable: true,
	  cell: row => <span className={row.temperature >= 38 ? 'text-danger' : null}>{row.temperature}°C</span>,
	}
  ]

  const SelectChange = (e) => {
  	const value = e.target.value
  	let result;
  	if(value <= 30){
  		result = users.filter(u => u.temperature <= 30)
  	}else if(value >= 40){
  		result = users.filter(u => u.temperature >= 40)
  	}else if(value == "DEFAULT"){
  		result = users
  	}else{
  		result = users.filter(u => u.temperature === value)
  	}

  	setUserfilter(result)

  	console.log(result)
  }

  const ChangeEditmode = () => {
  	setEditmode(!editmode);
  }

  const search_form = (e) => {
  	const keyword = e.target.value.toLowerCase();
  	//const result = userfilter.find(u => u.name === keyword)
  	let result = users.filter(v => v.name.toLowerCase().includes(keyword) || v.user_id.includes(keyword));
  	setUserfilter(result);
  	setSearch(e.target.value);
  }

  useEffect(() => {
  	if(search === ""){
  		setUserfilter(users);
  	}
  },[search])

  const customStyles = {
	rows: {
	  style: {
		minHeight: '72px', // override the row height
	  }
	},
	headCells: {
	  style: {
		paddingLeft: '8px', // override the cell padding for head cells
		paddingRight: '8px',
	  },
	},
	cells: {
	  style: {
		textAlign: 'center',
		verticalAlign: 'middle',
		marginBottom: '8px',
		marginTop: '8px',
		paddingLeft: '8px', // override the cell padding for data cells
		paddingRight: '8px',
	  },
	},
  };

  return (
    <div className="container">
      <Head>
        <title>ผลการตรวจ [เรียลไทม์] - โปรเจ็กต์ ปวส 1/1 ทด</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row">
      	<div className="col-lg-12 mb-5">
      		<div className="menu-status mt-5">
		      	<div className="row">
		      		<div className="col-lg-3 mt-1 text-center">
		      			<div className="custom-control custom-switch">
						  <input type="checkbox" defaultChecked={status} onClick={Change} className="custom-control-input" id="Switch_Status" />
						  <label style={{ fontSize: '12px' }} className="custom-control-label" htmlFor="Switch_Status">เปิด/ปิด ระบบ</label>
						</div>
		      		</div>
		      		<div className="col-lg-4">
				      <label htmlFor="validationCustom04"></label>
				      <select onChange={SelectChange} defaultValue={'DEFAULT'} disabled={!status} className="custom-select custom-select-sm">
				        <option value="DEFAULT">เลือก...</option>
				        <option value="30">น้ำกว่า 30 องศา</option>
				        <option value="31">น้ำกว่า 31 องศา</option>
				        <option value="32">น้ำกว่า 32 องศา</option>
				        <option value="33">น้ำกว่า 33 องศา</option>
				        <option value="34">น้ำกว่า 34 องศา</option>
				        <option value="35">น้ำกว่า 35 องศา</option>
				        <option value="36">น้ำกว่า 36 องศา</option>
				        <option value="37">น้ำกว่า 37 องศา</option>
				        <option value="38">น้ำกว่า 38 องศา</option>
				        <option value="39">น้ำกว่า 39 องศา</option>
				        <option value="40">มากกว่า 40 องศา</option>
				      </select>
		      		</div>
		      		<div className="col-lg-5">
			      		<div className="input-group mb-3">
						  <div className="input-group-prepend">
						    <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"></i></span>
						  </div>
						  <input disabled={!status} onChange={search_form} value={search} type="text" className="form-control form-control-sm" placeholder="รหัสประจำตัว ID และ ชื่อ - สกุล"/>
						</div>
		      		</div>
		      	</div>
		      </div> 
		      <div className="users-list mt-4">
		      	<div className="row">
			      	<div className="col-lg-12">
			      		{ status ? 
			      				<>
									  <DataTable
										
										columns={columns}
										data={userfilter}
										highlightOnHover={true}
										pagination={true}
										customStyles={customStyles}
										noHeader={true}
										keyField='1'
										/>
			      					{/* <table style={{ color: '#666666'}} className="table border-0 text-center">
									  <thead>
									    <tr>
									      <th style={{ fontSize: '14px' }}>รหัสประจำตัว</th>
									      <th style={{ fontSize: '14px' }}>รูปประจำตัว</th>
									      <th style={{ fontSize: '14px' }}>ชื่อ - สกุล</th>
									      <th style={{ fontSize: '14px' }}>เวลาที่ตรวจ</th>
									      <th style={{ fontSize: '14px' }}>อุณหภูมิ</th>
									      <th style={{ fontSize: '14px' }}>ตัวเลือก</th>
									    </tr>
									  </thead>
									  <tbody>
									  	{
									  		users != '' ?
										  		userfilter.map((u,i) => {
												    return(
												    	<tr key={i}>
													      <td style={tr_style}>{u.user_id}</td>
													      <td style={tr_style}><img width="80" style={{ borderRadius: '5%' }} src={u.image} /></td>
													      <td style={tr_style}>{u.name}</td>
													      <td style={tr_style}>{moment(u.time).format('lll')}</td>
													      <td style={tr_style}>
													      	<span className={u.temperature >= 38 ? 'text-danger' : null}>{u.temperature}°C</span>
													      </td>
													      <td style={tr_style}><button disabled={!editmode} onClick={() => remove(u.his_id)} className="btn btn-sm btn-danger"><i className="fa fa-trash"></i> ลบ</button></td>
													    </tr>
												    )
												})
											: null
										}
									  </tbody>
									</table>  */}
			      				</>
								
			      		: <h3 className="mt-2 text-muted text-center">ปิดระบบแล้ว</h3>}
			      	</div>
		      	</div>
		      </div>
	      	</div>
      	</div>
    </div>
  )
}

Result.getInitialProps = async () => {
  const history = await fetch('https://nubdev-backend-nodejs.herokuapp.com/history')
  const res_history = await history.json()

  const status = await fetch('https://nubdev-backend-nodejs.herokuapp.com/status')
  const res_status = await status.json()
  if(res_status.status === "on"){
  	return { users: res_history,status: true}
  }else{
  	return { users: res_history,status: false}
  }
  
}

export default Result