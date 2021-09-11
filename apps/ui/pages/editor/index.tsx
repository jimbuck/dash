import Link from 'next/link';

export default function BoardsPage() {

	const header = <h2>Editor (<Link href="/"><a>Back</a></Link>)</h2>;

	return <div>
			{ header }
			
		</div>;
}
