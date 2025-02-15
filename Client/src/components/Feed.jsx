import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";

const users = [
  { id: 1, name: "Alice", bio: "Frontend Developer", url: "https://via.placeholder.com/150" },
  { id: 2, name: "Bob", bio: "Backend Enthusiast", url: "https://via.placeholder.com/150" },
  { id: 3, name: "Charlie", bio: "ML Engineer", url: "https://via.placeholder.com/150" },
];

export default function Feed() {
  const [feed, setFeed] = useState(users);

  const handleSwipe = (direction, id) => {
    console.log(`User ${id} swiped ${direction}`);
    setFeed((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="relative w-[400px] h-[80vh] mx-auto flex justify-center items-center">
      <AnimatePresence>
        {feed.map((user, index) => (
          <div key={user.id} className="absolute">
            {index === 0 && <UserCard user={user} onSwipe={handleSwipe} />}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
