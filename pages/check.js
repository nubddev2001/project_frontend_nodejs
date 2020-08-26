import Link from 'next/link'
import { useState,useEffect,useContext } from 'react'
import io from 'socket.io-client'
import {NotificationManager} from 'react-notifications';
import Context from '../components/Context';
import setCookie from '../components/Cookie'

const Check = (props) => {

	useEffect(() => {
		
	},[])

	const [status,setStatus] = useState(false)

	const [payload,setPayload] = useState([])

	const [temperature,setTemperature] = useState('')
	//
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

	const socket = useSocket('https://nubdev-backend-nodejs.herokuapp.com/')

	useEffect(() => {
	    if (socket) {
	        socket.on('profile', (res) => {
		      	setPayload(res)
		      	setStatus(true);
		      	setTemperature(0);
		      	NotificationManager.success('โหลดข้อมูลสำเร็จ', 'ข้อมูลส่วนตัว');
		      	console.log(res)
		    })
		    socket.on('temperature',(res) => {
		    	setTemperature(res)
		    	if(res >= 38){
		    		NotificationManager.error('สถานะเสี่ยง', 'บันทึกข้อมูลสำเร็จ');
		    	}else{
					NotificationManager.success('สถานะปกติ', 'บันทึกข้อมูลสำเร็จ');
		    	}
		    })
	    }
	  }, [socket])

	return(
		<div className="container">
			<div className="mt-5">
				{
					status == true ?
						<>
							{payload[0] != "unknown" ?
								<div className="row">
								  	<div className="col-lg-4">
								  		<img src={payload.image} style={{width: '100%',borderRadius: '10%'}} />
								  	</div>
								  	<div className="col-lg-8">
								  		<h5>รหัสประจำตัว : {payload.id}</h5>
								  		<h5>ชื่อ : {payload.name}</h5>
								  	</div>
								  	<div className="col-lg-12 user mt-5">
								  		{temperature != "" ? 
								  			<>
								  				{temperature >= 38 ?
								  					<>
								  						<h1 className="text-danger text-center">!สถานะเสี่ยง</h1>
								  						<h1 className="text-muted text-center">อณุหภูมิที่วัดได้ {temperature} องศา</h1>
								  					</>
								  				:
								  					<>
								  						<h1 className="text-success text-center">!สถานะปกติ</h1>
									  					<h1 className="text-muted text-center">อณุหภูมิที่วัดได้ {temperature} องศา</h1>
								  					</>
									  			}
								  			</>
								  		:
								  			<h4 className="text-muted text-center anima-show-hide">กรุณาเอาเครื่องวัดอณุหภูมิจ่อหน้าผากแล้วกดปุ่ม...</h4>
								  		}
								  	</div>
								</div>
							: <h1 className="text-danger text-center">ไม่เจอรหัสดังกล่าวในระบบ <br />#{payload[1]}</h1>}
						</>
					:
					<h4 className="text-center text-muted anima-show-hide">กรุณากรอกรหัสประจำตัว...</h4>

				}
			</div>
		</div>
	)
}

export default Check