import React from "react";
import { Profile } from "$/src/Profile";
import { Stage } from "$/src/Stage";

export function Game() {
  return (
    <div className="h-full w-full flex flex-col">
      <Profile />
      <div className="h-full flex items-center justify-center">
        <Stage />
      </div>
    </div>
  );
}
