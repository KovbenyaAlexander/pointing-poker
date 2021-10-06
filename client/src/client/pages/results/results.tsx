import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import GameResultSingle from '../../components/game-result-single/game-result-single';
import GameResultsTable from '../../components/game-results-table/game-results-table';
import { IStore } from '../../types';
import './style.scss';

export default function ResultsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const game = useSelector((state: IStore) => state.game);
  const history = useHistory();

  useEffect(() => {
    if (!id || !game.id) history.push('/');
  }, [id, game.id]);

  return (
    <article className="results-page">
      <h2 className="results-page__header">Results</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {game.settings.gameResult ? <GameResultSingle game={game} />
            : game.settings.stories.map((story) => <GameResultsTable key={story.id} story={story} />)}
        </tbody>
      </table>
    </article>
  );
}
