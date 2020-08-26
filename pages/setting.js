import {useState,useEffect} from 'react'
import axios from "axios"

const setting = ({setting}) => {

	const [appdescription,setAppdescription] = useState();

	useEffect(() => {
		setting.map(s => {
			s.text == "appdescription" ? setAppdescription(s.value) : null
		})
	},[])

	//const [editmode,setEditmode] = useState(false);
 
	const Save = () => {
		const Data = {
			appdescription
		}
		

		axios.post('https://nubdev-backend-nodejs.herokuapp.com/setting',{data:Data})
		.then((data) => {

		}).catch((err) => {

		})
		console.log(JSON.stringify(Data))
	}

	return(
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="mt-5">
						<h3 className="text-muted"> ตั่งค่า</h3>
						<div className="col-lg-6 mb-2">
							<label className="text-muted">คำอธิบาย :</label>
				      		<div className="input-group mb-3">
							  <div className="input-group-prepend">
							    <span className="input-group-text" id="basic-addon1"><i className="fa fa-pencil"></i></span>
							  </div>
							  <input type="text" className="form-control" value={appdescription} placeholder="คำอธิบาย..."/>
							</div>
			      		</div>
			      		<div className="col-lg-6 mb-2">
			      		</div>
			      		<div className="col-lg-12 text-center mb-2">
			      			<button className="btn btn-success" onClick={Save}><i className="fa fa-save"></i> บันทีก</button>
			      		</div>
					</div>
				</div>
			</div>
		</div>
	)
}

setting.getInitialProps = async () => {
  const setting = await fetch('https://nubdev-backend-nodejs.herokuapp.com/setting')
  const res_setting = await setting.json()
  return { setting: res_setting}
  
}


export default setting;