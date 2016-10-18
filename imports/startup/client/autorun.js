import { PlayersIndex } from '../../api/players/players_index.js';
import { RenotedIndex } from '../../api/renoted/renoted_index.js';
Tracker.autorun(() => {
  console.log(PlayersIndex.search('Barack', { limit: 20 }).fetch());
});
