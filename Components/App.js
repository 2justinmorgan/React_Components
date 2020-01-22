import React from 'react';
import { render } from 'react-dom';
import { menuRequest } from './MenuRequest';
import Accordion from './Accordion';
import Header from './Header';
import About from './About';
import Fullstack from './Fullstack';
import Graphs from './Graphs';
import Database from './Database';
import Search from './Search';
import Links from './Links';

const options = menuRequest;

export default function App() {

	return (
		<div>
			<Header />
      <Accordion>
				<div label='About'>
					<About />
        </div>
				<div label='Fullstack'>
					<Fullstack />
        </div>
				<div label='Graphs'>
					<Graphs />
        </div>
				<div label='Search'>
					<Search />
				</div>
				<div label='Database'>
					<Database />
				</div>
				<div label='Links'>
					<Links />
        </div>
			</Accordion>
		</div>
	);
}
