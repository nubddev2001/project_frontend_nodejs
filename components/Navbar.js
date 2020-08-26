import Link from 'next/link'
import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import moment from "moment"

const Navbar = ({ children, href }) => {
	const router = useRouter().pathname
	const [date,setDate] = useState('กำลังโหลด...');

	moment.locale('th');

	useEffect(() => {
		setInterval(() => {
			setDate(moment().format('ll')+ ' '+moment().format('LTS'))
		},1000)
	},[])

	return(
		<nav className="navbar navbar-expand-lg shadow-sm">
		  	<div className="container">
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className={router === '/'? 'nav-item active':'nav-item'}>
			        <Link href="/">
			        	<a className="nav-link"><i className="fa fa-home"></i> หน้าแรก</a>
			        </Link>
			      </li>
			      <li className={router === '/result'? 'nav-item active':'nav-item'}>
			        <Link href="/result">
			        	<a className="nav-link"><i className="fa fa-thermometer-half"></i> ผลการตรวจ</a>
			        </Link>
			      </li>
			      <li className={router === '/check'? 'nav-item active':'nav-item'}>
			        <Link href="/check">
			        	<a className="nav-link"><i className="fa fa-thermometer-half"></i> เครื่องตรวจ</a>
			        </Link>
			      </li>
			      <li className={router === '/covid-19'? 'nav-item active':'nav-item'}>
			        <Link href="/covid-19">
			        	<a className="nav-link"><i className="fa fa-thermometer-half"></i> โควิด 19</a>
			        </Link>
			      </li>
			      <li className={router === '/setting'? 'nav-item active':'nav-item'}>
			        <Link href="/setting">
			        	<a className="nav-link"><i className="fa fa-cog"></i> ตั่งค่า</a>
			        </Link>
			      </li>
			    </ul>
			    <ul className="navbar-nav">
			    	<li className="nav-item">
				      <Link href="#">
				        <a  className="nav-link"><i className="fa fa-clock-o"></i> {date}</a>
				      </Link>
			      </li>
			     </ul>
			  </div>
		  	</div>
		</nav>
	)
}

export default Navbar