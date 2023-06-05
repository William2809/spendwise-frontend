import nullpng from "../assets/null.png";
import React from "react";
import Card from "../components/Card";

function Deals() {
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="px-5 pt-4">
      {/*<div className="flex items-center gap-3">
				<img
					src={user.picture ? `${user.picture}` : nullpng}
					className="rounded-full h-10"
					alt="User Profile"
				/>
				<h2 className="text-primary-muted font-semibold text-base">
					{user.name}
				</h2>
			</div>*/}
      <div className="App">
        <div className="container mx-auto">
          <Card
            title="Github"
            text="Free github premium access for university students"
            imgSrc="https://github.githubassets.com/images/modules/open_graph/github-mark.png"
            next="https://github.com/"
          />
        </div>
      </div>
    </div>
  );
}

export default Deals;
