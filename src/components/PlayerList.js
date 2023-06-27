import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const userTimeZone = moment.tz.guess();

  const dateFormat = 'DD-MM-YYYY h:mm:ss a';

  useEffect(() => {
    axios.get('https://api.npoint.io/20c1afef1661881ddc9c')
      .then((response) => {
        const sortedPlayers = response.data.playerList.sort((a, b) => a.Value - b.Value);
        setPlayers(sortedPlayers);
      })
      .catch((error) => {
        console.error('Error fetching player data:', error);
      });
  }, []);

  const filteredPlayers = players.filter(
    (player) =>
      player.TName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.PFName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="mt-3">Player List</h1>

      <div className="search-container">
        <input className="col-md-3 mb-3" type="text" placeholder="Search by TName and PFName..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredPlayers.map((player) => (
            <PlayerCard key={player.Id} player={player} dateFormat={dateFormat}
              userTimeZone={userTimeZone}/>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
