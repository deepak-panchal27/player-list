import React, { useState } from 'react';
import moment from 'moment';

const PlayerCard = ({ player, dateFormat, userTimeZone }) => {

    const [imageLoadError, setImageLoadError] = useState(false);
    
    let formattedDate = '';
    if (player.UpComingMatchesList[0].MDate) {
        formattedDate = moment.utc(player.UpComingMatchesList[0].MDate).tz(userTimeZone).format(dateFormat);
    }

    const cCode = player.UpComingMatchesList[0].CCode;
    const vsCCode = player.UpComingMatchesList[0].VsCCode;

    const handleImageError = () => {
        setImageLoadError(true);
    };

    return (
        <>
            {!imageLoadError && (
                <div className="col-md-3 mb-3" key={player.Id}>
                    <div className="card">
                        <img src={`player-images/${player.Id}.jpg`} alt={player.PFName} className="card-img-top" onError={handleImageError} />
                        <div className="card-body">
                            {player.TName &&
                                <h5 className="card-title">{player.PFName}</h5>
                            }
                            {player.TName &&
                                <p className="card-text">Team: {player.TName}</p>
                            }
                            {player.SkillDesc &&
                                <p className="card-text">Skill: {player.SkillDesc}</p>
                            }
                            {player.Value &&
                                <p className="card-text">Value: ${player.Value}</p>
                            }
                            {cCode && vsCCode && (
                                <p className="card-text">Upcoming Match: {cCode} vs {vsCCode}</p>
                            )}
                            {formattedDate &&
                                <p className="card-text">Time: {formattedDate}</p>
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PlayerCard;
