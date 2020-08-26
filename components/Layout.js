import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {NotificationContainer} from 'react-notifications';
import {Component} from 'react'

class Layout extends Component {
	render(){
		return(
			<div>
				<Head>
					<link href="https://fonts.googleapis.com/css?family=Mitr" rel="stylesheet" />
				</Head>
				<Navbar />
					{ this.props.children }
				<Footer />
		        <NotificationContainer/>
		        <style jsx global >{`
					body{
						font-family: 'Mitr'
					}
				`}</style>
			</div>
		)
	}
}

export default Layout