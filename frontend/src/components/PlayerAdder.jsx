import { useState, useRef, useEffect, useContext } from 'react';
import instanceAxios from '../utils/axios';
import { PlayersContext } from '../contexts/PlayersContext';

export default function PlayerAdder() {
  const [playersToAdd, setPlayersToAdd] = useState('');
  const textAreaRef = useRef(null);
  const { setPlayersList, isLogged } = useContext(PlayersContext);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  };

  useEffect(resizeTextArea, [playersToAdd]);

  const handleChange = (event) => {
    const { value } = event.target;
    setPlayersToAdd(value);
  };

  const handleAddPlayers = async (event) => {
    event.preventDefault();

    let newPlayers = [];
    const players = formattedPlayersToAdd();

    if(isLogged) {
      const response = await instanceAxios.post('/dashboard/player', { players });
      newPlayers = await response.data;
    } else {
      newPlayers = players.map((name, ind) => {
        return {name, id: ind}
      });
    }

    setPlayersList((prev) => [...prev, ...newPlayers]);
    setPlayersToAdd('');
  }

  const formattedPlayersToAdd = () => {
    const formatted = playersToAdd
      .split(/\n/)
      .flatMap((line) => line.replace(/,$/, '').split(',').map((item) => item.trim()))
      .filter((name) => name);
    return formatted
  }

  return (
    <form>
      <textarea
        ref={textAreaRef}
        value={playersToAdd}
        onChange={handleChange}
        rows={1}
      />
      <button onClick={handleAddPlayers}>Adicionar</button>
    </form>
  )
}
