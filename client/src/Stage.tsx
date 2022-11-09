import {
  usePlayer,
  usePlayers,
  useRound,
} from "@empirica/core/player/classic/react";
import { Twitter } from '$/twitteroom/index';
import { generateRandomName } from '$/src/utils/random-generator';
import React, { useEffect } from "react";

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();

  // Register random name for player
  useEffect(() => {
    player.set('chat_name', generateRandomName());
  }, []);

  // if (player.stage.get("submit")) {
  //   if (players.length === 1) {
  //     return <Loading />;
  //   }

  //   return (
  //     <div className="text-center text-gray-400 pointer-events-none">
  //       Please wait for other player(s).
  //     </div>
  //   );
  // }

  switch (round.get("task")) {
    case "room":
      return <Twitter />;
    default:
      return <div>Unknown task</div>;
  }
}
