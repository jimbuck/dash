import Link from 'next/link';

import { useBoardsQuery } from './operations.generated';

export default function BoardsPage() {

	const { error, loading, data } = useBoardsQuery();

	const header = <h2>Boards (<Link href="/"><a>Back</a></Link>)</h2>;

	if (error) {
		return <div>
			{ header }
			{ error.message }
		</div>;
	}

	if (loading && !data) {
		return <div>
			{ header }
			Loading...
		</div>;
	}

	return <div>
		{ header }
		{(data.boards ?? []).map(b => <li key={b.id}>{b.name}</li>)}
	</div>;
}
