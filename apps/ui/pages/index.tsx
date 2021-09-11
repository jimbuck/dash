import Link from 'next/link';

import styles from './index.module.scss';

export function Index() {

	return (
		<div className={styles.page}>
			<h2>Dash</h2>
			<ul>
				<li><Link href="/board"><a>Board</a></Link></li>
				<li><Link href="/editor"><a>Editor</a></Link></li>
			</ul>
		</div>
	);
}

export default Index;
