import React from "react";
import { Button } from "$/components/common/Button";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Hi, this is our empirica playground. Please feel free to leave your comment!
      </h3>
      <div className="mt-2 mb-6">
        <p className="text-sm text-gray-500">
          Only one rule: peace and love!
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Start!</p>
      </Button>
    </div>
  );
}
